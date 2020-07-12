import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './modules/books/books.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    DatabaseModule,
    BooksModule,
    AuthorsModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/**/*.graphql'],
      path: '/'
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
