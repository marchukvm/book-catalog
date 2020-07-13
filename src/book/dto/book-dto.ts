import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BookDto {
  @Field(type => String)
  readonly title: string;
  @Field(type => [ID!]!)
  readonly authorIds: number[];
}
