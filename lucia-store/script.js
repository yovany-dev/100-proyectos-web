const btnSidebar = document.querySelectorAll('.collection-sidebar__btn');
const collectionSidebar = document.querySelectorAll('.collection-sidebar__ul');

btnSidebar.forEach((element, i) => {
    element.addEventListener('click', () => {
        element.classList.toggle('active');

        let height = 0;
        let opacity = 0;
        
        if (collectionSidebar[i].clientHeight === 0) {
            height = collectionSidebar[i].scrollHeight;
            opacity = 1;
        }

        collectionSidebar[i].style.height = height+'px';
        collectionSidebar[i].style.opacity = opacity;
    });
})

const collectionSidebarItem = document.querySelectorAll('.collection-sidebar__li');
collectionSidebarItem.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('active');
    });
});



const footerTitle = document.querySelectorAll('.footer__title');

footerTitle.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('active');
    });
});