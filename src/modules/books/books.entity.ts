import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import {AuthorsEntity} from '../authors/authors.entity'

@Entity()
export class BooksEntity {
  @PrimaryGeneratedColumn() id: number;

  constructor(title: string, authors: AuthorsEntity[]) {
    this.title = title;
    this.authors = authors;
  }

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @ManyToMany((type) => AuthorsEntity, (c) => c.books)
  @JoinTable()
  authors: AuthorsEntity[];
}
