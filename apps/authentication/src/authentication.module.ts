import { Module } from '@nestjs/common'
import { AuthenticationController } from './authentication.controller'
import { AuthenticationService } from './authentication.service'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env'],
			isGlobal: true,
			validationSchema: Joi.object({
				HTTP_PORT: Joi.number().required(),
				AUTHENTICATION_HOST: Joi.string().required(),
			}),
		}),
	],
	controllers: [AuthenticationController],
	providers: [AuthenticationService],
})
export class AuthenticationModule {}
