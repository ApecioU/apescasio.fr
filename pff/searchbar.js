function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].querySelectorAll(".detailsHolder")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            [...li[i].querySelectorAll("details")]
                .map(details => { details.removeAttribute("open"); return details; })
                .filter(details => details.textContent.toUpperCase().indexOf(filter) > 1)
                .forEach(details => details.setAttribute("open", "true"));
            const markInstance = new Mark(li[i]);
            markInstance.unmark();
            markInstance.mark(filter);
        } else {
            li[i].style.display = "none";
        }
    }
}