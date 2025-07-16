import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TracingContextService } from './tracing-context.service';

@Injectable()
export class TracingMiddleware implements NestMiddleware {
  constructor(private readonly tracingContextService: TracingContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Captura o tracing ID do header x-correlation-id ou gera um novo UUID
    const tracingId = (req.headers['x-correlation-id'] as string) || uuidv4();

    // Adiciona o tracing ID ao response header para facilitar debugging
    res.setHeader('x-correlation-id', tracingId);

    // Executa o resto da requisição dentro do contexto com tracing ID
    this.tracingContextService.run(tracingId, () => {
      next();
    });
  }
}
