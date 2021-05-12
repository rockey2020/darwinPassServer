export default class UserEntity {
    public id: string;
    public username: string;
    public email: string;
    public authorization: string;
    public maxIdleTime: number;

    constructor({
                    id = "",
                    username = "",
                    email = "",
                    maxIdleTime = 0,
                    authorization = "",
                }: { id?: string, username?: string, email?: string, maxIdleTime?: number, authorization?: string } = {}) {
        this.id = id
        this.username = username
        this.email = email
        this.maxIdleTime = maxIdleTime
        this.authorization = authorization
    }
}
