const productos = {
    entradas: [
        { nombre: 'Causa Limeña', precio: 18, imagen: 'img/CausaLimeña.jpeg' },
        { nombre: 'Papa a la Huancaína', precio: 16, imagen: 'img/PapaalaHuancaina.jpeg' },
        { nombre: 'Ocopa', precio: 17, imagen: 'img/Ocopa.jpg' },
        { nombre: 'Anticuchos', precio: 20, imagen: 'img/Anticuchos.jpeg' },
        { nombre: 'Tiradito', precio: 25, imagen: 'img/Tiradito.jpeg' },
        { nombre: 'Tequeños', precio: 15, imagen: 'img/Tequeños.jpeg' },
        { nombre: 'Tamal', precio: 14, imagen: 'img/Tamal.jpeg' },
        { nombre: 'Yuquitas Fritas', precio: 13, imagen: 'img/YuquitasFritas.jpeg' },
        { nombre: 'Choritos a la Chalaca', precio: 24, imagen: 'img/ChoritosalaChalaca.jpeg' },
        { nombre: 'Ensalada', precio: 12, imagen: 'img/Ensalada.jpeg' }
    ],
    platos: [
        { nombre: 'Lomo Saltado', precio: 42, imagen: 'img/LomoSaltado.jpeg' },
        { nombre: 'Ají de Gallina', precio: 38, imagen: 'img/AjideGallina.jpeg' },
        { nombre: 'Arroz con Pollo', precio: 35, imagen: 'img/ArrozconPollo.jpeg' },
        { nombre: 'Seco de Carne', precio: 39, imagen: 'img/SecodeCarne.jpeg' },
        { nombre: 'Chaufa de Mariscos', precio: 34, imagen: 'img/ChaufadeMariscos.jpg' },
        { nombre: 'Ceviche Mixto', precio: 45, imagen: 'img/CevicheMixto.jpeg' },
        { nombre: 'Parihuela', precio: 48, imagen: 'img/Parihuela.jpeg' },
        { nombre: 'Rocoto Relleno Arequipeño', precio: 40, imagen: 'img/RocotoRellenoArequipeño.jpeg' },
        { nombre: 'Cabrito Norteño', precio: 46, imagen: 'img/CabritoNorteño.jpeg' },
        { nombre: 'Tallarines Verdes', precio: 37, imagen: 'img/TallarinesVerdes.jpeg' }
    ],
    bebidas: [
        { nombre: 'Pisco Sour', precio: 22, imagen: 'img/PiscoSour.jpg' },
        { nombre: 'Chicha Morada', precio: 12, imagen: 'img/ChichaMorada.jpeg' },
        { nombre: 'Maracuyá Frozen', precio: 16, imagen: 'img/MaracuyaFrozen.png' },
        { nombre: 'Limonada Frozen', precio: 10, imagen: 'img/LimonadaFrozen.jpeg' },
        { nombre: 'Mojito', precio: 24, imagen: 'img/Mojito.jpeg' },
        { nombre: 'Emoliente', precio: 9, imagen: 'img/Emoliente.jpeg' },
        { nombre: 'Cappuccino', precio: 11, imagen: 'img/Cappuccino.jpeg' },
        { nombre: 'Mate de Coca', precio: 8, imagen: 'img/MatedeCoca.jpg' },
        { nombre: 'Jugo Tropical', precio: 14, imagen: 'img/JugoTropical.jpg' },
        { nombre: 'Inka Kola', precio: 7, imagen: 'img/InkaKola.jpeg' }
    ],
    postres: [
        { nombre: 'Suspiro Limeño', precio: 18, imagen: 'img/SuspiroLimeño.jpeg' },
        { nombre: 'Mazamorra Morada', precio: 15, imagen: 'img/MazamorraMorada.jpeg' },
        { nombre: 'Picarones', precio: 17, imagen: 'img/Picarones.jpeg' },
        { nombre: 'Arroz con Leche', precio: 14, imagen: 'img/ArrozconLeche.jpeg' },
        { nombre: 'King Kong', precio: 20, imagen: 'img/KingKong.jpeg' },
        { nombre: 'Alfajores', precio: 12, imagen: 'img/Alfajores.jpeg' },
        { nombre: 'Cheesecake de Lúcuma', precio: 19, imagen: 'img/CheesecakeLucuma.jpeg' },
        { nombre: 'Tres Leches', precio: 16, imagen: 'img/TresLeches.jpeg' },
        { nombre: 'Flan Plus', precio: 13, imagen: 'img/FlanPlus.jpeg' },
        { nombre: 'Helado Artesanal', precio: 15, imagen: 'img/HeladoArtesanal.jpeg' }
    ]
};

