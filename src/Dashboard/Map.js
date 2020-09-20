import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { ConstructionSitePin, CementFactoryPin, TruckLocationPin, PickupLocationPin } from '../Atoms/Pin';
import PolylineOverlay from './PolylineOverlay';

export const Map = ({ viewport, setViewport, trucks, facilities, pickups, isDarkMode = false }) => {
    const [activeItemId, setActiveItemId] = useState();
    const [showPickups, setShowPickups] = useState(true);
    const [showSites, setShowSites] = useState(true);
    const [showFactories, setShowFactories] = useState(true);
    const [showTrucks, setShowTrucks] = useState(true);

    const updateActiveItem = (latitude, longitude, id) => {
        setActiveItemId(id);
        setViewport({ ...viewport, latitude: latitude, longitude: longitude });
    };

    return (
        <div className="map__container">
            <ReactMapGL
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle={isDarkMode ? 'mapbox://styles/mrf3lix/ckf9t5a4j6sm31aqw3261pth2' : 'mapbox://styles/mrf3lix/ckf9t3h353q2e19my5z127egr'}
                transitionDuration={100}
                {...viewport}
                onViewportChange={setViewport}
            >
                {facilities && Array.isArray(facilities) && facilities.map(facility => (
                    <Marker key={facility.id} latitude={facility.locationLat} longitude={facility.locationLog}>
                        {showSites && facility.type === 'ConstructionSite' &&
                            <ConstructionSitePin onClick={() => updateActiveItem(facility.locationLat, facility.locationLog, facility.id)} />
                        }
                        {showFactories && facility.type === 'CementFactory' &&
                            <CementFactoryPin onClick={() => updateActiveItem(facility.locationLat, facility.locationLog, facility.id)} />
                        }
                    </Marker>
                ))}
                {/* {facilities && facilities.map(facility => (
                    <Marker key={facility.id} latitude={facility.locationLat} longitude={facility.locationLog}>
                        {facility.id === activeItemId &&
                            <div className="popup">
                                <div>{facility.id} - {facility.type}</div>
                                <div>{facility.locationLat}/{facility.locationLog}</div>
                            </div>
                        }
                    </Marker>
                ))} */}

                {showPickups && pickups && Array.isArray(pickups) && pickups.map(pickup => (
                    <Marker onClick={() => updateActiveItem(pickup.locationLat, pickup.locationLog, pickup.id)} key={pickup.id} latitude={pickup.locationLat} longitude={pickup.locationLog}>
                        <PickupLocationPin />
                    </Marker>
                ))}
                {showTrucks && trucks && Array.isArray(trucks) && trucks.map(truck => {
                    let route = [];
                    if(truck.route) {
                        route = JSON.parse(truck.route);
                    }
                    return (
                        <React.Fragment key={truck.id}>
                            <PolylineOverlay points={route}/>
                            <Marker latitude={truck.currentLocationLat} longitude={truck.currentLocationLon}>
                                <TruckLocationPin size={35} direction={truck.angle} onClick={() => updateActiveItem(truck.currentLocationLat, truck.currentLocationLon, truck.id)} />
                            </Marker>
                        </React.Fragment>
                    );
                })}
            </ReactMapGL>

            <div className="legend">
                <ul>
                    <li onClick={() => setShowTrucks(!showTrucks)}>
                        <TruckLocationPin isDisabled={!showTrucks} isLive={false} size={40} direction={45} onClick={() => setShowTrucks(!showTrucks)} />
                        <label>Trucks</label>
                    </li>
                    <li onClick={() => setShowPickups(!showPickups)}>
                        <PickupLocationPin isDisabled={!showPickups} isLive={false} size={40} onClick={() => setShowPickups(!showPickups)} />
                        <label>Pickup Points</label>
                    </li>
                    <li onClick={() => setShowSites(!showSites)}>
                        <ConstructionSitePin isDisabled={!showSites} size={40} onClick={() => setShowSites(!showSites)} />
                        <label>Sites</label>
                    </li>
                    <li onClick={() => setShowFactories(!showFactories)}>
                        <CementFactoryPin isDisabled={!showFactories} size={40} onClick={() => setShowFactories(!showFactories)} />
                        <label>Factories</label>
                    </li>
                </ul>
            </div>
        </div>
    );
};