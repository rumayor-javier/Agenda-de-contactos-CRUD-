const formularioContactos = document.querySelector('#contacto'),
    listadoContactos = document.querySelector('#listado-contactos tbody');

eventListeners();

function eventListeners() {
    //Cuando el formulario crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);

    //Listener para eliminar el contacto
    listadoContactos.addEventListener('click', eliminarContacto);

}

function leerFormulario(e) {
    e.preventDefault();

    //Leer datos de inputs
    const nombre = document.querySelector('#nombre').value,
        empresa = document.querySelector('#empresa').value,
        telefono = document.querySelector('#telefono').value,
        accion = document.querySelector('#accion').value;

    if (nombre === '' || empresa === '' || telefono === '') {
        // 2 parametros: texto y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    } else {
        //Pasa validacion, entonces -> crear llamado AJAX
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        if (accion === 'crear') {
            //Crearemos un nuevo elemento del contacto
            insertarBD(infoContacto);
        } else {
            //editar el contacto
        }
    }
}

// Inserta en la base de datos via AJAX 
function insertarBD(datos) {
    //Llamado AJAX

    // 1. Cear objeto

    const xhr = new XMLHttpRequest();

    // 2. Abrir la conexion

    xhr.open('POST', 'includes/modelos/modelo-contacto.php', true);

    // 3. Pasar los datos

    xhr.onload = function() {
        if (this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            //leemos la respuesta de PHP
            const respuesta = JSON.parse(xhr.responseText);

            //Insertamos nuevo elemnto al DOM
            const nuevoContacto = document.createElement('tr');
            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            //crear contenedor para los botones
            const contenedorAcciones = document.createElement('td');

            //crear icono editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            //crear enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=respuesta.datos.id_insertado`;
            btnEditar.classList.add('btn', 'btn-editar');

            //agregarlo al padre
            contenedorAcciones.appendChild(btnEditar);

            //crear icono eliminar
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            //crear boton de eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar');

            //agregarlo al padre
            contenedorAcciones.appendChild(btnEliminar);

            //agregarlo al tr
            nuevoContacto.appendChild(contenedorAcciones);

            //agregarlo con los contactos
            listadoContactos.appendChild(nuevoContacto);

            //resetar el form
            document.querySelector('form').reset();

            //mostrar la notificacion de correcto
            mostrarNotificacion('Nuevo contacto añadido', 'correcto');

        }
    }

    // 4. Enviar los datos
    xhr.send(datos)
}

//Notificacion en pantalla
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));
    //Ocultar y mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible');

        setTimeout(() => {
            notificacion.classList.remove('visible');

            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000);
    }, 100);
}