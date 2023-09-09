console.log("Just Checking");
const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";

let getCard = document.getElementById("card");
let searchForm = document.getElementById("search-form");

async function fetchAPI() {
  const data = await fetch(API_URL);
  const response = await data.json();
  const result = await response.results;
  return result;
}

async function node(arr) {
  return arr.map((items) => {
    // Creating new Elements
    let cardDiv = document.createElement("div");
    let pokeTitle = document.createElement("p");
    let pokeType = document.createElement("p");
    let pokeImg = document.createElement("img");
    let pokeAbility = document.createElement("p");

    // Adding class names to created Elements
    pokeImg.classList.add("image-class");
    cardDiv.classList.add("card-main");
    pokeTitle.classList.add("card-title");
    pokeAbility.classList.add("card-ability");
    pokeType.classList.add("card-type");

    // Fetching Pokemon APIs
    const api = items.url;
    fetch(api)
      .then((res) => res.json())
      .then((res1) => {
        pokeTitle.textContent = ` ${items.name}`;
        pokeType.textContent = ` ${res1.types[0].type.name}`;
        pokeImg.src = res1.sprites.other.dream_world.front_default;
        pokeAbility.textContent = ` ${res1.abilities.map(
          (items) => items.ability.name
        )}`;
      });

    // Appending Card UI to CardDiv
    cardDiv.append(pokeImg);
    cardDiv.append(pokeTitle);
    cardDiv.append(pokeAbility);
    cardDiv.append(pokeType);

    return cardDiv;
  });
}

async function getPokeData() {
  const result = await fetchAPI();

  for (let i = 0; i < 100; i++) {
    const pokemon = result[i].url;
  }

  let updateResult = await node(result);

  // Appending Card to Main div
  getCard.append(...updateResult);
}

getPokeData();

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let searchVal = document.getElementById("search");
  let x = document.getElementsByClassName("card");
  let xLength = x[0].children;

  if (searchVal.value === "") {
    getCard.innerHTML = "";
    getPokeData();
  } else {
    const searchLowerCase = searchVal.value.toLowerCase();

    // If input value is not found in the innerHTML of All cards then it will display this
    if (!x[0].innerHTML.toLowerCase().includes(searchLowerCase)) {
      let not = document.getElementById("notFound");
      not.style.display = "flex";
      console.log(not, "heelo");
    }

    // looping through all available pokemon card to search the input value
    // if input is found in the innerHTML of card
    // then card style will be  display:block and if not then display:none
    for (let i = 0; i < xLength.length; i++) {
      if (!xLength[i].innerHTML.toLowerCase().includes(searchLowerCase)) {
        xLength[i].style.display = "none";
      } else {
        xLength[i].style.display = "block";
      }
    }

    document.getElementById("search").value = "";
  }
});
