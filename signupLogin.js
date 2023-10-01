// => for switching login/signup page

const newUserBtn = document.getElementById("newUser");
const backUpBtn = document.getElementById("backUp");
const container = document.getElementById("container");

newUserBtn.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
backUpBtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// --------------------------------------------------------------

// sign up k lie

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signupForm = document.querySelector("#signupform");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const obj = {
    Name: name.value,
    Email: email.value,
    Password: password.value,
  };
  console.log(obj);

  try {
    const response = await axios.post(
      "http://localhost:3000/signup-table/signup",
      obj
    );
    console.log("signup completed", response.status);
    signupForm.reset();

    window.location.href='expenses/expenseForm.html'
    
    if (response.status === 201) {
      console.log("congrats you signed up successfully!");
    } else if (response.status === 500) {
      alert("An error occurred while signup. Please try again later.");
    }
  } catch (err) {
    console.log(err);
    alert(err.response.data.error);
  }
});

//--------------------------------------------------------------------------------

// login k lie

const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const obj = {
    loginEmail: loginEmail.value,
    loginPassword: loginPassword.value,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/signup-table/login",
      obj
    );
    loginForm.reset();

      window.location.href='expenses/expenseForm.html'

    if (response.status === 202) {
      console.log("Login successful");
      alert("Login successful!");
    } else if (response.status === 401) {
      alert("Password does not match");
    } else if (response.status === 404) {
      alert("User not found");
    }
  } catch (err) {
    console.error(err);
    alert(err.response.data.error);
  }
});
