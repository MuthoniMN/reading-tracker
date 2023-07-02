document.querySelector("button").addEventListener('click', hideSignUp)

function hideSignUp() {
  document.querySelector("section").classList.remove("noDisp")
  document.querySelector("div").classList.add("noDisp")
  document.querySelector("span").innerText = document.querySelector("#name").value
}

function displayLists(arr, dest) {

  arr.forEach((book) => {
    const [isbn, title] = book.split(": ")
    let tr = document.createElement('tr')


    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`

    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {

        let td1 = document.createElement('td')
        let cover = document.createElement("img")
        cover.src = data[`ISBN:${isbn}`].thumbnail_url
        td1.appendChild(cover)

        let td2 = document.createElement('td')
        td2.textContent = title

        let td3 = document.createElement('td')
        let link = document.createElement('a')
        link.href = data[`ISBN:${isbn}`].preview_url
        link.textContent = title + " Preview"
        td3.appendChild(link)

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        document.querySelector(dest).appendChild(tr)
      })
      .catch(err => {
        console.log(`error ${err}`)
      });
  })
}
if (localStorage.getItem('tbr')) {
  const tbrList =  []
  tbrList.push(localStorage.getItem('tbr'))
  displayLists(tbrList, "#tbr")
} else if(localStorage.getItem('tbr').includes(",")){
  const tbrList =  localStorage.getItem('tbr').split(',')
  displayLists(tbrList, "#tbr")
}

const readList = localStorage.getItem('read').indexOf(',') ? localStorage.getItem('read').split(',') : [].push(localStorage.getItem('tbr'))
displayLists(readList, "#readList")

// 0201558025
document.querySelector('#add').addEventListener('click', getFetch)
const read = []

function getFetch() {
  const choice = document.querySelector('#book').value
  const status = document.querySelector('select').value
  const url = `https://openlibrary.org/isbn/${choice}.json`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      const book = `${choice}: ${data.title}`

      if (status === "Not Started") {
        if (!localStorage.getItem('tbr')) {
          localStorage.setItem('tbr', book)
        } else {
          let newBook = localStorage.getItem('tbr') + "," + book
          localStorage.setItem('tbr', newBook)
        }
      } else {
        if (!localStorage.getItem('read')) {
          localStorage.setItem('read', book)
        } else {
          let newBook = localStorage.getItem('read') + "," + book
          localStorage.setItem('read', newBook)
        }
      }
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}