// Via l'URL on fetch le nom du personnage
const params = new URLSearchParams(window.location.search);
const characterName = params.get('name');

// On select les infos du DOM pour récupérer les bon fields à changer avec le fetch de l'API
const characterTitle = document.querySelector('h3');
const characterImage = document.querySelector('.perso__left img');
const characterCaption = document.querySelector('.perso__left figcaption');
const characterHouse = document.querySelector('.house__perso img');
const labels = document.querySelectorAll('.labels .label');
const values = document.querySelectorAll('.values .value');

// Fonction pour récupérer les données du personnage
async function fetchCharacterDetails() {
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();
        // Trouver le personnage correspondant au nom dans l'URL avec .find et un ===
        const character = data.find(char => char.name === characterName);
        if (character) {
            // Mettre à jour les fields du DOM avec les informations du personnage fetchées par la fonction
            characterTitle.textContent = character.name;
            characterImage.src = character.image;
            characterCaption.textContent = character.actor || 'Unknown Actor';//Mis à unknown actor si field actor vide dans l'API

            // MAJ de l'image de la maison
            if (character.house) {
                characterHouse.src = `./images/logo/${character.house}.png`;// Pas besoin de lower case car déjà lower dans l'API
            } else {
                characterHouse.src = ''; // Aucune maison si non renseigné
            }

            // Mettre à jour les attributs, unknown si inconnu à chaque fois
            values[0].textContent = character.gender || 'Unknown';
            values[1].textContent = character.eyeColour || 'Unknown';
            values[2].textContent = character.hairColour || 'Unknown';
            values[3].textContent = character.dateOfBirth || 'Unknown';
            values[4].textContent = character.patronus || 'None';
        } else { // Un cas si le personnage n'est pas trouvé
            console.error('Personnage non trouvé');
        }
    } catch (error) {
        console.error('Erreur lors du fetch des informations du personnage :', error);
    }
}

fetchCharacterDetails();
