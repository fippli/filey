const { ipcRenderer, remote } = require("electron");

const Files = (function() {
  "use strict";

  const fileList = document.getElementById("file-list");

  const render = files => {
    fileList.innerHTML = "";
    files.forEach(file => {
      const elem = document.createElement("li");
      elem.innerHTML = file.name;
      fileList.appendChild(elem);
    });
  };

  return { render };
})();

const preventDefaults = (function() {
  "use strict";
  return function(event) {
    event.preventDefault();
    event.stopPropagation();
  };
})();

const handleFiles = (function() {
  "use strict";
  return function(files) {
    [...files].forEach(file => {
      ipcRenderer.send("FILE_UPLOAD", {
        path: file.path,
        name: file.name
      });
    });
  };
})();

const handleDrop = (function() {
  "use strict";
  return function(event) {
    handleFiles(event.dataTransfer.files);
  };
})();

const initializeDropzone = (function() {
  "use strict";
  const dropzone = document.getElementById("dropzone");

  ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropzone.addEventListener(eventName, preventDefaults, false);
  });

  dropzone.addEventListener("drop", handleDrop, false);
})();

const TitleMenu = (function() {
  "use strict";
  const closeButton = document.getElementById("close-button");

  closeButton.addEventListener("click", () => {
    remote.getCurrentWindow().close();
  });

  const minimizeButton = document.getElementById("minimize-button");

  minimizeButton.addEventListener("click", () => {
    remote.getCurrentWindow().minimize();
  });

  const maximizeButton = document.getElementById("maximize-button");

  maximizeButton.addEventListener("click", () => {
    var window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  });
})();

// Main
(function() {
  "use strict";

  initializeDropzone;
  TitleMenu;

  ipcRenderer.on("FILE_LIST_UPDATE", (event, files) => {
    Files.render(files);
  });

  ipcRenderer.send("GET_FILES");
})();
