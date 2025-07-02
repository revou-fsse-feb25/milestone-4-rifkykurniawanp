import {PartialType} from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  // No additional properties needed, as this class will inherit all properties from CreateProductDto
  // and make them optional for updates.
}