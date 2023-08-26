from sqlalchemy import create_engine

class DatabaseManager:
    def __init__(self):
        self.user = "postgres"
        self.password = "Ww4756"
        self.host = "localhost"
        self.port = 5432
        self.database = "casestudy"
        self.conn_string = f"postgresql://{self.user}:{self.password}@{self.host}:{self.port}/{self.database}"

    def create_connection(self):
        try:
            engine = create_engine(self.conn_string)
            return engine, True
        except Error as e:
            print("Veritabanına bağlanırken bir hata oluştu:", e)
            return None, False