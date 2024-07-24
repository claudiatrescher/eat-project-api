"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
const auth_handler_1 = require("../security/auth.handler");
const mail_1 = require("../services/mail");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                users_model_1.User.findByEmail(req.query.email)
                    .then(user => {
                    if (user) {
                        return [user];
                    }
                    else {
                        return [];
                    }
                })
                    .then(this.renderAll(resp, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.enviarEmail = (req, res, next) => {
            const { to, subject, message } = req.body;
            mail_1.default.to = to;
            mail_1.default.subject = subject;
            mail_1.default.message = message;
            mail_1.default.sendMail();
            res.status(200).json({ 'message': "Email enviado com sucesso" });
        };
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get({ path: `${this.basePath}` }, [
            this.findByEmail,
            this.findAll
        ]);
        application.get({ path: `${this.basePath}/` }, [this.findAll]);
        application.get({ path: `${this.basePath}/:id` }, [this.validateId, this.findById]);
        application.post({ path: `${this.basePath}` }, [this.save, this.enviarEmail]);
        application.put({ path: `${this.basePath}/:id` }, [this.validateId, this.replace]);
        application.patch({ path: `${this.basePath}/:id` }, [this.validateId, this.update]);
        application.del({ path: `${this.basePath}/id` }, [this.validateId, this.delete]);
        application.post(`${this.basePath}/authenticate`, auth_handler_1.authenticate);
    }
}
exports.usersRouter = new UsersRouter();
