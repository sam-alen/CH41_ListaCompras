//code
//buttons
let btnAgregar = document.getElementById('btnAgregar');
let btnClear = document.getElementById('btnClear');


//Fields
let txtNombre = document.getElementById('Name');
let txtNumber = document.getElementById('Number');

//Validations
let alertValidacionesTexto = document.getElementById('alertValidacionesTexto');

//tabla
let alertValidaciones = document.getElementById('alertValidaciones');
let tablaListaCompras = document.getElementById('tablaListaCompras');
let cuerpoTabla = tablaListaCompras.getElementsByTagName('tbody').item(0);

let totalEnProductos = document.getElementById('totalEnProductos');
let productosTotal = document.getElementById('productosTotal');
let contadorProductos = document.getElementById('contadorProductos');
let precioTotal = document.getElementById('precioTotal');

//events
let isValid=true;
let precio;
let contador = 0;
let costoTotal = 0;
let totalEnProducto = 0;

//Array para almacenar los datos
let datos = new Array()

//function validad cantidad
function validarCantidad(){
    if (txtNumber.value.length==0){
        return false;
    }

    if (isNaN(txtNumber.value)){
        return false;
    }

    if(parseFloat(txtNumber.value)<=0){
        return false;
    }

    if(parseInt(txtNumber.value)!=txtNumber.value){
        return false;
    }

    return true;
}

//function getPrecio
function getPrecio(){
    return Math.floor(((Math.random() *100)*100))/100;
}

//Boton de Agregar
btnAgregar.addEventListener("click", function(event){
    let isValid = true;
    event.preventDefault();
    alertValidaciones.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    if (txtNombre.value.length<3) {
        alertValidaciones.innerHTML="El campo <strong>Nombre</strong> es requerido<br/>";
        alertValidaciones.style.display="block";
        txtNombre.style.border="solid thin red";
        isValid = false;
    }// txtNombre < 3
    if (! validarCantidad()){
        alertValidaciones.innerHTML+="El campo <strong>Cantidad</strong> es requerido<br/>";
        alertValidaciones.style.display="block";
        txtNumber.style.border="solid thin red";localStorage.setItem("costoTotal", costoTotal.toFixed(2));
        isValid = false;
    }//if ! validarCantidad
    if (isValid){
        contador++;
        precio = getPrecio();
        let row = `<tr>
                        <td>${contador}</td>
                        <td>${txtNombre.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;
        let elemento = `{"id" : ${contador},
                        "nombre": "${txtNombre.value}",
                        "cantidad": "${txtNumber.value}",
                        "precio": ${precio}}`;

                        
        datos.push( JSON.parse(elemento));
        //convertir los datos a un JSON
        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText= contador;
        totalEnProductos+= Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        costoTotal += (precio * Number(txtNumber.value));
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`; 

        localStorage.setItem("contador", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal.toFixed(2));


        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();
    }//isValid
});// btnAgregar click

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    alertValidaciones.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText=contador;
    txtNombre.value="";
    txtNumber.value="";
    cuerpoTabla.innerHTML="";
    contador=0;
    totalEnProductos = 0;
    costoTotal = 0;
    localStorage.setItem("contador", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    datos = new Array();
    localStorage.removeItem("datos");
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
});// btnClear click

window.addEventListener("load", function(event){
    if (localStorage.getItem("contador")!=null){
        contador = Number(localStorage.getItem("contador"));
    }

    if(localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos= Number(localStorage.getItem("totalEnProductos"));
    }

    if(localStorage.getItem("costoTotal")!=null){
        costoTotal= Number(localStorage.getItem("costoTotal"));
    }
    

    // Revisar de la existencia de los datos
    if(localStorage.getItem("datos")!=null){
        datos = JSON.parse(localStorage.getItem("datos"));
        datos.forEach((r) => {
            let row = `<tr>
                <td>${r.id}</td>
                <td>${r.nombre}</td>
                <td>${r.cantidad}</td>
                <td>${r.precio}</td>
            </tr>`;
            //insertar en la tabla del HTML
            cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });
    }


    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText=  `$ ${costoTotal.toFixed(2)}`;
});