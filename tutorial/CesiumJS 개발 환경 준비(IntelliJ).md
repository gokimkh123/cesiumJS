#  CesiumJS IntelliJ기준 개발환경 준비


CesiumJS은 두 가지 방식이 있다.
1. CDN
   온라인 사용(인터넷 필수)
   HTML 태그에서 자주 사용한다. 
   빠르게 테스트 하거나 프로토타입을 만들 떄 사용
2. NPM
   오프라인 사용 및 온라인 사용(인터넷 필 수 X)
   규모있는 프로젝트에서 체계적으로 의존성을 관리할 때

## CDN
기본적으로 HTML과 server가 있어야한다.

```html
<!--index.html-->
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="utf-8">  
    <!-- CesiumJS JavaScript, CSS 포함하기 -->  
    <script src="https://cesium.com/downloads/cesiumjs/releases/1.116/Build/Cesium/Cesium.js"></script>  
    <link href="https://cesium.com/downloads/cesiumjs/releases/1.116/Build/Cesium/Widgets/widgets.css" rel="stylesheet">  
</head>  
<body>  
<div id="cesiumContainer"></div>  
<script src="./client.js"></script>  
</body>  
</html>
```

```js
// server.js  
const express = require('express');  
const path = require('path');  
const app = express();  
const port = 3000;  
  
// 'public' 폴더에서 정적 파일 제공  
app.use(express.static(path.join(__dirname, 'public')));  
  
// 'models' 풀더에서 정적 파일 제공  
app.use('/models', express.static(path.join(__dirname, 'models')));  
  
app.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  
});  
  
app.listen(port, () => {  
    console.log(`Server is running at http://localhost:${port}`);   
});
```


## NPM

```
npm install cesium
```

기본적인 module을 다운 받고 import를 통해 사용
server는 CDN에서 한 것 처럼 똑같이 사용

```javascript

// The URL on your server where CesiumJS's static files are hosted. 

window.CESIUM_BASE_URL = '/'; 

import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium'; 
import "cesium/Build/Cesium/Widgets/widgets.css"; 

// Your access token can be found at: https://ion.cesium.com/tokens. 
// Replace `your_access_token` with your Cesium ion access token. 

Ion.defaultAccessToken = 'your_access_token'; 
```

CESIUM_BASE URL
- `node_modules/cesium/Build/Cesium/Workers`
- `node_modules/cesium/Build/Cesium/ThirdParty`
- `node_modules/cesium/Build/Cesium/Assets`
- `node_modules/cesium/Build/Cesium/Widgets`

```javascript
window.CESIUM_BASE_URL = '/'; 
```


if the image at ` Assets/Images/cesium_credit.png ` is served with `static/Cesium`
then you would set the base URL as follows:
```javascript
window.CESIUM_BASE_URL = '/static/Cesium/'; 
```


## Tokens

[Cesium ion](https://ion.cesium.com/tokens?page=1)사이트에서 Access Tokens을 발급 받고 새로운 Js풀더를 만든 후 개발을 시작한다.
