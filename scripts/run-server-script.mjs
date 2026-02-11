import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const scriptName = process.argv[2];

if (!scriptName) {
  console.error("Missing server script name. Usage: node scripts/run-server-script.mjs <script>");
  process.exit(1);
}

if (!existsSync("quantum-nexus-server/package.json")) {
  console.log(`[server:${scriptName}] skipped (quantum-nexus-server/package.json not found)`);
  process.exit(0);
}

const result = spawnSync(
  "npm",
  ["--prefix", "quantum-nexus-server", "run", scriptName],
  {
    stdio: "inherit",
    shell: process.platform === "win32",
  },
);

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
