from flask_restx import Namespace, Resource, fields
from flask import request
from src.models.task import Task, TaskResponse
from src.services.db import Database
from bson import ObjectId
import json
from flask_cors import CORS, cross_origin
from src.controllers.auth import token_required

api = Namespace('tasks', description='Operaciones con tareas')

task_model = api.model('Task', {
    'id': fields.String(readonly=True, description='Identificador único'),
    'title': fields.String(required=True, description='Título de la tarea'),
    'description': fields.String(description='Descripción detallada'),
    'status': fields.String(required=True,description='Estado actual de la tarea')
})


@api.route('/', strict_slashes=False)
class TaskList(Resource):
    @token_required
    @api.doc(security='Bearer Auth')
    @api.marshal_list_with(task_model)
    def get(self):
        """Listar todas las tareas"""
        tasks = Database().db.tasks.find()
        return [
            TaskResponse.from_mongo(task).dict() for task in tasks
        ]

    @token_required
    @api.doc(security='Bearer Auth')
    @api.expect(task_model)
    @api.marshal_with(task_model, code=201)
    def post(self):
        """Crear nueva tarea"""
        try:
            task_data = Task(**request.get_json()).dict()
            result = Database().db.tasks.insert_one(task_data)
            
            new_task = Database().db.tasks.find_one({'_id': result.inserted_id})
            return TaskResponse.from_mongo(new_task).dict(), 201
            
        except Exception as e:
            return {'error': str(e)}, 400

@api.route('/<string:task_id>')
class TaskResource(Resource):
    @token_required
    @api.doc(security="Bearer Auth")
    @api.expect(task_model)
    @api.marshal_with(task_model)
    def put(self, task_id):
        """Actualizar tarea"""
        try:
            updates = request.get_json()
            Database().db.tasks.update_one(
                {'_id': ObjectId(task_id)},
                {'$set': updates}
            )
            
            updated_task = Database().db.tasks.find_one({'_id': ObjectId(task_id)})
            return TaskResponse.from_mongo(updated_task).dict()
            
        except Exception as e:
            return {'error': str(e)}, 400

    @token_required
    @api.doc(security="Bearer Auth")
    def delete(self, task_id):
        """Eliminar tarea"""
        try:
            Database().db.tasks.delete_one({'_id': ObjectId(task_id)})
            return {'message': 'Tarea eliminada'}, 200
        except Exception as e:
            return {'error': str(e)}, 400
        
def parse_task(task):
    """Transforma el documento MongoDB a formato JSON"""
    task['id'] = str(task['_id'])
    del task['_id']
    return task