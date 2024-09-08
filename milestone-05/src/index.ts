import { getResume } from "./firebase.js";

const container = document.querySelector('.container') as HTMLDivElement;

window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uniqueID = urlParams.get('id');

    if (uniqueID) {
        container.innerHTML = await getResume(uniqueID)
    } else {
        container.innerHTML = "<h1>Page Not Found</h1>"
    }
})
