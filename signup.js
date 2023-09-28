const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("#signup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const obj = {
    Name: name.value,
    Email: email.value,
    Password: password.value,
  };

  console.log(obj);
});
