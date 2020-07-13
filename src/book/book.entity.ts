import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
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

  @Field(type => String, { complexity: 1 })
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Field(type => [Author], { complexity: 1 })
  @ManyToMany((type) => Author, (c) => c.books, {
    onDelete: 'CASCADE'
  })
  @JoinTable()
  authors: Author[];
}
