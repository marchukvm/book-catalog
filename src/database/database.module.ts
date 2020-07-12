import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from '../modules/books/books.entity';
import { AuthorsEntity } from '../modules/authors/authors.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || "localhost",
      port: 6001,
      username: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "rootpw",
      database: process.env.MYSQL_DATABASE || 'books-catalog',
      entities: [BooksEntity, AuthorsEntity],
      synchronize: true,
    })
  ],
})
export class DatabaseModule {}
