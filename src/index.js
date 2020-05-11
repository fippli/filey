const { ipcMain } = require("electron");
const express = require("express");
const app = express();

let files = [];

const fileUpload = (event, file) => {
  // Append the filepath to the list with files
  files = [...files, file];
  event.reply("FILE_LIST_UPDATE", files);
};

const fileListUpdate = event => {
  event.reply("FILE_LIST_UPDATE", files);
};

const eventTypes = [
  { name: "FILE_UPLOAD", func: fileUpload },
  { name: "FILE_LIST_UPDATE", func: fileListUpdate }
];

eventTypes.forEach(({ name, func }) => {
  ipcMain.on(name, func);
});

app.get("/:filename", (req, res) => {
  const [file] = files.filter(f => f.name === req.params.filename);
  // Set headers
  res.set({
    "Access-Control-Allow-Origin": "*"
  });
  res.sendFile(file.path);
});

app.listen(4567, () => {
  console.log("Filey");
});
