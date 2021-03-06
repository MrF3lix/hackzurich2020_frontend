import React, { useState } from 'react';
import * as geolib from 'geolib';
import ReactMapGL, { Marker } from 'react-map-gl';
import { ConstructionSitePin, CementFactoryPin, TruckLocationPin, PickupLocationPin, WarningPin } from '../Atoms/Pin';
import PolylineOverlay from './PolylineOverlay';

export const Map = ({ viewport, setViewport, trucks, facilities, pickups, warnings, isDarkMode = false }) => {
    const [, setActiveItemId] = useState();
    const [showPickups, setShowPickups] = useState(true);
    const [showSites, setShowSites] = useState(true);
    const [showFactories, setShowFactories] = useState(true);
    const [showTrucks, setShowTrucks] = useState(true);
    const [showWarnings, setShowWarnings] = useState(true);

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

                {showPickups && pickups && Array.isArray(pickups) && pickups.map(pickup => (
                    <Marker onClick={() => updateActiveItem(pickup.locationLat, pickup.locationLog, pickup.id)} key={pickup.id} latitude={pickup.locationLat} longitude={pickup.locationLog}>
                        <PickupLocationPin />
                    </Marker>
                ))}
                {showTrucks && trucks && Array.isArray(trucks) && trucks.map(truck => {
                    let route = [];
                    let hasWarning = false;
                    let direction = 0;
                    if (truck.route) {
                        try {
                            route = JSON.parse(truck.route);
                        } catch(e) {
                            console.error('Couldn\'t parse route');
                            console.error(truck.route);

                            route = truck.route;
                        }

                        try {
                            let index = route.findIndex(item => item[0] === truck.currentLocationLon && item[1] === truck.currentLocationLat);
                            let nextIndex = index === route.length - 1 ? index - 1 : index + 1;
    
                            direction = geolib.getRhumbLineBearing(
                                {
                                    latitude: route[index][1],
                                    longitude: route[index][0]
                                },
                                {
                                    latitude: route[nextIndex][1],
                                    longitude: route[nextIndex][0]
                                }
                            );
                        } catch(e) {
                            console.error('Couldn\'t get direction');
                        }
                    }

                    if (warnings && Array.isArray(warnings)) {
                        hasWarning = warnings.some(warning => {
                            let warningIndex = route.findIndex(item => item[0] === warning.locationLog && item[1] === warning.locationLat);

                            return warningIndex !== -1;
                        });
                    }



                    return (
                        <React.Fragment key={truck.id}>
                            <PolylineOverlay points={route} color={(hasWarning && showWarnings) ? 'red' : '#0029FA'} />
                            <Marker latitude={truck.currentLocationLat} longitude={truck.currentLocationLon} className="mapboxgl-marker--animated">
                                <TruckLocationPin size={35} direction={direction} onClick={() => updateActiveItem(truck.currentLocationLat, truck.currentLocationLon, truck.id)} />
                            </Marker>
                        </React.Fragment>
                    );
                })}
                {showWarnings && warnings && Array.isArray(warnings) && warnings.map(warning => (
                    <Marker onClick={() => updateActiveItem(warning.locationLat, warning.locationLog, warning.id)} key={warning.id} latitude={warning.locationLat} longitude={warning.locationLog}>
                        <WarningPin />
                    </Marker>
                ))}
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
                    <li onClick={() => setShowWarnings(!showWarnings)}>
                        <WarningPin isDisabled={!showWarnings} size={40} />
                        <label>Dangers</label>
                    </li>
                </ul>
            </div>
        </div>
    );
};