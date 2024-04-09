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

  if (result) {
    window.localStorage.setItem("id", result);
    registerMsg.innerHTML += `<p class="mt-7 text-center rounded-lg bg-gradient-to-r from-pink-300 to-pink-400 text-red-800 font-bold">Registration successful, you can now log in</p>`;
    console.log(result);
  }
}

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

  if (result.status !== 200) {
    loginMsg.innerHTML = `<p class="mt-7 text-center rounded-lg bg-gradient-to-r from-pink-300 to-pink-400 text-red-800 font-bold">Invalid credentials</p>`;

    return;
  } else {
    window.localStorage.setItem("id", result.user._id);
    loginMsg.innerHTML = `<p class="mt-7 text-center rounded-lg bg-gradient-to-r from-pink-300 to-pink-400 text-red-800 font-bold">Login successful,<br>
    you will be redirected to your dashboard</p>`;

    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, "5000");
  }
}
if (registerBtn) {
  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    register();
  });
}
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    login();
  });
}

// (function () {
//   const user_id = localStorage.getItem("id");
//   if (user_id === null) {
//     return (window.location.href = "/auth.html");
//   }

//   console.log("connected");
//   console.log(user_id);
// })();
