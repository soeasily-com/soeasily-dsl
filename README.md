# SoEasily Schemas

**SoEasily Schemas** - You've reached the home of the schema definitions for the SoEasily workflow platform. SoEasily turns natural language into powerful workflows with AI-powered automation and visual flow building.

> 🚀 Perfect for SaaS teams who need instant workflow creation without the complexity of traditional tools.

## ✨ Why SoEasily?

- **Typed DSL with Schema Validation** - SaaS-ready embedding with comprehensive schema validation
- **Real-time Execution** - Less complexity, more AI-powered automation with real-time execution and monitoring  
- **Multi-tenant Ready** - Typed DSL, custom UI extensions, agentic workflows with multi-tenant isolation for SaaS
- **AI-Powered Agents** - Build flows that integrate OpenAI, summarize, classify, and route intelligently with AI-powered agents and conditionals

---

## 📋 Available Schemas

### 🔹 SoEasily Workflow Schema (v1.0)
**File:** [`schemas/v1/soeasily-workflow.json`](./schemas/v1/soeasily-workflow.json)

The workflow schema defines the structure for creating complete SoEasily workflows. A workflow consists of:

- **Header** - Metadata including ID, title, description, version, and tags
- **Actions** - Array of action instances with unique instance IDs and configurations
- **Connections** - Defines execution flow between actions with data mapping and conditional logic
- **Error Handling** - Global error handling strategy with retry policies

**Key Features:**
- JMESPath/JSONata expressions for data transformation
- Conditional branching logic
- Global error handling and retry mechanisms
- Version control and tagging system

### 🔹 SoEasily Action Schema (v1.0)
**File:** [`schemas/v1/soeasily-action.json`](./schemas/v1/soeasily-action.json)

The action schema defines individual action definitions that can be used within workflows. Each action includes:

- **Identification** - Globally unique ID with namespace (e.g., `http_request`)
- **Author Information** - Details about the action creator and support resources
- **Documentation** - User-friendly titles, descriptions, categories, and localization
- **Schemas** - JSON Schema definitions for configuration, input, output, and credentials
- **Testing** - Built-in test cases for validation

**Categories:**
- `trigger` - Workflow initiators
- `control_flow` - Conditional and branching logic
- `data_operation` - Data transformation and manipulation
- `execution_scripting` - Code execution and scripting
- `integration_generic` - Third-party service integrations
- `ai_llm` - AI and language model operations
- `utility` - Helper and utility functions

---

## 🎯 Use Cases

### Internal Operations
Automate onboarding, invoice approvals, and team workflows with natural language descriptions.

### Customer-Facing
Let users build workflows directly in your product with our embeddable visual editor.

### AI Agents
Build intelligent flows that integrate with AI services for summarization, classification, and smart routing.

---

## 🚀 How It Works

### 1. Type a Workflow
Describe your automation in plain English: "If user signs up and is under 18, notify support team. Otherwise, send welcome email."

### 2. AI Turns it into Logic
SoEasily converts your prompt into a typed JSON DSL with schema validation and visual flow representation.

### 3. Run or Customize
Deploy instantly, embed in your SaaS, or fine-tune with our visual editor. Multi-tenant ready with real-time execution.

---

## 📚 Example Workflow Structure

```json
{
  "header": {
    "id": "user_onboarding_flow",
    "title": "User Onboarding Workflow",
    "description": "Automated user onboarding with age verification",
    "version": 1,
    "tags": ["onboarding", "user-management"]
  },
  "actions": [
    {
      "instance_id": "age_check_1",
      "action": "soeasily/condition@1",
      "config": {
        "expression": "user.age >= 18"
      }
    },
    {
      "instance_id": "send_welcome_email_1",
      "action": "soeasily/email@1",
      "config": {
        "template": "welcome_adult"
      }
    },
    {
      "instance_id": "notify_support_1",
      "action": "soeasily/notification@1",
      "config": {
        "message": "Minor user registration requires review"
      }
    }
  ],
  "connections": [
    {
      "source_action": "age_check_1",
      "target_action": "send_welcome_email_1",
      "condition": "source.result == true",
      "data_mapping": {
        "user_email": "source.input.user.email"
      }
    },
    {
      "source_action": "age_check_1", 
      "target_action": "notify_support_1",
      "condition": "source.result == false",
      "data_mapping": {
        "user_data": "source.input.user"
      }
    }
  ]
}
```

## 📚 Example Action Definition

```json
{
  "id": "http_request",
  "version": "1.0.0",
  "author": {
    "name": "SoEasily",
    "url": "https://soeasily.com"
  },
  "documentation": {
    "title": "HTTP Request",
    "description": "Make HTTP requests to external APIs",
    "category": "integration_generic",
    "collection": {
      "name": "Core Actions"
    }
  },
  "handler": "soeasily.actions.http_handler@1",
  "config_schema": {
    "type": "object",
    "properties": {
      "method": {
        "type": "string",
        "enum": ["GET", "POST", "PUT", "DELETE"]
      },
      "url": {
        "type": "string",
        "format": "uri"
      }
    },
    "required": ["method", "url"]
  },
  "input_schema": {
    "type": "object",
    "properties": {
      "headers": { "type": "object" },
      "body": { "type": "object" }
    }
  },
  "output_schema": {
    "type": "object",
    "properties": {
      "status": { "type": "integer" },
      "body": { "type": "object" },
      "headers": { "type": "object" }
    }
  }
}
```

---

## 🌐 Schema URLs

The schemas are hosted at:
- **Workflow Schema:** `https://schemas.soeasily.com/v1/soeasily-workflow.json`
- **Action Schema:** `https://schemas.soeasily.com/v1/soeasily-action.json`

---

## 🔐 License

MIT — see [`LICENSE`](./LICENSE)

---

**SoEasily** - Powering the next generation of workflow automation
