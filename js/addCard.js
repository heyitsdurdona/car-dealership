import "./protector.js";
import { addProducts } from "./request.js";
import { cardInputValidator, showToast } from "./utils.js";

const elAddCarForm = document.getElementById("addCarForm");
const elCancelBtn = document.getElementById("cancelBtn");

elCancelBtn.addEventListener("click", function(evt){
    localStorage.setItem("mainPage", Date.now());
    window.location.replace("/index.html");
})


elAddCarForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const result = {};

    for(let [key, value] of formData.entries()){
        result[key] = value;
    }

    const error = cardInputValidator(result);

    if (error){
        showToast("danger", error.message);
        localStorage.setItem("error", JSON.stringify({
            message: error.message,
            target: error.target,
            timestamp: Date.now()
        }));
        evt.target[error.target].focus();
    }
    else {
        addProducts(result)
        .then((res)=>{
            showToast("success", "Car added successfully");
            localStorage.setItem("mainPage", Date.now());
            window.location.replace("/index.html");
        })
        .catch((err)=>{
            showToast("danger", err.message);
        })
        
    }

    evt.target.reset()
    
    
})


window.addEventListener("storage", function (event) {
    console.log(event.key);
    if (event.key === "carSync") {
        renderCars();
    }

    if(event.key === "addElement"){
        window.location.replace("/pages/addCard.html");
        localStorage.removeItem("addElement");
    }

    if(event.key === "mainPage"){
        window.location.replace("/index.html");
        showToast("success", "Car added successfully");
        setTimeout(() => {
            localStorage.removeItem("mainPage");
        }, 100);
    }

    if (event.key === "error") {
            const errorData = JSON.parse(event.newValue);
            showToast("danger", errorData.message);
            const input = document.querySelector(`[name="${errorData.target}"]`);
            if (input) input.focus();
            localStorage.removeItem("error");
    }
});


