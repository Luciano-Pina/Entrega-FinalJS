// --------------------------ARRAYS------------------------------------------//
const racquets = []
const cartArray = []

// --------------------------RAQUETAS------------------------------------------//

class Racquet {
    constructor(id, name, price, units, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.units = units;
        this.inStock = true;
        this.img = img;
    }
        priceTax () {
            let priceTax = this.price * tax
            return "£" + priceTax.toFixed(2)
        } 
}

const tax = 1.2
function generateID() { return parseInt(Math.random() * 10000)}


function newRacquet() {
    let id = generateID()
    let name = prompt("Name and model of racquet?").toUpperCase()
    let price = parseInt(prompt("What will be the sale price?"))
    let units = prompt("How many have you got in stock?")
        racquets.push(new Racquet(id, name, price, units, img))

        console.table(racquets)
}

function generateProductR() {
    racquets.push( new Racquet(generateID(), "head speed pro".toUpperCase(), 200, 100, 'images/speed-pro.jpg'))
    racquets.push( new Racquet(generateID(), "babolat pure aero".toUpperCase(), 210, 50, 'images/pure-aero.jpg'))
    racquets.push( new Racquet(generateID(), "wilson pro staff rf97".toUpperCase(), 270, 70, 'images/pro-staff.webp'))
    racquets.push( new Racquet(generateID(), "yonex ezone 98".toUpperCase(), 200, 45, 'images/ezone-98.webp'))
    racquets.push( new Racquet(generateID(), "volkl v8 pro".toUpperCase(), 150, 100, 'images/volkl-v8.webp'))
    racquets.push( new Racquet(generateID(), "head extreme pro".toUpperCase(), 150, 75, 'images/extreme-pro.jpg'))
    racquets.push( new Racquet(generateID(), "head radical pro".toUpperCase(), 120, 100, 'images/radical-pro.jpg'))
    racquets.push( new Racquet(generateID(), "babolat pure drive".toUpperCase(), 220, 50, 'images/pure-drive.webp'))    
    racquets.push( new Racquet(generateID(), "wilson blade pro".toUpperCase(), 220, 80, 'images/blade-pro.webp')) 
}

function navigateArray() {racquets.forEach(Element => console.log(Element))}

generateProductR()



// -----------------------------------------------------------------------------------------------------//

class dontSell {
    constructor() {
        if (this.units == 0) {
            return this.inStock = false;
        }
    }
}



//-----------------------------------------------------------------------------------------------------//
//--------------------------------------------EVENT SEARCH--------------------------------------------//

const searchBar = document.querySelector("input");

const searchBtn = document.querySelector("button");
  

searchBar.addEventListener("keyup",(i)=>{
    const searchInput = i.target.value.toUpperCase();
    const racquetResults = racquets.filter (Racquet => {
       return Racquet.name.includes(searchInput)
  })
  console.log(racquetResults)
})

// -------------------------------SLIDER-----------------------------------------//

const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimenstions = item.getBoundingClientRect();
    let containerWidth = containerDimenstions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})


//-------------------------------------------------------------------------------------------------------//
//--------------------------------------------EVENT ADD CART--------------------------------------------//

let carts = document.querySelectorAll(".card-btn");

for (let i=0; i < carts.length; i++ ) {
    carts[i].addEventListener("click", () => {
        cartNumbers(allProducts[i]);
        // totalCostCart(allProducts[i]);
    })
}

function cartNumbers(allProduct) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers)

    if(productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
    } else{
        localStorage.setItem("cartNumbers", 1);
    }

    setItems(allProduct);
}

function setItems(allProduct) {
    allProducts.units = 1

    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems)

    if(cartItems != null) {
        if(cartItems[allProduct] == undefined){
            cartItems ={
                ...cartItems,
                [allProduct.name]: allProduct
            }
        }
        cartItems[allProduct] + 1;
    } else {
        allProduct.units = 1;
        cartItems = {allProduct}      
    }
    
    cartArray.push(allProduct)
    localStorage.setItem("productInCart", JSON.stringify(cartArray))       
}

let array = JSON.parse(localStorage.getItem('productInCart')) || []
array.forEach(item => cartArray.push(item));



// -------------------SWEETALERT POP-UP-----------------//

const addedPopup = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: false,        
      })      
      Toast.fire({
        icon: 'success',
        title: 'Item added to cart'
      })
}

// ----------------------------FETCH()-------------------//

const fetchData = async ()=> {
    await fetch('js/products.json')
            .then((response) => response.json())
            .then((data) => {
               
               allProducts= [...data]
            })
            .catch((error) => console.error("Oh no! An error has ocurred"))
}

fetchData()