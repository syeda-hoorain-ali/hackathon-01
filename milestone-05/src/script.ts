const h2s = document.querySelectorAll('h2') as NodeListOf<HTMLHeadingElement>;

if (h2s) {
    h2s.forEach(h2 => {
        h2.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
    
            const icon = target.firstElementChild as HTMLElement;
            const content = target.nextElementSibling as HTMLDivElement;
    
            content.classList.toggle('hidden')
            icon.classList.toggle('fa-chevron-right')
            icon.classList.toggle('fa-chevron-down')
        });
    });
}
