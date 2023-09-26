import { Module } from '@nestjs/common';
import { AuthzService } from '@/authz/authz.service';
import { AuthzResolver } from '@/authz/authz.resolver';

@Module({
  imports: [],
  providers: [AuthzService, AuthzResolver],
  exports: [],
})
export class AuthzModule {}
