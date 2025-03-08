const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { error } = require("console");

function itauna(request, response) {
    const URL = url.parse(request.url, true)
    const filePath = path.join(__dirname, "..", "mock", "alunos.json");

    if (request.method === "GET" && URL.pathname === "/") {
        response.end("Ola mundo!");
        return;

    }

    if (request.method === "GET" && URL.pathname === "/alunos") {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                response.writeHead(500, { "Content-type": "text/plain" })
                return;

                response.end(JSON.stringify({ error: "Error ao ler o arquivo" }));
                return;
            }
            response.writeHead(200, { "Content-type": "application/json" });
            return response.end(data);
         
        });
        return;
    }
    
    if (request.method === "GET" && URL.pathname === "/alunos") {}
    response.writeHead(404, { "Content-type": "text/plain" })
    response.end(JSON.stringify({ error: "Error ao ler o arquivo" }));
}
const serve = http.createServer(itauna);
serve.listen(3000, () => console.log("servidor rodando!"))



