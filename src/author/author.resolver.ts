import { Mutation, Resolver, Query, Args, Int, Field, ID } from '@nestjs/graphql';
import { Author } from './entity/author';
import { AuthorDto } from './dto/author-dto';
import { AuthorService } from './author.service';
import { Book } from '../book/entity/book';

@Resolver('Authors')
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorService,
  ) {};

  @Query(returns => Author!)
  async getAuthor(
    @Args('id', { type: () => ID }) id: number
  ): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @Query(returns => [Author!]!)
  async getAuthors(
    @Args('minNumberOfBooks',  { type: () => Int, nullable: true }) minNumberOfBooks?: number,
    @Args('maxNumberOfBooks',  { type: () => Int, nullable: true }) maxNumberOfBooks?: number
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
    @Args('id',  { type: () => ID }) id: number
  ): Promise<number> {
    return this.authorsService.delete(id);
  }

  @Mutation(returns => Int!)
  async deleteAuthorWithBooks(
    @Args('id',  { type: () => ID }) id: number
  ): Promise<number> {
    return this.authorsService.deleteAuthorWithBooks(id);
  }
}
