import { users } from '../entities/users.entity';

export class UserDto {
    id: number;
    email: string;
    login: string;
    password: string;
    isGranted: boolean;
    isActivated: boolean;
    activationLink: string;
    resetPasswordLink: string;
    temporaryPassword: string;

    constructor(users: users) {
        this.id = users.id;
        this.email = users.email;
        this.login = users.login;
        this.password = users.password;
        this.isGranted = users.isGranted;
        this.isActivated = users.isActivated;
        this.activationLink = users.activationLink;
        this.resetPasswordLink = users.resetPasswordLink;
        this.temporaryPassword = users.temporaryPassword;
    }
}
