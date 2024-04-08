const registerBtn = document.querySelector("#signBtn");
const registerMsg = document.querySelector(".register-msg");

async function register() {
  let userName = document.querySelector("#userNameRegister").value;
  let email = document.querySelector("#emailRegister").value;
  let password = document.querySelector("#passwordRegister").value;

  let newUser = {
    username: userName,
    mail: email,
    password: password,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(newUser),
  };

  let apiRequest = await fetch("http://localhost:3008/auth/register", request);
  let result = await apiRequest.json();

  console.log("inscription réussie");

  if (result) {
    window.localStorage.setItem("id", result);
    registerMsg.innerHTML += `<p class="mt-7 text-center rounded-lg bg-gradient-to-r from-pink-300 to-pink-400 text-red-800 font-bold">Registration successful, you can now log in</p>`;
    console.log(result);
  }
}

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  register();
});

const loginBtn = document.querySelector("#loginBtn");
const loginMsg = document.querySelector(".login-msg");

async function login() {
  let email = document.querySelector("#emailLogin").value;
  let password = document.querySelector("#passwordLogin").value;

  let user = {
    mail: email,
    password: password,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  };

  let apiRequest = await fetch("http://localhost:3008/auth/login", request);
  let result = await apiRequest.json();
  if (result) {
    window.localStorage.setItem("id", result._id);
    loginMsg.innerHTML += `<p class="mt-7 text-center rounded-lg bg-gradient-to-r from-pink-300 to-pink-400 text-red-800 font-bold">Login successful</p>`;

    console.log(result._id);
  }
  console.log(result);
}

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});
