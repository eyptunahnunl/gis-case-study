import geopandas as gpd
import pandas as pd
import shapely
from shapely.ops import polygonize
import geocoder  

import json
import http.client
class BussinessLayer: 
    def __init__(self,engine):
        self.engine= engine
    
    
    def shapefile_to_db(self, file_path, table_name):
        try:
            #Veriler okunur
            district_data = gpd.read_file(file_path)
            #İhtiyaç olan columnlar seçilir
            selected_columns = ['objectid', 'adi', 'nufus', 'alan', 'geometry']
            district_data_selected = district_data[selected_columns]
            # tabloya yazılır
            district_data_selected.to_postgis(name=table_name, con=self.engine, schema="public") 
        except Exception as e: 
            print(f"Olmadı bu: {e}")
        
    
    def excel_to_db(self, file_path,table_name):
        try:
             #Veriler okundu 
             data = pd.read_excel(file_path)
             df = pd.DataFrame(data)
             df = df.rename(columns={'Başvuru Numarası': 'id', 'Kişi Adı': 'name', 'Adresi': 'address', 'Şehri': 'city'})
            # Adress'ten enlem, boylama gitmek için 
             for index, row in df.iterrows():
                    g = geocoder.arcgis(row['address'] + row['city'])
                    keys = list(g.json.values())
                    df.at[index, 'lat'] = keys[3]
                    df.at[index, 'lng'] = keys[4]
        
            # db ye yazma işlemi için geometry tanımları yapıldı
             applicant_gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lng, df.lat))
             applicant_gdf = applicant_gdf.drop(columns=['lng', 'lat'])
             
             # coordinat sistemi tanımlandı
             applicant_gdf.geometry.crs = {'init': 'epsg:4326'}
             
             # db ye tablo olarak aktarıldı
             applicant_gdf.to_postgis(name=table_name, con=self.engine, schema="public")
        except Exception as e: 
               print(f"Olmadı bu: {e}")
               
    def dxf_to_db(self, file_path, table_name):
        try : 
            # dxf verisi okundu 
            mining_area = gpd.read_file(file_path)
            
            # verilere id eklendi
            mining_area.loc[:, 'id'] = range(1, len(mining_area) + 1)
            mining_area_v2 = mining_area[['id', 'geometry']]
            
            # line verilerinden z verileri silindi
            line_2d = shapely.force_2d(mining_area_v2.geometry)
            # line verileri polygona dönüştürüldü
            polygons = gpd.GeoSeries(polygonize(line_2d.geometry))
            
            # coordinate sistemi tanımlandı
            polygons.crs = {'init': 'epsg:23036'}

            # line verileri temizlendi
            for i, geom in enumerate(polygons):
                mining_area_v2.at[i, 'geometry'] = geom

            filter_gdf = mining_area_v2[mining_area_v2['geometry'].notnull()]
            
            polygon_only = filter_gdf[filter_gdf['geometry'].geom_type == 'Polygon']

            # dbye tablo olarak aktarıldı
            polygon_only.to_postgis(name=table_name, con=self.engine, schema="public")
        except Exception as e: 
                 print(f"Olmadı bu: {e}")
 
               

    #CollectApi isteği Atan fonksiyondur
    def make_api_request(self, endpoint, params=None):
        
       conn = http.client.HTTPSConnection("api.collectapi.com")
       headers = {
           'content-type': "application/json",
           'authorization': "apikey 2MCBVYZ5Dy8s4XFXw6CYXN:37926RomyR3skJsPe7Kr7D"
       }

       if params is None:
           params = {}

       query_string = "&".join([f"{key}={value}" for key, value in params.items()])
       conn.request("GET", f"/{endpoint}?{query_string}", headers=headers)
       res = conn.getresponse()
       data = res.read()

       my_json = data.decode('utf8').replace("'", '"')
       
       
       return json.loads(my_json)
               
   
    def pharmacy_api_to_db(self, table_name):
        params = {'ilce': "%C3%87ankaya", 'il': "Ankara"}
        data2 = self.make_api_request("health/dutyPharmacy", params=params)
        
        df = pd.DataFrame.from_dict(data2["result"])
        # gelen verideki locationları ayırır ve lati lng columnları oluşturur
        df[['lat', 'lng']] = df['loc'].str.split(',', expand=True)
        # eski locationları siler
        df.drop(columns=['loc'], inplace=True)
        
        # geometry tanımları yapılır
        pharmacy = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lng, df.lat))
        pharmacy = pharmacy.drop(columns=['lng', 'lat'])
        
        # coordinate sistemi tanımlanır
        pharmacy.geometry.crs = {'init': 'epsg:4326'}
        pharmacy.to_postgis(name=table_name, con=self.engine, schema="public")
        
        
        
        
        
        
        
        
        
        
        