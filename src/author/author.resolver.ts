import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { AuthorEntity } from './author.entity';
import { AuthorDto } from './dto/author-dto';
import { AuthorService } from './author.service';

@Resolver('Authors')
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorService,
  ) {};

  @Query()
  async getAuthor(
    @Args('id') id: number
  ): Promise<AuthorEntity> {
    return this.authorsService.findOne(id);
  }

  @Query()
  async getAuthors(
    @Args('minNumberOfBooks') minNumberOfBooks: number,
    @Args('maxNumberOfBooks') maxNumberOfBooks: number
  ): Promise<AuthorEntity[]> {
    return this.authorsService.findAll(minNumberOfBooks, maxNumberOfBooks);
  }

  @Mutation()
  async createAuthor(
    @Args('author') author: AuthorDto
  ): Promise<AuthorEntity> {
    return this.authorsService.insert(author);
  }

  @Mutation()
  async deleteAuthor(
    @Args('id') id: number
  ): Promise<number> {
    return this.authorsService.delete(id);
  }

  @Mutation()
  async deleteAuthorWithBooks(
    @Args('id') id: number
  ): Promise<number> {
    return this.authorsService.deleteAuthorWithBooks(id);
  }
}
