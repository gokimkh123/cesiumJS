// client.js

Cesium.Ion.defaultAccessToken = '';


// Viewer 생성 시 애니메이션, 타임라인, 등 끄기
const viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,
    timeline: false,
    baseLayerPicker: false,
    terrain: Cesium.Terrain.fromWorldTerrain(),
});

viewer.scene.requestRenderMode = true;
viewer.scene.maximumRenderTimeChange = Infinity;


// 부산시청 하늘에서 바라보기
// fromDegrees(경도, 위도, 높이)
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(128.96639, 35.11424, 200),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
    }
});


// 모델 파일 경로 (본인의 .glb 파일 경로로 수정)
const modelPath = "./models/neon_city.glb"; // 실제 경로로 변경

// 모델을 Entity로 추가 (elementId 설정)
const buildingEntity = viewer.entities.add({
    id: "759074757", // elementId를 의미하는 고유 ID
    name: "My 3D Building",
    position: Cesium.Cartesian3.fromDegrees(128.96639, 35.11424, 100), // 건물 위치
    model: {
        uri: modelPath,
        scale: 1.0,
        minimumPixelSize: 80,
        maximumScale: 2000
    },
    description: `
        <h2>Building Name</h2>
        <p>This is a building displayed with CesiumJS.</p>
      `
});

Cesium.createOsmBuildingsAsync().then(function(buildings) {
    viewer.scene.primitives.add(buildings);
});

// 모델 클릭 시 건물에 대한 정보창 표시
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (movement) {
    const picked = viewer.scene.pick(movement.position);
    if (Cesium.defined(picked) && picked.id === buildingEntity) {
        viewer.selectedEntity = picked.id;
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);