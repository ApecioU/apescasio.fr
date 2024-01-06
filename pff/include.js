var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("fileContents").innerHTML = this.responseText;
    }
};
xhttp.open("GET", "/pff/nav.html", true);
xhttp.send();
