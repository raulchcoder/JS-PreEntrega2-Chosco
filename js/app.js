/* === C A T E G O R I A S === */
const CATEGORIA = function (id, nombre) {
  this.id = id;
  this.nombre = nombre;
};

/* Creando Categorias */
const CATEGORIAS = [
  new CATEGORIA(1, "Empanadas"),
  new CATEGORIA(2, "Papas"),
  new CATEGORIA(3, "Minutas"),
  new CATEGORIA(4, "Menú"),
  new CATEGORIA(5, "Pizzas"),
  new CATEGORIA(6, "Sándwiches"),
  new CATEGORIA(7, "Hamburguesas"),
  new CATEGORIA(8, "Postres"),
  new CATEGORIA(9, "Bebidas"),
  new CATEGORIA(10, "Promo"),
];

/* Cargar Categorias */
const NAVBAR_CONTENEDOR = document.getElementById("navbar-contenedor");
function cargarCategorias() {
  NAVBAR_CONTENEDOR.innerHTML = "";
  CATEGORIAS.forEach((cat) => {
    let LiNavItem = document.createElement("li");
    LiNavItem.innerHTML = `<div class="form-check">
                            <input class="form-check-input check-categoria" type="checkbox"  id="cat_${cat.id}" data-id="${cat.id}">
                            <label class="form-check-label" for="cat_${cat.id}">
                               ${cat.nombre}
                            </label>
                         </div>`;
    NAVBAR_CONTENEDOR.appendChild(LiNavItem);
  });
}

