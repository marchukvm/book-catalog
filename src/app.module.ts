import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/entity/book';
import { Author } from './author/entity/author';

@Module({
  imports: [
    BookModule,
    AuthorModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || "localhost",
      port: 6001,
      username: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "rootpw",
      database: process.env.MYSQL_DATABASE || 'books-catalog',
      entities: [Book, Author],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: './src/schema.gql',
      playground: true,
      path: '/'
    }
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
