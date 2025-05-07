from pydantic import BaseModel
from sanic import Blueprint, response
from sanic_ext import validate

from app.users.models import Users

users_router = Blueprint("users", url_prefix="users")


class UserSignupForm(BaseModel):
    username: str


@users_router.post("/signup")
@validate(json=UserSignupForm)
async def signup(request, body: UserSignupForm):
    user = await Users.create(username=body.username)
    return response.json({"user": str(user)})
