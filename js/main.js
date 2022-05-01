function obtenerNoticias() {
  let xmlhttp = new XMLHttpRequest();
  let url =
    "https://newsapi.org/v2/top-headlines?sources=google-news-ar&apiKey=01f732e95a9448b697af56960a03675c";

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
        obj.articles[i].urlToImage +
        "'><h3>" +
        obj.articles[i].title +
        "</h3><span>" +
        obj.articles[i].author +
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
