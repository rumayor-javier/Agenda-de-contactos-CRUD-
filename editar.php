<?php 

    include 'includes/funciones/consultas.php';
    include 'includes/layouts/header.php';

    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);

    if(!$id) {
        die('No es válido');
    }

    $resultado = obtenerContacto($id);

    $contacto = $resultado->fetch_assoc();

?>


<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn volver">Volver</a>
        <h1>Editar Contacto</h1>
    </div>
</div>
<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto">
        <legend>Edite el contacto</legend>

        <?php include 'includes/layouts/formulario.php'; ?>
        
    </form>

</div>


<?php include 'includes/layouts/footer.php'; ?>