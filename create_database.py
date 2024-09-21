import sqlite3
from sqlite3 import Error
import os

def create_connection():
    conn = None
    try:
        # Use an absolute path to ensure the database is created in the correct location
        db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'projects.db')
        conn = sqlite3.connect(db_path)
        print(f"Successfully connected to SQLite database at {db_path}")
        return conn
    except Error as e:
        print(f"Error connecting to database: {e}")
    return conn

def create_tables(conn):
    try:
        c = conn.cursor()
        
        c.execute('''CREATE TABLE IF NOT EXISTS industries
                     (id INTEGER PRIMARY KEY,
                      name TEXT NOT NULL,
                      icon TEXT NOT NULL,
                      color TEXT NOT NULL)''')
        
        c.execute('''CREATE TABLE IF NOT EXISTS projects
                     (id INTEGER PRIMARY KEY,
                      industry_id INTEGER,
                      name TEXT NOT NULL,
                      description TEXT NOT NULL,
                      link TEXT NOT NULL,
                      FOREIGN KEY (industry_id) REFERENCES industries (id))''')
        
        conn.commit()
        print("Tables created successfully")
    except Error as e:
        print(f"Error creating tables: {e}")

def insert_data(conn):
    industries = [
        (1, "Automobile", "Car", "from-blue-500 to-blue-600"),
        (2, "Energy", "Zap", "from-yellow-500 to-yellow-600"),
        (3, "Infrastructure", "Building2", "from-green-500 to-green-600"),
        (4, "Exports", "Globe", "from-purple-500 to-purple-600"),
        (5, "Technology", "Cpu", "from-red-500 to-red-600")
    ]
    
    projects = [
        (1, 1, "Electric Vehicle Ecosystem", "Developed an integrated EV charging infrastructure and battery swapping network across major Indian cities.", "/projects/ev-ecosystem"),
        (2, 1, "AI-Powered Traffic Management", "Implemented an AI system that reduced traffic congestion by 30% in metropolitan areas.", "/projects/ai-traffic-management"),
        (3, 2, "Solar-Powered Smart Villages", "Transformed 1000+ rural villages with solar microgrids and IoT-based energy management systems.", "/projects/solar-smart-villages"),
        (4, 2, "Offshore Wind Farm Optimization", "Utilized quantum-inspired algorithms to optimize wind turbine placement, increasing energy output by 25%.", "/projects/offshore-wind-optimization"),
        (5, 3, "Smart Water Management", "Developed an AI-driven system that reduced water wastage by 40% in urban areas through predictive maintenance and usage optimization.", "/projects/smart-water-management"),
        (6, 3, "Earthquake-Resistant Structures", "Engineered innovative building materials and designs that improved structural integrity in seismic zones by 50%.", "/projects/earthquake-resistant-structures"),
        (7, 4, "Blockchain-Powered Supply Chain", "Implemented a blockchain solution that increased traceability and reduced export documentation time by 60%.", "/projects/blockchain-supply-chain"),
        (8, 4, "AI Market Trend Predictor", "Developed an AI model that forecasts international market trends with 85% accuracy, boosting export strategies.", "/projects/ai-market-predictor"),
        (9, 5, "Quantum-Inspired Cybersecurity", "Created a next-gen encryption system using quantum-inspired algorithms, enhancing data protection for critical sectors.", "/projects/quantum-cybersecurity"),
        (10, 5, "AI-Powered Language Translation", "Developed an AI model that accurately translates between 22 official Indian languages, bridging communication gaps.", "/projects/ai-language-translation")
    ]
    
    try:
        c = conn.cursor()
        c.executemany('INSERT OR REPLACE INTO industries VALUES (?,?,?,?)', industries)
        c.executemany('INSERT OR REPLACE INTO projects VALUES (?,?,?,?,?)', projects)
        conn.commit()
        print("Data inserted successfully")
    except Error as e:
        print(f"Error inserting data: {e}")

def main():
    conn = create_connection()
    if conn is not None:
        create_tables(conn)
        insert_data(conn)
        
        # Verify data insertion
        c = conn.cursor()
        c.execute("SELECT COUNT(*) FROM projects")
        project_count = c.fetchone()[0]
        c.execute("SELECT COUNT(*) FROM industries")
        industry_count = c.fetchone()[0]
        print(f"Inserted {project_count} projects and {industry_count} industries")
        
        conn.close()
    else:
        print("Error! Cannot create the database connection.")

if __name__ == '__main__':
    main()