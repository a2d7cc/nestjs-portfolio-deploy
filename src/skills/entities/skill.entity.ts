import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'skills' })
export class Skill {
    @PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

    @Column()
	slug: string

	@Column()
	poster: string

	@Column({ default: '' })
	description: string

	@Column({ default: '' })
	body: string
}
