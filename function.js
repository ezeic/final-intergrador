// Funciones para adecuar y mostrar los datos recibidos en la página
function reemplazarNombreEnTexto( id, json ){
    document.getElementById(id).innerHTML = document.getElementById(id).innerHTML.replace( "Nombre", json.results[0].name.first + ' ' + json.results[0].name.last );
}

function reemplazarTexto( id, cambiar, atributo ){
    document.getElementById( id ).innerHTML = document.getElementById( id ).innerHTML.replace( cambiar, atributo );
}

function acomodarFechaDeNacimiento( json ){
    let fecha = "";
    let i;

    for( i=0; i < 2; i++ ){
        fecha += json.results[0].dob.date[i+8];
    }

    fecha += '/';

    for( i=3; i < 5; i++ ){
        fecha += json.results[0].dob.date[i+2];
    }
    
    fecha += '/';

    for( i=6; i < 10; i++ ){
        fecha += json.results[0].dob.date[i-6];
    }

    return fecha;
    //console.log("fecha = " + fecha );
    
}

function reemplazarDatos( json ){

    //nombre
    reemplazarNombreEnTexto( "titulo", json );
    reemplazarNombreEnTexto( "presentacion", json );
    reemplazarNombreEnTexto( "nombre", json );
    document.getElementById( "heading" ).innerHTML = json.results[0].name.title + ' ' + json.results[0].name.first + ' ' + json.results[0].name.last ;

    //fotos
    document.getElementById( "favicon" ).href = json.results[0].picture.thumbnail;
    document.getElementById( "foto-perfil" ).src = json.results[0].picture.large;

    //edad
    reemplazarTexto( "edad", "Edad", json.results[0].dob.age );
    reemplazarTexto( "presentacion", "Edad", json.results[0].dob.age );
    reemplazarTexto( "edad", "Date", acomodarFechaDeNacimiento( json ) );
  
    //contacto
    reemplazarTexto( "celular", "Numero", json.results[0].cell );
    reemplazarTexto( "telefono", "Numero", json.results[0].phone );
    reemplazarTexto( "email", "Mail", json.results[0].email );



    //ciudad de nacimiento
    document.getElementById( "presentacion" ).innerHTML = document.getElementById( "presentacion" ).innerHTML.replace( "Ciudad",  json.results[0].location.city + ',' + ' ' + json.results[0].location.state + ',' + ' ' + json.results[0].location.country );

}


// Peticion de datos
const requestURL = "https://randomuser.me/api/?nat=mx";

fetch( requestURL )
.then( (response) => response.json() )
.then( (json) => { 
    console.log(json)
    reemplazarDatos( json );
} )
.catch( console.error );


// Generación del Form para contacto
function generarForm(){
	
	let formulario = document.createElement( "form" );      //  Crear los objetos formulario, boton de enviar 
    let cajaNombre = document.createElement( "input" );     //  y cajas de textos para nombre, empresa, email, asunto y mensaje
    let cajaEmpresa = document.createElement( "input" ); 
    let cajaEmail = document.createElement( "input" );      
    let cajaAsunto = document.createElement( "input") ;     
    let cajaMensaje = document.createElement( "textarea" ); 
    let botonEnviar = document.createElement( "input" );             
 
	//  Atributos de formulario
   	formulario.setAttribute( 'method', "post" );
  	formulario.setAttribute( 'action', "" );
    formulario.setAttribute( 'id', "form" );
 
   	//  Atributos de Nombre
   	cajaNombre.setAttribute('type', "text" );
   	cajaNombre.setAttribute('placeholder', "Nombre" );
   	cajaNombre.setAttribute('class', "caja-texto" );
 
    //  Atributos de Empresa
    cajaEmpresa.setAttribute('type', "text");
    cajaEmpresa.setAttribute('placeholder', "Empresa");
    cajaEmpresa.setAttribute('class', "caja-texto");
 
   	//  Atributos de Email
    cajaEmail.setAttribute('type', "text");
    cajaEmail.setAttribute('placeholder', "Email");
   	cajaEmail.setAttribute('class', "caja-texto");
 
  	//  Atributos de Asunto
  	cajaAsunto.setAttribute('type', "text");
  	cajaAsunto.setAttribute('placeholder', "Asunto");
  	cajaAsunto.setAttribute('class', "caja-texto");
 
   	//  Atributos de Mensaje  
   	cajaMensaje.setAttribute('placeholder', "Mensaje");
    cajaMensaje.setAttribute('id', "caja-mensaje");
 
    //  Atributos de boton Enviar 
	botonEnviar.setAttribute('type', "button");
    botonEnviar.setAttribute('value', "Enviar");
    botonEnviar.setAttribute('id', "boton-enviar");
    botonEnviar.setAttribute('onclick', "alert('Se envio el mensaje')");

    // Se agregan los objetos al formulario
    formulario.appendChild( cajaNombre );
    formulario.appendChild( cajaEmpresa );
    formulario.appendChild( cajaEmail );
    formulario.appendChild( cajaAsunto );
    formulario.appendChild( cajaMensaje );
  	formulario.appendChild( botonEnviar );


    //  Agregar el formulario a la etiquete con el id	
  	document.getElementById('seccion-contacto').appendChild(formulario);   		
}
 
// Botón generar form
let yaSePresiono = false;
document.getElementById( "boton" ).onclick = function(){
    if( !yaSePresiono ){
        generarForm();
        yaSePresiono = true;
    }
} 