"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Define the HTML input elements with TypeScript
let pfname = document.getElementById("pfname");
let pusername = document.getElementById("username");
let password = document.getElementById("password");
let pconfirm = document.getElementById("passwordConfirm");
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
    constructor(pfname, pusername, password, pconfirm, profileImage) {
        this.pfname = pfname;
        this.pusername = pusername;
        this.password = password;
        this.pconfirm = pconfirm;
        this.profileImage = profileImage;
    }
}
function userSubmition() {
    let underHint = document.getElementById("under-hint");
    if (!pfname.value || !pusername.value || !password.value || !pconfirm.value) {
        underHint.innerHTML = "Oh man, you missed some fields!";
        clearHint();
        return false;
    }
    else if (password.value !== pconfirm.value) {
        underHint.innerHTML = "Passwords do not match.";
        clearHint();
        return false;
    }
    else {
        let newPost = new Person(pfname.value, pusername.value, password.value, pconfirm.value, sessionStorage.getItem("personProfileImage") || "");
        sessionStorage.setItem("person", JSON.stringify(newPost));
        window.location.href = "../pages/login.html";
    }
}
function clearHint() {
    return __awaiter(this, void 0, void 0, function* () {
        yield delay(3000);
        const underHint = document.getElementById("under-hint");
        underHint.innerHTML = "";
    });
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
