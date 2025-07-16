import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TracingContextService } from './tracing-context.service';
export declare class TracingMiddleware implements NestMiddleware {
    private readonly tracingContextService;
    constructor(tracingContextService: TracingContextService);
    use(req: Request, res: Response, next: NextFunction): void;
}
