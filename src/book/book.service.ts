import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { BookDto } from './dto/book-dto';
import { AuthorEntity } from '../author/author.entity';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(AuthorEntity)
    private readonly authorsRepository: Repository<AuthorEntity>
  ) {}

  async findOne(id: number): Promise<BookEntity> {
    try {
      return await this.bookRepository.findOne(id);
    } catch (err) {
      return err;
    }
  }

  async findAll(title: string): Promise<BookEntity[]> {
    try {
      return await this.bookRepository.find({
        relations: ["authors"],
        where: {
          title: Like(`${title || ""}%`)
        }
      })
    } catch (err) {
      return err;
    }
  }

  async insert(book: BookDto): Promise<BookEntity> {
    try {
      const authors = await this.authorsRepository.findByIds(book.authorIds);
      const newBook = new BookEntity(book.title, authors);
      return await this.bookRepository.save(newBook, {});
    } catch (err) {
      return err;
    }
  }

  async addAuthor(bookId: number, authorId: number): Promise<BookEntity> {
    try {
      const author = await this.authorsRepository.findOne(authorId);
      const book = await this.bookRepository.findOne(bookId, { relations: ["authors"] });
      book.authors.push(author);
      return await this.bookRepository.save(book);
    } catch (err) {
      return err;
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const deleteAuthorResult: DeleteResult = await this.bookRepository.delete(id);
      return deleteAuthorResult.affected;
    } catch (err) {
      return err;
    }
  }
}
