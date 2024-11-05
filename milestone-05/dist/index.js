"use strict";
const body = document.body;
const cursor = document.querySelector('.cursor');
const animationSection = document.querySelector('.animation');
const buttons = document.querySelectorAll('.button');
const startAnimation = () => {
    let tags = '';
    const delay = [1, 12, 8, 6, 4, 18, 5, 23, 11, 14, 22, 3, 27, 21, 15, 16, 2, 22, 7, 21, 10, 20];
    for (let i = 0; i < 10; i++) {
        tags += delay.map(n => `<i style="--i:${n};"></i>`).join('');
    }
    animationSection.innerHTML = tags;
};
const cuteCursor = (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = (e.clientX - 2) + 'px';
    cursor.hidden = false;
    buttons.forEach(button => {
        const crs = cursor.getBoundingClientRect();
        const btn = button.getBoundingClientRect();
        if ((crs.top <= btn.bottom) &&
            (crs.bottom >= btn.top) &&
            (crs.left <= btn.right) &&
            (crs.right >= btn.left)) {
            cursor.hidden = true;
        }
    });
};
const animatedClick = (e) => {
    const spark = document.createElement('div');
    spark.classList.add('spark');
    body.appendChild(spark);
    spark.style.top = (e.clientY - body.offsetTop) + 'px';
    spark.style.left = (e.clientX - body.offsetLeft) + 'px';
    spark.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
    for (let i = 0; i <= 7; i++) {
        const span = document.createElement('span');
        span.style.transform = `rotate(${i * 45}deg)`;
        spark.appendChild(span);
    }
    setTimeout(() => spark.remove(), 1000);
};
const hoverEffect = (button) => {
    const text = button.textContent || '';
    button.innerHTML = '';
    for (const char of text) {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        button.appendChild(span);
    }
    const spans = button.querySelectorAll('span');
    button.addEventListener('mouseenter', () => {
        spans.forEach((span, index) => {
            setTimeout(() => span.classList.add('hover'), index * 50);
        });
    });
    button.addEventListener('mouseleave', () => {
        spans.forEach((span, index) => {
            setTimeout(() => span.classList.remove('hover'), index * 50);
        });
    });
};
startAnimation();
setTimeout(() => animationSection.style.opacity = '0', 3000);
setTimeout(() => animationSection.innerHTML = '', 6000);
document.addEventListener('mousemove', cuteCursor);
document.addEventListener('click', animatedClick);
buttons.forEach(button => hoverEffect(button));
