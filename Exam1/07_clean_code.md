# 07 - Clean Code

---

[TOC]

---

## Clean Code

| Aspect                    | Tool          | Example (JS) |
| ------------------------- | ------------- | ------------ |
| Readability / Consistency | **Formatter** | Prettier     |
| Simplicity                | **Linter**    | ESLint       |

## Formatting

- Lines are at most 80 characters long.
- Consistent use of quotation marks (`"` vs `'`).

### Prettier

```json
{
  "printWidth": 80,
  "singleQuote": true
}
```

## Linting

**Linting** is static analysis of the code. It checks what the code _does_, not how it _looks_.

1. Unused variables or functions.
2. Compliance with project-specific rules.

### ESLint

Read more on [ESLint](https://eslint.org/).
