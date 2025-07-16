import { AppService } from './app.service';
import { CustomLoggerService } from './tracing/custom-logger.service';
export declare class AppController {
    private readonly appService;
    private readonly logger;
    constructor(appService: AppService, logger: CustomLoggerService);
    getHello(): string;
    getHelloWithTracing(): {
        message: string;
    };
    getHealthCheck(): object;
}
