const maps = ["one", "two", "three"];
export default maps.map((mapName, index) => {
  return {
    mapID: index,
    waypoints: {
      title: mapName,
      description: "",
      Latitude: 0,
      Longtitude: 0,
    },
    location: {
      Latitude: 0,
      Longtitude: 0,
      LatDelta: 0,
      LonDelta: 0,
      radius: 100,
    },
  };
});
