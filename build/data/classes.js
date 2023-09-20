export default class User{
    constructor(userName , password)
    {
        this.userName = userName;
        this.password = password;
    }
};


export class Post extends User {
    constructor(user, proimg, userName, num, body, likes, dislikes) {
        super(user); // Use the 'user' parameter to call the parent class constructor
        this.proimg = proimg;
        this.userName = userName;
        this.num = num;
        this.body = body;
        this.likes = likes;
        this.dislikes = dislikes;
    }
}