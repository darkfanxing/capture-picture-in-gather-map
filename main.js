// Reminding: Place the character in the center of the map if you want to capture picture that show all items in the Gather map

// userSettings:
// - scale: scale must equal or less than Manual Canvas Zoom on Gather
// - isBasedOnHeight: You can set image size base on "height" or "width"
//     - If you set "isHeight: true", it will change image height to {32 * userSettings.cellNumber.height * userSettings.cellNumber.scale}, and the image width change automatically
//     - If you set "isHeight: false", it will change image width to {32 * userSettings.cellNumber.width * userSettings.cellNumber.scale}, and the image height change automatically
// - cellNumber: store the gird size of Gather map

const userSettings = {
  scale: 4,
  isBasedOnHeight: true,
  cellNumber: {
    height: 58,
    width: 88
  }
}

const elementsId = [
  "canvas",
  "canvas-entities",
  "canvas-players",
  "canvas-foreground",
  "canvas-private-areas",
  "canvas-names"
]

const originalSize = {
  canvasHeight: document.getElementById("canvas").height,
  canvasWidth: document.getElementById("canvas").width,
  containerHeight: document.getElementById("canvas").style.height,
  containerWidth: document.getElementById("canvas").style.width,
}

function downloadImage() {
  time = new Date().toLocaleString("zh-tw", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });

  changeCanvasSize();

  setTimeout(() => {
    const sources = document.getElementsByTagName("canvas");
    const canvas = document.createElement("canvas");
    const { height, width } = document.getElementById("canvas");
    canvas.height = height;
    canvas.width = width;

    Promise.all(
      Array.from(sources).map((element) => {
        return new Promise(function (resolve, reject) {
          let image = new Image();
          image.src = element.toDataURL();
          image.addEventListener("load", (onImageLoadEvent) => {
            let imageData = onImageLoadEvent.target;
            let context = canvas.getContext("2d");
            context.drawImage(imageData, 0, 0);
            resolve();
          });
        });
      })
    ).then(() => {
      let link = document.createElement("a");
      link.download = `${document.title.slice(0, -9)} - ${time}.png`;
      link.href = canvas.toDataURL();
      link.click();
      recoverCanvasSize()
    })
  }, 1000)
}

function recoverCanvasSize() {
  elementsId.forEach((elementId) => {
    const element = document.getElementById(elementId);

    element.width = originalSize.canvasWidth;
    element.height = originalSize.canvasHeight;
    element.style.width = originalSize.containerWidth;
    element.style.height = originalSize.containerHeight;
  });
}

function changeCanvasSize() {
  elementsId.forEach((elementId) => {
    const element = document.getElementById(elementId);
    if (userSettings.isBasedOnHeight) {
      const height = userSettings.cellNumber.height * userSettings.scale * 32;
    
      const canvasRatio = element.width / element.height;
      element.width = height * canvasRatio;
      element.height = height;

      const containerRatio = parseInt(element.style.width) / parseInt(element.style.height);
      element.style.width = height * containerRatio;
      element.style.height = height;
    } else {
      const width = userSettings.cellNumber.width * userSettings.scale * 32;
    
      const canvasRatio = element.height / element.width;
      element.width = width;
      element.height = width * canvasRatio;

      const containerRatio = parseInt(element.style.height) / parseInt(element.style.width);
      element.style.width = width;
      element.style.height = width * containerRatio;
    }
  });
}

document.addEventListener("keydown", function (keydownEvent) {
  if (keydownEvent.code !== "KeyP") return;
  downloadImage();
})
