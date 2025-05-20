
# [Tutorial](DSL/NIA/빛공해과제정리)
visualize a real flight from Busan to Seoul, with radar data collected by [FlightRadar24](https://cesium.com/blog/2020/08/13/flightradar24/).


# setp 1: Set up

1. [Create a new Glitch project](https://glitch.com/edit/#!/remix/cesium-template)
2. your_token_here -> Replace **your access token**
3. PREVIEW click and select Close preview pane || Preview in a new window

![1](pic/1.png)

```javascript
// index.html


// import CesiumJS library.
<script src="https://cesium.com/downloads/cesiumjs/releases/1.129/Build/Cesium/Cesium.js"></script>
<link href="https://cesium.com/downloads/cesiumjs/releases/1.129/Build/Cesium/Widgets/widgets.css" rel="stylesheet">


// HTML container for the scene
<div id="cesiumContainer"></div>

<script>
Cesium.Ion.defaultAccessToken = 'Your API Token'
// Initializes the viewer
const viewer = new Cesium.Viewer('cesiumContainer');
</script>
```

## Configure auto-refresh
![2](pic/2.png)
check Toggle auto refresh 

# Step 2: Add global 3D buildings and terrain

- [Cesium World Terrain](https://cesium.com/platform/cesium-ion/content/cesium-world-terrain/)—high-resolution terrain with up to 1 m accuracy.
- [Cesium OSM Buildings](https://cesium.com/platform/cesium-ion/content/cesium-osm-buildings/)—over 350 million buildings derived from OpenStreetMap data.
- [Bing Maps Aerial imagery](https://cesium.com/platform/cesium-ion/content/bing-maps-imagery/)—global satellite imagery with up to 15 cm resolution.


```javascript
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrain: Cesium.Terrain.fromWorldTerrain(),
});

// 동아대학교 승학캠퍼스
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(128.96639, 35.11424, 200),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
    }
});

/*
1. (async function())
2. promise chaining
*/
Cesium.createOsmBuildingsAsync().then(function(buildings) {
    viewer.scene.primitives.add(buildings);
});
```

![3](pic/3.png)


# Step 3: Visualize individual samples

1. to visualize a single point in yout scene
2.  Click on the red point to see the description. and exact position  or time 

```js
const dataPoint = { longitude: 128.96639, latitude: 35.11424, height: 200 };

const pointEntity = viewer.entities.add({
	description: `First data point at (${dataPoint.longitude}, 
	${dataPoint.latitude})`,

	position: Cesium.Cartesian3.fromDegrees(dataPoint.longitude, 
	dataPoint.latitude, dataPoint.height),
  
	point: { pixelSize: 10, color: Cesium.Color.RED }
});
viewer.flyTo(pointEntity);
```

![4](pic/4.png)