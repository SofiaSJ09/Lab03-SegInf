import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Risk, RiskLevel } from './entities/risk.entity';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';

export interface RiskFilters {
  level?: RiskLevel;
  search?: string;
  sortBy?: 'riskScore' | 'createdAt';
  order?: 'ASC' | 'DESC';
}

@Injectable()
export class RisksService {
  constructor(
    @InjectRepository(Risk)
    private risksRepository: Repository<Risk>,
  ) {}

  async create(createRiskDto: CreateRiskDto): Promise<Risk> {
    const riskScore = createRiskDto.likelihood * createRiskDto.severity;
    const riskLevel = this.classifyRisk(riskScore);

    const risk = this.risksRepository.create({
      ...createRiskDto,
      riskScore,
      riskLevel,
    });

    return this.risksRepository.save(risk);
  }

  async findAll(filters: RiskFilters = {}): Promise<Risk[]> {
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

  async findOne(id: number): Promise<Risk> {
    const risk = await this.risksRepository.findOne({ where: { id } });
    if (!risk) {
      throw new NotFoundException(`Risk with ID ${id} not found`);
    }
    return risk;
  }

  async update(id: number, updateRiskDto: UpdateRiskDto): Promise<Risk> {
    const risk = await this.findOne(id);
    
    // Update entity properties
    if (updateRiskDto.hazard !== undefined) {
      risk.hazard = updateRiskDto.hazard;
    }
    if (updateRiskDto.likelihood !== undefined) {
      risk.likelihood = updateRiskDto.likelihood;
    }
    if (updateRiskDto.severity !== undefined) {
      risk.severity = updateRiskDto.severity;
    }

    // Recalculate risk score and level if likelihood or severity changed
    if (updateRiskDto.likelihood !== undefined || updateRiskDto.severity !== undefined) {
      risk.riskScore = risk.likelihood * risk.severity;
      risk.riskLevel = this.classifyRisk(risk.riskScore);
    }

    return this.risksRepository.save(risk);
  }

  async remove(id: number): Promise<void> {
    const risk = await this.findOne(id);
    await this.risksRepository.remove(risk);
  }

  async seed(): Promise<Risk[]> {
    const seedData: CreateRiskDto[] = [
      { hazard: 'Electrical fire', likelihood: 2, severity: 4 },
      { hazard: 'Chemical spill', likelihood: 1, severity: 5 },
      { hazard: 'Falling objects', likelihood: 3, severity: 3 },
      { hazard: 'Machine malfunction', likelihood: 4, severity: 2 },
      { hazard: 'Slip and fall', likelihood: 5, severity: 1 },
      { hazard: 'Gas leak', likelihood: 1, severity: 5 },
    ];

    const risks: Risk[] = [];
    
    for (const data of seedData) {
      const risk = await this.create(data);
      risks.push(risk);
    }

    return risks;
  }

  private classifyRisk(score: number): RiskLevel {
    if (score >= 1 && score <= 4) return RiskLevel.LOW;
    if (score >= 5 && score <= 9) return RiskLevel.MEDIUM;
    if (score >= 10 && score <= 16) return RiskLevel.HIGH;
    if (score >= 17 && score <= 25) return RiskLevel.EXTREME;
    
    // Fallback for edge cases
    return RiskLevel.LOW;
  }
}
