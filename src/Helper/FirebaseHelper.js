import * as firebase from 'firebase';

export const init = () => {
    if (firebase.apps.length !== 0) return;
    const config = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: 'hackzurich-b6eb5.firebaseapp.com',
        databaseURL: 'https://hackzurich-b6eb5.firebaseio.com',
        projectId: 'hackzurich-b6eb5',
        storageBucket: 'hackzurich-b6eb5.appspot.com',
        messagingSenderId: '259074836390',
        appId: '1:259074836390:web:51db27d87c3232c0c03167',
        measurementId: 'G-X6B2VR58T7'
    };

    firebase.initializeApp(config);
};

export const getRef = refName => {
    return firebase.database().ref(refName);
};