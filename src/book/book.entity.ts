import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import {Author} from '../author/author.entity'
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Book {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  constructor(title: string, authors: Author[]) {
    this.title = title;
    this.authors = authors;
  }

  @Field(type => String)
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Field(type => [Author])
  @ManyToMany((type) => Author, (c) => c.books, {
    onDelete: 'CASCADE'
  })
  @JoinTable()
  authors: Author[];
}
