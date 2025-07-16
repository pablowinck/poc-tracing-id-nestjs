# 🔍 POC Tracing ID - NestJS

> **Proof of Concept** para implementação de **Tracing ID** em aplicações NestJS com logs contextualizados usando `AsyncLocalStorage`.

## 📋 Sobre o Projeto

Esta POC demonstra como implementar um sistema de rastreamento de requisições HTTP através de **Correlation ID** (Tracing ID), permitindo:

- 🏷️ **Rastreamento de requisições** end-to-end
- 📊 **Logs contextualizados** com identificador único
- 🔄 **Propagação automática** do tracing ID através da aplicação
- 🚀 **Performance otimizada** usando AsyncLocalStorage do Node.js

## 🛠️ Stack Técnica

- **Node.js** 22+
- **NestJS** 11+
- **TypeScript**
- **UUID** para geração de IDs únicos
- **AsyncLocalStorage** para contexto de execução
- **pnpm** como gerenciador de pacotes

## 🏗️ Arquitetura

### Componentes Principais

```
src/
├── tracing/
│   ├── tracing.middleware.ts       # Middleware de captura/geração do tracing ID
│   ├── tracing-context.service.ts  # Serviço de contexto com AsyncLocalStorage
│   ├── custom-logger.service.ts    # Logger customizado com tracing ID
│   └── tracing.module.ts           # Módulo de tracing
├── app.controller.ts               # Endpoints de exemplo
├── app.service.ts                  # Serviços de exemplo
└── main.ts                        # Bootstrap da aplicação
```

### Fluxo de Execução

1. **Middleware** intercepta requisições HTTP
2. **Captura** o header `x-correlation-id` ou **gera** novo UUID
3. **Estabelece contexto** usando AsyncLocalStorage
4. **Logger customizado** inclui tracing ID em todos os logs
5. **Resposta** inclui o header `x-correlation-id`

## 🚀 Como Usar

### Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd poc-tracing-id-nestjs

# Instale as dependências
pnpm install
```

### Executando a Aplicação

```bash
# Modo desenvolvimento
pnpm run start:dev

# Modo produção
pnpm run build
pnpm run start:prod
```

A aplicação estará disponível em `http://localhost:3000`

### Endpoints Disponíveis

| Método | Endpoint  | Descrição                    |
|--------|-----------|------------------------------|
| GET    | `/`       | Endpoint básico              |
| GET    | `/hello`  | Endpoint com logs detalhados |
| GET    | `/health` | Health check                 |

## 🧪 Testando o Tracing ID

### 1. Requisição sem Correlation ID

```bash
curl -X GET http://localhost:3000/hello
```

**Resultado:**
- Um novo UUID será gerado automaticamente
- Logs mostrarão o tracing ID gerado
- Response incluirá header `x-correlation-id`

### 2. Requisição com Correlation ID

```bash
curl -X GET http://localhost:3000/hello \
  -H "x-correlation-id: my-custom-trace-123"
```

**Resultado:**
- O ID fornecido será utilizado
- Todos os logs utilizarão `my-custom-trace-123`
- Response retornará o mesmo ID no header

### 3. Formato dos Logs

Todos os logs seguem o padrão:

```
2024-07-16T20:01:22.123Z - [trace-id-uuid] - ClassName - Mensagem do log
```

**Exemplo:**
```
2024-07-16T20:01:22.123Z - [f47ac10b-58cc-4372-a567-0e02b2c3d479] - AppController - Received request for GET /hello
2024-07-16T20:01:22.125Z - [f47ac10b-58cc-4372-a567-0e02b2c3d479] - AppService - Processing hello request
2024-07-16T20:01:22.127Z - [f47ac10b-58cc-4372-a567-0e02b2c3d479] - AppController - Successfully processed hello request
```

## 💡 Implementação Detalhada

### TracingMiddleware

```typescript
@Injectable()
export class TracingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Captura ou gera tracing ID
    const tracingId = req.headers['x-correlation-id'] || uuidv4();
    
    // Adiciona ao response header
    res.setHeader('x-correlation-id', tracingId);
    
    // Executa dentro do contexto
    this.tracingContextService.run(tracingId, () => {
      next();
    });
  }
}
```

### TracingContextService

```typescript
@Injectable()
export class TracingContextService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<TracingContext>();

  run<T>(tracingId: string, callback: () => T): T {
    return this.asyncLocalStorage.run({ tracingId }, callback);
  }

  getTracingId(): string | undefined {
    return this.asyncLocalStorage.getStore()?.tracingId;
  }
}
```

### CustomLoggerService

```typescript
@Injectable()
export class CustomLoggerService implements LoggerService {
  private formatMessage(message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const tracingId = this.tracingContextService.getTracingId() || 'no-tracing-id';
    const className = context || 'Application';
    
    return `${timestamp} - [${tracingId}] - ${className} - ${message}`;
  }
}
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run start:dev      # Inicia em modo watch
pnpm run start:debug    # Inicia com debug

# Build e Produção
pnpm run build          # Compila o projeto
pnpm run start:prod     # Inicia versão de produção

# Testes
pnpm run test           # Executa testes unitários
pnpm run test:watch     # Testes em modo watch
pnpm run test:cov       # Testes com coverage
pnpm run test:e2e       # Testes end-to-end

# Qualidade de Código
pnpm run lint           # Executa ESLint
pnpm run format         # Executa Prettier
```

## 🎯 Casos de Uso

### 1. Microserviços
- Propagação de tracing ID entre serviços
- Rastreamento de transações distribuídas
- Debugging em arquiteturas complexas

### 2. Observabilidade
- Correlação de logs em sistemas distribuídos
- Métricas por transação
- Análise de performance por request

### 3. Debugging
- Isolamento de problemas específicos
- Rastreamento de erros end-to-end
- Análise de fluxo de execução

## 📚 Referências

- [AsyncLocalStorage - Node.js](https://nodejs.org/api/async_hooks.html#asynclocalstorage)
- [NestJS Middleware](https://docs.nestjs.com/middleware)
- [Correlation ID Pattern](https://microservices.io/patterns/observability/correlation-id.html)
- [Distributed Tracing](https://microservices.io/patterns/observability/distributed-tracing.html)

---

**Desenvolvido com ❤️ para demonstrar padrões de observabilidade em Node.js**
