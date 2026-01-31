# PagFlow 💳

Plataforma de pagamentos API-first focada em transações *one-time* para produtos digitais. Este projeto foi concebido para demonstrar competência técnica em sistemas transacionais, segurança financeira e arquitetura resiliente.

[![CI Pipeline](https://github.com/danilowskii/pagflow-platform/actions/workflows/ci.yml/badge.svg)](#)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](#)
[![Coverage](https://img.shields.io/badge/coverage-85%25-blueviolet)](#)

---

## 🚀 Visão Geral

O **PagFlow** resolve o problema de integração de pagamentos simulando um ecossistema real de checkout. O foco principal é a **consistência de dados** e a **segurança**, utilizando práticas como idempotência de requisições e processamento de webhooks com garantia de entrega.

### Diferenciais Técnicos:
* **Idempotência:** Uso de `Idempotency-Key` para evitar cobranças duplicadas.
* **Segurança Transacional:** Webhooks validados via assinatura HMAC.
* **Resiliência:** Persistência de eventos de webhook para auditoria e retries.
* **API-First:** Documentação Swagger (OpenAPI) como fonte da verdade.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
| :--- | :--- |
| **Backend** | Node.js, Express, TypeScript |
| **Frontend** | Next.js 14, TypeScript, Tailwind |
| **Banco de Dados** | PostgreSQL |
| **Autenticação** | JWT (Access + Refresh Tokens) |
| **Testes** | Jest, Supertest |
| **DevOps** | Docker, GitHub Actions |
