function obtenerNoticias() {
  let xmlhttp = new XMLHttpRequest();
  let url =
    "https://gnews.io/api/v4/search?q=ukraine&lang=es&max=5&token=be56fa792e1ba8e4fb52a3633eea134f";

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let myObj = JSON.parse(this.responseText);
      myFunction(myObj);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function myFunction(obj) {
    let out = "<br><ul>";
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
        obj.articles[i].publishedAt +
        "</span><p>" +
        obj.articles[i].description +
        "</p><a href='" +
        obj.articles[i].url +
        "' target='_blank'>Leer más</a></li><br>";
    }
    out += "</ul>";
    document.getElementById("id01").innerHTML = out;
  }
}
