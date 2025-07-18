import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateAccountDto) {
  // No additional properties needed, as this class will inherit all properties from CreateProductDto
  // and make them optional for updates.
}
