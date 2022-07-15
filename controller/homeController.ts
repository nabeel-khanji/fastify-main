import { queueTask } from "../lib/queue";
import { httpReq } from "../lib/reqHandler";

export const getHome = httpReq(() => {
    // queueTask("email", { a: 22, b: 40 }).then(e => {
    //     console.log(e)
    // })
    return "Core Activated!"
})