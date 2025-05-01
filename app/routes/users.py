from flask import Blueprint, jsonify

users_router = Blueprint("users", __name__)


@users_router.route("/users", methods=["GET"])
def get_users():
    return jsonify({"message": "Get users"})
