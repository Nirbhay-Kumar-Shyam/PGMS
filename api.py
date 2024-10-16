from flask import Flask
from mysql.connector import connect
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, func
from sqlalchemy.orm import sessionmaker, scoped_session, declarative_base
from flask_cors import CORS
# Database configuration
app = Flask(__name__)
CORS(app)

DATABASE_URI = 'mysql+pymysql://root:Shyam$2002@localhost:3306/pg_database'
engine = create_engine(DATABASE_URI)
Base = declarative_base()

# Define a model for the table
class PG_Name(Base):
    __tablename__ = 'pg'
    
    pg_id = Column(Integer, primary_key=True)
    pg_name = Column(String(255), nullable=False)


@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    # Create the database and tables if they don't exist
    Base.metadata.create_all(engine)
    
    # Run the Flask app on port 5000 (or any port you prefer)
    app.run(debug=True, port=5000)


