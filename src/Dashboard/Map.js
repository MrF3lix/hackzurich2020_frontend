import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Pin from '../Atoms/Pin';

export const Map = ({ userLocation, viewport, setViewport, trucks }) => {
    return (
        <div className="map__container">
            <ReactMapGL
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                transitionDuration={100}
                {...viewport}
                onViewportChange={setViewport}
            >
                {(userLocation && userLocation.latitude && userLocation.longitude) &&
                    <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
                        <Pin className="marker marker--user" size={40} />
                    </Marker>
                }
                {trucks && trucks.map(truck => (
                    <Marker key={truck.id} latitude={truck.currentLocationLat} longitude={truck.currentLocationLon}>
                        <Pin className="marker marker--truck" size={40} />
                    </Marker>
                ))}
            </ReactMapGL>
        </div>
    );
};