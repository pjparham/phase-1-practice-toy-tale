let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//get toy data
function getToyData(){
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toyData => toyData.forEach((toy) => {
      // console.log(toy)
      renderCard(toy)
    })))
}
getToyData()

function buyToy(toy){
  console.log(JSON.stringify(toy))
  fetch("http://localhost:3000/toys",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': "application/json"
    },
    body:JSON.stringify(toy)
  })
  .then((response) => response.json())
}


//build card out
function renderCard(toy){
  let div = document.createElement('div')
  const toyCollection = document.getElementById('toy-collection')
  div.classList.add("card")
  toyCollection.appendChild(div)
  div.innerHTML =  `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p><span>${toy.likes}</span> likes</p>
    <button class="like-btn"  id="${toy.id}">Like ❤️</button>
  `
  let button = div.getElementsByClassName("like-btn")
  button[0].addEventListener('click', () => {
    toy.likes+= 1
    div.querySelector('span').textContent = toy.likes
    updateLikes(toy)
  })
  // updateLikes()
}

//Event handlers
function handleSubmit(e){
    e.preventDefault()
    let toyObj = {
      name:e.target.name.value,
      image:e.target.image.value,
      likes: 0
    }
    renderCard(toyObj)
    buyToy(toyObj)
}

//event listeners
let toyForm = document.getElementsByClassName("add-toy-form")
// console.log(toyForm)
toyForm[0].addEventListener(`submit`, handleSubmit)


function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toyObj => console.log(toyObj))
}