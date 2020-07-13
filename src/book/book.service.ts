import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';
import { Book } from './book.entity';
import { BookDto } from './dto/book-dto';
import { Author } from '../author/author.entity';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>
  ) {}

  async findOne(id: number): Promise<Book> {
    try {
      return await this.bookRepository.findOne(id);
    } catch (err) {
      return err;
    }
  }

  async findAll(title: string): Promise<Book[]> {
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

  async insert(book: BookDto): Promise<Book> {
    try {
      const authors = await this.authorsRepository.findByIds(book.authorIds);
      const newBook = new Book(book.title, authors);
      return await this.bookRepository.save(newBook, {});
    } catch (err) {
      return err;
    }
  }

  async addAuthor(bookId: number, authorId: number): Promise<Book> {
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
