import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseInterceptors,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/request/create-account.dto';
import { UpdateAccountDto } from './dto/request/update-account.dto';
import {
  AccountResponseDto,
  CreateAccountResponseDto,
} from './dto/response/account-response.dto';
import { SerializationInterceptor } from 'src/common/interceptors/serialization.interceptor';
import { AuthGuardRoles } from '../auth/decorator/auth.decorator';
import { UserRole } from '@prisma/client';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Accounts')
@ApiBearerAuth()
@Controller('accounts')
@AuthGuardRoles(UserRole.ADMIN)
@UseInterceptors(new SerializationInterceptor(AccountResponseDto))
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat akun baru' })
  @ApiResponse({
    status: 201,
    description: 'Akun berhasil dibuat',
    type: CreateAccountResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Input tidak valid',
  })
  @UseInterceptors(new SerializationInterceptor(CreateAccountResponseDto))
  async create(@Body() dto: CreateAccountDto) {
    return this.accountService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Menampilkan semua akun' })
  @ApiResponse({
    status: 200,
    description: 'Daftar semua akun',
    type: [AccountResponseDto],
  })
  async findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mengambil detail akun berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID akun' })
  @ApiResponse({
    status: 200,
    description: 'Detail akun ditemukan',
    type: AccountResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Akun tidak ditemukan',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui data akun berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID akun' })
  @ApiResponse({
    status: 200,
    description: 'Akun berhasil diperbarui',
    type: AccountResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Akun tidak ditemukan',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAccountDto,
  ) {
    return this.accountService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus akun berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID akun' })
  @ApiResponse({
    status: 200,
    description: 'Akun berhasil dihapus',
  })
  @ApiResponse({
    status: 404,
    description: 'Akun tidak ditemukan',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.accountService.remove(id);
    if (!result) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return { success: true };
  }
}
