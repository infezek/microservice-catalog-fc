import { CreateCategory } from '@fc/core/dist/category/application';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
export class CreateCategoryDto implements CreateCategory.Input {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
