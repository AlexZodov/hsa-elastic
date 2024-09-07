import { Injectable, OnModuleInit } from '@nestjs/common';
import { SearchService } from '../../common/elastic';
import * as Dictionary from '../domain/dataset/words_dictionary.json';

@Injectable()
export class AutocompleteService implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {}

  async search(
    search: string,
  ): Promise<{ total: number; top_10_matches: string[] }> {
    const maxTypoCount = this.getMaxTypoCountForWord(search);
    const minShouldMatchRate = Math.ceil(
      ((search.length - maxTypoCount) / search.length) * 100,
    );

    const searchResult = await this.searchService.search('autocomplete', {
      bool: {
        must: {
          match: {
            text: {
              query: search,
              minimum_should_match: minShouldMatchRate,
            },
          },
        },
        filter: [
          {
            range: {
              text_length: {
                gte: search.length - maxTypoCount,
                lte: search.length + maxTypoCount,
              },
            },
          },
        ],
      },
    });

    return {
      total: searchResult.hits.total.value,
      top_10_matches: searchResult.hits.hits
        .map((hit) => hit._source)
        .map((item) => item.text),
    };
  }
  async onModuleInit(): Promise<any> {
    const dictionaryLength = Object.keys(Dictionary).length;

    const dataset = [];

    for (const dictionaryKey in Dictionary) {
      dataset.push({ text: dictionaryKey, text_length: dictionaryKey.length });
    }

    console.log("Deleting existing index 'autocomplete'...");
    await this.searchService.deleteIndex('autocomplete');
    console.log('Deleted');

    console.log("Creating fresh index 'autocomplete'...");
    await this.searchService.createIndex(
      'autocomplete',
      {
        properties: {
          text: {
            type: 'text',
            analyzer: 'autocomplete',
            search_analyzer: 'standard',
          },
          text_length: {
            type: 'integer',
          },
        },
      },
      {
        analysis: {
          filter: {
            autocomplete_filter: {
              type: 'edge_ngram',
              min_gram: 1,
              max_gram: 25,
            },
          },
          analyzer: {
            autocomplete: {
              type: 'custom',
              tokenizer: 'standard',
              filter: ['lowercase', 'autocomplete_filter'],
            },
          },
        },
      },
    );
    console.log('Created');

    console.log("Populating index 'autocomplete' with dataset");
    await this.searchService.bulkIndex<{ text: string }>(
      'autocomplete',
      dataset,
    );
    console.log('Populated with ' + dictionaryLength + ' items');
  }

  private getMaxTypoCountForWord(word: string): number {
    let typoCount;
    if (word.length >= 7) {
      typoCount = 3;
    } else if (word.length >= 5) {
      typoCount = 2;
    } else if (word.length >= 3) {
      typoCount = 1;
    } else {
      typoCount = 0;
    }

    return typoCount;
  }
}
