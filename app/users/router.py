from sanic import Blueprint, exceptions, response
from sanic_ext import validate

from app.users.models import UserLoginForm, Users, UserSignupForm

users_router = Blueprint("users", url_prefix="users")


@users_router.post("/signup")
@validate(json=UserSignupForm)
async def signup(request, body: UserSignupForm):
    user = await Users.get_or_none(email=body.email)
    if user is not None:
        raise exceptions.SanicException("User already exists", status_code=409)

    user = await Users.create(
        email=body.email,
        full_name=body.full_name,
        password=body.password,
    )
    return response.json({"user": str(user)})


@users_router.post("/login")
@validate(json=UserLoginForm)
async def login(request, body: UserLoginForm):
    user = await Users.get_or_none(email=body.email)
    if user is None:
        raise exceptions.NotFound("User not found")

    if body.password != user.password:
        raise exceptions.Unauthorized("Password not valid")
        
    return response.json({"user": str(user)})
