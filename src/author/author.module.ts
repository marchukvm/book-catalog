import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './author.entity';
import { AuthorResolver } from './author.resolver';
import { BookEntity } from '../book/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity, BookEntity]),
  ],
  providers: [AuthorService, AuthorResolver]
})
export class AuthorModule {}
