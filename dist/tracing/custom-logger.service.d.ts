import { LoggerService } from '@nestjs/common';
import { TracingContextService } from './tracing-context.service';
export declare class CustomLoggerService implements LoggerService {
    private readonly tracingContextService;
    constructor(tracingContextService: TracingContextService);
    private formatMessage;
    log(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    verbose(message: any, context?: string): void;
}
