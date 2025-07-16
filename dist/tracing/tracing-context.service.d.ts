export interface TracingContext {
    tracingId: string;
}
export declare class TracingContextService {
    private readonly asyncLocalStorage;
    run<T>(tracingId: string, callback: () => T): T;
    getTracingId(): string | undefined;
    hasContext(): boolean;
}
