import { BookEntity } from "./book.entity";
import { BookService } from "./book.service";
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { BookDto } from './dto/book-dto';

@Resolver('Books')
export class BookResolver {
  constructor(
    private readonly booksService: BookService,
  ) {};

  @Query()
  async getBook(
    @Args('id') id: number
  ): Promise<BookEntity> {
    return await this.booksService.findOne(id);
  }

  @Query()
  async getBooks(
    @Args('title') title: string
  ): Promise<BookEntity[]> {
    return this.booksService.findAll(title);
  }

  @Mutation()
  async createBook(
    @Args('book') book: BookDto
  ): Promise<BookEntity> {
    return this.booksService.insert(book);
  }

  @Mutation()
  async addAuthor(
    @Args('bookId') bookId: number,
    @Args('authorId') authorId: number
  ): Promise<BookEntity> {
    return this.booksService.addAuthor(bookId, authorId);
  }

  @Mutation()
  async deleteBook(
    @Args('id') id: number
  ): Promise<number> {
    return this.booksService.delete(id);
  }
}
