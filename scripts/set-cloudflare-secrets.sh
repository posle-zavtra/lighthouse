#!/usr/bin/env bash
set -euo pipefail
gh secret set CLOUDFLARE_API_TOKEN --repo posle-zavtra/lighthouse
gh secret set CLOUDFLARE_ACCOUNT_ID --repo posle-zavtra/lighthouse
