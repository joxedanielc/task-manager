from pydantic import BaseModel, validator
from typing import Optional

class User(BaseModel):
    username: str
    password: str

    @validator('username')
    def username_length(cls, v):
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters')
        return v

    @validator('password')
    def password_length(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters')
        return v

class UserResponse(User):
    id: str

    class Config:
        json_encoders = {
            'password': lambda _: '[REDACTED]'
        }