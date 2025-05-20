# Visualize a Proposed Building in a 3D City


# Step 1: Identify the new building area

1. Download the GeoJSON file.
2. Drage and drop the GeoJSON file in your [Cesium ion dashboard](https://ion.cesium.com/).
3. Press Upload.
![5](pic/5.png)
![6](pic/6.png)


# Step 2: Afte Uploading, note the asset ID

![7](pic/7.png)

Replace **your_asset_id** with your asset ID.

```js
async function addBuildingGeoJSON() {
  const geoJSONURL = await Cesium.IonResource.fromAssetId(your_asset_id);
  const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, { 
								clampToGround: true });
  const dataSource = await viewer.dataSources.add(geoJSON);
  
  for (const entity of dataSource.entities.values) {
    entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
  }
  viewer.flyTo(dataSource);
}

addBuildingGeoJSON();
    Cesium.createOsmBuildingsAsync().then(function(buildings) {
      viewer.scene.primitives.add(buildings);
    });
    
```
![8](pic/8.png)


# Step 3: Upload and position the new building

1. [Download this glTF model](https://cesium.com/public/learn/PSFS.glb).
2. Drag and drop it in your [Cesium ion dashboard](https://ion.cesium.com/).
3. Select **3D Model (tile as 3D Tiles)** and press **Upload**.
4. After it’s done tiling, click the **Adjust Tileset Location** button at the top of the asset preview window.
![9](pic/9.png)


5. Search input -> 1250 Cherokee Stree -> click Next
6. Position ->
			- **Longitude**: -104.9909
			- **Latitude**: 39.73579
			- **Height**: 1577
			- **Heading**: -8
7.  Press **Save**
![10](pic/10.png)


# Step 4: Add the new building to the scene

1. Get the asset ID
2. Replace your_asset_id with your asset ID.

```js
async function newBuildingTileset(){
	const newBuildingTileset = 
	await Cesium.Cesium3DTileset.fromIonAssetId(your_asset_id);
	viewer.scene.primitives.add(newBuildingTileset);
	viewer.flyTo(newBuildingTileset);

}
    
newBuildingTileset();
```
![11](pic/11.png)
