import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import { Book } from '../book/book.entity'
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
  @Field(type => String)
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Field(type => String)
  lastName: string;

  @ManyToMany((type) => Book, (c) => c.authors, {
    cascade: true,
    eager: true
  })
  @JoinTable()
  @Field(type => [Book])
  books: Book[];
}
