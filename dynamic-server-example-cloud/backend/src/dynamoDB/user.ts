import {
	item,
	string,
    Entity,
	type InputValue,
	type ValidItem,
	type InputItem,
} from 'dynamodb-toolbox'
import { UserTable } from './userTable.js'
import { randomUUID } from 'crypto'

export const UserSchema = item({
	email: string().key(),
    id: string().default(() => randomUUID()),
	name: string().optional(),
    hashedPwd: string(),
})

export const UserEntity = new Entity({
    table: UserTable,
	name: 'USER',
	schema: UserSchema,
	timestamps: true,
})

export type UserSchemaInput = InputValue<typeof UserSchema>
export type UserEntityValid = ValidItem<typeof UserEntity>
export type UserEntityInput = InputItem<typeof UserEntity>
