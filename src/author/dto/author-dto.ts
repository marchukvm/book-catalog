import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthorDto {
  @Field(type => String)
  firstName: string;
  @Field(type => String)
  lastName: string;
}
