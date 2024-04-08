let listings = document.querySelector(".listings");

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
              <span class="text-sm text-white">${listing.date}</span>
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
if (listings) {
  getAllListings();
}

const userListings = document.querySelector(".userListings");

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
              <span class="text-sm text-white">${listing.date}</span>
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
if (userListings) {
  getAllFromUser();
}
