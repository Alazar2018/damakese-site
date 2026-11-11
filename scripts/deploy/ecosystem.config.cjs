/** PM2 — site only. From the site repo root: pm2 start scripts/deploy/ecosystem.config.cjs */
const path = require("path");

const root = path.join(__dirname, "..", "..");

module.exports = {
  apps: [
    {
      name: "damakese-site",
      cwd: root,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3456 -H 127.0.0.1",
      instances: 1,
      exec_mode: "fork",
      env: { NODE_ENV: "production" },
      max_memory_restart: "800M",
    },
  ],
};
