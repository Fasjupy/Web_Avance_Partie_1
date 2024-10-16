async function loadData(house = null) {
  // On peut utiliser le await sans être dans une fonction async si notre fichier JS est un module
  const reponse = await fetch("https://hp-api.onrender.com/api/characters")
  const listPerso = await reponse.json()

  let newListPerso = house === null ? listPerso.slice(0, 8) : listPerso.filter((perso) => perso.house === house).slice(0, 8)

  let main = document.querySelector(".characters")
  main.innerHTML = ""

  for (const perso of newListPerso) {
    let div = document.createElement("div")

    div.addEventListener("mouseenter", (e) => {
      let imgCurrent = e.target.querySelector("img")
      imgCurrent.style.borderColor = getColorHouses(perso.house)
    })

    div.addEventListener("mouseleave", (e) => {
      let imgCurrent = e.target.querySelector("img")
      imgCurrent.style.borderColor = "#b99049"
    })

    //reset le container

    div.innerHTML = `
    <a href="details.html?id=${perso.id}">
        <img src="${perso.image !== "" ? perso.image : "./../images/characters/troll.jpg"}" alt="${perso.name}" srcset="" />
        <p>${perso.name}</p>
      </a>
`

    main.appendChild(div)
  }
}

function createHouses() {
  let houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]

  let container = document.querySelector(".houses")

  for (const house of houses) {
    let div = document.createElement("div")

    div.addEventListener("click", () => {
      console.log("test")
      loadData(house)
    })

    div.innerHTML = `
    <img src="./images/logo/${house}.png" alt="" srcset="" />`

    container.appendChild(div)
  }
}

function getColorHouses(house) {
  switch (house) {
    case "Gryffindor":
      return "#b71713"
      break
    case "Hufflepuff":
      return "#e1b50c"
      break
    case "Ravenclaw":
      return "#078cb1"
      break
    case "Slytherin":
      return "#124b10"
      break

    default:
      return "#b99049"
      break
  }
}

loadData()
createHouses()
