import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Field, ObjectType } from '@nestjs/graphql';

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

@ObjectType()
export class Info {
  @Field(() => String, { nullable: true, description: 'App name' })
  name: string;

  @Field(() => String, { nullable: true, description: 'App version' })
  version: string;

  @Field(() => String, { nullable: true, description: 'App endpoint' })
  endpoint: string;
}
