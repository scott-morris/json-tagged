#!/usr/bin/env node

// Libraries.

const fs = require("fs");
const package = require("./package.json");
const path = require("path");
const { program } = require("commander");

// Dependencies.

const parse = require("./src/parse");

// Private.

const parseTags = (value) =>
  typeof value === "string" ? value.split(",") : void 0;

// Public.

// Get the running parameters.
program
  .version(package.version)
  .arguments("<fileName>")
  .option("-t, --tags <tagList>", "tags to include in result", parseTags)
  .option("-x, --exclude <tagList>", "tags to exclude in the result", parseTags)
  .parse(process.argv)
  .command("<test>");

const {
  args: [fileName, ...args],
  tags,
  exclude,
} = program;

try {
  // Read the file.
  const filePath = path.relative(process.cwd(), fileName);
  const fileContent = fs.readFileSync(filePath, "utf8");

  // Attempt to parse the data.
  const data = JSON.parse(fileContent);
  parse(data, { tags, exclude });
} catch (err) {
  console.log(err.message);
  process.exit(1);
}
