"use strict";
const h2s = document.querySelectorAll('h2');
if (h2s) {
    h2s.forEach(h2 => {
        h2.addEventListener('click', (e) => {
            const target = e.target;
            const icon = target.firstElementChild;
            const content = target.nextElementSibling;
            content.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-right');
            icon.classList.toggle('fa-chevron-down');
        });
    });
}
