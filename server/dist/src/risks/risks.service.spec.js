"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const risks_service_1 = require("./risks.service");
const risk_entity_1 = require("./entities/risk.entity");
describe('RisksService', () => {
    let service;
    let mockRepository;
    beforeEach(async () => {
        mockRepository = {
            create: jest.fn(),
            save: jest.fn(async (entity) => entity),
            findOne: jest.fn(),
            remove: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                getMany: jest.fn().mockResolvedValue([]),
            })),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                risks_service_1.RisksService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(risk_entity_1.Risk),
                    useValue: mockRepository,
                },
            ],
        }).compile();
        service = module.get(risks_service_1.RisksService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('classifyRisk', () => {
        it('should classify risk levels correctly', async () => {
            const cases = [
                { l: 1, s: 1, expected: risk_entity_1.RiskLevel.LOW },
                { l: 1, s: 4, expected: risk_entity_1.RiskLevel.LOW },
                { l: 1, s: 5, expected: risk_entity_1.RiskLevel.MEDIUM },
                { l: 3, s: 3, expected: risk_entity_1.RiskLevel.MEDIUM },
                { l: 2, s: 5, expected: risk_entity_1.RiskLevel.HIGH },
                { l: 4, s: 4, expected: risk_entity_1.RiskLevel.HIGH },
                { l: 4, s: 5, expected: risk_entity_1.RiskLevel.EXTREME },
                { l: 5, s: 5, expected: risk_entity_1.RiskLevel.EXTREME },
            ];
            for (const { l, s, expected } of cases) {
                const dto = {
                    hazard: 'Test hazard',
                    likelihood: l,
                    severity: s,
                };
                mockRepository.create.mockReturnValue({ ...dto });
                const result = await service.create(dto);
                expect(result.riskScore).toBe(l * s);
                expect(result.riskLevel).toBe(expected);
                expect(mockRepository.create).toHaveBeenCalled();
                expect(mockRepository.save).toHaveBeenCalled();
            }
        });
    });
});
//# sourceMappingURL=risks.service.spec.js.map