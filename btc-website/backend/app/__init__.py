from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from app.config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)

    from app.routes.auth import auth as auth_blueprint
    from app.routes.wallet import wallet as wallet_blueprint
    from app.routes.main import main as main_blueprint  # Add this line

    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(wallet_blueprint, url_prefix='/wallet')
    app.register_blueprint(main_blueprint)  # Add this line

    return app
