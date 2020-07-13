import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import { Book } from '../../book/entity/book'
import { Field, Int, ObjectType } from '@nestjs/graphql';


@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Field(type => String, { complexity: 1 })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Field(type => String, { complexity: 1 })
  lastName: string;

  @ManyToMany((type) => Book, (c) => c.authors, {
    cascade: true,
    eager: true
  })
  @JoinTable()
  @Field(type => [Book], { complexity: 1 })
  books: Book[];
}
