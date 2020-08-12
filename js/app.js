const formularioContactos = document.querySelector('#contacto'),
    listadoContactos = document.querySelector('#listado-contactos tbody'),
    inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners() {
    //Cuando el formulario crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);

    //Listener para eliminar el contacto
    if (listadoContactos) {
        listadoContactos.addEventListener('click', eliminarContacto);
    }

    //Buscador
    if (inputBuscador) {
        inputBuscador.addEventListener('input', buscarContactos);
    }
    numeroContactos();

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
            //leer el id
            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);

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
        numeroContactos();
    }

    // 4. Enviar los datos
    xhr.send(datos)
}

function actualizarRegistro(datos) {
    //llamado a AJAX
    // 1. crear objeto
    const xhr = new XMLHttpRequest();

    // 2. abrir la conexion
    xhr.open('POST', 'includes/modelos/modelo-contacto.php', true);

    // 3. leer la respuesta
    xhr.onload = function() {
            if (this.status === 200) {
                const respuesta = JSON.parse(xhr.responseText);

                if (respuesta.respuesta === 'correcto') {
                    //mostrar notificacion
                    mostrarNotificacion('Contacto editado', 'correcto')
                } else {
                    //hubo un error
                    mostrarNotificacion('No se realizarón cambios', 'error');
                }
                //Despues de 4 seg redireccionar
                setTimeout(() => {
                    window.location.href = 'index.php';
                }, 4000);
            }
        }
        // 4. enviar la peticion
    xhr.send(datos);

}

//Eliminar el contacto
function eliminarContacto(e) {
    if (e.target.parentElement.classList.contains('btn-borrar')) {
        //tomar id de elemento a eliminar
        const id = e.target.parentElement.getAttribute('data-id');

        //preguntar a usuario si esta seguro
        const respuesta = confirm('Esta apunto de eliminar el contacto desea continuar?');
        if (respuesta) {
            //llamado a AJAX
            // 1. crear objeto
            const xhr = new XMLHttpRequest();

            // 2. abrir la conexion
            xhr.open('GET', `includes/modelos/modelo-contacto.php?id=${id}&accion=borrar`, true);

            // 3. leer la respuesta
            xhr.onload = function() {
                    if (this.status === 200) {
                        const resultado = JSON.parse(xhr.responseText);

                        if (resultado.respuesta === 'correcto') {
                            //Eliminar registro del DOM
                            e.target.parentElement.parentElement.parentElement.remove();

                            //Mostrar notificacion
                            mostrarNotificacion('Contacto eliminado', 'correcto');

                            //Actualizar el número de contactos
                            numeroContactos();
                        } else {
                            //Mostrar una notificacion
                            mostrarNotificacion('Hubo un error...', 'error');
                        }
                    }
                }
                // 4. enviar la peticion
            xhr.send();
        }
    }
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

/** Buscador de registros */
function buscarContactos(e) {
    const expresion = new RegExp(e.target.value, "i");
    registros = document.querySelectorAll('tbody tr');

    registros.forEach(registro => {
        registro.style.display = 'none';

        if (registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1) {
            registro.style.display = 'table-row';
        }
    })
    numeroContactos();
}

/** Muestra el número de Contactos */
function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr'),
        contenedorNumero = document.querySelector('.total-contactos span');

    let total = 0;

    totalContactos.forEach(contacto => {
        if (contacto.style.display === '' || contacto.style.display === 'table-row') {
            total++;
        }
    });

    // console.log(total);
    contenedorNumero.textContent = total;
}