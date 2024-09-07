import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { Unit1Module } from './unit-1/unit1.module';
import { MyElasticsearchModule } from './common/elastic';

@Module({
  imports: [ConfigModule, MyElasticsearchModule, Unit1Module],
})
export class AppModule {}
