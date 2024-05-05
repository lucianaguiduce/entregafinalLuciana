let productosEnCarrito = JSON.parse(
    localStorage.getItem("productos-en-carrito")
  );
  
  const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
  const contenedorCarritoProductos = document.querySelector("#carrito-productos");
  const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
  const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
  let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
  const contenedorTotal = document.querySelector("#total");
  const botonComprar = document.querySelector("#carrito-acciones-comprar");
  
  function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
      contenedorCarritoVacio.classList.add
      contenedorCarritoProductos.classList.remove
      contenedorCarritoAcciones.classList.remove
      contenedorCarritoComprado.classList.add
      contenedorCarritoProductos.innerHTML = "";
  
      
      productosEnCarrito.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = ` <img class="carrito-producto-imagen" src=".${
          producto.img.src
        }" alt="${producto.titulo}">
                          <div class="carrito-producto-titulo">
                              <small>Titulo</small>
                              <h3>${producto.titulo}</h3>
                          </div>
                          <div class="carrito-producto-cantidad">
                              <small>Cantidad</small>
                              <p>${producto.cantidad}</p>
                          </div>
                         <div class="carrito-producto-precio">
                              <small>Precio</small>
                              <p>$${producto.precio}</p>
                          </div>
                          <div class="carrito-producto-subtotal">
                              <small>Subtotal</small>
                              <p>$${producto.precio * producto.cantidad}</p>
                          </div>
                          <button class="carrito-producto-eliminar" id="${
                            producto.id
                          }"><i class="bi bi-trash-fill"></i></button>`;
  
        contenedorCarritoProductos.append(div);
      });
    } else {
      contenedorCarritoVacio.classList.remove
      contenedorCarritoProductos.classList.add
      contenedorCarritoAcciones.classList.add
      contenedorCarritoComprado.classList.add
    }
  
    actualizarBotonesEliminar();
    actualizarTotal();
  }
  cargarProductosCarrito();
  
  function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", eliminarDelCarrito);
    });
  }
  
  function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
      const productoEliminado = productosEnCarrito.find(
       (producto) => producto.id === idBoton
      );
  
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    console.log(productosEnCarrito);
    productosEnCarrito.splice(index, 1);
    console.log(productosEnCarrito);
    cargarProductosCarrito();
  
    productosEnCarrito;
    localStorage.setItem(
      "productos-en-carrito",
      JSON.stringify(productosEnCarrito)
    );
    cargarProductosCarrito();
  }
  
  botonVaciar.addEventListener("click", vaciarCarrito);
  function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem(
      "productos-en-carrito",
      JSON.stringify(productosEnCarrito)
    );
    cargarProductosCarrito();
  }
  
  function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
    document.getElementById("total").innerText = `$${totalCalculado}`;
  }
  botonComprar.addEventListener("click", comprarCarrito);
  function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem(
      "productos-en-carrito",
      JSON.stringify(productosEnCarrito)
    );
  
    Swal.fire({
      text: "¡Muchas gracias por tu compra! 😄",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    vaciarCarrito();
  }