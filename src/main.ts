let person = JSON.parse(sessionStorage.getItem("person") || '{}');
var _a, _b;
const log = document.getElementById("log") as HTMLDivElement
let arr: any[] = []
let newArr: any[] = []
showPosts()
welcomeUser()

class User {
    userName: string;
    password: string;

    constructor(userId: string, password: string) {
        this.userName = userId;
        this.password = password;
    }
}

class Post extends User {
    proimg: string;
    num: number;
    body: string;
    likes: number;
    dislikes: number;

    constructor(proimg: string, userId: string, id: number, body: string, likes: number, dislikes: number) {
        super(userId, '');
        this.proimg = proimg;
        this.num = id;
        this.body = body;
        this.likes = likes;
        this.dislikes = dislikes;
    }
}

function showPosts(): void {
    let xml = new XMLHttpRequest();
    xml.open("GET", "../data/posts.json", true);
    xml.onload = function (): void {
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

function showPost2(arg: any): void {
    log.innerHTML = ""
    for (let x in arg) {
        let user = arg[x]
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
        </div>`
    }
}

function toggleLikeDislikePost(postId: number, isLike: boolean): void {
    for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].num === postId) {
            if ((!newArr[i].liked && isLike) || (newArr[i].liked && !isLike)) {
                if (isLike) {
                    newArr[i].likes += 1;
                } else {
                    newArr[i].dislikes -= 1;
                }
                newArr[i].liked = isLike;
            } else {
                if (isLike) {
                    newArr[i].likes -= 1;
                } else {
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

async function addPost() {
    let bodyH = document.getElementById("body") as HTMLInputElement;
    let newPost = new Post(profileImage.src, person.pusername, newArr.length + 1, bodyH.value, 0, 0);
    newArr.unshift(newPost);
    showPost2(newArr);
    bodyH.value = "";
    delay3(1500)
    newPost.likes += getRandomInt(5);
    console.log("added" + newPost.likes);
    showPost2(newArr);
    delay3(1000)
    newPost.likes += getRandomInt(15);
    console.log("added" + newPost.likes);
    showPost2(newArr);
    delay3(1500)
    newPost.dislikes += getRandomInt(7);
    console.log("added" + newPost.dislikes);
    showPost2(newArr);
}

function welcomeUser() {
    let topBar = document.getElementById("welcomeUser-top") as HTMLElement;
    let container = document.getElementById("container") as HTMLElement;
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

const setId = (arr2: any) => {
    for (let x in arr2) {
        arr2[x].num = Number(x) + 1
    }
}

function delete_handler(index: number) {
    newArr.splice(index, 1)
    setId(newArr)
    showPost2(newArr)
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function delay3(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let profileImage = document.getElementById("profileImage") as HTMLImageElement;
let profileImageInput = document.getElementById("profileImageInput") as HTMLInputElement;

profileImageInput.onchange = function () {
    if (profileImageInput.files && profileImageInput.files[0]) {
        profileImage.src = URL.createObjectURL(profileImageInput.files[0]);
    }
}

document.getElementById("showPosts")?.addEventListener("click", showPosts);
document.getElementById("addPost")?.addEventListener("click", addPost);
