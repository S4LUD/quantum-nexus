import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const targets = [
  "app",
  "components",
  "constants",
  "hooks",
  "i18n",
  "logic",
  "services",
  "state",
  "types",
  "utils",
];

if (existsSync("quantum-nexus-server/src")) {
  targets.push("quantum-nexus-server/src");
}

const eslintBin = resolve("node_modules", "eslint", "bin", "eslint.js");
const command = process.execPath;
const args = [eslintBin, ...targets, "--max-warnings=0"];

const result = spawnSync(command, args, {
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
