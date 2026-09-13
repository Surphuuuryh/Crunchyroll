import index from "../public/index.html";
import logado from "../public/logado/logado.html";

const PORT = Number(Bun.env.PORT) || 3000;

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === "/") return new Response(await Bun.file("./public/index.html").bytes(), { headers: { "Content-Type": "text/html" } });
    if (url.pathname === "/logado/logado.html") return new Response(await Bun.file("./public/logado/logado.html").bytes(), { headers: { "Content-Type": "text/html" } });
    if (url.pathname === "/styles.css") return new Response(await Bun.file("./public/styles.css").bytes(), { headers: { "Content-Type": "text/css" } });
    if (url.pathname === "/logado/logado.css") return new Response(await Bun.file("./public/logado/logado.css").bytes(), { headers: { "Content-Type": "text/css" } });
    
    // Serve o script index.ts compilando para JS automaticamente
    if (url.pathname === "/src/script/index.ts") {
      const build = await Bun.build({ entrypoints: ["./src/script/index.ts"] });
      return new Response(build.outputs[0]);
    }

    if (url.pathname.startsWith("/svgs/")) {
      const file = Bun.file(`./public${url.pathname}`);
      if (await file.exists()) {
        return new Response(file);
      }
    }

    return new Response("Não encontrado", { status: 404 });
  },
  development: {
    hmr: true,
    console: true,
  },
});
console.log(`Site crunchy → http://localhost:${server.port}`);
