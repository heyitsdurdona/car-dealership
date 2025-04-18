const BASE_URL = "https://json-api.uz/api/project/fn37/"

export async function login(user) {
    const req = await fetch("https://json-api.uz/api/project/fn37/auth/login", {
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
        throw new Error("Xatolik bo'ldi");
    }
}