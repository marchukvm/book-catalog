import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';
import { BooksEntity } from './books.entity';
import { BookDto } from './dto/book-dto';
import { AuthorsEntity } from '../authors/authors.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(BooksEntity)
    private readonly bookRepository: Repository<BooksEntity>,
    @InjectRepository(AuthorsEntity)
    private readonly authorsRepository: Repository<AuthorsEntity>
  ) {}

  async findOne(id: number): Promise<BooksEntity> {
    try {
      return await this.bookRepository.findOne(id);
    } catch (err) {
      return err;
    }
  }

  async findAll(title: string): Promise<BooksEntity[]> {
    try {
      return await this.bookRepository.find({
        relations: ["authors"],
        where: {
          // todo: need refactoring
          title: Like(`${title ? title : ""}%`)
        }
      })
    } catch (err) {
      return err;
    }
  }

  async insert(book: BookDto): Promise<BooksEntity> {
    try {
      const authors = await this.authorsRepository.findByIds(book.authorIds);
      const newBook = new BooksEntity(book.title, authors);
      return await this.bookRepository.save(newBook, {});
    } catch (err) {
      return err;
    }
  }

  async addAuthor(bookId: number, authorId: number): Promise<BooksEntity> {
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
