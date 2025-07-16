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
exports.TracingMiddleware = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const tracing_context_service_1 = require("./tracing-context.service");
let TracingMiddleware = class TracingMiddleware {
    tracingContextService;
    constructor(tracingContextService) {
        this.tracingContextService = tracingContextService;
    }
    use(req, res, next) {
        const tracingId = req.headers['x-correlation-id'] || (0, uuid_1.v4)();
        res.setHeader('x-correlation-id', tracingId);
        this.tracingContextService.run(tracingId, () => {
            next();
        });
    }
};
exports.TracingMiddleware = TracingMiddleware;
exports.TracingMiddleware = TracingMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tracing_context_service_1.TracingContextService])
], TracingMiddleware);
//# sourceMappingURL=tracing.middleware.js.map