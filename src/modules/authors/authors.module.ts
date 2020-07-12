import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsEntity } from './authors.entity';
import { AuthorsResolver } from './authors.resolver';
import { BooksEntity } from '../books/books.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorsEntity, BooksEntity]),
  ],
  providers: [AuthorsService, AuthorsResolver]
})
export class AuthorsModule {}
