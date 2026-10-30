import { readFileSync, writeFileSync } from "node:fs";
import { Marked } from "marked";

const inputFile = new URL("07_clean_code.md", import.meta.url);
const outputFile = new URL("07_clean_code.html", import.meta.url);

// "07 - Clean Code" => "07---clean-code" (same ids as in the class script)
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\- ]/g, "")
    .replace(/ /g, "-");

// Builds a nested list with links to all headings for the [TOC] marker
const createToc = (headings) => {
  const minDepth = Math.min(...headings.map((heading) => heading.depth));
  let level = minDepth - 1;
  let toc = "";

  for (const heading of headings) {
    if (heading.depth > level) {
      toc += "<ul>\n".repeat(heading.depth - level);
    } else {
      toc += "</li>\n" + "</ul>\n</li>\n".repeat(level - heading.depth);
    }
    toc += `<li><a href="#${slugify(heading.text)}">${heading.text}</a>`;
    level = heading.depth;
  }

  return (
    toc + "</li>\n" + "</ul>\n</li>\n".repeat(level - minDepth) + "</ul>\n"
  );
};

let headings = [];

const marked = new Marked({
  renderer: {
    heading({ tokens, depth, text }) {
      const content = this.parser.parseInline(tokens);
      return `<h${depth} id="${slugify(text)}">${content}</h${depth}>\n`;
    },
    paragraph({ text }) {
      if (text.trim() === "[TOC]") {
        return createToc(headings);
      }
      return false;
    },
  },
});

const markdown = readFileSync(inputFile, "utf8");
const tokens = marked.lexer(markdown);
headings = tokens.filter((token) => token.type === "heading");
const title = headings.find((heading) => heading.depth === 1)?.text ?? "";
const body = marked.parser(tokens);

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 2em auto;
        padding: 0 1em;
      }
      table {
        border-collapse: collapse;
      }
      th,
      td {
        border: 1px solid #d6d6d6;
        padding: 6px 13px;
      }
      pre,
      code {
        background-color: #f0f0f0;
      }
      pre {
        padding: 1em;
      }
    </style>
  </head>
  <body>
${body}  </body>
</html>
`;

writeFileSync(outputFile, html);
console.log("Converted 07_clean_code.md to 07_clean_code.html");
