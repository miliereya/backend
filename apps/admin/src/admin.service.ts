import { Inject, Injectable } from '@nestjs/common'
import { CreateAdminInput } from './dto/create-admin.input'
import { UpdateAdminInput } from './dto/update-admin.input'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom, map } from 'rxjs'

@Injectable()
export class AdminService {
	constructor(
		@Inject('ORDER_SERVICE')
		private readonly orderService: ClientProxy,
	) {}

	create(createAdminInput: CreateAdminInput) {
		return 'This action adds a new admin'
	}

	async check() {
		const check = await lastValueFrom(
			this.orderService.send('check', { check: 'check' }).pipe(
				map((res) => {
					return res
				}),
			),
		)
		return check
	}

	findAll() {
		return `This action returns all admin`
	}

	findOne(id: number) {
		return `This action returns a #${id} admin`
	}

	update(id: number, updateAdminInput: UpdateAdminInput) {
		return `This action updates a #${id} admin`
	}

	remove(id: number) {
		return `This action removes a #${id} admin`
	}
}
