function isEmpty(input) {
    return input.value.trim('') === '';
}

function isValidEmail(input) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(input.value);
}

function isValidCountryCode(input) {
    return /^[A-Z]{2}$/.test(input.value);
}

function isValidZipCode(input) {
    return /^\d{5}(-\d{4})?$/.test(input.value);
}

function validate(input) {
    // Access input' error mesage section.
    const errorMessage = input.nextElementSibling;

    // Check if input is empty.
    if (isEmpty(input)) {
        errorMessage.textContent = 'Input is missing!';
    } else {
        errorMessage.textContent = '';
    }

    switch (input.id) {
        case 'email':
            errorMessage.textContent = isValidEmail(input) ? '' : 'Input a valid email address!';
            break;

        case 'country-code':
            errorMessage.textContent = isValidCountryCode(input) ? '' : 'Input a valid country code!';
            break;

        case 'zip-code':
            errorMessage.textContent = isValidZipCode(input) ? '' : 'Input a valid zip code!';
            break;

        default:
            break;
    }
}

function addValidation(form) {
    // Get all referece to the input
    const inputs = document.querySelectorAll('input');
}
addValidation(document.querySelector('form'));
