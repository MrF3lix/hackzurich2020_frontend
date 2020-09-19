import React, { useState, useEffect } from 'react';
import { getUserLocation } from '../Helper/LocationHelper';
import { Map } from './Map';
import * as Firebase from '../Helper/FirebaseHelper';


const getFacilityLocations = async () => {

};

const getTruckLocations = async () => {

};

const getData = snapshot => console.log(snapshot.val());

export const Dashboard = () => {
    const [location, setLocation] = useState();
    const [viewport, setViewport] = useState({
        latitude: 47.42,
        longitude: 9.28,
        zoom: 5,
    });
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {
        getUserLocation(position => {
            setLocation(position.coords);
        });
    }, []);

    useEffect(() => {
        setViewport({
            ...viewport,
            latitude: location?.latitude,
            longitude: location?.longitude
        });
    }, [location]);

    useEffect(() => {
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    const resize = () => {
        setViewport({ ...viewport, height: window.innerHeight - 200, width: window.innerWidth });
    };


    useEffect(() => {
        Firebase.init();
        const truckLocationRef = Firebase.getRef('trucks', getData);
        truckLocationRef.on('value', snapshot => setTrucks(snapshot.val()));
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <Map userLocation={location} viewport={viewport} setViewport={setViewport} trucks={trucks}/>
        </div>
    );
};