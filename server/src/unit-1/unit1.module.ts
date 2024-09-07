import { Module } from '@nestjs/common';
import { Unit1ServicesModule } from './services';
import { AutocompleteHandler } from './operation';
import { Unit1Controller } from './ui';

const handlers = [AutocompleteHandler];
@Module({
  imports: [Unit1ServicesModule],
  controllers: [Unit1Controller],
  providers: [...handlers],
})
export class Unit1Module {}
