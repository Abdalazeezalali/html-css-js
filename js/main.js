// check if there is local storage color option
let mainColors = localStorage.getItem("color_option")
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  // remove active class from all colors list item
  document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");

    // add active class on element with data-colors===local storage item 
    if (element.dataset.color === mainColors) {
      // add active class
      element.classList.add("active")
    }
  })
}
// random background option
let backgroundOption = true;

// variable to control the interval
let backgroundInterval;
//check if there is in local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option")
// check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true
  } else {
    backgroundOption = false
  }
  // remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active")
  })
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active")
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active")

  }
}
// toggle spin class on icon 
document.querySelector(".gear").onclick = function () {
  // toggle class rot for rotation on self 
  this.classList.toggle("rot");
  // toggle class open on main class box
  document.querySelector(".settings-box").classList.toggle("open");
}
// switch colors 
const colorsLi = document.querySelectorAll(".colors-list li");
// loop on all list items
colorsLi.forEach(li => {
  //  click on every list items 
  li.addEventListener("click", (e) => {
    console.log(e.target.dataset.color);
    // set color on root 
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    // set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);
    // remove active class from all children
    // e.target.parentElement.querySelectorAll(".active").forEach(element => {
      // element.classList.remove("active");
    // });
    // add active class on self 
    // e.target.classList.add("active");
    handleActive(e)
  });
});

// switch background 
const randomBackgroundsElements = document.querySelectorAll(".random-backgrounds span");
// loop on all spans
randomBackgroundsElements.forEach(span => {
  //  click on every span
  span.addEventListener("click", (e) => {

    // remove active class from all children
    // e.target.parentElement.querySelectorAll(".active").forEach(element => {
      // element.classList.remove("active");
    // });
    // add active class on self 
    // e.target.classList.add("active");
    handleActive(e)
    if (e.target.dataset.background === 'yes') {
      backgroundOption = true
      randomizeImgs()
      localStorage.setItem("background_option", true)

    } else {
      backgroundOption = false
      clearInterval(backgroundInterval)
      localStorage.setItem("background_option", false)
    }
  });
})
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array Of Imgs
let imgsArray = ["01.png", "02.png", "03.png", "04.png", "05.png"];

// function to randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // Change Background Image Url 
      // landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;

    }, 1000);
  }
}
randomizeImgs()

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img")
ourGallery.forEach(img => {
  img.addEventListener('click', (e) => {
    // create overlay element
    let overlay = document.createElement("div")
    // add class to overlay 
    overlay.className = 'popup-overlay'
    // append overlay to the body
    document.body.appendChild(overlay)
    // create the popup 
    let popupBox = document.createElement("div")
    // add class to the popup box
    popupBox.className = "popup-box"
    if (img.alt !== null) {
      // Create heading
      let imgHeading = document.createElement("h3")
      // create text for heading
      let imgText = document.createTextNode(img.alt)
      // append the text to the heading
      imgHeading.appendChild(imgText)
      // append the heading to the popup box 
      popupBox.appendChild(imgHeading)
    }
    // create the img 
    let popupImage = document.createElement("img")
    // set image source
    popupImage.src = img.src;
    // add image to popup box
    popupBox.appendChild(popupImage)
    // append the popup box to the body
    document.body.appendChild(popupBox)
    // create the close span 
    let closeButton = document.createElement("span")
    // create the close button text 
    let closeButtonText = document.createTextNode("X")
    // append text to the close button
    closeButton.appendChild(closeButtonText)
    // add class to close button 
    closeButton.className = "close-button"
    // add close button to the popup box 
    popupBox.appendChild(closeButton)
  })
});
// close popup
document.addEventListener('click', function (e) {
  if (e.target.className == 'close-button') {
    // remove the current popup
    e.target.parentNode.remove()
    // remove overlay 
    document.querySelector(".popup-overlay").remove()
  }
})
// select all bullets
const allBullets = document.querySelectorAll("nav .bullet")
// allBullets.forEach(bull => {
//   bull.addEventListener('click', (e) => {
//     document.querySelector(e.target.dataset.section).scrollIntoView({
//       behavior: "smooth"
//     })
//   })
// })
// select all links
const allLinks = document.querySelectorAll(".links a")
// allLinks.forEach(link => {
//   link.addEventListener('click', (e) => {
//     e.preventDefault()
//     document.querySelector(e.target.dataset.section).scrollIntoView({
//       behavior: "smooth"
//     })
//   })
// })

function toSomewhere(elements) {
 elements.forEach(ele => {
    ele.addEventListener('click', (e) => {
      e.preventDefault()
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      })
    })
  })
}
toSomewhere(allBullets);
toSomewhere(allLinks);
// handle active state
function handleActive(ev){
  // remove active class from all children
  ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
    element.classList.remove("active")
  })
  // add active class on self
  ev.target.classList.add("active")
}
let bulletsSpan=document.querySelectorAll(".bullets-option span");
let bulletsContainer=document.querySelector("nav")
let bulletLocalItem=localStorage.getItem("bullets_option")
if (bulletLocalItem !==null) {
  bulletsSpan.forEach(span =>{
    span.classList.remove("active")
  })
  if (bulletLocalItem==="block") {
    bulletsContainer.style.display="block"
    document.querySelector(".bullets-option .yes").classList.add("active")
  }
else{
  bulletsContainer.style.display="none"
  document.querySelector(".bullets-option .no").classList.add("active")

}
}
bulletsSpan.forEach(span=>{
  span.addEventListener('click',(e)=> {
    if (span.dataset.display==="yes") {
      bulletsContainer.style.display="block"
      localStorage.setItem("bullets_option","block")
    }
    else{
      bulletsContainer.style.display="none"
      localStorage.setItem("bullets_option","none")

    }
    handleActive(e)
  })
})
// reset button
document.querySelector(".reset-options").onclick=function(){
  // localStorage.clear()
  localStorage.removeItem("color_option")
  localStorage.removeItem("background_option")
  localStorage.removeItem("bullets_option")
  window.location.reload()
}

// select skills selector 
let ourSkills = document.querySelector(".skills")
function showWhenScroll(){
  // skills OFFset top 
  let SkillsOffSetTop = ourSkills.offsetTop;
  // console.log(SkillsOffSetTop)
  // skills outer height 
  let skillsOuterHeight = ourSkills.offsetHeight;
  // console.log(skillsOuterHeight)
  // window height 
  let windowHeight = this.innerHeight;
  // console.log(windowHeight)
  // window scroll top
  let windowScrollTop = this.scrollY
  // console.log(windowScrollTop)
  this.console.log(windowHeight)
  if (windowScrollTop + 100 >= (SkillsOffSetTop + skillsOuterHeight - windowHeight)) {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
// toggle menu
let toggleBtn=document.querySelector(".toggle-menu")
let tLinks=document.querySelector(".links")
toggleBtn.onclick=function(e){
  // stop stopPropagation();
  e.stopPropagation();
  this.classList.toggle("menu-active")
  tLinks.classList.toggle("open")
}
// click any where outside menu and toggle button
document.addEventListener("click",(e)=>{
  if (e.target !==toggleBtn && e.target!==tLinks) {
    // check the menu is open
      if (tLinks.classList.contains("open")) {
        toggleBtn.classList.toggle("menu-active")
        tLinks.classList.toggle("open")
      }
  }
})
  // stop stopPropagation();
  tLinks.onclick=function(e){
e.stopPropagation()
  }
// Get the button
let myButton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
scrollFunction()
showWhenScroll()
};

function scrollFunction() {
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    myButton.style.display = "block";
} else {
    myButton.style.display = "none";
}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}
