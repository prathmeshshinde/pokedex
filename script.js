console.log("Just Checking");
const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";

let getCard = document.getElementById("card");

async function getPokeData() {
  const data = await fetch(API_URL);
  const response = await data.json();
  const result = await response.results;

  for (let i = 0; i < 100; i++) {
    const pokemon = result[i].url;
  }

  let nodes = result.map((items) => {
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

    // Appending Card UI to page
    cardDiv.append(pokeImg);
    cardDiv.append(pokeTitle);
    cardDiv.append(pokeAbility);
    cardDiv.append(pokeType);

    return cardDiv;
  });

  getCard.append(...nodes);
}

getPokeData();

let searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let searchVal = document.getElementById("search");

  if (searchVal.value === "") {
    getCard.innerHTML = "";
    getPokeData();
  } else {
    const data = await fetch(API_URL);
    const response = await data.json();
    const result = await response.results;

    // console.log(result);

    const searchResult = result.filter(
      (pokemon) => pokemon.name === searchVal.value
    );

    let nodes = searchResult.map((items) => {
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

      // Appending Card UI to page
      cardDiv.append(pokeImg);
      cardDiv.append(pokeTitle);
      cardDiv.append(pokeAbility);
      cardDiv.append(pokeType);

      return cardDiv;
    });

    getCard.innerHTML = "";

    getCard.append(...nodes);

    searchVal.setAttribute("value", "");

    document.getElementById("search").value = "";
  }
});
