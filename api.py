from flask import Flask, request, jsonify
from mysql.connector import connect
from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, DateTime, func
from sqlalchemy.orm import sessionmaker, scoped_session, declarative_base,relationship
from flask_cors import CORS
# Database configuration
app = Flask(__name__)
CORS(app)

DATABASE_URI = 'mysql+pymysql://root:Shyam$2002@localhost:3306/pg_database'
engine = create_engine(DATABASE_URI)
Base = declarative_base()

# Define a model for the table
class PG_Name(Base):
    __tablename__ = 'pg_list'
    
    pg_id = Column(Integer, primary_key=True, autoincrement=True)  # Autoincrement ensures unique IDs
    pg_name = Column(String(255), nullable=False, index=True)  # Added index on pg_name for faster lookups
    # One-to-many relationship with WingName
    wing_name = relationship('WingName', backref='pg_list', lazy=True)

class WingName(Base):
    __tablename__ = 'wing_name'

    wing_id = Column(String(50), primary_key=True)  # Specified max length for the wing_id
    pg_id = Column(Integer, ForeignKey('pg_list.pg_id'), nullable=False, index=True)  # Index on foreign key pg_id for faster joins
    # One-to-many relationship with Room
    room = relationship('Room', backref='wing_name', lazy=True)

class Room(Base):
    __tablename__ = 'room'

    room_number = Column(Integer, primary_key=True)  # Kept as Integer for efficient indexing and comparisons
    wing_id = Column(String(50), ForeignKey('wing_name.wing_id'), nullable=False, index=True)  # Added index for faster lookups
    # One-to-many relationship with PG_Member
    pg_member = relationship('PG_Member', backref='room', lazy=True)

class PG_Member(Base):
    __tablename__ = 'pg_member'

    member_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False, index=True)  # Added index for frequent queries on name
    room_number = Column(Integer, ForeignKey('room.room_number'), nullable=False, index=True)  # Index for foreign key relationships


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/pg_name', methods = 'POST')
def add_pg():
    try:
        print("Hello world")
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    # Create the database and tables if they don't exist
    Base.metadata.create_all(engine)
    
    # Run the Flask app on port 5000 (or any port you prefer)
    app.run(debug=True, port=5000)


