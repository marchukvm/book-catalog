import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { AuthorsEntity } from './authors.entity';
import { AuthorDto } from './dto/author-dto';
import { AuthorsService } from './authors.service';

@Resolver('Authors')
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
  ) {};

  @Query()
  async getAuthor(
    @Args('id') id: number
  ): Promise<AuthorsEntity> {
    return this.authorsService.findOne(id);
  }

  @Query()
  async getAuthors(
    @Args('minNumberOfBooks') minNumberOfBooks: number,
    @Args('maxNumberOfBooks') maxNumberOfBooks: number
  ): Promise<AuthorsEntity[]> {
    return this.authorsService.findAll(minNumberOfBooks, maxNumberOfBooks);
  }

  @Mutation()
  async createAuthor(
    @Args('author') author: AuthorDto
  ): Promise<AuthorsEntity> {
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
