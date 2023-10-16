function isEmpty(input) {
    return input.value.trim('') === '';
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
}

function addValidation(form) {
    // Get all referece to the input
    const inputs = document.querySelectorAll('input');
}
addValidation(document.querySelector('form'));
