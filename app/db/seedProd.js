import {ref, set} from 'firebase/database'
import db from './connection.js'

set(ref(db), {
    users: {
        '8Y3o27XpIAfLeOayWqqd3zC4ec83': {
        name: 'The Developing Devs',
        email: 'thedevelopingdevs@gmail.com',
        location: {latitude: 0, longitude: 0},
        avatar_image: "https://static.wikia.nocookie.net/f95601b6-3961-4dc4-9072-6d7d4e34a76e/scale-to-width/755",
        starred_maps: '',
        current_maps: '',
        maps_completed: '',
        referred: 5,
        modified: Date.now(),
        active: true,
        created_at: Date.now(),
    }},
    maps: {
      102: {
        mapName: 'Tom Map',
        mapLocation: 'Braunton',
        waypoints: [
          {
            title: 'clue one',
            description: '',
            Latitude: 0,
            Longtitude: 0,
          },
          {
            title: 'clue two',
            description: '',
            Latitude: 0,
            Longtitude: 0,
          },
        ],
        location: {
          Latitude: 0,
          Longtitude: 0,
          LatDelta: 0,
          LonDelta: 0,
          radius: 100,
        },
      },
      100: {
        mapName: 'Geo Map',
        mapLocation: 'London ',
        waypoints: [
          {
            title: 'clue one',
            description: '',
            Latitude: 0,
            Longtitude: 0,
          },
          {
            title: 'clue two',
            description: '',
            Latitude: 0,
            Longtitude: 0,
          },
        ],
        location: {
          Latitude: 0,
          Longtitude: 0,
          LatDelta: 0,
          LonDelta: 0,
          radius: 100,
        },
      },
      101: {
        mapName: 'Jay Map',
        mapLocation: 'London ',
        waypoints: [
          {
            title: 'clue one',
            description: '',
            Latitude: 0,
            Longtitude: 0,
          },
          {
            title: 'clue two',
            description: '',
            Latitude: 0,
            Longtitude: 0,
          },
        ],
        location: {
          Latitude: 0,
          Longtitude: 0,
          LatDelta: 0,
          LonDelta: 0,
          radius: 100,
        },
      }, 103: {
        mapName: 'NW London Hunt',
        mapLocation: 'London ',
        waypoints: [
          {
            title: 'Clue 1',
            description: 'Sway',
            Latitude: 51.55201314381003,
            Longtitude: -0.19604067517332155,
          },
          {
            title: 'Clue 2',
            description: 'Pause thorny flower',
            Latitude: 51.55169602340144,
            Longtitude: -0.19228935889455837,
          },
          {
            title: 'Clue 3',
            description: 'Dark big cat...',
            Latitude: 51.5514008942535,
            Longtitude: -0.19194621751619295,
          },
          {
            title: 'Clue 4',
            description: 'Beautiful moon...',
            Latitude: 51.550573558905796,
            Longtitude: -0.19132867241574616,
          },
          {
            title: 'Clue 5',
            description: 'Speedy head covering...',
            Latitude: 51.549614673429176,
            Longtitude: -0.19144087592788794,
          },
          {
            title: 'Clue 6',
            description: 'Weird baskets...',
            Latitude: 51.548992543956835,
            Longtitude: -0.19125714460520324,
          },
          {
            title: 'Clue 7',
            description: 'Skint boy...',
            Latitude: 51.548646005177936,
            Longtitude: -0.19110971595580925,
          },
          {
            title: 'Clue 8',
            description: 'Little Mermaid St...',
            Latitude: 51.547957765828116,
            Longtitude: -0.19803297064039374,
          },
          {
            title: 'Clue 9',
            description: 'Hold me to your ear to hear the sea...',
            Latitude: 51.54675346598928,
            Longtitude: -0.20355016454798844,
          },
          {
            title: 'Clue 10',
            description: 'Fiery demise stopping place...',
            Latitude: 51.54681851797777,
            Longtitude: -0.20398334128926074,
          }
        ],
        location: {
          Latitude: 51.549657793651335,
          Longtitude: -0.19767465976955112,
          LatDelta: 0.005,
          LonDelta: 0.005,
          radius: 100,
        },
      }
    },
    
})

