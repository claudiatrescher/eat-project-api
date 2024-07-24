"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const restify = require("restify");
const mongoose_1 = require("mongoose");
const enviroment_1 = require("../common/enviroment");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
const corsMiddleware = require("restify-cors-middleware");
class Server {
    initializeDb() {
        mongoose_1.default.Promise = global.Promise;
        return mongoose_1.default.connect(enviroment_1.enviroment.db.url, {});
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0',
                });
                const corsOptions = {
                    preflightMaxAge: 10,
                    origins: ['http://localhost:4200'],
                    allowHeaders: ['Content-Type', 'Authorization'],
                    exposeHeaders: ['x-custom-header']
                };
                const cors = corsMiddleware(corsOptions);
                this.application.pre(cors.preflight);
                this.application.use(cors.actual);
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(enviroment_1.enviroment.server.port, () => {
                    resolve(this.application);
                });
                this.application.on('restifyError', error_handler_1.handleError);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
    shutdown() {
        return mongoose_1.default.disconnect().then(() => this.application.close());
    }
}
exports.Server = Server;
