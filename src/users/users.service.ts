import { Injectable, Inject } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/common/constants';
import { ActivateUserDto } from './dto/activate-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: typeof users) {}

    async create(createUserDto: CreateUserDto) {
        const user = new users();
        user.email = createUserDto.email;
        user.login = createUserDto.login;
        user.password = createUserDto.password;
        user.activationLink = createUserDto.activationLink;
        return user.save();
    }

    async findAll() {
        const users = await this.usersRepository.findAll<users>();
        return users.map(user => new UserDto(user));
    }

    async findOne(id: number) {
        const user = await this.usersRepository.findByPk<users>(id);
        return user;
    }

    async findByUsername(username: string) {
        const user = await this.usersRepository.findOne<users>({where: {login: username}});
        return user;
    }

    async findByActivationLink(link: string) {
        const user = await this.usersRepository.findOne<users>({where: {activationLink: link}});
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne<users>({where: {email}});
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findByPk<users>(id);
        user.email = updateUserDto.email || user.email;
        user.login = updateUserDto.login || user.login;
        user.password = updateUserDto.password || user.password;
        user.activationLink = updateUserDto.activationLink || user.activationLink;
        return user.save();
    }

    async activate(id: number, activateUserDto: ActivateUserDto) {
        const user = await this.usersRepository.findByPk<users>(id);
        user.isActivated = activateUserDto.isActivated || user.isActivated;
        user.activationLink = activateUserDto.activationLink || user.activationLink;
        return user.save();
    }

    async resetPasswordSend(email: string, resetPasswordLink: string, temporaryPassword: string) {
        const user = await this.findByEmail(email);
        user.resetPasswordLink = resetPasswordLink;
        user.temporaryPassword = temporaryPassword;
        return user.save();
    }

    async resetPasswordConfirm(login: string, temporaryPassword: string) {
        const user = await this.findByUsername(login);
        user.password = temporaryPassword;
        user.temporaryPassword = null;
        user.resetPasswordLink = null;
        return user.save();
    }

    async remove(id: number) {
        const user = await this.usersRepository.findByPk<users>(id);
        await user.destroy();
        return user;
    }
}
