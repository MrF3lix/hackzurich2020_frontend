import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { ConstructionSitePin, CementFactoryPin, TruckLocationPin } from '../Atoms/Pin';

export const Map = ({ viewport, setViewport, trucks, facilities, isDarkMode = false }) => {
    return (
        <div className="map__container">
            <ReactMapGL
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle={isDarkMode ? 'mapbox://styles/mrf3lix/ckf9t5a4j6sm31aqw3261pth2' : 'mapbox://styles/mrf3lix/ckf9t3h353q2e19my5z127egr'}
                transitionDuration={100}
                {...viewport}
                onViewportChange={setViewport}
            >
                {trucks && trucks.map(truck => (
                    <Marker key={truck.id} latitude={truck.currentLocationLat} longitude={truck.currentLocationLon}>
                        <TruckLocationPin />
                    </Marker>
                ))}
                {facilities && facilities.map(facility => (
                    <Marker key={facility.id} latitude={facility.locationLat} longitude={facility.locationLog}>
                        {facility.type === 'ConstructionSite' &&
                            <ConstructionSitePin />
                        }
                        {facility.type === 'CementFactory' &&
                            <CementFactoryPin />
                        }
                    </Marker>
                ))}
            </ReactMapGL>
        </div>
    );
};