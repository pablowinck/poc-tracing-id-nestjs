import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.log('Received request for GET /');
    return this.appService.getHello();
  }

  @Get('hello')
  getHelloWithTracing(): { message: string } {
    this.logger.log('Received request for GET /hello');
    const message = this.appService.getHello();
    this.logger.log('Successfully processed hello request');
    return { message };
  }

  @Get('health')
  getHealthCheck(): object {
    this.logger.log('Health check endpoint called');
    return this.appService.getHealthCheck();
  }
}
