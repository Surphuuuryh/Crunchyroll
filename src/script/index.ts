const form = document.querySelector("#loginForm") as HTMLFormElement;
const emailInput = document.querySelector("#email") as HTMLInputElement;
const senhaInput = document.querySelector("#senha") as HTMLInputElement;
const senhaContainer = document.querySelector("#senhaContainer") as HTMLDivElement;
const emailContainer = document.querySelector(".emailContainer") as HTMLDivElement;
const submitButton = document.querySelector("#div06") as HTMLButtonElement;

let emailPut = false;
let emailEntered = "";

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!emailPut) {
        const email = emailInput.value;

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!emailValido) {
            return;
        }

        senhaContainer.style.display = "block";
        emailContainer.style.display = "none";
        emailInput.readOnly = true;

        submitButton.textContent = "ENTRAR";

        emailPut = true;
        emailEntered = email;

    } else {
        const senha = senhaInput.value;

        if (!senha) {
            return;
        }

        if (emailEntered === "Admin1234@gmail.com" && senha === "Admin1234") {
            window.location.href = "/logado/logado.html";
        }
    }
});