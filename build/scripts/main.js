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
var _c, _d;
let person = JSON.parse(sessionStorage.getItem("person") || '{}');
var _a, _b;
const log = document.getElementById("log");
let arr = [];
let newArr = [];
showPosts();
welcomeUser();
class User {
    constructor(userId, password) {
        this.userName = userId;
        this.password = password;
    }
}
class Post extends User {
    constructor(proimg, userId, id, body, likes, dislikes) {
        super(userId, '');
        this.proimg = proimg;
        this.num = id;
        this.body = body;
        this.likes = likes;
        this.dislikes = dislikes;
    }
}
function showPosts() {
    let xml = new XMLHttpRequest();
    xml.open("GET", "../data/posts.json", true);
    xml.onload = function () {
        if (xml.status === 200) {
            let response = JSON.parse(this.responseText);
            let combinedData = response.CombinedData;
            let posts = combinedData.Post;
            for (let i = 0; i < posts.length; i++) {
                let post = posts[i];
                let postObject = new Post(post.proimg, post.userName, post.id, post.body, post.likes, post.dislikes);
                newArr.push(postObject);
                showPost2(newArr);
            }
        }
    };
    xml.send();
}
function showPost2(arg) {
    log.innerHTML = "";
    for (let x in arg) {
        let user = arg[x];
        let postId = user.num;
        log.innerHTML += `<div class="post">
        <p class="username-display"><img class="profile-upload-label" src="${user.proimg}"/>
        <span class="username-title">${user.userName}<span><br>
        <span class="userID">Post #${user.num}</span></p>
        <div class="post-bg">
        <p class="post-content">${user.body}</p>
        </div>
        <span><i class='bx bx-trash' onclick="delete_hander(${x})"></i></span>
        <span id="like-${postId}" onclick="toggleLikeDislikePost(${postId}, ${true})"><i class='bx bx-like'></i> ${user.likes}</span>
        <span id="dislike-${postId}" onclick="toggleLikeDislikePost(${postId},  ${false})"><i class='bx bx-dislike'></i> ${user.dislikes}</span>
        </div>`;
    }
}
function toggleLikeDislikePost(postId, isLike) {
    for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].num === postId) {
            if ((!newArr[i].liked && isLike) || (newArr[i].liked && !isLike)) {
                if (isLike) {
                    newArr[i].likes += 1;
                }
                else {
                    newArr[i].dislikes -= 1;
                }
                newArr[i].liked = isLike;
            }
            else {
                if (isLike) {
                    newArr[i].likes -= 1;
                }
                else {
                    newArr[i].dislikes += 1;
                }
                newArr[i].liked = !isLike;
            }
            showPost2(newArr);
            console.log(newArr[i].liked);
        }
    }
}
toggleLikeDislikePost(1, true);
toggleLikeDislikePost(2, false);
function addPost() {
    return __awaiter(this, void 0, void 0, function* () {
        let bodyH = document.getElementById("body");
        let newPost = new Post(profileImage.src, person.pusername, newArr.length + 1, bodyH.value, 0, 0);
        newArr.unshift(newPost);
        showPost2(newArr);
        bodyH.value = "";
        delay3(1500);
        newPost.likes += getRandomInt(5);
        console.log("added" + newPost.likes);
        showPost2(newArr);
        delay3(1000);
        newPost.likes += getRandomInt(15);
        console.log("added" + newPost.likes);
        showPost2(newArr);
        delay3(1500);
        newPost.dislikes += getRandomInt(7);
        console.log("added" + newPost.dislikes);
        showPost2(newArr);
    });
}
function welcomeUser() {
    let topBar = document.getElementById("welcomeUser-top");
    let container = document.getElementById("container");
    // if (person.username != undefined) {
    topBar.innerHTML = `Welcome ${person.pusername}`;
    console.log(person.pusername);
    // } else {
    //     topBar.innerHTML = `Welcome Guest`;
    //     container.innerHTML = `<div><h1 class="guest-welcome">Please <a href="../pages/signup.html">Sign Up</a> or <a href="../pages/login.html">Log In</a></h1>
    //     </div>`;
    //     console.log(person.pusername);
    // }
}
const setId = (arr2) => {
    for (let x in arr2) {
        arr2[x].num = Number(x) + 1;
    }
};
function delete_handler(index) {
    newArr.splice(index, 1);
    setId(newArr);
    showPost2(newArr);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function delay3(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let profileImage = document.getElementById("profileImage");
let profileImageInput = document.getElementById("profileImageInput");
profileImageInput.onchange = function () {
    if (profileImageInput.files && profileImageInput.files[0]) {
        profileImage.src = URL.createObjectURL(profileImageInput.files[0]);
    }
};
(_c = document.getElementById("showPosts")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", showPosts);
(_d = document.getElementById("addPost")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", addPost);
