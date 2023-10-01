import { Resolver, Query } from '@nestjs/graphql';
import { AppService, Info } from '@/app.service';

@Resolver()
export class AppResolver {
  constructor(private appService: AppService) {}

  @Query(() => Info)
  info(): Info {
    return this.appService.getInfo();
  }
}
