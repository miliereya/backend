import { NestFactory } from '@nestjs/core'
import { AuthenticationModule } from './authentication.module'
import { Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AuthenticationModule)
	const configService = app.get(ConfigService)
	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: [configService.getOrThrow('RMQ_URI')],
			queue: configService.getOrThrow('AUTHENTICATION_HOST'),
		},
	})
	app.use(cookieParser())
	// app.setGlobalPrefix('api/v1')
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
	// app.useLogger(app.get(Logger))
	// app.enableCors({
	// 	credentials: true,
	// 	origin:
	// 		configService.get('CLIENT_ADMIN_URL') ?? 'http://localhost:3010',
	// })
	await app.startAllMicroservices()
	await app.listen(configService.get('HTTP_PORT'))
}
bootstrap()
