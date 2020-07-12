import { Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthorsEntity } from './authors.entity';
import { AuthorDto } from './dto/author-dto';
import { AuthorsService } from './authors.service';

@Resolver('Authors')
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
  ) {};

  @Query()
  async getAuthor(obj: string, args: {id: number}): Promise<AuthorsEntity> {
    return this.authorsService.findOne(args.id);
  }

  @Query()
  async getAuthors(obj: string, args: {minNumberOfBooks: number, maxNumberOfBooks: number}): Promise<AuthorsEntity[]> {
    return this.authorsService.findAll(args.minNumberOfBooks, args.maxNumberOfBooks);
  }

  @Mutation()
  async createAuthor(obj: string, args: {author: AuthorDto}): Promise<AuthorsEntity> {
    return this.authorsService.insert(args.author);
  }

  @Mutation()
  async deleteAuthor(obj: string, args: {id: number}): Promise<number> {
    return this.authorsService.delete(args.id);
  }

  @Mutation()
  async deleteAuthorWithBooks(obj: string, args: {id: number}): Promise<number> {
    return this.authorsService.deleteAuthorWithBooks(args.id);
  }
}
