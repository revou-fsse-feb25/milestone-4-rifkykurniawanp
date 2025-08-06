"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const date_utils_1 = require("../utils/date-utils");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        const { method, originalUrl, ip, headers } = req;
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            const statusCode = res.statusCode;
            const wibDateTime = (0, date_utils_1.formatWIBDateTime)(new Date());
            const userAgent = headers['user-agent'] || '';
            const contentLength = res.getHeader('content-length') || 0;
            console.log(`[${wibDateTime}] [${method}] ${originalUrl} -> ${statusCode} (${duration}ms) | IP: ${ip} | UA: ${userAgent} | Content-Length: ${contentLength}`);
        });
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
