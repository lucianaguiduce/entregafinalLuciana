
//productos----------------------------------------------------------------
/*
const stock = [
	{"id":1,"nombre":"Clase Grupal","precio":16000,  "cantidad":1, "img":"./imagenes/natacion3.jpg"},
	{"id":2,"nombre":"Clase individual","precio":20000, "cantidad":1, "img":"./imagenes/natacion2.webp"},
	{"id":3, "nombre":"Pileta libre","precio":24000,   "cantidad":1, "img":"./imagenes/Pileta-1.jpg"},
	{"id":4,  "nombre":"Acceso al Club ilimitado","precio":30000, "cantidad":1, "img":"./imagenes/clubpileta.jpg"}
	
];*/

swal("Querés unirte a nuestro Club de Amigos de la Pileta?", {
  buttons: ["Ay no!", "Obvio!"],
});


let carritoTotal     = []
let carritoProductos = []


//cards--------------------------------------------------------------------

fetch('data.json')
.then( (res) => res.json() )
.then( (data) => { 

  let pagecontent = document.getElementsByClassName("page-content")[0]

  data.forEach( (element) => {

    let contenedor = document.createElement("div");

     contenedor.className = "product-conteiner"
    
    contenedor.innerHTML = `
        <div class="contenedor_img">
          <img src='${element.img}'class"img_card">
        </div>
        <h3>${element.nombre}</h3>
        <h3 class="h3-precio">${element.precio}</h3>
        <button id="${element.id}" class="botones">comprar</button>
    `
    pagecontent.appendChild(contenedor)
  })
}) 
//boton------------------------------------------------------------------

fetch('data.json')
.then( (res) => res.json() )
.then( (data) => { 

for(const elemento of data){

  const boton = document.getElementById(`${elemento.id}`);

  boton.addEventListener("click", () => {
      agregarcarrito(elemento.id)
      swal({
        text: 'su producto se a agregado al carrito con exito',
        icon: 'success',
        timer: '3000',
        buttons: false
      });
  });

  const agregarcarrito = (prodId) => {

  const item = data.find((prod)=> prod.id === prodId)

  carritoTotal.push(item)

  //precio final de la compra
  const preciofinal = carritoTotal.reduce( (acc,elemento) => acc + elemento.precio, 0 );
  console.log("su compra final es de "+ preciofinal);

  //estructura para mostrar elementos del carrito  
  verCarrito();
  //estructura para mostrar precio total
   precioFCarrito();

   } 	
}	


})

//buscador-------------------------------------------------------------------------

let buscador = document.getElementById("buscador");

document.addEventListener( "keyup", (event) => {

if(event.target.matches("#buscador")){

  document.querySelectorAll(".product-conteiner").forEach( articulo => {

     articulo.textContent.toLowerCase().includes(event.target.value.toLowerCase())

       ? articulo.classList.remove("filtro")
       : articulo.classList.add("filtro")
  })
  
  
}

//console.log(buscador.value)

})

//carrito------------------------------------------------------------------------

const carritoBoton = document.getElementById('carrito_boton');
const carritoaside = document.getElementById('carrito')
const salir = document.getElementById('salir');


//boton abrir
carritoBoton.addEventListener('click', (event) => {

const carritoNone = document.getElementById('carrito');

carritoNone.classList.remove('carrito_none');
salir.classList.remove('carrito_none');


}) 

//boton salir
salir.addEventListener('click', (event) => {

  const carritoNone = document.getElementById('carrito');
  
  carritoNone.classList.add('carrito_none');
  salir.classList.add('carrito_none');

},5000) 

//productos agregados al carrito

const obtener = document.getElementById('carrito_elementos')

const verCarrito = () => {

let nombreCarr = carritoTotal[carritoTotal.length-1].nombre
let precioCarr = carritoTotal[carritoTotal.length-1].precio
let imgCarr = carritoTotal[carritoTotal.length-1].img

let nose = document.createElement("div");

   nose.className = "elementosCarr"

  nose.innerHTML = `
          <td class='cajacarr'>${nombreCarr}</td>
          <td class='cajacarr'>${precioCarr}</td>
          <img src="${imgCarr}" class="imgCarr">		
  `
  obtener.appendChild(nose);


}
//ver precio final en el carrito

const precioFCarrito = () => {
  
const divprecioCarr = document.getElementsByClassName('precioFCarrito')[0];

divprecioCarr.innerText = 'su compra final es de '+carritoTotal.reduce( (acc,elemento) => acc + elemento.precio, 0 );

}