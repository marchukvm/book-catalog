import { Mutation, Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Author } from './author.entity';
import { AuthorDto } from './dto/author-dto';
import { AuthorService } from './author.service';
import { Book } from '../book/book.entity';

@Resolver('Authors')
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorService,
  ) {};

  @Query(returns => Author!)
  async getAuthor(
    @Args('id') id: number
  ): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @Query(returns => [Author!]!)
  async getAuthors(
    @Args('minNumberOfBooks') minNumberOfBooks: number,
    @Args('maxNumberOfBooks') maxNumberOfBooks: number
  ): Promise<Author[]> {
    return this.authorsService.findAll(minNumberOfBooks, maxNumberOfBooks);
  }

  @Mutation(returns => Author!)
  async createAuthor(
    @Args('author') author: AuthorDto
  ): Promise<Author> {
    return this.authorsService.insert(author);
  }

  @Mutation(returns => Int!)
  async deleteAuthor(
    @Args('id') id: number
  ): Promise<number> {
    return this.authorsService.delete(id);
  }

  @Mutation(returns => Int!)
  async deleteAuthorWithBooks(
    @Args('id') id: number
  ): Promise<number> {
    return this.authorsService.deleteAuthorWithBooks(id);
  }
}
