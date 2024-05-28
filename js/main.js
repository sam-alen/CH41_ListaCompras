//code
//buttons
let btnAgregar = document.getElementById('btnAgregar');
let btnClear = document.getElementById('btnClear');


//Fields
let txtNombre = document.getElementById('Name');
let txtNumber = document.getElementById('Number');

//Validations
let alertValidacionesTexto = document.getElementById('alertValidacionesTexto');
let alertValidaciones = document.getElementById('alertValidaciones');
let tablaListaCompras = document.getElementById('tablaListaCompras');
let cuerpoTabla = tablaListaCompras.getElementsByTagName('tbody').item(0);

//events

function validarCantidad() {
    if(txtNumber.value.length == 0) {
        return false;
    } 
    return true;
}

btnAgregar.addEventListener("click", function(event) {
    event.preventDefault();
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    if (txtNombre.value.length <3 || txtNumber.value == "") {
        alertValidacionesTexto.innerHTML = "El nombre debe tener al menos 3 caracteres <br />";
        alertValidaciones.style.display = "block";
        txtNombre.style.border = "solid red medium";
    } 

    if(!validarCantidad()) {
        alertValidacionesTexto.innerHTML += "El campo <strong>Cantidad</strong> es requerido";
        alertValidaciones.style.display = "block";
        txtNumber.style.border = "solid red medium";
    }
});

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value="";
    txtNumber.value="";
    cuerpoTabla.innerHTML="";
    contador=0;
    contadorProductos.innerText=contador;
    totalEnProductos = 0;
});