function ordenarCategoriasPorNombre(array, orden = "ASC") {
  orden = orden.toLowerCase();
  if (orden == "desc") return array.sort((a, b) => b.nombre.localeCompare(a.nombre));
  return array.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

function getCategoriaDeProducto() {}

/* Retornar IDS de Categorias seleccionadas */
function categoriasSeleccionadas() {
  let catSelected = document.querySelectorAll("input[type='checkbox']:checked");
  let idCategorias = [];
  catSelected.forEach((tag) => {
    idCategorias.push(parseInt(tag.getAttribute("data-id")));
  });
  return idCategorias;
}

/* CheckBox Categorias */
let chksCategoria;
// const CHK_CATEGORIA = document.querySelectorAll("input[type='checkbox'].check-categoria");

function agregarEventoAchkCategoria() {
  chksCategoria = document.querySelectorAll("input[type='checkbox'].check-categoria");

  chksCategoria.forEach((chk) => {
    chk.addEventListener("change", (event) => {
      /* IDS de categorias seleccionadas */
      let categorias = categoriasSeleccionadas();
      /* Seleccionar Productos según categoria */
      cargarProductos(productosPorCategoria(categorias));
      /* Agregar Evento a Btn Comprar */
      agregarEventoBtnComprar();
    });
  });
}

/* === P R O D U C T O S === */
const PRODUCTO = function (id, nombre, detalle, precio, img, categoria_id) {
  this.id = id;
  this.nombre = nombre;
  this.detalle = detalle;
  this.precio = precio;
  this.img = img;
  this.categoria_id = categoria_id;
};

/* Creando Productos */
const PRODUCTOS = [
  new PRODUCTO(1, "Empanada de CARNE", "1/2 doc $ 6000, Unidad $ 1000", 12000, "empanadas.jpg", 1),
  new PRODUCTO(2, "Empanada de POLLO", "1/2 doc $ 6000, Unidad $ 1000", 12000, "empanada_pollo.jpg", 1),
  new PRODUCTO(3, "Empanada de JAMÓN y QUESO", "1/2 doc $ 6000, Unidad $ 1000", 12000, "empanada_jamon_queso.jpg", 1),
  new PRODUCTO(4, "Empanada de ÁRABES", "(*) Solo día Jueves", 12000, "empanada_arabe.jpg", 1),
  /* Categoria 2 */
  new PRODUCTO(10, "Papa fritas BASTÓN", "Porción chica $ 2500", 5000, "papas_fritas.jpeg", 2),
  new PRODUCTO(11, "Papa NOISE", "Porción chica $ 3000", 6000, "papas_noisette.jpg", 2),
  /* Categoria 3 */
  new PRODUCTO(15, "Milanesa con guarnición", "", 7500, "milanesa_ensalada_mix.jpg", 3),
  new PRODUCTO(16, "Milanesa napolitana con guarnición", "", 9000, "milanesa_napolitana2.jpg", 3),
  new PRODUCTO(17, "Milanesa caballo con guarnición", "", 9000, "milanesa_caballo.jpg", 3),
  new PRODUCTO(18, "Milanesa a la suiza", "", 9000, "milanesa_suiza.jpg", 3),
  new PRODUCTO(19, "Milanesa de merluza con guarnición", "", 7000, "milanesa_merluza.jpg", 3),
  new PRODUCTO(20, "Milanesa de cerdo con guarnición", "", 7000, "milanesa_cerdo.jpg", 3),
  new PRODUCTO(21, "Pata muslo al horno con guarnición", "", 6000, "pata_muslo.jpg", 3),
  new PRODUCTO(22, "Bondiola de cerdo con guarnición", "", 7000, "bondiola_cerdo.jpg", 3),
  new PRODUCTO(23, "Bife a la criolla con guarnición", "", 7500, "bife_criolla.jpg", 3),
  /* Categoria 4 */
  new PRODUCTO(30, "Tallarines", "", 6000, "tallarines.jpg", 4),
  new PRODUCTO(31, "Ñoquis", "", 6000, "nioquis.jpg", 4),
  new PRODUCTO(32, "Albóndigas con puré", "", 6000, "albondiga_pure.jpg", 4),
  new PRODUCTO(33, "Tortilla de papa con ensalada", "", 6000, "tortilla_papa.jpg", 4),
  new PRODUCTO(34, "Pastel de papa", "", 6000, "pastel_papa.jpg", 4),
  new PRODUCTO(35, "Canelones", "", 6000, "canelones.jpg", 4),
  new PRODUCTO(36, "Guiso de lentejas", "", 6000, "guiso_lentejas.jpg", 4),
  new PRODUCTO(37, "Guiso de garbanzos", "", 6000, "guiso_garbanzos.jpg", 4),
  new PRODUCTO(38, "Cazuela de mondongo y garbanzo", "", 6000, "cazuela_mondongo.jpg", 4),
  new PRODUCTO(39, "Arroz con salsa bolognesa", "", 6000, "arroz_salsa_bolognesa.jpg", 4),
  /* Categoria 5 */
  new PRODUCTO(45, "Pizza Mozzarella", "", 10000, "default.jpg", 5),
  new PRODUCTO(46, "Pizza Mozzarella con 4 huevos fritos", "", 12000, "default.jpg", 5),
  new PRODUCTO(47, "Pizza Mozzarella con atún", "", 12000, "default.jpg", 5),
  new PRODUCTO(48, "Pizza Especial de jamón y queso con morrón", "", 12000, "default.jpg", 5),
  new PRODUCTO(49, "Pizza Especial de jamón y queso con huevo", "", 12000, "default.jpg", 5),
  new PRODUCTO(50, "Pizza Fugazzeta", "", 13000, "default.jpg", 5),
  new PRODUCTO(51, "Pizza Napolitana", "", 13500, "default.jpg", 5),
  new PRODUCTO(52, "Pizza Napolitana con atún", "", 15000, "default.jpg", 5),
  new PRODUCTO(53, "Pizza Calabresa", "", 13000, "pizza_calabresa.jpg", 5),
  new PRODUCTO(54, "Pizza 4 Queso", "", 13000, "default.jpg", 5),
  new PRODUCTO(55, "Pizza Especial roquefort", "", 13000, "default.jpg", 5),
  new PRODUCTO(56, "Pizza Campestre con 4 huevos", "", 15000, "default.jpg", 5),
  new PRODUCTO(57, "Pizza Campestre con 6 huevos", "", 16000, "default.jpg", 5),
  /* Categoria 6 */
  new PRODUCTO(65, "Sandwich de Milanesa Simple", "Tomate y lechuga", 8000, "default.jpg", 6),
  new PRODUCTO(
    66,
    "Sandwich de Milanesa Completo",
    "Tomate y lechuga, jamón, queso y huevo planchado",
    10000,
    "default.jpg",
    6
  ),
  /* Categoria 7 */
  new PRODUCTO(70, "Hamburguesa Simple", "Tomate y lechuga", 6000, "hamburguesa_simple.jpg", 7),
  new PRODUCTO(71, "Hamburguesa Simple JyQ", "Jamón y queso", 6000, "default.jpg", 7),
  new PRODUCTO(
    72,
    "Hamburguesa Completa",
    "Lechuga, tomate, jamón, queso y huevo planchado, SIN PAPAS",
    7000,
    "default.jpg",
    7
  ),
  new PRODUCTO(
    73,
    "Hamburguesa Completa",
    "Lechuga, tomate, jamón, queso y huevo planchado, CON PAPAS",
    7500,
    "default.jpg",
    7
  ),
  new PRODUCTO(74, "Hamburguesa Completa DOBLE", "SIN PAPAS", 11000, "default.jpg", 7),
  new PRODUCTO(75, "Hamburguesa Completa DOBLE", "CON PAPAS", 11500, "default.jpg", 7),
  /* Categoria 8 */
];

/* Cargar Productos */
const ROW_PRODUCTOS = document.getElementById("row-productos");

function cargarProductos(arrProductos = PRODUCTOS) {
  ROW_PRODUCTOS.innerHTML = "";

  /* Cuando NO tiene datos el arreglo */
  if (arrProductos.length == 0) {
    let colProd = document.createElement("div");
    colProd.classList.add("mt-4", "col-12");
    colProd.innerHTML = `
      <img class="d-block img-fluid mx-auto" src="./img/default.png">
      `;
    ROW_PRODUCTOS.append(colProd);
    return;
  }
  /* Fin cuando no tiene datos */

  arrProductos.forEach((prod) => {
    if (!imgExiste("./img/" + prod.img)) prod.img = "default.jpg";

    let colProd = document.createElement("div");
    colProd.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3", "g-4");

    colProd.innerHTML = `
                          <div class="card mx-auto">
                            <a href="./img/${prod.img}" target="_blank">
                              <img class="card-img-top" src="./img/${prod.img}" alt="${prod.nombre}">
                            </a>
                            <div class="card-body">
                              <h6 class="card-title text-marron fw-bold">${prod.nombre}</h6>
                              <p class="card-text">${prod.detalle}</p>
                            </div>
                            <div class="card-footer">
                              <p class="card-footer__precio">$ ${prod.precio}</p>
                              <a href="#" class="card-footer__btn btn text-marron btn-comprar" data-idProd="${prod.id}">
                                <i class="fa-solid fa-2xl fa-basket-shopping"></i>
                              </a>
                            </div>
                          </div>
                        `;

    ROW_PRODUCTOS.appendChild(colProd);
  });
}

function productosPorCategoria(idCategorias) {
  let prod = PRODUCTOS.filter((p) => idCategorias.includes(parseInt(p.categoria_id)));
  return prod;
}

function getProductoPorID(idProd) {
  return PRODUCTOS.find((p) => p.id == idProd);
}

/* === H E R R A M I E N T A S === */
function imgExiste(image_url) {
  let http = new XMLHttpRequest();
  http.open("HEAD", image_url, false);
  http.send();
  return http.status != 404;
}

/* === C O M P R A R === */
const PRODUCTO_CARRITO = function (producto, cantidad = 1) {
  this.id = Date.now();
  this.producto = producto;
  this.cantidad = cantidad;
  this.subtotal = producto.precio;
};
const CARRITO = [];

/* Detectando CLICK botón comprar */
let btnComprar;
function agregarEventoBtnComprar() {
  btnComprar = document.querySelectorAll(".btn-comprar");
  btnComprar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let idProd = btn.getAttribute("data-idProd");
      agregarProductoAlCarrito(idProd);
    });
  });
}

