import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entity/author';
import { AuthorResolver } from './author.resolver';
import { Book } from '../book/entity/book';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author, Book]),
  ],
  providers: [AuthorService, AuthorResolver]
})
export class AuthorModule {}
