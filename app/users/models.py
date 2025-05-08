from pydantic import BaseModel, EmailStr
from tortoise import Model, fields


class Users(Model):
    id = fields.UUIDField(primary_key=True)
    full_name = fields.CharField(max_length=255)
    email = fields.CharField(max_length=255)
    password = fields.CharField(max_length=255)


class UserLoginForm(BaseModel):
    email: EmailStr
    password: str


class UserSignupForm(UserLoginForm):
    full_name: str
