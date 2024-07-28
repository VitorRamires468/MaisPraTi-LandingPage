let lastPage;
function request(url) {
  if (lastPage) {
    let last = document.querySelector(`.${lastPage}`);
    last.classList.remove("actived");
  }
  let mainPage = document.querySelector(".page-content");

  let name = url.replace(".html", "");
  name = name.split("/");
  let page = document.querySelector(`.${name[2]}`);
  let ajax = new XMLHttpRequest();
  ajax.open("GET", url);
  ajax.onreadystatechange = () => {
    if (ajax.readyState === 4 && ajax.status === 200) {
      mainPage.innerHTML = ajax.response;
      page.classList.add("actived");
    }
    if (ajax.readyState === 4 && ajax.status === 404) {
      mainPage.innerHTML =
        "Conexão estabelecida. porém o recurso não foi encontrado.";
    }
  };
  ajax.send();
}

document.addEventListener("DOMContentLoaded", (event) => {
  request(".././tabs/tab1.html");
});
