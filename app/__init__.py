from flask import Flask

from .database import db
from .routes.users import users_router


def create_app():
    app = Flask(__name__)
    app.config.from_object("config.DevConfig")

    db.init_app(app)

    app.register_blueprint(users_router)

    return app
