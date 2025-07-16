import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export interface TracingContext {
  tracingId: string;
}

@Injectable()
export class TracingContextService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<TracingContext>();

  /**
   * Executa uma função dentro de um contexto com tracing ID
   */
  run<T>(tracingId: string, callback: () => T): T {
    return this.asyncLocalStorage.run({ tracingId }, callback);
  }

  /**
   * Obtém o tracing ID do contexto atual
   */
  getTracingId(): string | undefined {
    const context = this.asyncLocalStorage.getStore();
    return context?.tracingId;
  }

  /**
   * Verifica se existe um contexto ativo
   */
  hasContext(): boolean {
    return this.asyncLocalStorage.getStore() !== undefined;
  }
}
