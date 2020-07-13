import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entity/author';
import { DeleteResult, Repository, Between, MoreThan } from 'typeorm';
import { AuthorDto } from './dto/author-dto';
import { Book } from '../book/entity/book';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

  async findOne(id: number): Promise<Author> {
    try {
      return await this.authorsRepository.findOne(id);
    } catch (err) {
      return err;
    }
  }

  async findAll(minNumberOfBooks: number, maxNumberOfBooks: number): Promise<Author[]> {
    try {
      const authors = await this.authorsRepository.find();
      return authors.filter(author =>
        author.books.length >= (minNumberOfBooks || 0) &&
        author.books.length <= (maxNumberOfBooks > 0 ? maxNumberOfBooks : Number.POSITIVE_INFINITY)
      );
    } catch (err) {
      return err;
    }
  }

  async insert(author: AuthorDto): Promise<Author> {
    try {
      const newAuthor = new Author(author.firstName, author.lastName);
      return await this.authorsRepository.save(newAuthor);
    } catch (err) {
      return err;
    }
  }

  async deleteAuthor(id: number): Promise<number> {
    try {
      const deleteAuthorResult: DeleteResult = await this.authorsRepository.delete(id);
      return deleteAuthorResult.affected;
    } catch (err) {
      return err;
    }
  }

  async deleteAuthorWithBooks(id: number): Promise<number> {
    // Get idea from https://thorben-janssen.com/avoid-cascadetype-delete-many-assocations/
    try {
      const author = await this.authorsRepository.findOne(id);
      const books = await this.bookRepository.findByIds(author.books.map(book => book.id), {relations: ['authors']});
      const deleteBooksResult = await this.bookRepository.delete(
        books.filter(book => book.authors.length === 1).map(book => book.id)
      )
      const deleteAuthorResult: DeleteResult = await this.authorsRepository.delete(id);

      return deleteAuthorResult.affected + deleteBooksResult.affected;
    } catch (err) {
      return err;
    }
  }
}
