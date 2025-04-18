export function validator(obj){
    if(obj.username.trim() == ""){
        return {
            target: "username",
            message: "Foydalanuvchi ismi bo'sh bo'lishi mumkin emas"
        }
    }

    if(obj.password.trim() == ""){
        return {
            target: "password",
            message: "Foydalanuvchi paroli bo'sh bo'lishi mumkin emas"
        }
    }
    return false;
}

export function cardInputValidator(obj){
    if(obj.name.trim() == ""){
        return {
            target: "name",
            message: "Car name bo'sh bo'lishi mumkin emas"
        }
    }

    if(obj.description.trim() == ""){
        return {
            target: "description",
            message: "Car description bo'sh bo'lishi mumkin emas"
        }
    }
    if(obj.price.trim() == ""){
        return {
            target: "price",
            message: "Car price bo'sh bo'lishi mumkin emas"
        }
    }

    return false;
}


export function showToast(type, message) {
    const toast = document.getElementById(`toast-${type}`);
    const msgContainer = toast.querySelector(".toast-message");
    msgContainer.textContent = message;

    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}