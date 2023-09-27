import { Module } from '@nestjs/common';
import { AuthzService } from '@/authz/authz.service';
import { AuthzResolver } from '@/authz/authz.resolver';

@Module({
  providers: [AuthzService, AuthzResolver],
})
export class AuthzModule {}
