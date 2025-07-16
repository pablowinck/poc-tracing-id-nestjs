"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracingContextService = void 0;
const common_1 = require("@nestjs/common");
const async_hooks_1 = require("async_hooks");
let TracingContextService = class TracingContextService {
    asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
    run(tracingId, callback) {
        return this.asyncLocalStorage.run({ tracingId }, callback);
    }
    getTracingId() {
        const context = this.asyncLocalStorage.getStore();
        return context?.tracingId;
    }
    hasContext() {
        return this.asyncLocalStorage.getStore() !== undefined;
    }
};
exports.TracingContextService = TracingContextService;
exports.TracingContextService = TracingContextService = __decorate([
    (0, common_1.Injectable)()
], TracingContextService);
//# sourceMappingURL=tracing-context.service.js.map