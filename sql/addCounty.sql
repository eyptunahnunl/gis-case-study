
alter table applicants 
add column city varchar

UPDATE applicants AS a
SET city = t.adi
FROM (
    SELECT adi, st_transform(geometry, 4326) AS geometry
    FROM county
) AS t
WHERE ST_Intersects(a.geometry, t.geometry);