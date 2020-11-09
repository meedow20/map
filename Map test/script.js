const cities = [
    ['Nashville, TN', 36.17, -86.78],
    ['New York, NY', 40.71, -74.00],
    ['Atlanta, GA', 33.75, -84.39],
    ['Denver, CO', 39.74, -104.98],
    ['Seattle, WA', 47.61, -122.33],
    ['Los Angeles, CA', 34.05, -118.24],
    ['Memphis, TN', 35.15, -90.05]
];

function Map(citiesArray) {

    this.abbreviationsState = () => {
        const states = {}
        for (let i = 0; i < citiesArray.length; i++){
             const state = citiesArray[i][0].split(', ')[1]
             states[state] = true;
        }
        return Object.keys(states);
    }

    this.getNearestTown = (longitude, latitude) => {
       let nearestTown;
       let shortestDistance = null;
       for (let i = 0; i < citiesArray.length; i++) {
          const currentCity = citiesArray[i];
          const townDistance = getDistanceFromLonLatInKm(longitude, latitude, currentCity[1], currentCity[2]);
          if (shortestDistance === null || townDistance < shortestDistance) {
              shortestDistance = townDistance;
              nearestTown = currentCity[0];
          }
       }
       return nearestTown;
    }

    this.getExtremeCities = () => {
        const northernmostPoint = [90, 0];
        const southernmostPoint = [-90, 0];
        const westernmostPoint = [0, 180];
        const easternmostPoint = [0, -180];
        const extremeCities = {
            north: {
                city: null,
                distance: null
            },
            south: {
                city: null,
                distance: null
            },
            west: {
                city: null,
                distance: null
            },
            east: {
                city: null,
                distance: null
            }
        }

        for (let i = 0; i < citiesArray.length; i++) {
            const currentCity = citiesArray[i];

            const northDistance = getDistanceFromLonLatInKm(northernmostPoint[0],northernmostPoint[1],currentCity[1],currentCity[2])

            if (extremeCities.north.distance === null || northDistance < extremeCities.north.distance) {
                extremeCities.north.city = currentCity;
                extremeCities.north.distance = northDistance
            }

            const southDistance = getDistanceFromLonLatInKm(southernmostPoint[0],southernmostPoint[1],currentCity[1],currentCity[2])

            if (extremeCities.south.distance === null || southDistance < extremeCities.south.distance) {
                extremeCities.south.city = currentCity;
                extremeCities.south.distance = southDistance
            }

            const westDistance = getDistanceFromLonLatInKm(westernmostPoint[0],westernmostPoint[1],currentCity[1],currentCity[2])

            if (extremeCities.west.distance === null || westDistance < extremeCities.west.distance) {
                extremeCities.west.city = currentCity;
                extremeCities.west.distance = westDistance
            }

            const eastDistance = getDistanceFromLonLatInKm(easternmostPoint[0],easternmostPoint[1],currentCity[1],currentCity[2])

            if (extremeCities.east.distance === null || eastDistance < extremeCities.east.distance) {
                extremeCities.east.city = currentCity;
                extremeCities.east.distance = eastDistance
            }
        }

        return {
            north: extremeCities.north.city[0],
            south: extremeCities.south.city[0],
            west: extremeCities.west.city[0],
            east: extremeCities.east.city[0]
        }
    }

    const getDistanceFromLonLatInKm = (firstLongitude, firstLatitude, secondLongitude, secondLatitude) => {
        const earthRadius = 6371;
        const longitudeDifference = convertDegreeToRadian(secondLongitude - firstLongitude);
        const latitudeDifference = convertDegreeToRadian(secondLatitude - firstLatitude);
        let centralAngle =
            Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
            Math.cos(convertDegreeToRadian(firstLatitude)) * Math.cos(convertDegreeToRadian(secondLatitude)) *
            Math.sin(longitudeDifference / 2) * Math.sin(longitudeDifference / 2)
        ;
        let line = 2 * Math.atan2(Math.sqrt(centralAngle), Math.sqrt(1 - centralAngle));
        const distance = earthRadius * line;
        return distance;
    }

    const convertDegreeToRadian = (degree) => {
        return degree * (Math.PI / 180)
    }
}

let map = new Map(cities);

//1
const extremeCities = map.getExtremeCities();
document.write('The most north city: ' + extremeCities.north);
document.write('<br> The most south city: ' + extremeCities.south);
document.write('<br> The most west city: ' + extremeCities.west);
document.write('<br> The most east city: ' + extremeCities.east);
//2
document.write('<br> Nearest town: '+ map.getNearestTown(40.71, -74.00));
//3
document.write('<br> Unique states: ' + map.abbreviationsState().join(' '));
