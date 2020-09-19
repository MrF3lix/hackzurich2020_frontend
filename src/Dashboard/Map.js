import React, {useState} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { ConstructionSitePin, CementFactoryPin, TruckLocationPin, PickupLocationPin } from '../Atoms/Pin';

export const Map = ({ viewport, setViewport, trucks, facilities, pickups, isDarkMode = false }) => {
    const [activeItemId, setActiveItemId] = useState();

    const updateActiveItem = (latitude, longitude , id) => {
        setActiveItemId(id);
        setViewport({ ...viewport, latitude: latitude, longitude: longitude });
    };

    console.log(trucks);
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
                        <TruckLocationPin onClick={() => updateActiveItem(truck.currentLocationLat, truck.currentLocationLon, truck.id)} />
                    </Marker>
                ))}
                {facilities && facilities.map(facility => (
                    <Marker key={facility.id} latitude={facility.locationLat} longitude={facility.locationLog}>
                        {facility.type === 'ConstructionSite' &&
                            <ConstructionSitePin onClick={() => updateActiveItem(facility.locationLat, facility.locationLog, facility.id)} />
                        }
                        {facility.type === 'CementFactory' &&
                            <CementFactoryPin onClick={() => updateActiveItem(facility.locationLat, facility.locationLog, facility.id)} />
                        }
                    </Marker>
                ))}
                {/* {facilities && facilities.map(facility => (
                    <Marker key={facility.id} latitude={facility.locationLat} longitude={facility.locationLog}>
                        {facility.id === activeItemId &&
                            <div className="popup">
                                {facility.id}
                            </div>
                        }
                    </Marker>
                ))} */}
                
                {pickups && pickups.map(pickup => (
                    <Marker onClick={() => updateActiveItem(pickup.locationLat, pickup.locationLog, pickup.id)}  key={pickup.id} latitude={pickup.locationLat} longitude={pickup.locationLog}>
                        <PickupLocationPin />
                    </Marker>
                ))}
            </ReactMapGL>
        </div>
    );
};