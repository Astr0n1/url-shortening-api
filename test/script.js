const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", async () => {
  const inputValue = searchInput.value.toLowerCase();
  const pokemonNameElement = document.getElementById("pokemon-name");
  const pokemonIdElement = document.getElementById("pokemon-id");
  const weightElement = document.getElementById("weight");
  const heightElement = document.getElementById("height");
  const hpElement = document.getElementById("hp");
  const attackElement = document.getElementById("attack");
  const defenseElement = document.getElementById("defense");
  const specialAttackElement = document.getElementById("special-attack");
  const specialDefenseElement = document.getElementById("special-defense");
  const speedElement = document.getElementById("speed");
  const typesElement = document.getElementById("types");
  const spriteElement = document.getElementById("sprite");

  // Clear previous results
  pokemonNameElement.textContent = "";
  pokemonIdElement.textContent = "";
  weightElement.textContent = "";
  heightElement.textContent = "";
  hpElement.textContent = "";
  attackElement.textContent = "";
  defenseElement.textContent = "";
  specialAttackElement.textContent = "";
  specialDefenseElement.textContent = "";
  speedElement.textContent = "";
  typesElement.innerHTML = "";
  spriteElement.src = "";

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${inputValue}`
    );
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const pokemonData = await response.json();
    pokemonNameElement.textContent = pokemonData.name.toUpperCase();
    pokemonIdElement.textContent = `${pokemonData.id}`;
    weightElement.textContent = `${pokemonData.weight}`;
    heightElement.textContent = `${pokemonData.height}`;
    hpElement.textContent = `${pokemonData.stats[0].base_stat}`;
    attackElement.textContent = `${pokemonData.stats[1].base_stat}`;
    defenseElement.textContent = `${pokemonData.stats[2].base_stat}`;
    specialAttackElement.textContent = `${pokemonData.stats[3].base_stat}`;
    specialDefenseElement.textContent = `${pokemonData.stats[4].base_stat}`;
    speedElement.textContent = `${pokemonData.stats[5].base_stat}`;
    spriteElement.src = pokemonData.sprites.front_default;

    // Clear previous types and add new types
    pokemonData.types.forEach((typeInfo) => {
      const typeElement = document.createElement("p");
      typeElement.textContent = typeElement.value =
        typeInfo.type.name.toUpperCase();
      typesElement.appendChild(typeElement);
    });
  } catch (error) {
    alert(error.message);
  }
});
