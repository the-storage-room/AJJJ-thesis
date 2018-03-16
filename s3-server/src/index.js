import express from 'express';
import bodyParser from 'body-parser';
// import router from './router/index.js';
// import fileUpload from 'express-fileupload';

const app = express();

// app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api', router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`S3 server listening on port ${PORT}`));
