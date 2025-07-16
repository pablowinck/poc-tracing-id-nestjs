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
With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
