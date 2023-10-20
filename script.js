class Input {
    constructor(input) {
        this.input = input;
        this.errorMessage = '';
        this.passwordPartner = '';
        this.errorMessageContainer = input.nextElementSibling;
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

    validate() {
        // Check if input is empty.
        if (this.isEmpty(this.input)) {
            this.errorMessage = 'Input is missing!';
        } else {
            switch (this.input.id) {
                case 'email':
                    this.errorMessage = this.isValidEmail(this.input) ? '' : 'Input a valid email address!';
                    break;

                case 'country-code':
                    this.errorMessage = this.isValidCountryCode(this.input) ? '' : 'Input a valid country code!';
                    break;

                case 'zip-code':
                    this.errorMessage = this.isValidZipCode(this.input) ? '' : 'Input a valid zip code!';
                    break;

                case 'password':
                    this.errorMessage = '';
                    this.passwordPartner.errorMessageContainer.textContent =
                        this.input.value === this.passwordPartner.input.value ? '' : 'Passwords do not match';
                    break;

                case 'confirm-password':
                    this.errorMessage =
                        this.input.value === this.passwordPartner.input.value ? '' : 'Passwords do not match';
                    break;

                default:
                    this.errorMessage = '';
            }
        }
        this.errorMessageContainer.textContent = this.errorMessage;
    }
}

function addValidation(form) {
    // Get all referece to the input and put them into 'Input' objects.
    const inputs = [...document.querySelectorAll('input')].map((input) => new Input(input));

    const passWordInput = inputs.find((element) => element.input.id === 'password');
    const confirmPasswordInput = inputs.find((element) => element.input.id === 'confirm-password');

    // Link password and confirm password inputs.
    passWordInput.passwordPartner = confirmPasswordInput;
    confirmPasswordInput.passwordPartner = passWordInput;
}
addValidation(document.querySelector('form'));