const nombresCategoria = {
    entradas: 'Entradas',
    platos: 'Platos principales',
    bebidas: 'Bebidas',
    postres: 'Postres'
};

let carrito = [];
let cuponAplicado = false;

const menuCategorias = document.getElementById('menuCategorias');
const listaPedidos = document.getElementById('listaPedidos');
const totalPedido = document.getElementById('totalPedido');
const formulario = document.getElementById('formReserva');
const contenedorReservas = document.getElementById('contenedorReservas');
const navPrincipal = document.getElementById('navPrincipal');
const menuToggle = document.getElementById('menuToggle');
const fechaReserva = document.getElementById('fecha');

function formatoPrecio(precio) {
    return `S/ ${precio}`;
}

function renderMenu() {
    menuCategorias.innerHTML = Object.keys(productos).map((categoria) => `
        <article class="categoria-bloque" data-categoria="${categoria}">
            <h3 class="categoria-titulo">${nombresCategoria[categoria]}</h3>
            <div class="menu-grid">
                ${productos[categoria].map((producto) => `
                    <article class="menu-card">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <div class="menu-info">
                            <h3>${producto.nombre}</h3>
                            <span>${formatoPrecio(producto.precio)}</span>
                        </div>
                    </article>
                `).join('')}
            </div>
        </article>
    `).join('');
}

function renderProductosReserva() {
    listaPedidos.innerHTML = Object.keys(productos).map((categoria) => `
        <div class="categoria">
            <button class="btn-categoria" type="button" onclick="toggleCategoria('${categoria}')">
                ${nombresCategoria[categoria]}
                <i class="fa-solid fa-chevron-down"></i>
            </button>
            <div class="contenedor-productos" id="pedido-${categoria}">
                ${productos[categoria].map((producto, index) => `
                    <div class="producto-pedido">
                        <div>
                            <h4>${producto.nombre}</h4>
                            <p>${formatoPrecio(producto.precio)}</p>
                        </div>
                        <div class="controles" aria-label="Cantidad de ${producto.nombre}">
                            <button type="button" onclick="disminuir('${categoria}', ${index})">-</button>
                            <span class="cantidad" id="cantidad-${categoria}-${index}">0</span>
                            <button type="button" onclick="aumentar('${categoria}', ${index})">+</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function toggleMenu() {
    const abierto = navPrincipal.classList.toggle('abierto');
    menuToggle.setAttribute('aria-expanded', abierto);
    menuToggle.innerHTML = abierto ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
}

function cerrarMenu() {
    navPrincipal.classList.remove('abierto');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

function filtrarMenu(categoriaSeleccionada) {
    document.querySelectorAll('.categoria-bloque').forEach((bloque) => {
        const coincide = categoriaSeleccionada === 'todos' || bloque.dataset.categoria === categoriaSeleccionada;
        bloque.classList.toggle('oculto', !coincide);
    });
}

function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (!modal) {
        return;
    }
    modal.classList.add('activo');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-abierto');
}

function cerrarModal(idModal) {
    const modal = document.getElementById(idModal);
    if (!modal) {
        return;
    }
    modal.classList.remove('activo');
    modal.setAttribute('aria-hidden', 'true');

    const quedaModalAbierto = document.querySelector('.modal.activo');
    if (!quedaModalAbierto) {
        document.body.classList.remove('modal-abierto');
    }
}

function abrirModalReservas() {
    mostrarReservas();
    abrirModal('modalReservas');
}

function toggleCategoria(categoria) {
    const contenedor = document.getElementById(`pedido-${categoria}`);
    if (contenedor) {
        contenedor.classList.toggle('activo');
    }
}

function aumentar(categoria, index) {
    const producto = productos[categoria][index];
    const existe = carrito.find((item) => item.nombre === producto.nombre);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    actualizarPedido();
}

function disminuir(categoria, index) {
    const producto = productos[categoria][index];
    const existe = carrito.find((item) => item.nombre === producto.nombre);

    if (!existe) {
        return;
    }

    existe.cantidad--;

    if (existe.cantidad <= 0) {
        carrito = carrito.filter((item) => item.nombre !== producto.nombre);
    }

    actualizarPedido();
}

function calcularTotal() {
    const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    return cuponAplicado ? Math.round(subtotal * 0.9) : subtotal;
}

function actualizarPedido() {
    Object.keys(productos).forEach((categoria) => {
        productos[categoria].forEach((producto, index) => {
            const cantidad = carrito.find((item) => item.nombre === producto.nombre)?.cantidad || 0;
            const cantidadElemento = document.getElementById(`cantidad-${categoria}-${index}`);

            if (cantidadElemento) {
                cantidadElemento.textContent = cantidad;
            }
        });
    });

    const textoCupon = cuponAplicado ? ' con cupón' : '';
    totalPedido.textContent = `Total${textoCupon}: ${formatoPrecio(calcularTotal())}`;
}

function aplicarCupon() {
    const confirmarCupon = confirm('¿Deseas aplicar el cupón SABOR10 a tu pedido?');

    if (!confirmarCupon) {
        return;
    }

    cuponAplicado = true;
    actualizarPedido();
    alert('Cupón aplicado correctamente.');
}

function limpiarFormularioReserva() {
    formulario.reset();
    carrito = [];
    cuponAplicado = false;
    actualizarPedido();
}

function guardarReserva(evento) {
    evento.preventDefault();

    const confirmar = confirm('¿Deseas guardar esta reserva?');
    if (!confirmar) {
        return;
    }

    const reserva = {
        nombre: document.getElementById('nombre').value.trim(),
        dni: document.getElementById('dni').value.trim(),
        celular: document.getElementById('celular').value.trim(),
        correo: document.getElementById('correo').value.trim(),
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        personas: document.getElementById('personas').value,
        mensaje: document.getElementById('mensaje').value.trim(),
        pedidos: carrito.map((item) => ({ ...item })),
        total: calcularTotal(),
        cuponAplicado
    };

    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));

    alert('Reserva guardada correctamente.');
    limpiarFormularioReserva();
    mostrarReservas();
    cerrarModal('modalReserva');
}

function mostrarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

    if (reservas.length === 0) {
        contenedorReservas.innerHTML = '<p class="mensaje-vacio">Aún no hay citas registradas.</p>';
        return;
    }

    contenedorReservas.innerHTML = reservas.map((reserva, index) => {
        const pedidos = reserva.pedidos.length > 0
            ? `<ul>${reserva.pedidos.map((item) => `<li>${item.cantidad} x ${item.nombre}</li>`).join('')}</ul>`
            : '<p>Sin productos seleccionados.</p>';

        return `
            <article class="card-reserva">
                <h3>${index + 1}. ${reserva.nombre}</h3>
                <p><strong>Fecha:</strong> ${reserva.fecha} - ${reserva.hora}</p>
                <p><strong>Personas:</strong> ${reserva.personas}</p>
                <p><strong>Contacto:</strong> ${reserva.celular}</p>
                ${pedidos}
                <p><strong>Total:</strong> ${formatoPrecio(reserva.total)}</p>
            </article>
        `;
    }).join('');
}
function vaciarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

    if (reservas.length === 0) {
        alert('No hay reservas para eliminar.');
        return;
    }
    const confirmar = confirm('¿Seguro que deseas eliminar todas las reservas?');
    if (!confirmar) {
        return;
    }
    localStorage.removeItem('reservas');
    mostrarReservas();
    alert('Reservas eliminadas.');
}
function configurarFechaMinima() {
    const hoy = new Date().toISOString().split('T')[0];
    fechaReserva.min = hoy;
}
renderMenu();
renderProductosReserva();
configurarFechaMinima();
actualizarPedido();
formulario.addEventListener('submit', guardarReserva);
document.querySelectorAll('.nav-principal a').forEach((enlace) => {
    enlace.addEventListener('click', cerrarMenu);
});
document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (evento) => {
        if (evento.target === modal) {
            cerrarModal(modal.id);
        }
    });
});
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        document.querySelectorAll('.modal.activo').forEach((modal) => cerrarModal(modal.id));
        cerrarMenu();
    }
});
