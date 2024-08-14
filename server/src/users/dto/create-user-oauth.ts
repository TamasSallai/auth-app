import { OAuthProvider } from '@prisma/client'
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator'

export class CreateUserOauthDto {
  @IsString()
  displayName: string

  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsEmail()
  email: string

  @IsString()
  oauthProvider: OAuthProvider

  @IsString()
  oauthProviderId: string

  @IsBoolean()
  isVerified: boolean
}
