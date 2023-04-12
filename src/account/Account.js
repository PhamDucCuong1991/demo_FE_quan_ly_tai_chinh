export class Account {
    id
    email
    password
    avatar


    constructor(id, email, password, avatar) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
    }
}