/* Agregando producto por ID */
function agregarProductoAlCarrito(idProd) {
  /* Si ya existe el producto en el carrito RETORNA */
  if (buscarProductoEnCarrito(idProd)) return;

  let producto = getProductoPorID(idProd);
  if (producto) CARRITO.push(new PRODUCTO_CARRITO(producto));
  mostrarToast();
  actualizarCantidadCarrito();
  setCarritoEnLocalStorage();
}

/* Buscar producto en Carrito - Evitar Duplicado */
function buscarProductoEnCarrito(idProd) {
  let resultado = CARRITO.find((prod) => prod.producto.id == idProd);
  return !resultado ? false : true;
}
/* Actualizar valor del Carrito */
let cantidad_carrito = document.getElementById("carrito-cantidad");
function actualizarCantidadCarrito() {
  cantidad_carrito.textContent = CARRITO.length;
  // localStorageSetCarrito();
}

function mostrarToast(texto = "Producto agregado ...") {
  const toastTexto = document.getElementById("toast-texto");
  toastTexto.textContent = texto;
  const toastLiveExample = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
}

/* === L O C A L    S T O R A G E === */
function setCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(CARRITO));
}

function getCarritoDesdeLocalStorage() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  if (!carrito) return;
  CARRITO.push(...carrito);
  actualizarCantidadCarrito();
}

function eliminarCarritoEnLocalStorage() {
  localStorage.removeItem("carrito");
  // actualizarCantidadCarrito();
}

/* === I N I C I O    D E L    S I S T E M A === */
function inicializacion() {
  ordenarCategoriasPorNombre(CATEGORIAS);
  cargarCategorias();
  agregarEventoAchkCategoria();
  cargarProductos(new Array());
  getCarritoDesdeLocalStorage();
  actualizarCantidadCarrito();
}
// eliminarCarritoEnLocalStorage();
inicializacion();
