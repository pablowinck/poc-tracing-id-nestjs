import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from './tracing/custom-logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: CustomLoggerService) {}

  getHello(): string {
    this.logger.log('Processing hello request', 'AppService');
    const message = 'Hello world';
    this.logger.log(`Returning message: ${message}`, 'AppService');
    return message;
  }

  getHealthCheck(): object {
    this.logger.log('Health check requested', 'AppService');
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'poc-tracing-nestjs',
    };
    this.logger.log('Health check completed successfully', 'AppService');
    return health;
  }
}
