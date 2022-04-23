function contarla() {
  let palabra = prompt("Ingresa una palabra o frase:");

  while (palabra == "") {
    palabra = prompt("Por favor ingresa una palabra o frase:");
  }

  let conteo = 0;

  for (let i = 0; i < palabra.length; i++) {
    if (palabra[i] === palabra[i].toLowerCase() && palabra[i] !== " ") {
      conteo++;
    }
  }

  let plural = "";

  if (conteo !== 1) {
    plural = "s";
  }

  alert("Tu palabra o frase tiene " + conteo + " minúscula" + plural + ".");
}
