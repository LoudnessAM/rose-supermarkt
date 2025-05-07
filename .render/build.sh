#!/usr/bin/env bash

# Exit sofort bei Fehlern
set -e

# Frontend bauen
cd frontend
npm install
npm run build

# Build-Ordner in public verschieben
mkdir -p ../public
cp -r build/* ../public/