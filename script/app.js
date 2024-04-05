async function handleRegister() {
  let userName = document.querySelector("#userNameR").value;
  let email = document.querySelector("#emailR").value;
  let password = document.querySelector("#passwordR").value;

  let newUser = {
    userName: userName,
    email: email,
    password: password,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(newUser),
  };

  let apiRequest = fetch(
    "http://localhost:3008/auth/register",
    request
  );
  let result = await apiRequest.json();
  console.log(result);
}
console.log("it works");
