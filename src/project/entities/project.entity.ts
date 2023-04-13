import {
	BeforeUpdate,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'projects' })
export class Project {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column({ default: '' })
	subTitle: string

    @Column()
	slug: string

	@Column()
	poster: string

	@Column({ default: '' })
	body: string

	@Column({ type: 'jsonb',  default: {} })
	tags: string;
  
	@Column()
	git: string

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date

	@BeforeUpdate()
	updateTimestamp() {
		this.updatedAt = new Date()
	}

}
