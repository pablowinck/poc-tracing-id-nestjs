"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLoggerService = void 0;
const common_1 = require("@nestjs/common");
const tracing_context_service_1 = require("./tracing-context.service");
let CustomLoggerService = class CustomLoggerService {
    tracingContextService;
    constructor(tracingContextService) {
        this.tracingContextService = tracingContextService;
    }
    formatMessage(message, context) {
        const timestamp = new Date().toISOString();
        const tracingId = this.tracingContextService.getTracingId() || 'no-tracing-id';
        const className = context || 'Application';
        return `${timestamp} - [${tracingId}] - ${className} - ${message}`;
    }
    log(message, context) {
        console.log(this.formatMessage(String(message), context));
    }
    error(message, trace, context) {
        const formattedMessage = this.formatMessage(String(message), context);
        console.error(formattedMessage);
        if (trace) {
            console.error(trace);
        }
    }
    warn(message, context) {
        console.warn(this.formatMessage(String(message), context));
    }
    debug(message, context) {
        console.debug(this.formatMessage(String(message), context));
    }
    verbose(message, context) {
        console.log(this.formatMessage(String(message), context));
    }
};
exports.CustomLoggerService = CustomLoggerService;
exports.CustomLoggerService = CustomLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tracing_context_service_1.TracingContextService])
], CustomLoggerService);
//# sourceMappingURL=custom-logger.service.js.map