import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

@Controller()
export class OrderController {
	@MessagePattern('check')
	check(@Payload() payload: { check: string }) {
		if (payload.check === 'check') return true
	}
}
