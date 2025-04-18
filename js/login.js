import "./protector.js"
import { login } from "./request.js";
import { validator } from "./utils.js";

function showToast(type, message) {
    const toast = document.getElementById(`toast-${type}`);
    const msgContainer = toast.querySelector(".toast-message");
    msgContainer.textContent = message;

    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}

const elForm = document.getElementById("form");

elForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    
    const formData = new FormData(evt.target);
    const result = {};

    for(let [key, value] of formData.entries()){
        result[key] = value;
    }
    
    const error = validator(result);
    
    if(error){
        showToast("danger", error.message);
        evt.target[error.target].focus();
    } else {
        evt.target.dataset.state = "pending";
        login(result).then((res)=>{
            showToast("success", "Tizimga muvaffaqiyatli kirdingiz!");
            localStorage.setItem("user", JSON.stringify(res));
            window.location.replace('/index.html')
        }).catch((err)=>{
            showToast("danger", err.message);
        }).finally(()=>{
            evt.target.dataset.state = "normal";  
            evt.target.reset();
        })
    }
})