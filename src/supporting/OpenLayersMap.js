import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import './style/OpenLayersMap.css';

const OpenLayersMap = ({ classes }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [vectorSource, setVectorSource] = useState(new VectorSource());
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    if (!map) {
      const initialMap = new Map({
        target: mapRef.current,
        view: new View({
          center: fromLonLat([78, 20]),
          zoom: 7,
        }),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: vectorSource,
          }),
        ],
      });
      setMap(initialMap);

      initialMap.on('click', (event) => {
        initialMap.forEachFeatureAtPixel(event.pixel, (feature) => {
          setSelectedClass(feature.get('classData'));
        });
      });
    }
  }, [map, vectorSource]);

  useEffect(() => {
    vectorSource.clear();
    classes.forEach(cls => {
      const [lon, lat] = cls.coordinates;
      const marker = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
        classData: cls,
      });
      marker.setStyle(new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
        }),
      }));
      vectorSource.addFeature(marker);
    });
  }, [classes, vectorSource]);

  const closePopup = () => {
    setSelectedClass(null);
  };

  return (
    <>
      <div ref={mapRef} className="map-container"></div>
      {selectedClass && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopup}>&times;</button>
            <h3>{selectedClass.Class}</h3>
            <p>{selectedClass.Description}</p>
            <p>{selectedClass.Location}</p>
            <p>{selectedClass.Time}</p>
            <p>{selectedClass.Status ? "Class Open" : "Class Full"} </p>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenLayersMap;
