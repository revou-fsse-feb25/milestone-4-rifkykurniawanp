"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializationInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const class_transformer_1 = require("class-transformer");
let SerializationInterceptor = class SerializationInterceptor {
    dtoClass;
    constructor(dtoClass) {
        this.dtoClass = dtoClass;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            try {
                let serialized = null;
                if (data) {
                    const transformOptions = {
                        excludeExtraneousValues: true,
                        enableImplicitConversion: true,
                    };
                    if (Array.isArray(data)) {
                        serialized = (0, class_transformer_1.plainToInstance)(this.dtoClass, data, transformOptions);
                    }
                    else {
                        serialized = (0, class_transformer_1.plainToInstance)(this.dtoClass, data, transformOptions);
                    }
                }
                const response = {
                    success: true,
                    data: serialized,
                };
                return response;
            }
            catch (error) {
                console.error(`[SerializationInterceptor] Error transforming response:`, error, 'Raw data:', data);
                throw error;
            }
        }), (0, operators_1.catchError)((err) => {
            console.error('[SerializationInterceptor] Caught error in stream:', err);
            throw err;
        }));
    }
};
exports.SerializationInterceptor = SerializationInterceptor;
exports.SerializationInterceptor = SerializationInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Function])
], SerializationInterceptor);
