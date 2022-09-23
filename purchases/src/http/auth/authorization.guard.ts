import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { expressjwt } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'node:util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE') ?? '';
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? '';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { getRequest, getResponse } = context.switchToHttp();
    const request = getRequest();
    const response = getResponse();

    const checkJwt = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}/.well-known/jwks.json`,
        }),
        audience: this.AUTH0_AUDIENCE,
        issuer: `https://${this.AUTH0_DOMAIN}/`,
        algorithms: ['RS256'],
      }),
    );

    return true;
  }
}
