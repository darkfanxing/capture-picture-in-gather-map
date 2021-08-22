# capture-picture-in-gather-map
## How to use
1. Open Gather map page
2. Open Developer Tools
3. Copy and paste code in `main.js` to Console in Developer Tools. You can change the parameters of variable `userSettings`:
    - `scale`: scale must equal or less than Manual Canvas Zoom on Gather
    - `isBasedOnHeight`: set image size base on "height" or "width"
        - If you set "isHeight: true", it will change image height to {32 * userSettings.cellNumber.height * userSettings.cellNumber.scale}, and the image width change automatically
        - If you set "isHeight: false", it will change image width to {32 * userSettings.cellNumber.width * userSettings.cellNumber.scale}, and the image height change automatically
    - `cellNumber`: store the gird size of Gather map
4. Capture picture by clicking `P` on Gather map page
