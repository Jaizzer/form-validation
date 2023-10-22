class Input {
    constructor(input) {
        this.input = input;
        this.errorMessage = 'Input is missing!';
        this.passwordPartner = '';
        this.errorMessageContainer = input.nextElementSibling;
        this.isValid = false;
    }

    isEmpty() {
        return this.input.value.trim('') === '';
    }

    isValidEmail() {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.input.value);
    }

    isValidCountryCode() {
        return /^[A-Z]{2}$/.test(this.input.value);
    }

    isValidZipCode() {
        return /^\d{5}(-\d{4})?$/.test(this.input.value);
    }

    displayError(errorMessage) {
        this.errorMessageContainer.textContent = errorMessage;
    }

    validate() {
        // Check if input is empty.
        if (this.isEmpty(this.input)) {
            this.errorMessage = 'Input is missing!';
        } else {
            switch (this.input.id) {
                case 'email':
                    if (this.isValidEmail(this.input)) {
                        this.errorMessage = '';
                        this.isValid = true;
                    } else {
                        this.errorMessage = 'Input a valid email address!';
                    }
                    break;

                case 'country-code':
                    if (this.isValidCountryCode(this.input)) {
                        this.errorMessage = '';
                        this.isValid = true;
                    } else {
                        this.errorMessage = 'Input a valid country code!';
                    }
                    break;

                case 'zip-code':
                    if (this.isValidZipCode(this.input)) {
                        this.errorMessage = '';
                        this.isValid = true;
                    } else {
                        this.errorMessage = 'Input a valid zip code!';
                    }
                    break;

                case 'password':
                    this.errorMessage = '';
                    if (
                        this.input.value === this.passwordPartner.input.value &&
                        this.passwordPartner.input.value !== ''
                    ) {
                        this.passwordPartner.displayError('');
                        this.isValid = true;
                    } else if (
                        this.input.value !== this.passwordPartner.input.value &&
                        this.passwordPartner.input.value !== ''
                    ) {
                        this.passwordPartner.displayError('Passwords do not match');
                    }
                    break;

                case 'confirm-password':
                    if (
                        this.input.value === this.passwordPartner.input.value &&
                        this.passwordPartner.input.value !== ''
                    ) {
                        this.errorMessage = '';
                        this.isValid = true;
                    } else if (
                        this.input.value !== this.passwordPartner.input.value &&
                        this.passwordPartner.input.value !== ''
                    ) {
                        this.errorMessage = 'Passwords do not match';
                    }
                    break;

                default:
                    this.errorMessage = '';
            }
        }
        this.displayError(this.errorMessage);
    }
}

function addValidation(form) {
    // Get all referece to the input and put them into 'Input' objects.
    const inputs = [...form.querySelectorAll('input')].map((input) => new Input(input));

    const passWordInput = inputs.find((element) => element.input.id === 'password');
    const confirmPasswordInput = inputs.find((element) => element.input.id === 'confirm-password');

    // Link password and confirm password inputs.
    passWordInput.passwordPartner = confirmPasswordInput;
    confirmPasswordInput.passwordPartner = passWordInput;

    // Validate when user clicks out of current input.
    inputs.forEach((element) => {
        element.input.addEventListener('blur', () => {
            element.validate();
        });
    });

    // Validate when the user inputs in the current input.
    inputs.forEach((element) => {
        element.input.addEventListener('input', () => {
            element.validate();
        });
    });

    // Validate inputs when form is submitted.
    form.addEventListener('submit', (event) => {
        // Prevent form submission.
        event.preventDefault();

        // Access form's parent element.
        const formsParent = form.parentElement;

        // Check if all inputs are valid.
        inputs.forEach((input) => input.validate());
        const allInputsAreValid = inputs.every((input) => input.isValid);

        // High five user if all inputs are valid.
        if (allInputsAreValid) {
            formsParent.textContent = "You did it! Here's a high five to you🙏";
            formsParent.classList.add('completed');
        }
    });
}
addValidation(document.querySelector('form'));
