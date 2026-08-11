const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {

        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "red";

        return;
    }

    formMessage.textContent = "Thank you! Your message has been submitted.";
    formMessage.style.color = "green";

    form.reset();
});