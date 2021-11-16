const characterSelect = document.getElementById('character-select')
const multi_card_space = document.getElementById('multi_card_space')
const URL = "https://rickandmortyapi.com/api/character/"

const createSelect = (data) =>{
    data.map(characterData =>{
        const {name,id} = characterData
        const itemSelect = document.createElement('option') 
        itemSelect.textContent = name
        itemSelect.setAttribute('value',id)
        characterSelect.addEventListener('change', getCharacterData)
        characterSelect.appendChild(itemSelect)
    })
}

const createAllCard = (data) =>{
    multi_card_space.innerHTML = ""
    data.map(cardData =>{
        const card_space = document.createElement('div')
        const card_name_space = document.createElement('div')
        const card_species_space = document.createElement('div')
        const card_name = document.createElement('h2')
        const card_species = document.createElement('h3')
        const card_image = document.createElement('img')
    
        card_space.classList.add('card_space')
        card_name_space.classList.add('card_titles_space')
        card_species_space.classList.add('card_titles_space')
        card_image.classList.add('card_image')
        card_name.classList.add('card_titles')
        card_species.classList.add('card_titles')
        card_name.textContent = cardData.name
        card_image.setAttribute('src',cardData.image)
        card_species.textContent = cardData.species
    
        card_name_space.appendChild(card_name);
        card_species_space.appendChild(card_species)
        card_space.appendChild(card_name_space)
        card_space.appendChild(card_image)
        card_space.appendChild(card_species_space)
        multi_card_space.appendChild(card_space)
    })
}

const createCard = (data, isAllData) =>{
    multi_card_space.innerHTML = ""
    if(isAllData){
        createAllCard(data)
    }else{
        const card_space = document.createElement('div')
        const card_name_space = document.createElement('div')
        const card_species_space = document.createElement('div')
        const card_name = document.createElement('h2')
        const card_species = document.createElement('h3')
        const card_image = document.createElement('img')
    
        card_space.classList.add('card_space')
        card_name_space.classList.add('card_titles_space')
        card_species_space.classList.add('card_titles_space')
        card_image.classList.add('card_image')
        card_name.classList.add('card_titles')
        card_species.classList.add('card_titles')
        card_name.textContent = data.name
        card_image.setAttribute('src',data.image)
        card_species.textContent = data.species
    
        card_name_space.appendChild(card_name);
        card_species_space.appendChild(card_species)
        card_space.appendChild(card_name_space)
        card_space.appendChild(card_image)
        card_space.appendChild(card_species_space)
        multi_card_space.appendChild(card_space)
    }
}

const getSelectInfo = () =>{
    fetch(URL)
    .then(res => res.json())
    .then(data=>{
        createSelect(data.results)
    })
    .catch(error => console.log(error))
}

const getCharacterData = (e) =>{
    const characterIndex = e.target.value
    console.log(characterIndex)

    if(characterIndex == 0){
        fetch(URL)
        .then(res => res.json())
        .then(data=>{
            createAllCard(data.results, true)
        })
        .catch(error => console.log(error))
    }else{
        fetch(URL+`${characterIndex}`)
        .then(res => res.json())
        .then(data=>{
            createCard(data, false)
        })
        .catch(error => console.log(error))
    }
}

getSelectInfo()

