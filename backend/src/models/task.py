from enum import Enum
from pydantic import BaseModel, validator
from bson import ObjectId

class TaskStatus(str, Enum):
    TODO = "por hacer"
    IN_PROGRESS = "en progreso"
    DONE = "completada"

class Task(BaseModel):
    title: str
    description: str
    status: TaskStatus = TaskStatus.TODO

    @validator('title')
    def validate_title(cls, v):
        if len(v) < 3:
            raise ValueError("Title must be at least 3 characters")
        return v

class TaskResponse(Task):
    id: str

    @classmethod
    def from_mongo(cls, data):
        data['id'] = str(data['_id'])
        return cls(**data)