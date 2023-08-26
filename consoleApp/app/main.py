# -*- coding: utf-8 -*-

import geopandas as gpd
import matplotlib.pyplot as plt
from sqlalchemy import create_engine
import http.client
import requests
from urllib.request import urlopen
import json
import pandas as pd
from  database_manager  import  DatabaseManager

from BussinessLayer import BussinessLayer
def main():
    
    db_manager = DatabaseManager()
    engine, success = db_manager.create_connection()
    
    
    businessLayer = BussinessLayer(engine=engine)
    
    shapefile_path = "../../caseData/ilceler/ilceler_ankara_3857.shp"
    excel_path= "../../caseData/bsvr_noktalari.xlsx"
    dxf_path= "../../caseData/maden/maden_sinirlari.dxf"
    
    if success:
        businessLayer.shapefile_to_db(shapefile_path, "county")
        businessLayer.excel_to_db(excel_path, "applicants")
        businessLayer.pharmacy_api_to_db("pharmacy_on_duty")
        businessLayer.dxf_to_db(dxf_path, "miningarea")
    else:
        print("Veritabanına bağlantı oluşturulamadı.")

    
    
if __name__ == "__main__":
    main()
