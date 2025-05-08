from sanic import Sanic
from sanic_ext import Extend
from tortoise.contrib.sanic import register_tortoise

from .config import DATABASE_URL, TORTOISE_ORM_CONFIG
from .users.router import users_router

app = Sanic(__name__)
Extend(app)
register_tortoise(
    app,
    config=TORTOISE_ORM_CONFIG,
    generate_schemas=True,
)


app.blueprint(users_router)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
