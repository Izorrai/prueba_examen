import { createServer } from "http";
import { readFile } from "fs/promises";
import { join } from "path";

const PORT = 3000;

const server = createServer(async (req, res) => {
  const file =
    req.url === "/" ? "index.html" : req.url;

  try {
    const content = await readFile(
      join("public", file)
    );
    res.writeHead(200);
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end("No encontrado");
  }
});

server.listen(PORT, () => {
  console.log("Servidor escuchando en puerto 3000");
});
