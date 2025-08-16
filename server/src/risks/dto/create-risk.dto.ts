import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRiskDto {
  @IsString()
  @IsNotEmpty()
  hazard!: string;

  @Type(() => Number)   // 👈 convierte a number
  @IsNumber()
  @Min(1)
  @Max(5)
  likelihood!: number;

  @Type(() => Number)   // 👈 convierte a number
  @IsNumber()
  @Min(1)
  @Max(5)
  severity!: number;
}
