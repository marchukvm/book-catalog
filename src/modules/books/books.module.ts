import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from './books.entity';
import { AuthorsEntity } from '../authors/authors.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BooksEntity, AuthorsEntity]),
  ],
  controllers: [],
  providers: [BooksService, BooksResolver]
})
export class BooksModule {}
