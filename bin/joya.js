#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Joya } = require("../core/joya");

// Récupérer le fichier passé en argument
const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: joya <file.js>");
  process.exit(1);
}

const fullPath = path.resolve(process.cwd(), filePath);
const code = fs.readFileSync(fullPath, "utf-8");

// Lancer JOYA
const joya = new Joya();
joya.run(code);
