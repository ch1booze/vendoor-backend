from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "users" ADD "email" VARCHAR(255) NOT NULL;
        ALTER TABLE "users" ADD "full_name" VARCHAR(255) NOT NULL;
        ALTER TABLE "users" DROP COLUMN "username";
        ALTER TABLE "users" ALTER COLUMN "password" TYPE VARCHAR(255) USING "password"::VARCHAR(255);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "users" ADD "username" VARCHAR(50) NOT NULL;
        ALTER TABLE "users" DROP COLUMN "email";
        ALTER TABLE "users" DROP COLUMN "full_name";
        ALTER TABLE "users" ALTER COLUMN "password" TYPE VARCHAR(50) USING "password"::VARCHAR(50);"""
