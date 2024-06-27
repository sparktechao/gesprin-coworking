# Sistema de Gestão de Espaço de Coworking

## Introdução

Este sistema de gestão de espaço de coworking foi desenvolvido para facilitar a administração de coworkers, contratos, pagamentos, uso de recursos (como impressão), e a organização de salas e postos de trabalho. O sistema utiliza PostgreSQL como banco de dados e Prisma como ORM para manipulação de dados. O sistema também possui automações para emissão e gestão de notas de pagamento, bem como integração com gateways de pagamento.

## Funcionalidades

- **Gestão de Coworkers:** Adicionar, atualizar, listar e excluir coworkers.
- **Gestão de Contratos:** Adicionar, atualizar, listar e excluir contratos, com suporte para renovação automática.
- **Gestão de Pagamentos:** Emissão automática de notas de pagamento, gestão de multas e integração com gateway de pagamento.
- **Gestão de Salas e Postos de Trabalho:** Adicionar, atualizar, listar e excluir salas e postos de trabalho.
- **Gestão de Impressões:** Registrar e listar impressões realizadas pelos coworkers.
- **Gestão de Faturas:** Adicionar, atualizar, listar e excluir faturas.

## Configuração do Ambiente

Certifique-se de ter o seguinte software instalado:

- Node.js
- PostgreSQL
- Prisma CLI

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/sistema-gestao-coworking.git
cd sistema-gestao-coworking
