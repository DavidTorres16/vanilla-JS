const main = document.querySelector('#principal-container');
const CardsDiv = document.querySelector('#cards-container') 
const carrito =document.querySelector('#carrito')
const showPopupBtn = document.querySelector('#showPopupBtn')


let selectedItem = []


showCartContent()

create_Cards();
function create_Cards() {
  colors.forEach((color) => {
    let clicks = 0
    const card = document.createElement('div');
    const card_top = document.createElement('div')
    const card_bottom = document.createElement('div')
    card_bottom_hidden_content = document.createElement('div')
    const title_card = document.createElement('h2');
    const card_description = document.createElement('p');
    const button_card = document.createElement('button');
    const image_color = document.createElement('img');
    const card_price = document.createElement('p')

    card_top.classList.add('card_top')
    card_bottom.classList.add('card_bottom')
    card_bottom_hidden_content.classList.add('hidden_card_content')
    button_card.setAttribute('id', color.id);
    button_card.setAttribute('data-selected', false)
    button_card.classList.add('buybtn')
    button_card.addEventListener('click', createCart)
    button_card.textContent = 'Add';
    title_card.textContent = color.name.toUpperCase();
    title_card.style.textAlign = "left"
    card_description.textContent = color.description;
    card_price.textContent = color.price;
    image_color.src = color.img;    
    // card_bottom.addEventListener("mouseover", showCardContent);
    // card_bottom.addEventListener("mouseout", showCardContent);
    card.classList.add('card');
    card.style.backgroundColor = "fffff";

    card_top.appendChild(image_color)
    card_bottom.appendChild(title_card)
    card_bottom.appendChild(card_price)
    card_bottom_hidden_content.appendChild(card_description)
    card_bottom_hidden_content.appendChild(button_card)
    card_bottom.appendChild(card_bottom_hidden_content)
    card.appendChild(card_top)
    card.appendChild(card_bottom)
    // main.appendChild(card);    
    CardsDiv.appendChild(card)
  }); 
}

function showCardContent(e){
  console.log(e.target.id)
  card_bottom_hidden_content.classList.toggle("show_card_content")
}

function openCreateProduct(){
  let popup = document.getElementById("myPopup");
  let popupBackground = document.querySelector("#overlay")
  popupBackground.classList.toggle("active")
  popup.classList.toggle("show");
}

function createCart (e){
  const isSelected = e.target.dataset.selected
  const idSelected = e.target.id
  if(isSelected == 'false'){
    selectedItem.push({id: idSelected, timesSelected: 1})
    e.target.dataset.selected= true
  }  
  else{
    const itemIndex = selectedItem.findIndex((objeto) =>{
      return objeto.id == idSelected
    })
    selectedItem[itemIndex].timesSelected = (selectedItem[itemIndex].timesSelected+1)
    console.log(selectedItem[itemIndex])
  }
}

function showCartContent(){
  selectedItem.map((item) =>{
    const cartItemIndex = colors.findIndex((objeto)=>{
      return objeto.id == item.id
    })
    cartItem = colors[cartItemIndex]
    const itemInCartCard = document.createElement('div')
    const itemInCartTitle = document.createElement('h1')

    itemInCartTitle.textContent = cartItem.name
    
    itemInCartCard.appendChild(itemInCartTitle)
    carrito.appendChild(itemInCartCard)
  })
}



