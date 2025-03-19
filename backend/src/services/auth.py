from functools import wraps
from flask import request, jsonify
import os
import bcrypt
from bson import ObjectId
from src.services.db import Database

class AuthService:
    @staticmethod
    def create_user(user_data):
        db = Database().db
        existing_user = db.users.find_one({"username": user_data.username})
        if existing_user:
            raise ValueError("Username already exists")
        
        hashed_password = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt())
        user_data.password = hashed_password.decode('utf-8')
        user_dict = user_data.dict()
        result = db.users.insert_one(user_dict)
        return str(result.inserted_id)

    @staticmethod
    def authenticate_user(username: str, password: str):
        db = Database().db
        user = db.users.find_one({"username": username})
        if not user:
            raise ValueError("Invalid credentials")
        
        if not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
            raise ValueError("Invalid credentials")
            
        return str(user["_id"])

    @staticmethod
    def get_user(user_id: str):
        db = Database().db
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if user:
            user["id"] = str(user["_id"])
            del user["_id"]
            del user["password"]
            return user
        return None