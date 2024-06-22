import { Controller, Get, HttpCode } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'

@Controller('/')
export class HealthController {
	@Get()
	@HttpCode(200)
	@ApiExcludeEndpoint()
	health() {
		return true
	}
}
