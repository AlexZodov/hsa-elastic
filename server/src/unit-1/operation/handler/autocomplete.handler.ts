import { Injectable } from '@nestjs/common';
import { AutocompleteService } from '../../services';

@Injectable()
export class AutocompleteHandler {
  constructor(private readonly service: AutocompleteService) {}

  async handle(
    search: string,
  ): Promise<{ total: number; top_10_matches: string[] }> {
    return this.service.search(search);
  }
}
