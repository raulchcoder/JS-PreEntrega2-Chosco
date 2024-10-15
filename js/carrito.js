/* === C A R R I T O === */
const PRODUCTO_CARRITO = function (producto, cantidad = 1) {
  this.producto = producto;
  this.cantidad = cantidad;
};
const CARRITO = [];

function ordenarCarrito() {
  CARRITO.sort((a, b) => a.producto.nombre.localeCompare(b.producto.nombre));
}

/* === L O C A L    S T O R A G E === */
function setCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(CARRITO));
}

function getCarritoDesdeLocalStorage() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  if (!carrito) return;
  CARRITO.push(...carrito);
}

function eliminarCarritoEnLocalStorage() {
  localStorage.removeItem("carrito");
  // actualizarCantidadCarrito();
}

/* === P R O D U C T O S === */
let col_productos;
function cargarProductosDelCarrito() {
  let item_carrito = "";
  col_productos = document.getElementById("col-productos");

  CARRITO.forEach((item, index) => {
    let bgLight2 = index == 0 || index % 2 == 0 ? "bg-light2" : "";
    item_carrito += `
        <div class="carrito__item ${bgLight2}" id="item-${item.id}">
            <div class="carrito__img">
                <img class="img-fluid" src="../img/${item.producto.img}" alt="">
            </div>
            <div class="carrito__body">
                <div class="carrito__titulo">
                    <h5>${item.producto.nombre}</h5>
                </div>
                <div class="carrito__botones">
                    <div class="carrito__cantidad">
                    <small>Cantidad</small>
                    <div>
                      <button class="btn btn-sm btn-cantidad" data-id="${item.id}" data-operacion="-"><i class="fa-solid fa-minus"></i></button>
                      <span class="px-2" id="cant-${item.id}">${item.cantidad}</span>
                      <button class="btn btn-sm btn-cantidad" data-id="${item.id}" data-operacion="+"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    </div>
                    <div class="carrito__precio">
                      <small>Precio</small>
                      <div>
                        <span class="fw-bold">$ ${item.producto.precio}</span>
                      </div>
                    </div>
                    <div class="carrito__subtotal">
                      <small>SubTotal</small>
                      <div>
                        <span class="fw-bold" id="subt-${item.id}">$ ${item.subtotal}</span>
                      </div>
                    </div>
                    <div class="carrito__quitar">
                        <button class="btn btn-sm text-danger btn-borrar" data-id="${item.id}"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
            </div>
          </div>
        `;
  }); /* CARRITO */
  /* Agrega el contenido html a la columna productos */
  col_productos.innerHTML = item_carrito;
}

let btnCantidad;
function agregarEventoBotonesCantidad() {
  btnCantidad = document.querySelectorAll(".btn-cantidad");
  // btnCantidad = document.getElementsByClassName("btn-cantidad");
  btnCantidad.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      /* llama a funcion para actualizar cantidad de producto, se pasa ID y Operacion a realizar */
      actualizarCantidadProductoComprado(btn.getAttribute("data-id"), btn.getAttribute("data-operacion"));
    });
  });
}

/* Actualizar cantidad del producto comprado */
function actualizarCantidadProductoComprado(idItem, operacion) {
  CARRITO.find((item, index) => {
    if (item.id == idItem) {
      if (operacion == "-" && item.cantidad == 1) return;
      /* Modifica la cantidad del producto en el array CARRITO */
      CARRITO[index].cantidad = operacion == "+" ? CARRITO[index].cantidad + 1 : CARRITO[index].cantidad - 1;
      /* Busca y actualiza el span de cantidad */
      document.getElementById(`cant-${idItem}`).textContent = CARRITO[index].cantidad;

      /* *** Actualiza SUBTOTAL *** */
      CARRITO[index].subtotal = item.cantidad * item.producto.precio;
      document.getElementById(`subt-${item.id}`).textContent = `$ ${CARRITO[index].subtotal}`;

      /* *** Guarda el CARRITO en localStorage */
      setCarritoEnLocalStorage();
      // return item;
    }
  });
}

/* Borrar producto de carrito */
let btnBorrar;
function agregarEventoBotonesBorrar() {
  btnBorrar = document.querySelectorAll(".btn-borrar");
  btnBorrar.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      borrarProuctoDelCarrito(btn.getAttribute("data-id"), index);
    });
  });
}

function borrarProuctoDelCarrito(idItem, index) {
  CARRITO.splice(index, 1);
  document.getElementById(`item-${idItem}`).remove();
  setCarritoEnLocalStorage();
}

/* === I N I C I A L I Z A C I O N === */
function inicializacionSistema() {
  getCarritoDesdeLocalStorage();
  ordenarCarrito();
  cargarProductosDelCarrito();
  agregarEventoBotonesCantidad();
  agregarEventoBotonesBorrar();
}

window.onload = function () {
  inicializacionSistema();
};
