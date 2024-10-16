async function loadData(house = null) {
  const url = new URL(document.location)
  const searchParams = url.searchParams

  // ou récupérer sa valeur
  let id = searchParams.get("id")
  // On peut utiliser le await sans être dans une fonction async si notre fichier JS est un module
  const reponse = await fetch("https://hp-api.onrender.com/api/character/" + id)
  let perso = await reponse.json()

  perso = perso[0]

  let main = document.querySelector(".perso__right")
  main.innerHTML = ""

  main.innerHTML = `
    <div>
    <p class="attr">Gender</p>
    <p>${perso.gender}</p>
  </div>
  <div>
    <p class="attr">Eye</p>
    <p>${perso.eyeColour}</p>
  </div>
  <div>
    <p class="attr">Hair</p>
    <p>${perso.hairColour}</p>
  </div>
  <div>
    <p class="attr">Date of birth</p>
    <p>${perso.dateOfBirth}</p>
  </div>
  <div>
    <p class="attr">Patronus</p>
    <p>${perso.patronus}</p>
  </div>
</div>
  `
}

loadData()
