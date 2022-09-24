const cartArray = []

let contenedorCarrito = document.getElementById('contenedor-cart')
let totalCart = document.getElementById('total')
recoverLS()

function recoverLS(){
    let array = JSON.parse(localStorage.getItem('productInCart')) || []
    
    array.forEach(item => {
        viewCart(item)
        cartArray.push(item)
        totalCostCart()
    });    
}

function viewCart(objeto) {
    let div = document.createElement('div')
    div.className = 'product-card'
    div.innerHTML =`
                        <div class="product-image">
                            <span class="discount-tag">10% off</span>
                            <img src="${objeto.img}" class="product-thumb" alt="cart-prod">
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">${objeto.name}</h2>                            
                            <span class="price">£${objeto.price}</span>
                        </div>
                `
    contenedorCarrito.append(div)
}

function totalCostCart() {
    totalCart.innerText = cartArray.reduce((acc,el)=> acc + el.price,0)
    
    // let cartCost = localStorage.getItem("totalCostCart");    
    // if(cartCost != null){
    //     cartCost = parseInt(cartCost);
    //     localStorage.setItem("totalCostCart", cartCost + product.price)

    // }else {
    //     localStorage.setItem("totalCostCart", product.price);
    // }  
}

// ----------------------------------------------EVENT CHECKOUT------------------------------------//


const btnCheckout = document.querySelector(".btn-checkout")

btnCheckout.addEventListener("click", ()=>{
    popCheckout()
    localStorage.clear();
} )


const popCheckout = () => {
    Swal.fire({
        title: 'Thank you for shopping with us!',
        text: 'A confirmation email with your order number and receipt will be sent to you shortly.',
        imageUrl: 'images/roger-federer-smile.webp',
        imageWidth: 500,
        imageHeight: 350,
        imageAlt: 'Custom image',
      })
}