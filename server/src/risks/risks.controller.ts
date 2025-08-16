import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RisksService, RiskFilters } from './risks.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { Risk, RiskLevel } from './entities/risk.entity';

@Controller('api/risks')
export class RisksController {
  constructor(private readonly risksService: RisksService) {}

  @Post()
  create(@Body() createRiskDto: CreateRiskDto): Promise<Risk> {
    return this.risksService.create(createRiskDto);
  }

  @Get()
  findAll(@Query() query: RiskFilters): Promise<Risk[]> {
    return this.risksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Risk> {
    return this.risksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskDto: UpdateRiskDto): Promise<Risk> {
    return this.risksService.update(+id, updateRiskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.risksService.remove(+id);
  }

  @Post('seed')
  seed(): Promise<Risk[]> {
    return this.risksService.seed();
  }
}
