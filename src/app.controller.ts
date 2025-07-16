import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomLoggerService } from './tracing/custom-logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('Received request for GET /', 'AppController');
    return this.appService.getHello();
  }

  @Get('hello')
  getHelloWithTracing(): { message: string } {
    this.logger.log('Received request for GET /hello', 'AppController');
    const message = this.appService.getHello();
    this.logger.log('Successfully processed hello request', 'AppController');
    return { message };
  }

  @Get('health')
  getHealthCheck(): object {
    this.logger.log('Health check endpoint called', 'AppController');
    return this.appService.getHealthCheck();
  }
}
