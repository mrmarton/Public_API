/* Techdegree project 5  
Random Employee directory
Student Imre Marton
*/

const galleryDiv = document.getElementById('gallery');
const cards = galleryDiv.getElementsByClassName('card');
const searchDiv = document.querySelector('.search-container');
const modalContainer = document.getElementsByClassName('modal-container');
 // IMPORTANT: Below is only for exceeds tasks 
const closeButton = document.getElementsByClassName('modal-close-btn');
const prevButton = document.getElementsByClassName('modal-prev btn');
const nextButton = document.getElementsByClassName('modal-next btn');

//display 12 users
const url = "https://randomuser.me/api/?results=12";
//Fetch the random users from the random user api above
fetch(url)
    .then(response => response.json())
    .then(data => createEmployees(data.results))
    .catch(error => console.log(error))
//Calls createEmployees and builds up the necessary content

function createEmployees(data) {
 let employees = data.map(employee =>  `
     <div class="card">

            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="employee profile picture">
            </div>

            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.title} ${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
             </div> 
    </div> 

        <div class="modal-container" style="display:none">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.large}" alt="employee profile picture">

                    <h3 id="name" class="modal-name cap">${employee.name.title} ${employee.name.first} ${employee.name.last}</h3>
                    
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <br>

                    <p class="modal-text">Tel.: ${employee.phone}</p>
                    <p class="modal-text">Address: ${employee.location.street}, ${employee.location.state}</p>
                    <p class="modal-text">Postcode: ${employee.location.postcode}</p>
                    <p class="modal-text">B.O.D: ${employee.dob.date}, Age: ${employee.dob.age} </p>
                </div>
                <div class="modal-btn-container">

                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>

                   
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        </div>  
        `
    ).join("");
    galleryDiv.innerHTML = employees; 


//Note: Your search feature should filters results that are already on the page. So don't request new info from the API for your search.
let searchHTML = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search for employee">
        </form>
    `
searchDiv.innerHTML = searchHTML;

//event listener to display search, stackoverflow searchbar blog
const searchBar = document.querySelector('#search-input');
searchBar.addEventListener('keyup', function(e){
const searchTerm = e.target.value.toLowerCase()
const cardInfo = document.getElementsByClassName('card-info-container');
let cardInfoArr = Array.from(cardInfo);
    cardInfoArr.forEach(function(element) {

            const cardName = element.firstElementChild.textContent;

            if (cardName.toLowerCase().indexOf(searchTerm) != -1) {
            element.parentElement.style.display = '';
            } else {

            element.parentElement.style.display = 'none';        
            }
        })
    });

    for (let i = 0; i < cards.length; i++) { 
        cards[i].addEventListener('click', function() {
            if (cards[i]) {
                modalContainer[i].style.display = '';
            } else {
                modalContainer[i].style.display = 'none';
            }   
        })

    }

    for (let i = 0; i < closeButton.length; i++) {
    closeButton[i].addEventListener('click', () => {
            if (closeButton[i]) {
                    modalContainer[i].style.display = 'none'; 
            }
        })
    }

    for (let i = 0; i < prevButton.length; i++) {
        prevButton[i].addEventListener('click', function(){
            let len = modalContainer.length;
            let prevModal = modalContainer[(i+len-1)%len];
        
            if (prevButton) {
                modalContainer[i].style.display = 'none'; 
                prevModal.style.display = '';
        
            } else {
                prevModal.style.display = 'none';
            }
        })
    }

    for (let i = 0; i < nextButton.length; i++) {
        nextButton[i].addEventListener('click', function() {
            let len = modalContainer.length;
            let prevModal = modalContainer[(i+len-1)%len];
            let nextModal = modalContainer[(i+1)%len];

            if (nextButton) {
                modalContainer[i].style.display = 'none'; 
                nextModal.style.display = '';
                prevModal.style.display = 'none';
            } else {
                nextModal.style.display = 'none';

            }
        })

    }
   
}   





