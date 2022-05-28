/*----------------- Sección noticias -----------------*/
/*----------------------------------------------------*/

// Guardando variable de consulta de noticia
let input = document.getElementById("query");

// Guardando variable botón "Obtener noticias"
let botonDeAccion = document.getElementById("obtenerNoticias");

// Listener teclado Enter botón "Obtener noticias"
input.addEventListener("keypress", function (event) {
  event.key === "Enter" && botonDeAccion.click();
});

// Listener click botón "Obtener noticias"
botonDeAccion.addEventListener("click", obtenerNoticias);

function obtenerNoticias() {
  let xmlhttp = new XMLHttpRequest();
  let consulta = document.getElementById("query").value;
  consulta = consulta.trim();

  if (consulta == "")
    return swal({
      text: "Por favor ingresa un tema.",
      icon: "warning",
    });

  let url =
    "https://gnews.io/api/v4/search?q=" +
    consulta +
    "&lang=es&max=5&token=be56fa792e1ba8e4fb52a3633eea134f";

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let myObj = JSON.parse(this.responseText);

      // Continuar armando la noticia en HTML
      generarNoticias(myObj);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  // Continuar guardando la consulta en Últimas búsquedas
  manipularRecientes(consulta);

  // Continuar guardando la consulta como Última consulta.
  ultimaConsulta(consulta);
}

function generarNoticias(obj) {
  let out = "";
  if (obj.articles.length == 0)
    out =
      "<br><p style='text-align: center;'>No se encontraron resultados. Prueba otro tema.</p>";

  out += "<br><ul>";
  let i;
  for (i = 0; i < obj.articles.length; i++) {
    out +=
      "<li style='display: block;'><img src='" +
      obj.articles[i].image +
      "'><h3>" +
      obj.articles[i].title +
      "</h3><span>" +
      obj.articles[i].source.name +
      " - " +
      luxon.DateTime.fromISO(obj.articles[i].publishedAt).toLocaleString(
        luxon.DateTime.DATETIME_SHORT
      ) +
      "</span><p>" +
      obj.articles[i].description +
      "</p><a href='" +
      obj.articles[i].url +
      "' target='_blank'>Leer más</a></li><br>";
  }
  out += "</ul>";

  // Continuar desplegando la noticia
  desplegarNoticias(out);

  // Guardando la noticia en local
  let outJSON = JSON.stringify(out);
  localStorage.setItem("noticias", outJSON);
}

// Consultando storage local por noticias guardadas
let noticiasEnLS = JSON.parse(localStorage.getItem("noticias"));

// Mostrar noticias si están guardadas en local
noticiasEnLS && desplegarNoticias(noticiasEnLS);

function desplegarNoticias(noticias) {
  document.getElementById("id03").innerHTML = noticias;

  // Manteniendo la última consulta guardada en local en el input
  let consultaEnLS = JSON.parse(localStorage.getItem("consulta"));
  if (consultaEnLS) document.getElementById("query").value = consultaEnLS;
}

function manipularRecientes(consulta) {
  // Guardar últimas búsquedas solo si el usuario está loggeado
  if (usuario && usuario != "") {
    busquedasRecientes.unshift(consulta);

    // Guardar solo las 3 últimas
    busquedasRecientes.length > 3 && busquedasRecientes.pop();

    // Guardando las últimas búsquedas en local
    let busquedasRecientesEnJSON = JSON.stringify(busquedasRecientes);
    localStorage.setItem("busquedas", busquedasRecientesEnJSON);

    // Continuar desplegando las búsquedas recientes
    desplegarBusquedasRecientes();
  }
}

function ultimaConsulta(consulta) {
  // Guardando la última consulta en local
  let consultaJSON = JSON.stringify(consulta);
  localStorage.setItem("consulta", consultaJSON);
}

/*----------------- Sección búsquedas -----------------*/
/*-----------------------------------------------------*/

// Revisando si hay búsquedas en local
let busquedasRecientes = JSON.parse(localStorage.getItem("busquedas")) || [];

// Continuar mostrando las búsquedas
desplegarBusquedasRecientes();

function desplegarBusquedasRecientes() {
  if (busquedasRecientes.length > 0) {
    let listadoRecientes = "<p>Últimas búsquedas:</p><ul>";
    for (let i = 0; i < busquedasRecientes.length; i++) {
      listadoRecientes +=
        "<li style='display: block;'>" + busquedasRecientes[i] + "</li>";
    }
    listadoRecientes += "</ul>";
    document.getElementById("id01").innerHTML = listadoRecientes;
  }
}

/*----------------- Sección usuario -----------------*/
/*---------------------------------------------------*/

// Si el usuario está guardado en local desplegarlo
let usuario = JSON.parse(localStorage.getItem("usuario"));
usuario && desplegarUsuario(usuario);

// Guardando variable de botón de registro
let botonUsuario = document.getElementById("registroUsuario");

// Listener click botón de registro
botonUsuario && botonUsuario.addEventListener("click", registroDeUsuario);

function registroDeUsuario() {
  // Consiguiendo el nombre del usuario
  usuario = document.getElementById("usuario").value;
  if (usuario == "")
    return swal({
      text: "Por favor ingresa tu nombre.",
      icon: "warning",
    });

  // Guardando usuario registrado en local
  let usuarioJSON = JSON.stringify(usuario);
  localStorage.setItem("usuario", usuarioJSON);

  // Continuar desplegando el usuario registrado
  desplegarUsuario(usuario);
}

function desplegarUsuario(usuario) {
  document.getElementById("id02").innerHTML =
    "<p>Hola " +
    usuario +
    '</p><input type="button" onclick="cerrarSesion()" value="Cerrar sesión" />';
}

// Cerrando sesión, borrando local y refrescando la página
function cerrarSesion() {
  localStorage.clear();
  document.location.reload();
}
