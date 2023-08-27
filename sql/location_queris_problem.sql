
--a. Tüm tablolara bir kolon açılarak bu kolona ilgili İlçe’nin bilgileri aktarılmalıdır.

-- başvuru tablosuna ilçe bilgilerinin eklenmesi
UPDATE applicants AS a
SET city = t.adi
FROM (
    SELECT adi, st_transform(geometry, 4326) AS geometry
    FROM county
) AS t
WHERE ST_Intersects(a.geometry, t.geometry);

-- nöbetçi eczaneler için 

update pharmacy_on_duty as p 
set dist = t.adi
from (-- b.Nöbetçi Eczaneler verisinin İlçelerin merkez noktalarına olan uzakları hesaplanmalıdır.

	 SELECT adi, st_transform(geometry, 4326) AS geometry
    FROM county
) as t 
where ST_Intersects(p.geometry, t.geometry);

-- maden tablosu için 

update miningarea as m 
set city = t.adi
from (
	 SELECT adi, st_transform(geometry, 23036) AS geometry
    FROM county
) as t 
where ST_Intersects(m.geometry, t.geometry);


--b. Nöbetçi Eczaneler verisinin İlçelerin merkez noktalarına olan uzakları hesaplanmalıdır.
select p.name,t.adi, st_distance(p.geometry,t.geometry) from pharmacy_on_duty p, 
(SELECT adi, st_centroid(st_transform(geometry, 4326)) AS geometry
    FROM county) t 
    order by t.adi

---c. Başvuran Kişi verilerinin Nöbetçi Eczanelere olan uzaklıkları hesaplanmalıdır. 
select a.name, p.name, st_distance(a.geometry, p.geometry) from applicants a, pharmacy_on_duty p



--- tucbs uyumlulaştırma view 

CREATE VIEW tucbs_Ilce AS
	 SELECT objectid as id, 
	 adi,nufus,alan, 
	 il_id as IdariHiyerarsiDuzeyKodu,
	 m_date as surumBaslangicZamani,
	 st_transform(geometry, 3857) AS geometry
		FROM county order by id