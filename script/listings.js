let listings = document.querySelector(".listings");

const userListings = document.querySelector(".userListings");

const listingBtn = document.querySelector("#listingBtn");
const listingMsg = document.querySelector(".listing-msg");

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
  console.log(result);
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
            <button onclick="deleteListing('${listing._id}')">Delete<button/>
            <button onclick="updateListing('${listing._id}')">Update<button/>`;
    console.log(listing._id);
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

  if (result) {
    listingMsg.innerHTML = `<p class="mt-7 text-center rounded-lg bg-gradient-to-r from-pink-300 to-pink-400 text-red-800 font-bold">Create</p>`;
    const listing_id = result._id;
  }
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

async function updateListing(id) {
  let request = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(),
  };

  let apiRequest = await fetch(
    `http://localhost:3008/product/edit/${id}`,
    request
  );
  let result = await apiRequest.json();

  userListings.innerHTML = "";
  getAllFromUser();
}
