// Define the HTML input elements with TypeScript
let pfname = document.getElementById("pfname") as HTMLInputElement;
let pusername = document.getElementById("username") as HTMLInputElement;
let password = document.getElementById("password") as HTMLInputElement;
let pconfirm = document.getElementById("passwordConfirm") as HTMLInputElement;

// function handleImageUpload(input: HTMLInputElement) {
//     let profileImage = document.getElementById("profileImage") as HTMLImageElement;
//     let file = input.files ? input.files[0] : null;

//     if (file && file.type.startsWith("image/")) {
//         let reader = new FileReader();
//         reader.onload = function (event) {
//             if (event.target && event.target.result) {
//                 profileImage.src = event.target.result as string;
//                 sessionStorage.setItem("personProfileImage", event.target.result as string);
//             }
//         };
//         reader.readAsDataURL(file);
//     }
// }

class Person {
    pfname: string;
    pusername: string;
    password: string;
    pconfirm: string;
    profileImage: string;

    constructor(pfname: string, pusername: string, password: string, pconfirm: string, profileImage: string) {
        this.pfname = pfname;
        this.pusername = pusername;
        this.password = password;
        this.pconfirm = pconfirm;
        this.profileImage = profileImage;
    }
}

function userSubmition() {
    let underHint = document.getElementById("under-hint") as HTMLElement;

    if (!pfname.value || !pusername.value || !password.value || !pconfirm.value) {
        underHint.innerHTML = "Oh man, you missed some fields!";
        clearHint();
        return false;
    } else if (password.value !== pconfirm.value) {
        underHint.innerHTML = "Passwords do not match.";
        clearHint();
        return false;
    } else {
        let newPost = new Person(pfname.value, pusername.value, password.value, pconfirm.value, sessionStorage.getItem("personProfileImage") || "");
        sessionStorage.setItem("person", JSON.stringify(newPost));
        window.location.href = "../pages/login.html";
    }
}

async function clearHint() {
    await delay(3000);
    const underHint = document.getElementById("under-hint") as HTMLElement;
    underHint.innerHTML = "";
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
