from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, User, Wallet
import bitcoinlib
from bitcoinlib.wallets import DbWallet
from web3 import Web3

wallet = Blueprint('wallet', __name__)

@wallet.route('/create', methods=['POST'])
@jwt_required()
def create_wallet():
    user_email = get_jwt_identity()
    data = request.get_json()
    currency = data.get('currency')

    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    if currency == 'BTC':
        key = bitcoinlib.keys.Key()
        address = key.address
        private_key = key.wif
    elif currency == 'ETH':
        w3 = Web3()
        account = w3.eth.account.create()
        address = account.address
        private_key = account.privateKey.hex()
    # Handle other currencies similarly...

    new_wallet = Wallet(user_id=user.id, currency=currency, address=address, private_key=private_key)
    db.session.add(new_wallet)
    db.session.commit()

    return jsonify({'address': address}), 201

@wallet.route('/recover', methods=['POST'])
@jwt_required()
def recover_wallet():
    user_email = get_jwt_identity()
    data = request.get_json()
    currency = data.get('currency')
    mnemonic = data.get('mnemonic')

    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    if currency == 'BTC':
        wallet = DbWallet.create(user_email, keys=mnemonic)
        address = wallet.get_key().address
        private_key = wallet.key().wif
    elif currency == 'ETH':
        w3 = Web3()
        account = w3.eth.account.from_mnemonic(mnemonic)
        address = account.address
        private_key = account.privateKey.hex()
    # Handle other currencies similarly...

    new_wallet = DbWallet(user_id=user.id, currency=currency, address=address, private_key=private_key)
    db.session.add(new_wallet)
    db.session.commit()

    return jsonify({'address': address}), 201

@wallet.route('/send', methods=['POST'])
@jwt_required()
def send_funds():
    user_email = get_jwt_identity()
    data = request.get_json()
    currency = data.get('currency')
    recipient = data.get('recipient')
    amount = data.get('amount')

    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    wallet = Wallet.query.filter_by(user_id=user.id, currency=currency).first()
    if not wallet:
        return jsonify({'message': 'Wallet not found'}), 404

    if currency == 'BTC':
        key = bitcoinlib.keys.Key(wallet.private_key)
        tx = key.create_transaction([(recipient, amount, 'btc')])
        key.send(tx)
    elif currency == 'ETH':
        w3 = Web3()
        tx = {
            'nonce': w3.eth.getTransactionCount(wallet.address),
            'to': recipient,
            'value': w3.toWei(amount, 'ether'),
            'gas': 2000000,
            'gasPrice': w3.toWei('50', 'gwei')
        }
        signed_tx = w3.eth.account.signTransaction(tx, wallet.private_key)
        w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    # Handle other currencies similarly...

    return jsonify({'message': 'Transaction sent'}), 200
