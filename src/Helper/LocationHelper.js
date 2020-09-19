export const getUserLocation = callback => {
    navigator.geolocation.getCurrentPosition(position => callback(position), null, { enableHighAccuracy: true });
};