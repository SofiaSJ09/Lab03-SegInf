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
exports.RisksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const risk_entity_1 = require("./entities/risk.entity");
let RisksService = class RisksService {
    constructor(risksRepository) {
        this.risksRepository = risksRepository;
    }
    async create(createRiskDto) {
        const riskScore = createRiskDto.likelihood * createRiskDto.severity;
        const riskLevel = this.classifyRisk(riskScore);
        const risk = this.risksRepository.create({
            ...createRiskDto,
            riskScore,
            riskLevel,
        });
        return this.risksRepository.save(risk);
    }
    async findAll(filters = {}) {
        const { level, search, sortBy = 'createdAt', order = 'DESC' } = filters;
        let query = this.risksRepository.createQueryBuilder('risk');
        if (level) {
            query = query.where('risk.riskLevel = :level', { level });
        }
        if (search) {
            query = query.andWhere('risk.hazard LIKE :search', { search: `%${search}%` });
        }
        query = query.orderBy(`risk.${sortBy}`, order);
        return query.getMany();
    }
    async findOne(id) {
        const risk = await this.risksRepository.findOne({ where: { id } });
        if (!risk) {
            throw new common_1.NotFoundException(`Risk with ID ${id} not found`);
        }
        return risk;
    }
    async update(id, updateRiskDto) {
        const risk = await this.findOne(id);
        if (updateRiskDto.hazard !== undefined) {
            risk.hazard = updateRiskDto.hazard;
        }
        if (updateRiskDto.likelihood !== undefined) {
            risk.likelihood = updateRiskDto.likelihood;
        }
        if (updateRiskDto.severity !== undefined) {
            risk.severity = updateRiskDto.severity;
        }
        if (updateRiskDto.likelihood !== undefined || updateRiskDto.severity !== undefined) {
            risk.riskScore = risk.likelihood * risk.severity;
            risk.riskLevel = this.classifyRisk(risk.riskScore);
        }
        return this.risksRepository.save(risk);
    }
    async remove(id) {
        const risk = await this.findOne(id);
        await this.risksRepository.remove(risk);
    }
    async seed() {
        const seedData = [
            { hazard: 'Electrical fire', likelihood: 2, severity: 4 },
            { hazard: 'Chemical spill', likelihood: 1, severity: 5 },
            { hazard: 'Falling objects', likelihood: 3, severity: 3 },
            { hazard: 'Machine malfunction', likelihood: 4, severity: 2 },
            { hazard: 'Slip and fall', likelihood: 5, severity: 1 },
            { hazard: 'Gas leak', likelihood: 1, severity: 5 },
        ];
        const risks = [];
        for (const data of seedData) {
            const risk = await this.create(data);
            risks.push(risk);
        }
        return risks;
    }
    classifyRisk(score) {
        if (score >= 1 && score <= 4)
            return risk_entity_1.RiskLevel.LOW;
        if (score >= 5 && score <= 9)
            return risk_entity_1.RiskLevel.MEDIUM;
        if (score >= 10 && score <= 16)
            return risk_entity_1.RiskLevel.HIGH;
        if (score >= 17 && score <= 25)
            return risk_entity_1.RiskLevel.EXTREME;
        return risk_entity_1.RiskLevel.LOW;
    }
};
exports.RisksService = RisksService;
exports.RisksService = RisksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(risk_entity_1.Risk)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RisksService);
//# sourceMappingURL=risks.service.js.map