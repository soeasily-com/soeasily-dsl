# SoEasily DSL

The **SoEasily DSL** is a developer-first, AI-friendly rule definition format that compiles to `json-rules-engine` and extends it with powerful schema validation, explainability, and structured automation.

> 🔧 Write rules in plain English, validate against JSON Schema, and execute across cloud or local environments.

## ✨ Key Features

- ✅ Compatible with [`json-rules-engine`](https://github.com/CacheControl/json-rules-engine)
- ⚡ AI-Generated via OpenAI + JSON Schema awareness
- 🧩 Proprietary extensions: `when`, `expr`, `lookup`, `response_template`
- 📄 Self-documenting: `tags`, `description`, `test_cases`
- 🔐 Built for teams, workflows, and compliance

---

## 📘 Basic Examples

### 1. Basic `expr` Shortcut
```json
{
  "name": "approve_if_over_18",
  "expr": "user.age >= 18",
  "event": { "type": "approve" }
}
```

### 2. `when` / `then` Rule (Compiles to conditions + event)
```json
{
  "name": "vip_discount",
  "when": "customer.status == 'VIP' && order.total > 500",
  "then": {
    "type": "apply_discount",
    "params": { "percentage": 20 }
  }
}
```

---

## 🧩 Proprietary Extensions (DSL v1)

### 🔹 `expr`
Shorthand for a logical expression instead of verbose condition trees.

- ✅ Easier to read/write
- ✨ Used in AI-generated rules
- 🔁 Internally compiles to `conditions`

---

### 🔹 `when` + `then`
Alternative to `conditions` + `event`. Makes rules clearer for business logic.

```json
{
  "when": "fact.value > 100",
  "then": { "type": "trigger_alert" }
}
```

---

### 🔹 `extends`
Reference other rules or rule modules.

```json
{
  "extends": ["core/kyc_rules"],
  "expr": "user.age > 21",
  "event": { "type": "grant_access" }
}
```

---

### 🔹 `tags`, `description`
For filtering, searching, and documenting rules.

```json
{
  "tags": ["compliance", "kyc"],
  "description": "Ensures KYC compliance for age"
}
```

---

### 🔹 `test_cases`
Inline unit tests for rules (run during CI or UI).

```json
{
  "test_cases": [
    {
      "input": { "user": { "age": 22 } },
      "expect": { "type": "approve" }
    }
  ]
}
```

---

### 🔹 `lookup`
Reference dynamic data like SoEasily Sheets or config tables.

```json
{
  "conditions": {
    "all": [
      {
        "fact": "region",
        "operator": "in",
        "value": { "$lookup": "regions.eu" }
      }
    ]
  }
}
```

---

### 🔹 `settings`
Control execution logic, logging, and failure modes.

```json
{
  "settings": {
    "execution": "first_match",
    "fail_fast": true,
    "log_level": "trace"
  }
}
```

---

### 🔹 `response_template`
Shape output result with merged fields or custom format.

```json
{
  "response_template": {
    "status": "approved",
    "details": { "$merge": ["input", "event.params"] }
  }
}
```

---

## 📦 Installation

```bash
npm install @soeasily/rules
```

## ✅ Validate a Rule File (CLI)

```bash
node tools/validate.js examples/rule_basic.json
```

---

## 📚 Full Schema

View [`schemas/soeasily-dsl-v1.schema.json`](./schemas/soeasily-dsl-v1.schema.json)

## 🔐 License

MIT — see [`LICENSE`](./LICENSE)

## 🤝 Contributing

Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) to get started.
