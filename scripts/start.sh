#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

PORT=5000
DEPLOY_RUN_PORT="${DEPLOY_RUN_PORT:-$PORT}"

start_service() {
    cd "${COZE_WORKSPACE_PATH}"
    if [ -f ".next/standalone/server.js" ]; then
        echo "Starting Next.js standalone server on port ${DEPLOY_RUN_PORT} for deploy..."
        PORT=${DEPLOY_RUN_PORT} HOSTNAME=0.0.0.0 node .next/standalone/server.js
    else
        echo "Starting custom HTTP server on port ${DEPLOY_RUN_PORT} for deploy..."
        PORT=${DEPLOY_RUN_PORT} node dist/server.js
    fi
}

echo "Starting HTTP service on port ${DEPLOY_RUN_PORT} for deploy..."
start_service