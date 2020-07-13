import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Author } from '../author/author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author]),
  ],
  controllers: [],
  providers: [BookService, BookResolver]
})
export class BookModule {}
