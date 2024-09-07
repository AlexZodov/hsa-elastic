import { Controller, Get, Param } from '@nestjs/common';
import { AutocompleteHandler } from '../../operation';

@Controller('/unit-1')
export class Unit1Controller {
  constructor(private readonly createUnit1Handler: AutocompleteHandler) {}

  @Get('/autocomplete/:search')
  async autocomplete(
    @Param('search') search: string,
  ): Promise<{ total: number; top_10_matches: string[] }> {
    return await this.createUnit1Handler.handle(search);
  }
}
