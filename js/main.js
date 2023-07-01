// document.querySelector("#start").addEventListener('click', () => {
//     document.querySelector("span").innerText =     document.querySelector("#name").value

//     document.querySelector("form").classList.add("noDisp")
//     document.querySelector("section").classList.remove("noDisp")
// })

// 0201558025
document.querySelector('#add').addEventListener('click', getFetch)
const tbr = []
const read = []

function getFetch(){
  const choice = document.querySelector('#book').value
  const status = document.querySelector('select').value
  console.log(choice)
  const url = `https://openlibrary.org/isbn/${choice}.json`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        const book = `${choice}: ${data.title}`

        if(status === "Not Started"){
          tbr.push(book)
          localStorage.setItem('tbr', tbr)

        }else{
          read.push(book)
          localStorage.setItem('read', read)
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
