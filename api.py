from flask import Flask, request, jsonify
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
    wing_id = Column(Integer, primary_key=True, autoincrement=True, nullable = False)
    wing_name = Column(String(50), nullable = False)  # Specified max length for the wing_id
    pg_id = Column(Integer, ForeignKey('pg_list.pg_id'), nullable=False, index=True)  # Index on foreign key pg_id for faster joins
    # One-to-many relationship with Room
    room = relationship('Room', backref='wing_name', lazy=True)

class Room(Base):
    __tablename__ = 'room'

    room_number = Column(Integer, primary_key=True)  # Kept as Integer for efficient indexing and comparisons
    wing_id = Column(Integer, ForeignKey('wing_name.wing_id'), nullable=False, index=True)  # Added index for faster lookups
    # One-to-many relationship with PG_Member
    pg_member = relationship('PG_Member', backref='room', lazy=True)

class PG_Member(Base):
    __tablename__ = 'pg_member'

    member_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False, index=True)  # Added index for frequent queries on name
    room_number = Column(Integer, ForeignKey('room.room_number'), nullable=False, index=True)  # Index for foreign key relationships

Session = scoped_session(sessionmaker(bind=engine))
session = Session()

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/pg_name', methods = ['POST'])
def add_pg():
    try:
        # print("Hello world")
        data = request.get_json()
        app.logger.info(f'Received data: {data}')
        pg_name = PG_Name(
            pg_name = data['pg_name']
        )
        session.add(pg_name)
        session.commit()
        return jsonify({"message": "New pg added!", "pg_name": str(pg_name)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/pg_list', methods = ['GET'])
def get_pg():
    try:
        pg = session.query(PG_Name).all()
        return jsonify([{
            "pg_id": p.pg_id,
            "pg_name": p.pg_name
            
        } for p in pg])
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/pg_name/<int:pg_id>', methods=['DELETE'])
def remove_pg(pg_id):
    try:
        delete_pg = session.query(PG_Name).filter_by(pg_id=pg_id).first()

        if not delete_pg:
            return jsonify({"message": "Rule not found"}), 404

        session.delete(delete_pg)
        session.commit()

        return jsonify({"message": "Rule deleted!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)})
    

@app.route('/wings', methods = ['POST'])
def wings():
    try:
        data = request.get_json()
        wings_list = WingName(
            wing_name = data[0]['wing_name'],
            pg_id = data[0]['pg_id']
        )
        session.add(wings_list)
        session.commit()
        return jsonify({"message": "New pg added!", "wing_list": str(wings_list)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/wings_list/<int:pg_id>', methods = ['GET'])
def get_wings(pg_id):
    try:
        wing_list = session.query(WingName).filter_by(pg_id = pg_id).all()
        print("Helloo:", wing_list)
        return jsonify([{
            "wing_id": wing.wing_id,
            "wing_name": wing.wing_name,
            "pg_id": wing.pg_id
            
        } for wing in wing_list])
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/delete_wing/<int:wing_id>', methods = ['DELETE'])
def delete_room(wing_id):
    try:
        print("Hello World:", wing_id)
        delete_wing = session.query(WingName).filter_by(wing_id = wing_id).first()
        if not delete_wing:
            return jsonify({"message": "Rule not found"}), 404
        # session.delete(delete_wing)
        # session.commit()
        return jsonify({"message": "Rule deleted!"}), 200
    except Exception as e:
        return jsonify({"error:", str(e)})

@app.route('/set_rooms', methods = ['POST'])
def set_rooms():
    try:
        data = request.json()
        room = Room(
            room_number = data[0]['room_number'],
            wing_id = data[0]['wing_id']
        )
        session.add(room)
        session.commit()
        return jsonify({"message": "new room added", "room": str(room)})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route('/get_rooms/<int:wing_id>', methods = ["GET"])
def get_room(wing_id):
    try:
        room_list = session.query(Room).filter(Room.wing_id == wing_id).all()
        print("Helloo:", room_list)
        return jsonify([{
            "room_number": room.room_number,
            "wing_id": room.wing_id
            } for room in room_list])
    except Exception as e:
        return jsonify({"error": str(e)})
    

@app.route('/set_member', methods = ['POST'])
def set_member():
    try:
        data = request.get_json()

        member = PG_Member(
            member_id = data[0]['member_id'],
            name = data[0]['name'],
            room_number =  data[0]['room_number']
        )
        session.add(member)
        session.commit()
        return  jsonify({"message": "member is added", "member": str(member)})
    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route('/get_member/<int:room_number>', methods = ['GET'])
def get_members(room_number):
    try: 
        members = session.query(PG_Member).filter(PG_Member.room_number == room_number).all()
        # print(members)
        return jsonify([{
            "member_id": member.member_id,
            "member": member.name,
            "room_number": member.room_number
            } for member in members])
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    # Create the database and tables if they don't exist
    Base.metadata.create_all(engine)
    
    # Run the Flask app on port 5000 (or any port you prefer)
    app.run(debug=True, port=5000)


