import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async search(index: string, query: Record<string, any>): Promise<any> {
    return this.elasticsearchService.search({
      index,
      query,
    });
  }

  async index(index: string, id: string, body: any) {
    return this.elasticsearchService.index({
      index,
      id,
      body,
    });
  }

  async createIndex(
    index: string,
    mappings: Record<string, any>,
    settings: Record<string, any>,
  ): Promise<void> {
    await this.elasticsearchService.indices.create(
      {
        index: 'autocomplete',
        mappings: mappings,
        settings: settings,
      },
      { ignore: [400] },
    );
  }

  async bulkIndex<T>(index: string, dataset: T[]) {
    const operations = dataset.flatMap((doc) => [
      { index: { _index: index } },
      doc,
    ]);
    return this.elasticsearchService.bulk({
      index: index,
      operations,
    });
  }

  async delete(index: string, id: string) {
    return this.elasticsearchService.delete({
      index,
      id,
    });
  }

  async deleteIndex(index: string) {
    await this.elasticsearchService.indices
      .delete({ index: index })
      .catch((err) => {
        console.log(err);
      });
  }
}
