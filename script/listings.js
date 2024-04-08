let listings = document.querySelector(".listings");

async function getAllListings() {
  listings.innerHTML = "";

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
getAllListings();

const userListings = document.querySelector(".userListings");

async function getAllFromuser() {
  userListings.innerHTML = "";
  let getAll = await fetch("http://localhost:3008/product/items/:user_id");
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
