import { Injectable, LoggerService } from '@nestjs/common';
import { TracingContextService } from './tracing-context.service';

@Injectable()
export class CustomLoggerService implements LoggerService {
  constructor(private readonly tracingContextService: TracingContextService) {}

  /**
   * Formata a mensagem de log com o padrão solicitado:
   * timestamp - [tracingId] - ClassName - log message
   */
  private formatMessage(message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const tracingId =
      this.tracingContextService.getTracingId() || 'no-tracing-id';
    const className = context || 'Application';

    return `${timestamp} - [${tracingId}] - ${className} - ${message}`;
  }

  log(message: any, context?: string) {
    console.log(this.formatMessage(String(message), context));
  }

  error(message: any, trace?: string, context?: string) {
    const formattedMessage = this.formatMessage(String(message), context);
    console.error(formattedMessage);
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: any, context?: string) {
    console.warn(this.formatMessage(String(message), context));
  }

  debug(message: any, context?: string) {
    console.debug(this.formatMessage(String(message), context));
  }

  verbose(message: any, context?: string) {
    console.log(this.formatMessage(String(message), context));
  }
}
