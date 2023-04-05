import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'user' })
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	email: string

	@Column()
	hashPassword: string

	@Column({ default: false })
	isAdmin?: boolean
}