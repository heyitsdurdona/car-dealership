const BASE_URL = "https://json-api.uz/api/project/fn37/"

export async function login(user) {
    const req = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const res = await req.json();

    if(req.status === 200){
        return res;
    }else{
        throw new Error(res.message || "Login xatolik bo'ldi");
    }
}

export async function addProducts(obj){
    const token = JSON.parse(localStorage.getItem(user))?.access_token
    const req = await fetch("https://json-api.uz/api/project/fn37/cars", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(obj),
    });

    const res = await req.json();

    if(req.status === 200){
        return res;
    }else{
        throw new Error("Xatolik bo'ldi");
    }

}


export async function getProducts(){
    const req = await fetch("https://json-api.uz/api/project/fn37/cars");

    const res = await req.json();

    if(req.status === 200){
        return res;
    }else{
        throw new Error("Xatolik bo'ldi");
    }

}