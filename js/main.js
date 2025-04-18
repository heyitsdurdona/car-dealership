import "./protector.js"
import { addProducts, getProducts, deleteProduct } from "./request.js";
import { showToast } from "./utils.js";


const elAddButton = document.getElementById('addButton');
const elList = document.getElementById("list");

// Function to get random image
function getRandomImage() {
    const images = [
        'bmw1.jpg',
        'bmw2.jpg',
        'byd1.jpg',
        'byd2.jpg',
        'porsche1.jpg',
        'porsche2.jpg',
        'toyota1.jpg',
        'toyota2.jpg',
        'bugatti1.jpg',
        'bugatti2.jpg',        
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return `./images/${images[randomIndex]}`;
}

// Function to create skeleton loader
function createSkeletonLoader() {
    const li = document.createElement('li');
    li.className = 'w-full';
    
    li.innerHTML = `
        <div class="max-w-[300px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="animate-pulse">
                <div class="h-48 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                <div class="p-5">
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-4"></div>
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                </div>
            </div>
        </div>
    `;
    
    return li;
}

// Function to create a card element
function createCardElement(car) {
    console.log(car.id);
    const li = document.createElement('li');
    li.className = 'w-full';
    
    li.innerHTML = `
        <div class="max-w-[300px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="w-full h-48 object-cover rounded-t-lg" src="${getRandomImage()}" alt="${car.name}" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${car.name}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-4">${car.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold text-gray-900 dark:text-white">$${car.price.toLocaleString()}</span>
                        <button id=${car.id} class="flex justify-end items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-200 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700">
                            Delete
                        </button>
                </div>
            </div>
        </div>
    `;
    
    return li;
}

// Function to show skeleton loaders
function showSkeletonLoaders(count) {
    elList.innerHTML = ''; 
    for (let i = 0; i < count; i++) {
        const skeleton = createSkeletonLoader();
        elList.appendChild(skeleton);
    }
}

// Function to render all cars
export async function renderCars() {
    // Show skeleton loaders first
    showSkeletonLoaders(12);
    
    try {
        const cars = await getProducts();
        elList.innerHTML = ''; 
        
        cars.data.forEach(car => {
            const cardElement = createCardElement(car);
            elList.appendChild(cardElement);
        });
    } catch (error) {
        console.error('Error fetching cars:', error);
        showToast("danger", error.message);
    }
}

// Initial render
renderCars();

elAddButton.addEventListener('click', function(evt){
    window.location.replace("/pages/addCard.html");
    localStorage.setItem("addElement", Date.now());
});

// Delete car
elList.addEventListener("click", function(evt){
    if(evt.target.tagName === "BUTTON"){
        const id = evt.target.id;
        deleteProduct(id).then((res)=>{
            showToast("success", "Car deleted successfully");
            localStorage.setItem("carSync", Date.now());
            evt.target.parentElement.parentElement.remove();
            renderCars();
        })
        .catch((err)=>{
            showToast("danger", err.message);
        })
    }
});



// sync data between tabs
window.addEventListener("storage", function (event) {
    if (event.key === "carSync") {
        showToast("success", "Car deleted successfully");
        renderCars();
        localStorage.removeItem("carSync");
    }

    if(event.key === "addElement"){
        window.location.replace("/pages/addCard.html");
        localStorage.removeItem("addElement");
    }

    if(event.key === "mainPage"){
        window.location.replace("/index.html");
        setTimeout(() => {
            localStorage.removeItem("mainPage");
        }, 100);
    }
});


