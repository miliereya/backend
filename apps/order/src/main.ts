import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'
import { OrderModule } from './order.module'

async function bootstrap() {
	const app = await NestFactory.create(OrderModule)
	const configService = app.get(ConfigService)
	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: [configService.getOrThrow('RMQ_URI')],
			queue: configService.getOrThrow('ORDER_HOST'),
		},
	})
	app.use(cookieParser())
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
