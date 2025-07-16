import { Module, Global } from '@nestjs/common';
import { TracingContextService } from './tracing-context.service';
import { CustomLoggerService } from './custom-logger.service';

@Global()
@Module({
  providers: [TracingContextService, CustomLoggerService],
  exports: [TracingContextService, CustomLoggerService],
})
export class TracingModule {}
