import { Table } from 'dynamodb-toolbox/table'
import { documentClient } from './client.js'

export const UserTable = new Table({
	documentClient,
	name: process.env.USER_TABLE_NAME!,
	partitionKey: {
		name: 'email',
		type: 'string',
	},
})
