import { GraphqlConfig } from './common/configs/config.interface';
import { ConfigService } from '@nestjs/config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPlugin, BaseContext } from '@apollo/server';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService) {}

  createGqlOptions(): ApolloDriverConfig {
    let env = this.configService.get<string>('NODE_ENV');
    let plugins: ApolloServerPlugin<BaseContext>[];

    if (env === 'production') {
      plugins = [
        ApolloServerPluginLandingPageProductionDefault({
          embed: true,
          graphRef: 'myGraph@prod',
        }),
      ];
    } else {
      plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })];
    }

    const graphqlConfig = this.configService.get<GraphqlConfig>('graphql');
    return {
      // schema options
      autoSchemaFile: graphqlConfig.schemaDestination || './src/schema.graphql',
      sortSchema: graphqlConfig.sortSchema,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      // subscription
      installSubscriptionHandlers: true,
      includeStacktraceInErrorResponses: graphqlConfig.debug,
      playground: false,
      introspection: graphqlConfig.playgroundEnabled,
      context: ({ req }) => ({ req }),
      plugins,
    };
  }
}
