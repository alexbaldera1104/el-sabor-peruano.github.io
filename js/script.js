const modal = document.getElementById('modalReserva');
const abrir = document.getElementById('abrirModal');
const cerrar = document.querySelector('.cerrar');
/* abrir y cerrar el modal */
abrir.onclick = () => {
    modal.style.display = 'block';
}
cerrar.onclick = () => {
    modal.style.display = 'none';
}
window.onclick = (e) => {
    if(e.target == modal){
        modal.style.display = 'none';
    }
}
/* categorias de productos */
const productos = {
    entradas:[
        {nombre:'Causa Limeña',precio:18},
        {nombre:'Papa a la Huancaína',precio:16},
        {nombre:'Ocopa',precio:17},
        {nombre:'Anticuchos',precio:20},
        {nombre:'Tiradito',precio:25},
        {nombre:'Tequeños',precio:15},
        {nombre:'Tamal',precio:14},
        {nombre:'Yuquitas Fritas',precio:13},
        {nombre:'Choritos a la Chalaca',precio:24},
        {nombre:'Ensalada',precio:12},
    ],
    platos:[
        {nombre:'Lomo Saltado',precio:42},
        {nombre:'Ají de Gallina',precio:38},
        {nombre:'Arroz con Pollo',precio:35},
        {nombre:'Seco de Carne',precio:39},
        {nombre:'Chaufa de Mariscos',precio:34},
        {nombre:'Ceviche Mixto',precio:45},
        {nombre:'Parihuela',precio:48},
        {nombre:'Rocoto Relleno Arequipeño',precio:40},
        {nombre:'Cabrito Norteño',precio:46},
        {nombre:'Tallarines Verdes',precio:37},
    ],
    bebidas:[
        {nombre:'Pisco Sour',precio:22},
        {nombre:'Chicha Morada',precio:12},
        {nombre:'Maracuyá Frozen',precio:16},
        {nombre:'Limonada Frozen',precio:10},
        {nombre:'Mojito',precio:24},
        {nombre:'Emoliente',precio:9},
        {nombre:'Capucchino',precio:11},
        {nombre:'Mate de Coca',precio:8},
        {nombre:'Jugo Tropical',precio:14},
        {nombre:'Inka Kola',precio:7},
    ],
    postres:[
        {nombre:'Suspiro Limeño',precio:18},
        {nombre:'Mazamorra Morada',precio:15},
        {nombre:'Picarones',precio:17},
        {nombre:'Arroz con Leche',precio:14},
        {nombre:'King Kong',precio:20},
        {nombre:'Alfajores',precio:12},
        {nombre:'Cheesecake de Lúcuma',precio:19},
        {nombre:'Tres Leches',precio:16},
        {nombre:'Flan Plus',precio:13},
        {nombre:'Helado Artesanal',precio:15},

    ]
};
let carrito = [];
const listaPedidos =
document.getElementById('listaPedidos');
/* renderizamos los productos */
function renderProductos(){
    listaPedidos.innerHTML = '';
    Object.keys(productos).forEach((categoria)=>{
        let titulo = '';
        if(categoria == 'entradas'){
            titulo = 'Entradas';
        }
        if(categoria == 'platos'){
            titulo = 'Platos Principales';
        }
        if(categoria == 'bebidas'){
            titulo = 'Bebidas';
        }
        if(categoria == 'postres'){
            titulo = 'Postres';
        }
        listaPedidos.innerHTML += `
        <div class="categoria">
            <button class="btn-categoria"
            onclick="toggleCategoria('${categoria}')">
                ${titulo}
            </button>
            <div class="contenedor-productos"
            id="${categoria}"
            style="display:none;">
                ${productos[categoria].map((producto,index)=>`
                    <div class="producto-pedido">
                        <div>
                            <h4>${producto.nombre}</h4>
                            <p>S/ ${producto.precio}</p>
                        </div>
                        <div class="controles">
                            <button onclick="
                            disminuir('${categoria}',${index})
                            ">-</button>
                            <span class="cantidad"
                            id="cantidad-${categoria}-${index}">
                            0
                            </span>
                            <button onclick="
                            aumentar('${categoria}',${index})
                            ">+</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        `;
    });
}
renderProductos();
/* funcion para mostrar y ocultar las categorias */
function toggleCategoria(categoria){
    const contenedor =
    document.getElementById(categoria);
    if(contenedor.style.display === 'none'){
        contenedor.style.display = 'block';
    }else{
        contenedor.style.display = 'none';
    }
}
/* funcion para aumentar y disminuir productos */
function aumentar(categoria,index){
    const producto =
    productos[categoria][index];
    const existe =
    carrito.find(item =>
    item.nombre === producto.nombre);
    if(existe){
        existe.cantidad++;
    }else{
        carrito.push({
            nombre:producto.nombre,
            precio:producto.precio,
            cantidad:1
        });
    }
    actualizar();
}
function disminuir(categoria,index){
    const producto =
    productos[categoria][index];
    const existe =
    carrito.find(item =>
    item.nombre === producto.nombre);
    if(existe){
        if(existe.cantidad > 0){
            existe.cantidad--;
        }
        if(existe.cantidad === 0){
            carrito =
            carrito.filter(item =>
            item.nombre !== producto.nombre);
        }
    }
    actualizar();
}
/* para actualizar el total */
function actualizar(){
    let total = 0;
    Object.keys(productos).forEach((categoria)=>{
        productos[categoria].forEach((producto,index)=>{
            const existe =
            carrito.find(item =>
            item.nombre === producto.nombre);
            let cantidad =
            existe ? existe.cantidad : 0;
            document.getElementById(
            `cantidad-${categoria}-${index}`
            ).innerHTML = cantidad;
            if(existe){
                total +=
                existe.precio *
                existe.cantidad;
            }
        });
    });
    document.getElementById(
    'totalPedido'
    ).innerHTML =
    `Total: S/ ${total}`;
}
/* formulario */
const formulario =
document.getElementById('formReserva');
formulario.addEventListener(
'submit',
function(e){
    e.preventDefault();
    const reserva = {
        nombre:document.getElementById('nombre').value,
        dni: document.getElementById('dni').value,
        celular:document.getElementById('celular').value,
        correo:document.getElementById('correo').value,
        fecha:document.getElementById('fecha').value,
        hora:document.getElementById('hora').value,
        personas:document.getElementById('personas').value,
        mensaje:document.getElementById('mensaje').value,
        pedidos: carrito
    };
/* guardar todas las reservas */
    let reservas =
    JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.push(reserva);
    localStorage.setItem(
    'reservas',
    JSON.stringify(reservas)
    );
    alert(
    'Reserva guardada correctamente'
    );
    formulario.reset();
    carrito = [];
    actualizar();
    mostrarReservas();
    modal.style.display = 'none';
});
/* boton, modal reservas */
const modalReservas =
document.getElementById('modalReservas');
const cerrarReservas =
document.getElementById('cerrarReservas');
const contenedorReservas =
document.getElementById('contenedorReservas');
btnReservas.onclick = () => {
    mostrarReservas();
    modalReservas.style.display = 'block';
}
cerrarReservas.onclick = () => {
    modalReservas.style.display = 'none';
}
window.addEventListener('click',(e)=>{
    if(e.target == modalReservas){
        modalReservas.style.display = 'none';
    }
});
/* mostrar las reservas */
function mostrarReservas(){
    const reservas =
    JSON.parse(localStorage.getItem('reservas')) || [];
    contenedorReservas.innerHTML = '';
    reservas.forEach((reserva)=>{
        contenedorReservas.innerHTML += `
            <div class="card-reserva">
                <h3>${reserva.nombre}</h3>
                <p>${reserva.fecha}</p>
            </div>
        `;
    });
}
