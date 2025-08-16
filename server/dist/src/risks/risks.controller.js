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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RisksController = void 0;
const common_1 = require("@nestjs/common");
const risks_service_1 = require("./risks.service");
const create_risk_dto_1 = require("./dto/create-risk.dto");
const update_risk_dto_1 = require("./dto/update-risk.dto");
let RisksController = class RisksController {
    constructor(risksService) {
        this.risksService = risksService;
    }
    create(createRiskDto) {
        return this.risksService.create(createRiskDto);
    }
    findAll(query) {
        return this.risksService.findAll(query);
    }
    findOne(id) {
        return this.risksService.findOne(+id);
    }
    update(id, updateRiskDto) {
        return this.risksService.update(+id, updateRiskDto);
    }
    remove(id) {
        return this.risksService.remove(+id);
    }
    seed() {
        return this.risksService.seed();
    }
};
exports.RisksController = RisksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_risk_dto_1.CreateRiskDto]),
    __metadata("design:returntype", Promise)
], RisksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RisksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RisksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_risk_dto_1.UpdateRiskDto]),
    __metadata("design:returntype", Promise)
], RisksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RisksController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RisksController.prototype, "seed", null);
exports.RisksController = RisksController = __decorate([
    (0, common_1.Controller)('api/risks'),
    __metadata("design:paramtypes", [risks_service_1.RisksService])
], RisksController);
//# sourceMappingURL=risks.controller.js.map