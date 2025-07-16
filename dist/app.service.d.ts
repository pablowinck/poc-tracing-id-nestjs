import { CustomLoggerService } from './tracing/custom-logger.service';
export declare class AppService {
    private readonly logger;
    constructor(logger: CustomLoggerService);
    getHello(): string;
    getHealthCheck(): object;
}
