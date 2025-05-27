const Ajv = require("ajv");
const fs = require("fs");
const schema = require("../schemas/soeasily-dsl-v1.schema.json");

const ajv = new Ajv({ allErrors: true });

const ruleFile = process.argv[2];
if (!ruleFile) {
    console.error("Usage: node validate.js <rule-file>");
    process.exit(1);
}

const rule = JSON.parse(fs.readFileSync(ruleFile, "utf-8"));
const validate = ajv.compile(schema);
const valid = validate(rule);

if (valid) {
    console.log("Rule is valid ✅");
} else {
    console.error("Rule validation failed ❌");
    console.error(validate.errors);
}
