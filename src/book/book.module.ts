import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { AuthorEntity } from '../author/author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity, AuthorEntity]),
  ],
  controllers: [],
  providers: [BookService, BookResolver]
})
export class BookModule {}
