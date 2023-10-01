import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getInfo(): Info {
    this.configService.get<string>('npm_package_name');
    return {
      name: this.configService.get<string>('npm_package_name'),
      version: this.configService.get<string>('npm_package_version'),
      endpoint: 'http://localhost:3000/graphql',
    };
  }
}

export type Info = {
  name: string;
  version: string;
  endpoint: string;
};
