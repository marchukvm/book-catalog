import { BooksEntity } from "./books.entity";
import { BooksService } from "./books.service";
import { Query, Resolver, Mutation } from "@nestjs/graphql";
import { BookDto } from './dto/book-dto';

@Resolver('Books')
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
  ) {};

  @Query()
  async getBook(id: number): Promise<BooksEntity> {
    return await this.booksService.findOne(id);
  }

  @Query()
  async getBooks(obj: string, args: {title: string}): Promise<BooksEntity[]> {
    return this.booksService.findAll(args.title);
  }

  @Mutation()
  async createBook(obj: string, args: {book: BookDto}): Promise<BooksEntity> {
    return this.booksService.insert(args.book);
  }

  @Mutation()
  async addAuthor(obj: string, args: {bookId: number, authorId: number}): Promise<BooksEntity> {
    return this.booksService.addAuthor(args.bookId, args.authorId);
  }

  @Mutation()
  async deleteBook(obj: string, args: {id: number}): Promise<number> {
    return this.booksService.delete(args.id);
  }
}
