import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BookEntity } from '../book/book.entity'

@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn() id: number;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @ManyToMany((type) => BookEntity, (c) => c.authors, {
    cascade: true,
    eager: true
  })
  @JoinTable()
  books: BookEntity[];
}
