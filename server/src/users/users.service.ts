import * as bcrypt from 'bcrypt'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { CreateUserOauthDto } from './dto/create-user-oauth'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase()
  }

  private normalizeDisplayName(displayName: string): string {
    return displayName.trim()
  }

  private normalizeName(name: string): string {
    return name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }

  async create({
    displayName,
    firstName,
    lastName,
    email,
    password,
  }: CreateUserDto) {
    const normalizedEmail = this.normalizeEmail(email)
    const existingUser = await this.findOneByEmail(normalizedEmail)
    if (existingUser) {
      throw new ConflictException('User with email already exists.')
    }

    return this.prismaService.user.create({
      data: {
        displayName: this.normalizeDisplayName(displayName),
        firstName: firstName ? this.normalizeName(firstName) : undefined,
        lastName: lastName ? this.normalizeName(lastName) : undefined,
        email: normalizedEmail,
        password: await bcrypt.hash(password, 10),
      },
      include: { OAuthAccounts: true },
    })
  }

  async createWithOauth({
    displayName,
    firstName,
    lastName,
    email,
    isVerified,
    oauthProvider,
    oauthProviderId,
  }: CreateUserOauthDto) {
    const normalizedEmail = this.normalizeEmail(email)
    let user = await this.findOneByEmail(normalizedEmail)
    if (user) {
      const existingOAuthAccount = user.OAuthAccounts.find(
        (account) => account.oauthProvider === oauthProvider
      )

      console.log('existingOAuthAccount:', existingOAuthAccount)

      if (!existingOAuthAccount) {
        user = await this.prismaService.user.update({
          where: { id: user.id },
          data: {
            isVerified, // Updating isVerified field on OAuth login
            OAuthAccounts: {
              create: {
                oauthProvider,
                oauthProviderId,
              },
            },
          },
          include: { OAuthAccounts: true },
        })
      }
      return user
    }

    return this.prismaService.user.create({
      data: {
        displayName: this.normalizeDisplayName(displayName),
        firstName: firstName ? this.normalizeName(firstName) : undefined,
        lastName: lastName ? this.normalizeName(lastName) : undefined,
        email: normalizedEmail,
        isVerified,
        OAuthAccounts: {
          create: {
            oauthProvider,
            oauthProviderId,
          },
        },
      },
      include: { OAuthAccounts: true },
    })
  }

  async findAll() {
    return this.prismaService.user.findMany({
      include: { OAuthAccounts: true },
    })
  }

  async findOneById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { OAuthAccounts: true },
    })

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return user
  }

  async findOneByEmail(email: string) {
    const normalizeEmail = this.normalizeEmail(email)
    return this.prismaService.user.findUnique({
      where: { email: normalizeEmail },
      include: { OAuthAccounts: true },
    })
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOneById(id)

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10)
    }

    if (dto.email) {
      dto.email = this.normalizeEmail(dto.email)
    }

    if (dto.displayName) {
      dto.displayName = this.normalizeDisplayName(dto.displayName)
    }

    if (dto.firstName) {
      dto.firstName = this.normalizeName(dto.firstName)
    }

    if (dto.lastName) {
      dto.lastName = this.normalizeName(dto.lastName)
    }

    return await this.prismaService.user.update({
      where: { id },
      data: dto,
      include: { OAuthAccounts: true },
    })
  }

  async remove(id: string) {
    await this.findOneById(id)

    return this.prismaService.user.delete({
      where: { id },
      include: { OAuthAccounts: true },
    })
  }
}
