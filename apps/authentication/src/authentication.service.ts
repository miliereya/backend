import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthenticationService {
	getHello(): string {
		return 'Hello Worl2d121!'
	}
}
