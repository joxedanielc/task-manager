from pymongo import MongoClient
from flask import current_app

class Database:
    _instance = None

    def __new__(cls):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

    def init_app(self, app):
        """Inicializa la conexión con la base de datos usando la configuración de Flask"""
        self.client = MongoClient(app.config['MONGO_URI'])
        self.db = self.client[app.config['DB_NAME']]
        
    @property
    def connection(self):
        """Obtiene la conexión a la base de datos"""
        if not hasattr(self, 'db'):
            raise RuntimeError("Database not initialized! Call init_app first.")
        return self.db