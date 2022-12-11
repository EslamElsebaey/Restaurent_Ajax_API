// select variables

let userArray = [];
let myRow = document.querySelector(".row");
let selectBox = document.getElementById("selectBox");
let modal = document.querySelector(".modal");
let items;

// use select to choose your favourite recipe
selectBox.addEventListener("change" , function(){
  getData(this.value);
  window.scrollTo(0, 600);
})

// get data from APi
function getData(type) {
  let request = new XMLHttpRequest();
  request.open("GET", "https://forkify-api.herokuapp.com/api/search?q=" + type);
  request.send();
  request.addEventListener("readystatechange", function () {
    if (request.readyState == 4 && request.status == 200) {
      userArray = JSON.parse(request.response);
      userArray = userArray.recipes;
      displayData();
      items = document.querySelectorAll(".item");
      for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function (e) {
          getRecipes(e.target.id);
        });
      }
    }
  });
}
getData("pizza");


// display data in HTML
function displayData() {
  let cols = "";
  for (let i = 0; i < userArray.length; i++) {
    cols += ` <div class="col-lg-4 col-md-6">
      <div class="item text-center bg-white p-4 shadow-lg" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <h4>${userArray[i].publisher}</h4>
        <p>${userArray[i].title}</p>
        <img  src="${userArray[i].image_url}" class="w-100 "  id="${userArray[i].recipe_id}">
      </div>
    </div>`;
  }
  myRow.innerHTML = cols;
}



// get recipe details

let recipesArray;
let modalBody = document.querySelector(".modal-body");

function getRecipes(imgId) {
  let recipeRequest = new XMLHttpRequest();

  recipeRequest.open(
    "GET",
    "https://forkify-api.herokuapp.com/api/get?rId=" + imgId
  );
  recipeRequest.send();
  recipeRequest.addEventListener("readystatechange", function () {
    if (recipeRequest.readyState == 4 && recipeRequest.status == 200) {
      recipesArray = JSON.parse(recipeRequest.response).recipe;
      displayRecipes();
    }
  });
}


// display recipe details
function displayRecipes() {
  let info = "";
  info += `<img src="${recipesArray.image_url}" class = "w-100"  />
      <h4>${recipesArray.title}</h4>
        <h6 class="mb-3">${recipesArray.publisher}</h6>
        <ul class="list-unstyled">
  <li>1- ${recipesArray.ingredients[0]}</li>
  <li>2- ${recipesArray.ingredients[1]}</li>
  <li>3- ${recipesArray.ingredients[2]}</li>
  <li>4- ${recipesArray.ingredients[3]}</li>
  <li>5- ${recipesArray.ingredients[4]}</li>
  <li>6- ${recipesArray.ingredients[5]}</li>
</ul>
`;
  modalBody.innerHTML = info;
}


// navbar fixed top

let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 200) {
    navbar.classList.add("bg-white");
    navbar.classList.add("shadow-lg");
    navbar.classList.add("fixed-top");
  } else {
    navbar.classList.remove("shadow-lg");
    navbar.classList.remove("fixed-top");
    navbar.classList.remove("bg-white");
  }
});


// search function

let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  console.log("yes")
  let divs = "";
  for (let i = 0; i < userArray.length; i++) {
    if (
      userArray[i].title.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      divs += ` <div class="col-lg-4 col-md-6">
      <div class="item text-center bg-white p-4 shadow-lg" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <h4>${userArray[i].publisher}</h4>
        <p>${userArray[i].title}</p>
        <img  src="${userArray[i].image_url}" class="w-100 "  id="${userArray[i].recipe_id}">
      </div>
    </div>`;
    }
  }
  myRow.innerHTML = divs;
  if (myRow.innerHTML == "") {
    myRow.innerHTML = `<h2 class="text-danger text-center">There are no Matched Recipes</h2>`;
    myRow.style.height = "200px";
  }
});




// to top button 
$(window).scroll(function(){
  if($(window).scrollTop() > 150){
    $(".toTop").addClass("showToTop")
  }else{
    $(".toTop").removeClass("showToTop")
  }
})

$(".toTop").click(function(){
  $('html, body').animate({scrollTop:0}, 400);
}) 