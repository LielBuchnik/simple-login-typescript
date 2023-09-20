let mainContainer = document.getElementById("signup-form") as HTMLElement;
let userArr: any[] = []

let xml = new XMLHttpRequest();
xml.open("GET", "../data/posts.json", true);
xml.onload = function (): void {
    if (xml.status === 200) {
        let response = JSON.parse(this.responseText);
        let combinedData = response.CombinedData;
        let users = combinedData.User;
        userArr.push(users);
    }
};

xml.send();

async function userLogin(pusername: string, password: string) {
    let person = JSON.parse(sessionStorage.getItem("person") || '{}');
    let profileImage = JSON.parse(sessionStorage.getItem("profileImage") || '{}');
    let underHint = document.getElementById("under-hint") as HTMLElement;
    
    if (person.pusername !== pusername && person.password === password ||
        person.pusername !== pusername && person.password !== password
        || person.pusername == null || person.password == null) {
        underHint.innerHTML = "Seems like this username does not exist!";
        clearHint2();
    } else if (person.pusername === pusername && person.password !== password) {
        underHint.innerHTML = "Seems like it's the wrong password!";
        clearHint2();
    } else if (person.pusername === pusername && person.password === password) {
        if (profileImage) {
            mainContainer.innerHTML = `
            <div class="loadingGif">
            </div>
            <p class="welcomeUser">Hey ${person.pusername}!</p>
            <p>We're Loading Your Profile, Not Prog Bar, No Tiiiimmmeee</p>
            </div>`;
        } else {
            mainContainer.innerHTML = `
            <div class="loadingGif">
            </div>
            <p class="welcomeUser">Hey ${person.pusername}!</p>
            <p>We're Loading Your Profile, Not Prog Bar, No Tiiiimmmeee</p>
            </div>`;
        }

        await delay2(3000);
        window.location.href = "../pages/index.html";
    }
}


async function clearHint2() {
    await delay2(3000)
    let underHint = document.getElementById("under-hint") as HTMLElement;
    underHint.innerHTML = " ";
}

function delay2(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

