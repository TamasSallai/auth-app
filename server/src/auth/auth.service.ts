import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { ValidateOauthDto } from './dto/validate-oauth.dto'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(data: RegisterDto) {
    const user = await this.usersService.findOneByEmail(data.email)

    if (user) {
      if (!user.password) {
        throw new ConflictException(
          "This email is associated with a social account. If you'd like to use a password to log in, you can set up one manually after loggin in."
        )
      }

      throw new ConflictException('User with email already exists.')
    }

    return this.usersService.create(data)
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) throw new UnauthorizedException('Invalid email or password.')

    if (!user.password)
      throw new ConflictException(
        "This email is associated with a social account. If you'd like to use a password to log in, you can set up one manually after loggin in."
      )

    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword)
      throw new UnauthorizedException('Invalid email or password.')

    return user
  }

  async validateOauth(data: ValidateOauthDto) {
    return this.usersService.createWithOauth(data)
  }
}
