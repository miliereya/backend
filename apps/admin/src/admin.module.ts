import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminResolver } from './admin.resolver'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'
import { GraphQLModule } from '@nestjs/graphql'
import {
	ApolloFederationDriver,
	ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { Admin, AdminSchema, DatabaseModule, HealthModule } from '@app/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloFederationDriverConfig>({
			driver: ApolloFederationDriver,
			autoSchemaFile: {
				federation: 2,
			},
		}),
		DatabaseModule,
		DatabaseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
		ConfigModule.forRoot({
			envFilePath: ['.env'],
			isGlobal: true,
			validationSchema: Joi.object({
				MONGO_URI: Joi.string().required(),
				HTTP_PORT: Joi.string().required(),
				ADMIN_HOST: Joi.string().required(),
				ORDER_HOST: Joi.string().required(),
				RMQ_URI: Joi.string().required(),
			}),
		}),
		ClientsModule.registerAsync([
			{
				name: 'ORDER_SERVICE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.RMQ,
					options: {
						urls: [configService.getOrThrow<string>('RMQ_URI')],
						queue: configService.getOrThrow<string>('ORDER_HOST'),
					},
				}),
				inject: [ConfigService],
			},
		]),
		HealthModule,
	],
	providers: [AdminService, AdminResolver],
})
export class AdminModule {}
