"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.startServer = startServer;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (_request, response) => response.json({ status: 'ok', apiUrl }));
app.use('/api', routes_1.default);
const errorHandler = (error, _request, response, _next) => {
    console.error(error);
    response.status(400).json({ error: error instanceof Error ? error.message : 'Request failed' });
};
app.use(errorHandler);
async function startServer() {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(port, () => console.log(`Octofit API listening at ${apiUrl}`));
    }
    catch (error) {
        console.error('Unable to start API:', error);
        process.exit(1);
    }
}
if (require.main === module) {
    startServer();
}
