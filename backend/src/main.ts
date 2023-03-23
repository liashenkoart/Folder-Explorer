import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors: true
  });

  app.useStaticAssets(join(__dirname, '..', 'dist/files'));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.setGlobalPrefix('api')
  const config = new DocumentBuilder()
  .setTitle('Folder Explorer')
  .setDescription('The Folder Explorer API description')
  .setVersion('1.0')
  .addTag('explorer')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
