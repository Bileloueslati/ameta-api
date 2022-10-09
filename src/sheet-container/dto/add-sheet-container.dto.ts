import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class AddSheetContainerDto {
  @IsNotEmpty()
  sender: string;

  @IsNotEmpty()
  consignee: string;

  @IsNotEmpty()
  @Min(0)
  packaging: number;

  @IsNotEmpty()
  @Min(0)
  volumem3: number;

  @IsNotEmpty()
  @IsInt()
  sheetId: number;

  @IsNotEmpty()
  @Min(0)
  weight: number;

  @IsNotEmpty()
  delivery: string;

  @IsNotEmpty()
  @Min(0)
  lusocargoIncomes: number;

  @IsNotEmpty()
  @Min(0)
  lusocargoCosts: number;

  @IsNotEmpty()
  @Min(0)
  atvylIncomes: number;

  @IsNotEmpty()
  @Min(0)
  atvylCosts: number;

  delTerms: string;
}
