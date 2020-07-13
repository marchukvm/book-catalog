import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book/book.entity';
import { AuthorEntity } from './author/author.entity';

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
      entities: [BookEntity, AuthorEntity],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/**/*.graphql'],
      path: '/'
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
