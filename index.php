<?php include 'includes/layouts/header.php'; ?>

<div class="contenedor-barra">
    <h1>Agenda de contactos</h1>
</div>
<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto">
        <legend>Añada un contacto<span>Todos los campos son obligatorios</span></legend>

        <?php include 'includes/layouts/formulario.php'; ?>
        
    </form>

</div>

<div class="bg-blanco contenedor sombra contactos">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>

        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar Contacto...">

        <p class="total-contactos"><span>2</span> Contactos</p>

        <div class="contenedor-tabla">
            <table id="listado-contactos" class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Juan</td>
                        <td>Udemy</td>
                        <td>018005498456</td>
                        <td><a href="editar.php?id=1"  class="btn-editar btn">
                            <i class="fas fa-pen-square"></i>
                        </a>
                        <button data-id="1" type="button" class="btn-borrar btn">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>
</div>


<?php include 'includes/layouts/footer.php'; ?>