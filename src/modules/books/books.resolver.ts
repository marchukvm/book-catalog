import { BooksEntity } from "./books.entity";
import { BooksService } from "./books.service";
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { BookDto } from './dto/book-dto';

@Resolver('Books')
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
  ) {};

  @Query()
  async getBook(
    @Args('id') id: number
  ): Promise<BooksEntity> {
    return await this.booksService.findOne(id);
  }

  @Query()
  async getBooks(
    @Args('title') title: string
  ): Promise<BooksEntity[]> {
    return this.booksService.findAll(title);
  }

  @Mutation()
  async createBook(
    @Args('book') book: BookDto
  ): Promise<BooksEntity> {
    return this.booksService.insert(book);
  }

  @Mutation()
  async addAuthor(
    @Args('bookId') bookId: number,
    @Args('authorId') authorId: number
  ): Promise<BooksEntity> {
    return this.booksService.addAuthor(bookId, authorId);
  }

  @Mutation()
  async deleteBook(
    @Args('id') id: number
  ): Promise<number> {
    return this.booksService.delete(id);
  }
}
