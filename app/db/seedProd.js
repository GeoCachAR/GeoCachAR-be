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
        mapID: 102,
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
      }
})