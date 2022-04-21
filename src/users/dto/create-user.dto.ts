export class CreateUserDto {
    id: number;
    email: string;
    login: string;
    password: string;
    isGranted: boolean;
    isActivated: boolean;
    activationLink: string;
    resetPasswordLink: string;
    temporaryPassword: string;
}
