import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import * as process from 'process';

dotenvExpand.expand(config());

@Injectable()
export class ConfigService {
  appProject = 'hsa_elasticsearch_server';
  server = {
    port: Number(process.env.PORT) || 3000,
  };

  elasticsearch = {
    url: process.env.ELASTICSEARCH_URL,
  };

  isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}
