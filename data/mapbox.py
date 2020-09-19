import requests
import json

def create_get(lat_start, long_start, lat_end, long_end,access_token = "pk.eyJ1IjoibXJmM2xpeCIsImEiOiJjazN5czZzNG0xM2h1M2twNjdydDdkYWxxIn0.erELJKvEEqZev409Z01L3g"):
    get_str = f"https://api.mapbox.com/directions/v5/mapbox/driving/{lat_start}%2C{long_start}%3B{lat_end}%2C{long_end}?alternatives=false&geometries=geojson&steps=true&access_token={access_token}"
    return get_str

def mapbox_call(get_str):
    res = requests.get(get_str)
    if res.status_code == 200:
        res = json.loads(res._content)
        route = res['routes'][0]['geometry']['coordinates']
        duration = res['routes'][0]['duration']
        return  route, duration/60
    else:
        print(res.status_code, res.reason)
        return 0

def from_to(start_id, end_id):
    with open('data.json','r') as file:
        facilities = json.load(file)
    facilities = facilities['facilities']
    lat_start = facilities[start_id]['locationLat']
    long_start = facilities[start_id]['locationLog']
    lat_end = facilities[end_id]['locationLat']
    long_end = facilities[end_id]['locationLog']
    return mapbox_call(create_get(lat_start, long_start, lat_end, long_end))

def main():
    # route 0-3
    # route, duration = from_to(0, 3)
    # print(len(route), duration)
    # route 0-4
    # route, duration = from_to(0, 4)
    # print(len(route), duration)
    # route 1-5
    route, duration = from_to(1, 5)
    print(len(route), duration)
    # route 1-6
    route, duration = from_to(1, 6)
    print(len(route), duration)
    # route 2-7
    route, duration = from_to(2, 7)
    print(len(route), duration)
    # route 2-8
    route, duration = from_to(2, 8)
    print(len(route), duration)
    # route 2-9
    route, duration = from_to(2, 9)
    print(len(route), duration)
    return 0

if __name__ == '__main__':
    main()
