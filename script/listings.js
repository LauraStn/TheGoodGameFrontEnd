let listings = document.querySelector(".listings");

const userListings = document.querySelector(".userListings");

const listingBtn = document.querySelector("#listingBtn");
const listingMsg = document.querySelector(".listing-msg");

const editBtn = document.querySelector("#editBtn");

const authBtn = document.querySelector(".connect");
const logoutBtn = document.querySelector(".logoutBtn");
const dashboardBtn = document.querySelector(".dashboardBtn");

const displayName = document.querySelector(".displayName");

async function getAllListings() {
  let getAll = await fetch("http://localhost:3008/product/all");
  let result = await getAll.json();
  result.forEach((listing) => {
    listings.innerHTML += `<div
            class="bg-gradient-to-tl from-green-400 to-indigo-900 rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden"
          >
            <img
              class="h-56 lg:h-60 w-full object-cover"
              src="${listing.img}"
              alt=""
            />
            <div class="p-3">
              <span class="text-sm text-white">${listing.state}</span>
              <h3 class="font-semibold text-xl leading-6 text-black my-2">
               ${listing.title}
              </h3>
              <p class="text-black">
                ${listing.description}
              </p>
              <p class="mt-3 font-semibold block text-right text-black">
                ${listing.price}€
              </p>
            </div>`;
  });
}

async function getAllFromUser() {
  let user_id = window.localStorage.getItem("id");
  let getAll = await fetch(`http://localhost:3008/product/items/${user_id}`);
  let result = await getAll.json();

  result.forEach((listing) => {
    userListings.innerHTML += `<div
            class="bg-gradient-to-tl from-green-400 to-indigo-900 rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden"
          >
            <img
              class="h-56 lg:h-60 w-full object-cover"
              src="${listing.img}"
              alt=""
            />
            <div class="p-3">
              <span class="text-sm text-white">${listing.state}</span>
              <h3 class="font-semibold text-xl leading-6 text-black my-2">
               ${listing.title}
              </h3>
              <p class="text-black">
                ${listing.description}
              </p>
              <p class="mt-3 font-semibold block text-right text-black">
                ${listing.price}€
              </p>
            </div>
            <button class="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onclick="deleteListing('${listing._id}')">Delete<button/> 
            <button class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onclick="displayEdit('${listing._id}')">Edit<button/>`;
  });
}

if (listings) {
  getAllListings();
}

if (userListings) {
  getAllFromUser();
}

async function createListing() {
  let title = document.querySelector("#title").value;
  let image = document.querySelector("#image").value;
  let price = document.querySelector("#price").value;
  let state = document.querySelector("#state").value;
  let description = document.querySelector("#description").value;
  let userId = window.localStorage.getItem("id");

  let newListing = {
    user_id: userId,
    title: title,
    img: image,
    price: price,
    state: state,
    description: description,
  };
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(newListing),
  };
  let apiRequest = await fetch("http://localhost:3008/product/add", request);
  let result = await apiRequest.json();
  if (result.status !== 201) {
    listingMsg.innerHTML = `<p class="mt-7 text-center rounded-lg bg-gradient-to-r from-pink-300 to-pink-400 text-red-800 font-bold">Missing fields</p>`;
    return;
  }

  listingMsg.innerHTML = `<p class="mt-7 text-center rounded-lg bg-gradient-to-r from-green-400 to-lime-400 text-lime-800 font-bold">Listing added !</p>`;
}

if (listingBtn) {
  listingBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createListing();
    userListings.innerHTML = "";
    getAllFromUser();
  });
}

async function deleteListing(id) {
  let request = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(),
  };

  let apiRequest = await fetch(
    `http://localhost:3008/product/delete/${id}`,
    request
  );
  let result = await apiRequest.json();
  window.alert("Listing deleted !");
  userListings.innerHTML = "";
  getAllFromUser();
}

async function displayEdit(id) {
  const editModal = document.querySelector(".edit");

  let request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  let apiRequest = await fetch(
    `http://localhost:3008/product/item/${id}`,
    request
  );
  let result = await apiRequest.json();
  editModal.innerHTML = `
  <div
    id="editListing"
    class="w-4/5 rounded-lg bg-gradient-to-tl from-green-400 to-indigo-900"
  >
    <h2 class="text-2xl font-semibold mb-4 text-center">Edit your listing</h2>
    <form method="post" id="form">
      <div class="mb-4">
        <label for="image" class="block text-slate-100">
          Image URL
        </label>
        <input
          type="url"
          id="editImage"
          name="image"
          class="image w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          value="${result.img}"
        />
      </div>
      <div class="mb-7">
        <label for="price" class="block text-slate-100">
          Price
        </label>
        <input
          type="number"
          id="editPrice"
          name="editPrice"
          class="price w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          value="${result.price}"
        />
      </div>

      <div class="mb-7">
        <label for="description" class="block text-slate-100">
          Description
        </label>
        <textarea
          id="editDescription"
          name="editDescription"
          class="description w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        >${result.description}</textarea>
      </div>
      <button
      onclick="updateListing('${result._id}')"
        id="editBtn"
        type="button"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Edit
      </button>
      <p class="edit-msg"></p>
    </form>
  </div>`;
}

async function updateListing(id) {
  let image = document.querySelector("#editImage").value;
  let price = document.querySelector("#editPrice").value;
  let description = document.querySelector("#editDescription").value;
  const editMsg = document.querySelector(".edit-msg");

  let editListing = {
    img: image,
    price: price,
    description: description,
  };

  let request = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editListing),
  };
  let apiRequest = await fetch(
    `http://localhost:3008/product/edit/${id}`,
    request
  );
  let result = await apiRequest.json();
  editMsg.innerText = `Product updated !`;
  setTimeout(() => {
    window.location.reload();
  }, "4000");
}

//Self-Invoking Functions
(function isConnected() {
  const user_id = localStorage.getItem("id");
  const user_name = localStorage.getItem("username");

  if (user_id === null) {
  } else {
    if (authBtn) {
      authBtn.classList.add("hidden");
    }
    if (logoutBtn) {
      logoutBtn.classList.remove("hidden");
    }
    if (dashboardBtn) {
      dashboardBtn.classList.remove("hidden");
    }
    displayName.innerHTML = `<p>${user_name}</p>`;
  }
})();

function logout() {
  window.localStorage.removeItem("id");
  window.localStorage.removeItem("username");
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    logout();
    window.alert("Disconnected successfull");
    window.location.href = "./index.html";
  });
}
