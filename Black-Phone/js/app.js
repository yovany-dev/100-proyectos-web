let data = null;

const getData = async (phoneNumber) => {
    const accessKey = 'f203707bea0c364309fdc62e62b60845';
    const url = 'http://apilayer.net/api/validate?access_key=' + accessKey + '&number=' + phoneNumber;

    const response = await fetch(url);
    data = await response.json();
    return data.valid;
}

const showOrhideElement = () => {
    const containerInput = document.getElementById('container-input');
    const containerData = document.getElementById('container-data');

    containerInput.classList.toggle('hide');
    containerData.classList.toggle('show');
}

const printData = () => {
    const content = `
        <li>Número: <b>${data.number}</b></li>
        <li>Formato local: <b>${data.local_format}</b></li>
        <li>Formato Internacional: <b>${data.international_format}</b></li>
        <li>Prefijo del país: <b>${data.country_prefix}</b></li>
        <li>Código de país: <b>${data.country_code}</b></li>
        <li>Nombre del país: <b>${data.country_name}</b></li>
        <li>Ubicación: <b>${data.location}</b></li>
        <li>Operador de telefonía móvil: <b>${data.carrier}</b></li>
        <li>Tipo de línea: <b>${data.line_type}</b></li>
    `;
    const list = document.getElementById('list');
    list.innerHTML = content;

    showOrhideElement();
}

const printErrorMessage = (msg) => {
    const messageError = document.getElementById('message-error');
    messageError.textContent = msg;

    setTimeout(() => {
        messageError.textContent = '';
    }, 3000);
}

const validateNumber = (number) => {
    return new Promise(resolve => {
        getData(number)
        .then(valid => {
            if (valid) {
                resolve(valid);
            } else {
                printErrorMessage('Número inválido');
            }
        });
    })
}

const validNumberFormat = (str) => {
    let number = str.split(' ').join('')
    let symbols = /[+()]/g;
    
    return number.replace(symbols, '');
}

const validateInput = () => {
    return new Promise(resolve => {        
        let inputValue = document.getElementById('input').value;
        inputValue = validNumberFormat(inputValue);

        if (inputValue.length === 0) {
            printErrorMessage('No deje el campo vacío');
        } else if (Number(inputValue)) {
            const phoneNumber = Number(inputValue);
            resolve(phoneNumber);
        } else {
            printErrorMessage('Ingrese solo numeros');
        }
    })
}

const btnOtherNumber = document.getElementById('btn-other-number');
btnOtherNumber.addEventListener('click', () => {
    showOrhideElement();
});

const btnGetData = document.getElementById('btn-get-data');
btnGetData.addEventListener('click', () => {
    validateInput()
    .then(number => {
        if (number) {
            return validateNumber(number);
        }
    })
    .then(valid => {
        if (valid) {
            printData();
        }
    });
});