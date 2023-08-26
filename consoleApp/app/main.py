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
def main():
    
    db_manager = DatabaseManager()
    engine, success = db_manager.create_connection()
    
    if success:
        print("Veritabanına başarıyla bağlandı.")
        # engine nesnesini kullanarak veritabanı işlemleri yapabilirsiniz
    else:
        print("Veritabanına bağlantı oluşturulamadı.")

    print("Uygulama başarıyla tamamlandı.")


"""    conn = http.client.HTTPSConnection("api.collectapi.com")

    headers = {
        'content-type': "application/json",
        'authorization': "apikey 2MCBVYZ5Dy8s4XFXw6CYXN:37926RomyR3skJsPe7Kr7D"
    }

    conn.request(
        "GET", "/health/dutyPharmacy?ilce=%C3%87ankaya&il=Ankara", headers=headers)


    res = conn.getresponse()
    data = res.read()

    my_json = data.decode('utf8').replace("'", '"')
    data2= json.loads(my_json)
    s = json.dumps(data2, indent=4, sort_keys=True)
    df=pd.DataFrame.from_dict(data2["result"])
    df[['lat', 'lng']] = df['loc'].str.split(',', expand=True)
    df.drop(columns=['loc'], inplace=True)
    pharmacy= gpd.GeoDataFrame(df, geometry= gpd.points_from_xy(df.lng, df.lat))
    pharmacy=pharmacy.drop(columns=['lng','lat'])
    pharmacy.geometry.crs = {'init':'epsg:4326'}
    pharmacy.to_postgis(name="test", con=engine, schema="public")"""
    
    
if __name__ == "__main__":
    main()
