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
exports.Risk = exports.RiskLevel = void 0;
const typeorm_1 = require("typeorm");
var RiskLevel;
(function (RiskLevel) {
    RiskLevel["LOW"] = "Low";
    RiskLevel["MEDIUM"] = "Medium";
    RiskLevel["HIGH"] = "High";
    RiskLevel["EXTREME"] = "Extreme";
})(RiskLevel || (exports.RiskLevel = RiskLevel = {}));
let Risk = class Risk {
};
exports.Risk = Risk;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Risk.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Risk.prototype, "hazard", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: false }),
    __metadata("design:type", Number)
], Risk.prototype, "likelihood", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: false }),
    __metadata("design:type", Number)
], Risk.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: false }),
    __metadata("design:type", Number)
], Risk.prototype, "riskScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Risk.prototype, "riskLevel", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Risk.prototype, "createdAt", void 0);
exports.Risk = Risk = __decorate([
    (0, typeorm_1.Entity)()
], Risk);
//# sourceMappingURL=risk.entity.js.map