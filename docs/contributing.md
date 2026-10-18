# Guia de Contribuição

## Workflow

1. Crie uma branch: `feat/nome-da-feature` ou `fix/nome-do-bug`
2. Desenvolva seguindo as convenções do projeto
3. Rode lint e testes antes do PR
4. Abra PR com descrição clara

## Convenções

### Commits
Formato: `tipo(escopo): descrição`

Tipos: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

Exemplos:
- `feat(bookings): add availability check`
- `fix(auth): handle expired session`

### Código
- TypeScript strict
- Componentes em PascalCase
- Funções utilitárias em camelCase
- Schemas Zod em `src/lib/validations/`
- Lógica de negócio em `src/server/services/`

### Branches
- `main` — produção
- `develop` — integração (quando aplicável)
- `feat/*`, `fix/*` — features e correções

## Checklist de PR

- [ ] TypeScript compila sem erros
- [ ] ESLint passa
- [ ] Testes relevantes adicionados/atualizados
- [ ] Documentação atualizada (se necessário)
- [ ] Sem secrets no código
