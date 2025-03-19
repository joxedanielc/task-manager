from flask_restx import Namespace, Resource, fields
from flask import request, jsonify
import jwt
import datetime
import os
from functools import wraps
from dotenv import load_dotenv
from src.services.auth import AuthService
from src.models.user import User, UserResponse

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

api = Namespace("auth", description="Operaciones de autenticación")

login_model = api.model(
    "Login",
    {
        "username": fields.String(required=True),
        "password": fields.String(required=True),
    },
)

user_model = api.model(
    "User",
    {
        "id": fields.String(readonly=True),
        "username": fields.String(required=True),
    },
)


def generate_token(user_id):
    """Generate a JWT token for authenticated users."""
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1),
        "iat": datetime.datetime.now(datetime.timezone.utc),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def token_required(f):
    """Decorator to protect routes that require authentication."""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        print("token: ", token)
        if not token:
            return jsonify({"message": "Token is missing!"}), 401

        try:
            token = token.split("Bearer ")[-1]
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            print("decoded_token: ", decoded_token)
            request.user_id = decoded_token["user_id"]
            print("request.user_id: ", request.user_id)
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

        return f(*args, **kwargs)

    return decorated


@api.route("/signup")
class Signup(Resource):
    @api.expect(login_model)
    @api.marshal_with(user_model, code=201)
    def post(self):
        """Registrar nuevo usuario"""
        try:
            user_data = User(**request.get_json())
            user_id = AuthService.create_user(user_data)
            return {"id": user_id, "username": user_data.username}, 201
        except ValueError as e:
            return {"error": str(e)}, 400


@api.route("/login")
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        """Iniciar sesión"""
        try:
            data = request.get_json()
            user_id = AuthService.authenticate_user(data["username"], data["password"])

            if not user_id:
                return {"error": "Invalid credentials"}, 401

            token = generate_token(user_id)
            return {"token": token, "message": "Login successful"}, 200

        except ValueError as e:
            return {"error": str(e)}, 401