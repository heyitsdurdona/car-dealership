import "./protector.js";
import { addProducts } from "./request.js";
import { cardInputValidator, showToast } from "./utils.js";

const elAddCarForm = document.getElementById("addCarForm");
const elCancelBtn = document.getElementById("cancelBtn");

elCancelBtn.addEventListener("click", function(evt){
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

    if(error){
        showToast("danger", error.message);
        evt.target[error.target].focus();
    }
    else {
        addProducts(result)
        .then((res)=>{
            showToast("success", "Car added successfully");
            window.location.replace("/index.html");
        })
        .catch((err)=>{
            showToast("danger", err.message);
        })
        
    }

    evt.target.reset()
    
    
})


