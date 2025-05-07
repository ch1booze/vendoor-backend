from tortoise import Model, fields


class Users(Model):
    id = fields.UUIDField(primary_key=True)
    username = fields.CharField(50)
