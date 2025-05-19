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
