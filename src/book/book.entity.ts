import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import {AuthorEntity} from '../author/author.entity'

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn() id: number;

  constructor(title: string, authors: AuthorEntity[]) {
    this.title = title;
    this.authors = authors;
  }

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @ManyToMany((type) => AuthorEntity, (c) => c.books, {
    onDelete: 'CASCADE'
  })
  @JoinTable()
  authors: AuthorEntity[];
}
