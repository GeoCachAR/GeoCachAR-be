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
    maps: {map1:{
        location: {latitude: 0, longitude: 0, latDelta: 0, longDelta: 0, radius: 0},
        waypoints: {
            1:{
            title: 'The Best Treasure Hunt',
            description: "Our first hunt",
            Latitude: 0, Longitude: 0,
        }}}},
})