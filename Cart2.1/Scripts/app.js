const main = document.querySelector('#principal-container');
const CardsDiv = document.querySelector('#cards-container') 
const carrito =document.querySelector('#carrito')
const showPopupBtn = document.querySelector('#showPopupBtn')


let selectedItem = []

const addImageToProduct = (e) =>{
  const image_preview = document.querySelector('#img-preview')
  const img_url = document.querySelector('#image-url');
  image_preview.setAttribute('style', `background-image: url(${img_url.value})`)
}


create_Cards();
function create_Cards() {
  colors.forEach((color) => {
    card_bottom_hidden_content = document.createElement('div')
    const card = document.createElement('div');
    const card_top = document.createElement('div')
    const card_bottom = document.createElement('div')
    const title_card = document.createElement('h2');
    const card_description = document.createElement('p');
    const button_card = document.createElement('button');
    const image_color = document.createElement('img');
    const card_price = document.createElement('p')

    card_top.classList.add('card_top')
    card_bottom.classList.add('card_bottom')
    card_bottom_hidden_content.classList.add('hidden_card_content')
    button_card.classList.add('buybtn')
    button_card.setAttribute('id', color.id);
    button_card.setAttribute('data-selected', false)
    button_card.addEventListener('click', createCart)
    button_card.textContent = 'Add';
    title_card.style.textAlign = "left"
    title_card.textContent = color.name.toUpperCase();
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

function showCard(e){
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
    if(itemIndex == -1){
      selectedItem.push({id: idSelected, timesSelected: 1})
    }else{
      selectedItem[itemIndex].timesSelected = (selectedItem[itemIndex].timesSelected+1)
    }
  }
  showCartContent()
}

const addItemToCart = (e) =>{
  const itemId = e.target.dataset.id
  const item = selectedItem.findIndex((objeto) =>{
    return objeto.id == itemId
  })
  selectedItem[item].timesSelected = (selectedItem[item].timesSelected+1);
  showCartContent()
}

const deleteItemFromCart = (e) =>{
  const itemId = e.target.dataset.id
  const item = selectedItem.findIndex((objeto) =>{
    return objeto.id == itemId
  })
  if(window.confirm("¿Está seguro de eliminar este elemento del carrito?")){
    selectedItem.splice(item, 1)
  }
  showCartContent()
}

const deleteOneItemFromCart = (e) =>{
  const itemId = e.target.dataset.id
  const item = selectedItem.findIndex((objeto) =>{
    return objeto.id == itemId
  })
  if(selectedItem[item].timesSelected > 1){
    selectedItem[item].timesSelected = (selectedItem[item].timesSelected-1);
  }
  else{
      deleteItemFromCart(e)
  }
  showCartContent()
}

function showCartContent(){
  carrito.innerHTML = ''
  selectedItem.map((item) =>{
    const cartItemIndex = colors.findIndex((objeto)=>{
      return objeto.id == item.id
    })
    cartItem = colors[cartItemIndex]
    const productQuantity = document.getElementById('cant-productos')
    const productsValue = document.getElementById('valor-productos')
    const itemInCartCard = document.createElement('div')
    const itemInCartTitle = document.createElement('h1')
    const itemInCartPrice = document.createElement('p')
    const itemInCartQuantity = document.createElement('p')
    const addItem = document.createElement('button')
    const deleteOneItem = document.createElement('button')
    const deleteWholeItem = document.createElement('button')

    addItem.classList.add('cart-card-button')
    deleteOneItem.classList.add('cart-card-button')
    deleteWholeItem.classList.add('cart-card-button')

    addItem.classList.add('cart-card-button-plus')
    deleteOneItem.classList.add('cart-card-button-less')
    deleteWholeItem.classList.add('cart-card-button-delete')

    addItem.setAttribute('data-id', item.id)
    deleteOneItem.setAttribute('data-id', item.id)
    deleteWholeItem.setAttribute('data-id', item.id)
    
    addItem.textContent = '+'
    deleteOneItem.textContent = '-'
    deleteWholeItem.textContent = 'Borrar'

    addItem.addEventListener('click', addItemToCart)
    deleteOneItem.addEventListener('click', deleteOneItemFromCart)
    deleteWholeItem.addEventListener('click', deleteItemFromCart)

    
    itemInCartCard.classList.add('cart-card')
    
    itemInCartTitle.textContent = cartItem.name
    itemInCartPrice.textContent = cartItem.price
    itemInCartQuantity.textContent = item.timesSelected
    
    itemInCartCard.appendChild(itemInCartTitle)
    itemInCartCard.appendChild(itemInCartPrice)
    itemInCartCard.appendChild(itemInCartQuantity)
    itemInCartCard.appendChild(addItem)
    itemInCartCard.appendChild(deleteOneItem)
    itemInCartCard.appendChild(deleteWholeItem)
    carrito.appendChild(itemInCartCard)
  })
  console.log(selectedItem)
}

const showCart = () =>{
  console.log('hola')
  carrito.classList.toggle('show-cart')
}

