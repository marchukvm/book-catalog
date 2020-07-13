import { Book } from "./book.entity";
import { BookService } from "./book.service";
import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { BookDto } from './dto/book-dto';

@Resolver('Books')
export class BookResolver {
  constructor(
    private readonly booksService: BookService,
  ) {};

  @Query(returns => Book!)
  async getBook(
    @Args('id') id: number
  ): Promise<Book> {
    return await this.booksService.findOne(id);
  }

  @Query(returns => [Book!])
  async getBooks(
    @Args('title') title: string
  ): Promise<Book[]> {
    return this.booksService.findAll(title);
  }

  @Mutation(returns => Book!)
  async createBook(
    @Args('book') book: BookDto
  ): Promise<Book> {
    return this.booksService.insert(book);
  }

  @Mutation(returns => Book!)
  async addAuthor(
    @Args('bookId') bookId: number,
    @Args('authorId') authorId: number
  ): Promise<Book> {
    return this.booksService.addAuthor(bookId, authorId);
  }

  @Mutation(returns => Int!)
  async deleteBook(
    @Args('id') id: number
  ): Promise<number> {
    return this.booksService.delete(id);
  }
}
