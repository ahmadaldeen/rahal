import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'source-map-support/register';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // await app.listen(3000);
  await app.listen(3000);
  //dsxf;dkjm
}
bootstrap();  