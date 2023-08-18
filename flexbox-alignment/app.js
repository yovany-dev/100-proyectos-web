const sidebarBtn = document.querySelectorAll('.sidebar__btn');
sidebarBtn.forEach((element, i) => {
    element.addEventListener('click', () => {
        const sidebarCollection = document.querySelectorAll('.sidebar__collection');
        element.classList.toggle('open');

        let height = 0;
        let opacity = 0;
        
        if (sidebarCollection[i].clientHeight === 0) {
            height = sidebarCollection[i].scrollHeight;
            opacity = 1;
        }

        sidebarCollection[i].style.height = height+'px';
        sidebarCollection[i].style.opacity = opacity;
    });
});

const flexContainer = document.getElementById('flex-container');
const style = (property, value) => {
    flexContainer.style[property] = value;
}

const buttons = document.querySelectorAll('.sidebar__button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const property = button.getAttribute('property');
        const value = button.textContent;

        // Reset styles
        if (property == 'display' && button.matches('.clicked')) {
            flexContainer.removeAttribute('style');
            buttons.forEach(e => e.classList.remove('clicked'))

        } else if (property == 'display') {
            style(property, value);
            buttons[0].classList.add('clicked');
            buttons[1].classList.add('clicked');
        }

        if (buttons[0].matches('.clicked') && button !== buttons[0]) {            
            if (property == 'flex-direction') {
                const flexDirection = document.querySelectorAll('button[property=flex-direction]');

                for (const element of flexDirection) {
                    if (element.matches('.clicked') && element != button) {
                        element.classList.remove('clicked');
                    }
                }
            }
            if (property == 'justify-content') {
                const justifyContent = document.querySelectorAll('button[property=justify-content]');

                for (const element of justifyContent) {
                    if (element.matches('.clicked') && element != button) {
                        element.classList.remove('clicked');
                    } 
                }
            }
            if (property == 'align-items') {
                const alignItems = document.querySelectorAll('button[property=align-items]');

                for (const element of alignItems) {
                    if (element.matches('.clicked') && element != button) {
                        element.classList.remove('clicked');
                    } 
                }
            }
            button.classList.add('clicked');
            style(property, value);
        }
    });
})