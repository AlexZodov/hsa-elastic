import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure';
import { AutocompleteService } from './autocomplete.service';
import { MyElasticsearchModule } from '../../common/elastic';

@Module({
  imports: [InfrastructureModule, MyElasticsearchModule],
  providers: [AutocompleteService],
  exports: [AutocompleteService],
})
export class Unit1ServicesModule {}
