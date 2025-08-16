import { Repository } from 'typeorm';
import { Risk, RiskLevel } from './entities/risk.entity';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
export interface RiskFilters {
    level?: RiskLevel;
    search?: string;
    sortBy?: 'riskScore' | 'createdAt';
    order?: 'ASC' | 'DESC';
}
export declare class RisksService {
    private risksRepository;
    constructor(risksRepository: Repository<Risk>);
    create(createRiskDto: CreateRiskDto): Promise<Risk>;
    findAll(filters?: RiskFilters): Promise<Risk[]>;
    findOne(id: number): Promise<Risk>;
    update(id: number, updateRiskDto: UpdateRiskDto): Promise<Risk>;
    remove(id: number): Promise<void>;
    seed(): Promise<Risk[]>;
    private classifyRisk;
}
