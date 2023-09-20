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
let mainContainer = document.getElementById("signup-form");
let userArr = [];
let xml = new XMLHttpRequest();
xml.open("GET", "../data/posts.json", true);
xml.onload = function () {
    if (xml.status === 200) {
        let response = JSON.parse(this.responseText);
        let combinedData = response.CombinedData;
        let users = combinedData.User;
        userArr.push(users);
    }
};
xml.send();
function userLogin(pusername, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let person = JSON.parse(sessionStorage.getItem("person") || '{}');
        let profileImage = JSON.parse(sessionStorage.getItem("profileImage") || '{}');
        let underHint = document.getElementById("under-hint");
        if (person.pusername !== pusername && person.password === password ||
            person.pusername !== pusername && person.password !== password
            || person.pusername == null || person.password == null) {
            underHint.innerHTML = "Seems like this username does not exist!";
            clearHint2();
        }
        else if (person.pusername === pusername && person.password !== password) {
            underHint.innerHTML = "Seems like it's the wrong password!";
            clearHint2();
        }
        else if (person.pusername === pusername && person.password === password) {
            if (profileImage) {
                mainContainer.innerHTML = `
            <div class="loadingGif">
            </div>
            <p class="welcomeUser">Hey ${person.pusername}!</p>
            <p>We're Loading Your Profile, Not Prog Bar, No Tiiiimmmeee</p>
            </div>`;
            }
            else {
                mainContainer.innerHTML = `
            <div class="loadingGif">
            </div>
            <p class="welcomeUser">Hey ${person.pusername}!</p>
            <p>We're Loading Your Profile, Not Prog Bar, No Tiiiimmmeee</p>
            </div>`;
            }
            yield delay2(3000);
            window.location.href = "../pages/index.html";
        }
    });
}
function clearHint2() {
    return __awaiter(this, void 0, void 0, function* () {
        yield delay2(3000);
        let underHint = document.getElementById("under-hint");
        underHint.innerHTML = " ";
    });
}
function delay2(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
