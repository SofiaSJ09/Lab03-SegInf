import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RisksService } from './risks.service';
import { Risk, RiskLevel } from './entities/risk.entity';
import { CreateRiskDto } from './dto/create-risk.dto';
import { Repository } from 'typeorm';

describe('RisksService', () => {
  let service: RisksService;
  let mockRepository: {
    create: jest.Mock;
    save: jest.Mock;
    findOne: jest.Mock;
    remove: jest.Mock;
    createQueryBuilder: jest.Mock;
  };

  beforeEach(async () => {
    // 👉 una sola variable, sin sombrear
    mockRepository = {
      create: jest.fn(),
      // save devolverá lo que reciba, para validar la lógica del servicio
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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RisksService,
        {
          provide: getRepositoryToken(Risk),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RisksService>(RisksService);
    // No vuelvas a obtener el repo del módulo: ya estamos usando el objeto mockRepository arriba
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('classifyRisk', () => {
    it('should classify risk levels correctly', async () => {
      // Pares (likelihood, severity) válidos (1..5) con su nivel esperado
      const cases: Array<{ l: 1|2|3|4|5; s: 1|2|3|4|5; expected: RiskLevel }> = [
        { l: 1, s: 1, expected: RiskLevel.LOW },     // score 1
        { l: 1, s: 4, expected: RiskLevel.LOW },     // score 4
        { l: 1, s: 5, expected: RiskLevel.MEDIUM },  // score 5
        { l: 3, s: 3, expected: RiskLevel.MEDIUM },  // score 9
        { l: 2, s: 5, expected: RiskLevel.HIGH },    // score 10
        { l: 4, s: 4, expected: RiskLevel.HIGH },    // score 16
        { l: 4, s: 5, expected: RiskLevel.EXTREME }, // score 20
        { l: 5, s: 5, expected: RiskLevel.EXTREME }, // score 25
      ];

      for (const { l, s, expected } of cases) {
        const dto: CreateRiskDto = {
          hazard: 'Test hazard',
          likelihood: l,
          severity: s,
        };

        // que create devuelva un objeto base; el servicio añadirá score/level
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
