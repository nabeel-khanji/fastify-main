import "./lib/config"
import { http } from "./routes/router";

http.listen({ port: 3000 })