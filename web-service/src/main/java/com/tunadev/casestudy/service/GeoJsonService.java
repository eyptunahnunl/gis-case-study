package com.tunadev.casestudy.service;

import org.springframework.http.ResponseEntity;
import com.tunadev.casestudy.payload.MyPolygon;
import com.tunadev.casestudy.payload.OtherShape;

public interface GeoJsonService {
    // interface
    ResponseEntity<OtherShape> findShapesWithinPolygon(OtherShape otherShape, MyPolygon myPolygon) throws Exception;
}
