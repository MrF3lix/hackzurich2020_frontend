import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { ConstructionSitePin, CementFactoryPin, TruckLocationPin, PickupLocationPin } from '../Atoms/Pin';

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
                {showTrucks && trucks && Array.isArray(trucks) && trucks.map(truck => (
                    <Marker key={truck.id} latitude={truck.currentLocationLat} longitude={truck.currentLocationLon}>
                        <TruckLocationPin direction={truck.angle} onClick={() => updateActiveItem(truck.currentLocationLat, truck.currentLocationLon, truck.id)} />
                    </Marker>
                ))}
            </ReactMapGL>

            <div className="legend">
                <ul>
                    <li>
                        <TruckLocationPin isLive={false} size={40} direction={45} onClick={() => setShowTrucks(!showTrucks)}/>
                        <input
                            id="trucks"
                            type="checkbox"
                            checked={showTrucks}
                            onClick={() => setShowTrucks(!showTrucks)}
                        />
                        <label htmlFor="trucks">Trucks</label>
                    </li>
                    <li>
                        <PickupLocationPin isLive={false} size={40} onClick={() => setShowPickups(!showPickups)} />
                        <input
                            id="pickup"
                            type="checkbox"
                            checked={showPickups}
                            onClick={() => setShowPickups(!showPickups)}
                        />
                        <label htmlFor="pickup">Pickup Points</label>
                    </li>
                    <li>
                        <ConstructionSitePin size={40} onClick={() => setShowSites(!showSites)} />
                        <input
                            id="sites"
                            type="checkbox"
                            checked={showSites}
                            onClick={() => setShowSites(!showSites)}
                        />
                        <label htmlFor="sites">Sites</label>
                    </li>
                    <li>
                        <CementFactoryPin size={40} onClick={() => setShowFactories(!showFactories)} />
                        <input
                            id="factories"
                            type="checkbox"
                            checked={showFactories}
                            onClick={() => setShowFactories(!showFactories)}
                        />
                        <label htmlFor="factories">Factories</label>
                    </li>
                </ul>
            </div>
        </div>
    );
};