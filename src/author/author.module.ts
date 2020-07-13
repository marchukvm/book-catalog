import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { AuthorResolver } from './author.resolver';
import { Book } from '../book/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author, Book]),
  ],
  providers: [AuthorService, AuthorResolver]
})
export class AuthorModule {}
