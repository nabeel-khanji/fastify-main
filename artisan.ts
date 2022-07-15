import { http } from "./routes/router";

const commands = [
    { key: 'list', description: "List All Availible commands" },
    { key: 'routes', description: "List Routes" }]
const selectedComand = commands.find(item => process.argv.includes(item.key))

if (!selectedComand) {
    console.error("No commad found. please use \" npm asrisan list \" to list all availible commands.")
} else {
    switch (selectedComand.key) {
        case 'list':
            console.log(commands)
            break;
        case 'routes':
            console.log(http.printRoutes({ includeHooks: true, includeMeta: true }))
            break;
    }
    process.exit()
}

