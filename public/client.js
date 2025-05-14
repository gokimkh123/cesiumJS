// client.js

Cesium.Ion.defaultAccessToken = '';

// 'cesiumContainer'를 참조해 HTML 요소의 Cesium Viewer를 초기화한다.
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrain: Cesium.Terrain.fromWorldTerrain(),
});

// 부산시청 하늘에서 바라보기
// fromDegrees(경도, 위도, 높이)
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(128.96567277736, 35.113752878216, 400),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
    }
});

// Cesium OSM 3D 건물 추가하기
Cesium.createOsmBuildingsAsync().then(buildingTileset => {
    viewer.scene.primitives.add(buildingTileset);
});
