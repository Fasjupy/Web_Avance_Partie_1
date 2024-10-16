const charactersContainer = document.querySelector('.characters');

// Fonction pour récupérer les données depuis l'API
async function fetchCharacters() {
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();
        const first12Characters = data.slice(0, 12);

        const charactersHTML = first12Characters.map(character => {
            const houseClass = character.house.toLowerCase();//gryffindor, slytherin, ...
            const imageSrc = character.image;

            return `
        <div class="character ${houseClass}">
          <img src="${imageSrc}" alt="${character.name}">
          <p>${character.name}</p>
        </div>
      `;
        }).join(''); // .join('') pour faire une seule chaine string

        charactersContainer.innerHTML = charactersHTML;

    } catch (error) {
        console.error('Erreur du fetch des personnages :', error);
    }
}
fetchCharacters();
