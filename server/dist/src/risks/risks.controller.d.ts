import { RisksService, RiskFilters } from './risks.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { Risk } from './entities/risk.entity';
export declare class RisksController {
    private readonly risksService;
    constructor(risksService: RisksService);
    create(createRiskDto: CreateRiskDto): Promise<Risk>;
    findAll(query: RiskFilters): Promise<Risk[]>;
    findOne(id: string): Promise<Risk>;
    update(id: string, updateRiskDto: UpdateRiskDto): Promise<Risk>;
    remove(id: string): Promise<void>;
    seed(): Promise<Risk[]>;
}
