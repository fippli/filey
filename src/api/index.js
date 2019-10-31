const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const multer = require('multer');
const upload = multer({ dest: path.resolve(__dirname, '../files/') });

const filesPath = path.resolve(__dirname, '../files');

const api = (app) => {
  app.get('/', (req, res) => {
    //Send page with file upload option
    res.sendFile(path.resolve(__dirname, '../templates/fileUpload.html'));
  })

  app.get('/file/:filename', (req, res) => {
    res.sendFile(path.resolve(filesPath, req.params.filename));
  })

  app.post('/file', upload.single('file'), (req, res) => {

    const { file } = req;

    fs.renameSync(
      path.resolve(filesPath, file.filename),
      path.resolve(filesPath, file.originalname)
    );

    const files = fs.readdirSync(filesPath);
    res.send(files);
  });

  app.get('/list', (req, res) => {
    const files = fs.readdirSync(filesPath);
    res.send(files);
  })
};

module.exports = api;