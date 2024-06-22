import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderResolver } from './order.resolver'
import { GraphQLModule } from '@nestjs/graphql'
import {
	ApolloFederationDriver,
	ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { HealthModule } from '@app/common'
import { OrderController } from './order.controller'

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloFederationDriverConfig>({
			driver: ApolloFederationDriver,
			autoSchemaFile: {
				federation: 2,
			},
		}),
		ConfigModule.forRoot({
			envFilePath: ['.env'],
			isGlobal: true,
			validationSchema: Joi.object({
				// MONGODB_URI: Joi.string().required(),
				HTTP_PORT: Joi.string().required(),
				ORDER_HOST: Joi.string().required(),
			}),
		}),
		HealthModule,
	],
	controllers: [OrderController],
	providers: [OrderResolver, OrderService],
})
export class OrderModule {}
