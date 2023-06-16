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
        arUrl: "",
        waypoints: [
          {
            title: 'clue one',
            description: '',
            latitude: 0,
            longitude: 0,
            code: 839,
          },
          {
            title: 'clue two',
            description: '',
            latitude: 0,
            longitude: 0,
            code: 934,
          },
        ],
        location: {
          latitude: 0,
          longitude: 0,
          latDelta: 0,
          lonDelta: 0,
        },
      },
      100: {
        mapName: 'Geo Map',
        mapLocation: 'London ',
        arUrl: "",
        waypoints: [
          {
            title: 'clue one',
            description: '',
            latitude: 0,
            longitude: 0,
            code: 123,
          },
          {
            title: 'clue two',
            description: '',
            latitude: 0,
            longitude: 0,
            code: 321,
          },
        ],
        location: {
          latitude: 0,
          longitude: 0,
          latDelta: 0,
          lonDelta: 0,

        },
      },
      103: {
        mapName: 'NW London Hunt',
        mapLocation: 'London ',
        arUrl: "https://geocachar.netlify.app/map-hmtl/jay-map.html",
        waypoints: [
          {
            title: 'Clue 1',
            description: 'Sway',
            latitude: 51.55201314381003,
            longitude: -0.19604067517332155,
            code: '248',
          },
          {
            title: 'Clue 2',
            description: 'Pause thorny flower',
            latitude: 51.55169602340144,
            longitude: -0.19228935889455837,
            code: '671',
          },
          {
            title: 'Clue 3',
            description: 'Dark big cat...',
            latitude: 51.5514008942535,
            longitude: -0.19194621751619295,
            code: '085',
          },
          {
            title: 'Clue 4',
            description: 'Beautiful moon...',
            latitude: 51.550573558905796,
            longitude: -0.19132867241574616,
            code: '952',
          },
          {
            title: 'Clue 5',
            description: 'Speedy head covering...',
            latitude: 51.549614673429176,
            longitude: -0.19144087592788794,
            code: '763',
          },
          {
            title: 'Clue 6',
            description: 'Weird baskets...',
            latitude: 51.548992543956835,
            longitude: -0.19125714460520324,
            code: '114',
          },
          {
            title: 'Clue 7',
            description: 'Skint boy...',
            latitude: 51.548646005177936,
            longitude: -0.19110971595580925,
            code: '043',
          },
          {
            title: 'Clue 8',
            description: 'Little Mermaid St...',
            latitude: 51.547957765828116,
            longitude: -0.19803297064039374,
            code: '366',
          },
          {
            title: 'Clue 9',
            description: 'Hold me to your ear to hear the sea...',
            latitude: 51.54675346598928,
            longitude: -0.20355016454798844,
            code: '784',
          },
          {
            title: 'Clue 10',
            description: 'Fiery demise stopping place...',
            latitude: 51.54681851797777,
            longitude: -0.20398334128926074,
            code: '490',
          }
        ],
        location: {
          latitude: 51.549657793651335,
          longitude: -0.19767465976955112,
          latDelta: 0.005,
          lonDelta: 0.005,
        },
      }
    },
    
})

