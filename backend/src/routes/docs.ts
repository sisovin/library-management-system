import { Router } from "https://deno.land/x/oak/mod.ts";
import { parse } from "https://deno.land/std@0.218.0/yaml/mod.ts";

const router = new Router();

// Helper function to safely read a file with error handling
async function safeReadFile(path: string, isJson = false): Promise<unknown> {
  try {
    const content = await Deno.readTextFile(path);
    return isJson ? JSON.parse(content) : parse(content);
  } catch (error) {
    console.error(`Error reading file at ${path}:`, error);
    return { error: "Documentation file not found or invalid", details: error.message };
  }
}

// Fix the paths - remove the leading slash
const swaggerFilePath = "D:\\DenoProjects\\library-management-system\\docs\\api\\swagger.yaml";
const postmanFilePath = "D:\\DenoProjects\\library-management-system\\docs\\api\\postman.json";

// Raw endpoints for programmatic access
router.get("/swagger", async (context) => {
  context.response.body = await safeReadFile(swaggerFilePath);
});

router.get("/postman", async (context) => {
  context.response.body = await safeReadFile(postmanFilePath, true);
});

// Serve Swagger UI
router.get("/swagger-ui", async (context) => {
  // Get the swagger spec as JSON
  const swaggerSpec = await safeReadFile(swaggerFilePath);
  
  context.response.type = "text/html";
  context.response.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Library Management System API Documentation</title>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css">
      <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin: 0; padding: 0; }
        .topbar { display: none; }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
      <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
      <script>
        window.onload = function() {
          const ui = SwaggerUIBundle({
            spec: ${JSON.stringify(swaggerSpec)},
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            plugins: [
              SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout",
          });
          window.ui = ui;
        };
      </script>
    </body>
    </html>
  `;
});

// Update the index page to include the new swagger-ui link
router.get("/", (context) => {
  context.response.type = "text/html";
  context.response.body = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Library Management System API Documentation</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #333; }
        ul { list-style-type: none; padding: 0; }
        li { margin: 10px 0; }
        a { color: #0066cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .recommended { color: #2ecc71; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>Library Management System API Documentation</h1>
      <ul>
        <li><a href="/docs/swagger-ui" class="recommended">Swagger UI (Interactive Documentation)</a> <span class="recommended">✓ Recommended</span></li>
        <li><a href="/docs/swagger">Raw Swagger Specification (JSON)</a></li>
        <li><a href="/docs/postman">Postman Collection</a></li>
      </ul>
    </body>
    </html>
  `;
});

export default router;