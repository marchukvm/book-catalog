import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsEntity } from './authors.entity';
import { DeleteResult, Repository, Between, MoreThan } from 'typeorm';
import { AuthorDto } from './dto/author-dto';
import { BooksEntity } from '../books/books.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorsEntity)
    private readonly authorsRepository: Repository<AuthorsEntity>,
    @InjectRepository(BooksEntity)
    private readonly bookRepository: Repository<BooksEntity>
  ) {}

  async findOne(id: number): Promise<AuthorsEntity> {
    try {
      return await this.authorsRepository.findOne(id);
    } catch (err) {
      return err;
    }
  }

  async findAll(minNumberOfBooks: number, maxNumberOfBooks: number): Promise<AuthorsEntity[]> {
    try {
      const authors = await this.authorsRepository.find();

      return authors.filter(el => el.books.length >= 1);
    } catch (err) {
      return err;
    }
  }

  async insert(author: AuthorDto): Promise<AuthorsEntity> {
    try {
      const newAuthor = new AuthorsEntity(author.firstName, author.lastName);
      return await this.authorsRepository.save(newAuthor);
    } catch (err) {
      return err;
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const deleteAuthorResult: DeleteResult = await this.authorsRepository.delete(id);
      return deleteAuthorResult.affected;
    } catch (err) {
      return err;
    }
  }

  async deleteAuthorWithBooks(id: number): Promise<number> {
    try {
      const deleteAuthorResult: DeleteResult = await this.authorsRepository.delete(id);
      return deleteAuthorResult.affected;
    } catch (err) {
      return err;
    }
  }
}
