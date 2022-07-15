import path from "path";
import Piscina from "piscina"
import { __dirname } from "./config";
export const queueTask = (tasks: string, data: any) => {
    const piscina = new Piscina({
        filename: path.resolve(__dirname, `./queue/${tasks}.js`)
    });
    return piscina.run(data)
}