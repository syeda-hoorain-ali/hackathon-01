"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_js_1 = require("./firebase.js");
const container = document.querySelector('.container');
window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uniqueID = urlParams.get('id');
    if (uniqueID) {
        container.innerHTML = await (0, firebase_js_1.getResume)(uniqueID);
    }
    else {
        container.innerHTML = "<h1>Page Not Found</h1>";
    }
});
