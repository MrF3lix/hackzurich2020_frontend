import React, { useState, useEffect } from 'react';
import { Map } from './Map';
import * as Firebase from '../Helper/FirebaseHelper';

const getData = snapshot => console.log(snapshot.val());

export const Dashboard = () => {
    const [viewport, setViewport] = useState({
        latitude: 9.24,
        longitude: 7.63,
        zoom: 5,
    });
    const [trucks, setTrucks] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [pickups, setPickups] = useState([]);

    useEffect(() => {
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    const resize = () => {
        setViewport({ ...viewport, height: window.innerHeight - 51, width: window.innerWidth });
    };

    useEffect(() => {
        Firebase.init();

        const truckLocationRef = Firebase.getRef('trucks', getData);
        truckLocationRef.on('value', snapshot => setTrucks(snapshot.val()));

        const facilityLocationRef = Firebase.getRef('facilities', getData);
        facilityLocationRef.on('value', snapshot => setFacilities(snapshot.val()));

        const pickupLocationRef = Firebase.getRef('pickups', getData);
        pickupLocationRef.on('value', snapshot => setPickups(snapshot.val()));

    }, []);
    
    return (
        <div>
            <Map viewport={viewport} setViewport={setViewport} trucks={trucks} facilities={facilities} pickups={pickups}/>
        </div>
    );
};