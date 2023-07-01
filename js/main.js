document.querySelector("#start").addEventListener('click', () => {
    document.querySelector("span").innerText =     document.querySelector("#name").value

    document.querySelector("form").classList.add("noDisp")
    document.querySelector("section").classList.remove("noDisp")
})