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

  if (result.insertedId) {
    window.localStorage.setItem("id", result.insertedId);

    console.log(result.insertedId);
  }

  console.log(result);
}

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
  console.log(result);
}

console.log("it works");

let listings = document.querySelector(".listings");

async function getAllListings() {
  // listings.innerHTML = "";

  let getAll = await fetch("http://localhost:3008/product/all");
  let result = await getAll.json();
  result.forEach((element) => {
    listings.innerHTML += `<div
            class="bg-gradient-to-tl from-green-400 to-indigo-900 rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden"
          >
            <img
              class="h-56 lg:h-60 w-full object-cover"
              src="${element.img}"
              alt=""
            />
            <div class="p-3">
              <span class="text-sm text-white">${element.date}</span>
              <h3 class="font-semibold text-xl leading-6 text-black my-2">
               ${element.title}
              </h3>
              <p class="text-black">
                ${element.description}
              </p>
              <p class="mt-3 font-semibold block text-right text-black">
                ${element.price}€
              </p>
            </div>`;
  });
}
getAllListings();
