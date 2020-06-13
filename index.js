const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
