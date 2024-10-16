const charactersContainer = document.querySelector('.characters'); // selection des characters
const houseImages = document.querySelectorAll('.houses img'); // Selection des img dans houses

// tableau pour stocker tous les char (utile pour la séléction par House)
let allCharacters = [];

// Fonction pour ajouter l'événement de clic sur les personnages
function addCharacterClickEvent() {
    const characterImages = document.querySelectorAll('.character img');

    characterImages.forEach(img => {
        img.addEventListener('click', (e) => {
            const characterName = e.target.getAttribute('alt'); // Récupérer le nom du personnage via l'attribut alt

            // Utiliser URLSearchParams pour construire l'URL demandée
            const params = new URLSearchParams();
            params.append('name', characterName);

            // Rediriger vers la page details.html avec le paramètre name qui correspond à la demande
            window.open(`details.html?${params.toString()}`, '_blank');
        });
    });
}

async function fetchCharacters() {
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();
        const first12Characters = data.slice(0, 12);

        const charactersHTML = first12Characters.map(character => {
            const houseClass = character.house.toLowerCase();
            const imageSrc = character.image;

            return `
        <div class="character ${houseClass}">
          <img src="${imageSrc}" alt="${character.name}">
          <p>${character.name}</p>
        </div>
      `;
        }).join('');

        charactersContainer.innerHTML = charactersHTML;

        // Ajouter l'événement de clic après avoir inséré les personnages dans le DOM
        addCharacterClickEvent();

    } catch (error) {
        console.error('Erreur du fetch des personnages :', error);
    }
}

// Fonction pour afficher sur la page (préparer et injecter le code HTML correspondant) les char en fonction d'une liste
function displayCharacters(characters) {
    const charactersHTML = characters.map(character => {
        const houseClass = character.house.toLowerCase(); // ex : gryffindor, slytherin, etc....
        const imageSrc = character.image || './images/characters/troll.jpg'; //selection de l'image, si pas d'image celle du troll

        return `
        <div class="character ${houseClass}">
          <img src="${imageSrc}" alt="${character.name}">
          <p>${character.name}</p>
        </div>
        `;
    }).join(''); // .join('') to convert array to a single string

    charactersContainer.innerHTML = charactersHTML;
}

// Fonction qui sert à filtrer les characters par HOUSE
function filterCharactersByHouse(house) {
    if (house === 'all') {
        // le cas tous
        displayCharacters(allCharacters);
    } else {
        // utilisation de filter avec comparaison de la house
        const filteredCharacters = allCharacters.filter(character => character.house.toLowerCase() === house);
        displayCharacters(filteredCharacters);
    }
}

// un event listener nécessaire (type click)
houseImages.forEach(img => {
    img.addEventListener('click', (e) => {
        const selectedHouse = e.target.getAttribute('data-house'); // Fetch de la maison via le data-house attr créé
        filterCharactersByHouse(selectedHouse);//display des char ia le filtre
    });
});

// Fetch characters on page load
fetchCharacters();
