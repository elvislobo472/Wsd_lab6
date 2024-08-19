document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');
    const dobField = document.getElementById('dob');
    const submitBtn = document.getElementById('submitBtn');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const dobError = document.getElementById('dobError');

    const isValidName = (name) => /^[A-Za-z\s]{3,}$/.test(name);
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    const isValidDob = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18;
    };

    const validateField = (field, validator, errorField) => {
        if (validator(field.value.trim())) {
            field.classList.remove('border-red-500');
            field.classList.add('border-green-500');
            errorField.classList.add('hidden');
            return true;
        } else {
            field.classList.remove('border-green-500');
            field.classList.add('border-red-500');
            errorField.classList.remove('hidden');
            return false;
        }
    };

    form.addEventListener('input', () => {
        validateField(nameField, isValidName, nameError);
        validateField(emailField, isValidEmail, emailError);
        validateField(passwordField, isValidPassword, passwordError);
        validateField(confirmPasswordField, (confirmPassword) => confirmPassword === passwordField.value, confirmPasswordError);
        validateField(dobField, isValidDob, dobError);
        

        submitBtn.disabled = !(isValidName(nameField.value) && isValidEmail(emailField.value) && isValidPassword(passwordField.value) && 
                              confirmPasswordField.value === passwordField.value && isValidDob(dobField.value));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const isFormValid = validateField(nameField, isValidName, nameError) &&
                            validateField(emailField, isValidEmail, emailError) &&
                            validateField(passwordField, isValidPassword, passwordError) &&
                            validateField(confirmPasswordField, (confirmPassword) => confirmPassword === passwordField.value, confirmPasswordError) &&
                            validateField(dobField, isValidDob, dobError);

        if (isFormValid) {
            alert('Registration successful!');
        } else {
            alert('Please fix the errors in the form.');
        }
    });
});
