from flask import Flask
from flask_restx import Api
from flask_cors import CORS
from src.controllers import task_controller
from src.services.db import Database
import os
from src.controllers import auth
from src.models.user import User

def create_app():
    app = Flask(__name__)
        
    app.config.update({
        'MONGO_URI': os.getenv("MONGO_URI"),
        'DB_NAME': os.getenv("DB_NAME"),
        'CORS_ALLOW_ORIGINS': os.getenv("CORS_ALLOW_ORIGINS", "http://localhost:3000").split(','),
        'CORS_ALLOW_METHODS': os.getenv("CORS_ALLOW_METHODS", "GET,POST,PUT,DELETE").split(','),
        'CORS_ALLOW_HEADERS': os.getenv("CORS_ALLOW_HEADERS", "Content-Type,Authorization").split(',')
    })

    CORS(
        app,
        origins=app.config['CORS_ALLOW_ORIGINS'],
        methods=app.config['CORS_ALLOW_METHODS'],
        allow_headers=app.config['CORS_ALLOW_HEADERS'],
        supports_credentials=True
    )

    Database().init_app(app)
    
    api = Api(
        app,
        title='API de Gestión de Tareas',
        version='1.0',
        description='API para administrar tareas de desarrollo',
        doc='/docs',
        default='Tareas',
        default_label='Operaciones relacionadas con tareas',
        security='Bearer Auth',
        authorizations={
            'Bearer Auth': {
                'type': 'apiKey',
                'in': 'header',
                'name': 'Authorization'
            }
        }
    )
    
    api.add_namespace(auth.api, path='/api/v1/auth')
    api.add_namespace(task_controller.api, path='/api/v1/tasks')
    
    @app.errorhandler(Exception)
    def handle_exception(e):
        return {"error": str(e)}, 500
        
    return app

if __name__ == "__main__":    
    app = create_app()
    app.run(
        host=os.getenv("FLASK_HOST", "0.0.0.0"),
        port=int(os.getenv("FLASK_PORT", "5000")),
        debug=os.getenv("FLASK_DEBUG", "false").lower() == "true"
    )