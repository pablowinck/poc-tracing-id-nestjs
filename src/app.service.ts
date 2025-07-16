import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log('Processing hello request');
    const message = 'Hello world';
    this.logger.log(`Returning message: ${message}`);
    return message;
  }

  getHealthCheck(): object {
    this.logger.log('Health check requested');
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'poc-tracing-nestjs',
    };
    this.logger.log('Health check completed successfully');
    return health;
  }
}
