const btnGetData = document.getElementById('btn-get-data');
const input = document.getElementById('input');
const containerData = document.getElementById('container-data');

btnGetData.addEventListener('click', () => {
    input.style.display = 'none';
    containerData.classList.add('show');
});