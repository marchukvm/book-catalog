import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BooksEntity } from '../books/books.entity'

@Entity()
export class AuthorsEntity {
  @PrimaryGeneratedColumn() id: number;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Column({ nullable: true })
  booksCount: number;

  @ManyToMany((type) => BooksEntity, (c) => c.authors, {
    eager: true
  })
  @JoinTable()
  books: BooksEntity[];
}
