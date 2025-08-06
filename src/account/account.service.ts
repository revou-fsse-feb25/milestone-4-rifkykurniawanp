import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IAccountsRepository } from './interface/account.repository.interface';
import { Account } from '@prisma/client';
import { CreateAccountDto } from './dto/request/create-account.dto';
import { UpdateAccountDto } from './dto/request/update-account.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountsRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateAccountDto): Promise<Account> {
    return this.accountRepository.create({
      ...dto,
      balance: this.toOptionalDecimal(dto.balance),
    });
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.findAll();
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.accountRepository.findOne(id);
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async update(id: number, dto: UpdateAccountDto): Promise<Account> {
    await this.findOne(id); // Pastikan akun ada

    const updated = await this.accountRepository.update(id, {
      ...dto,
      balance: this.toOptionalDecimal(dto.balance),
    });

    if (!updated) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const existing = await this.accountRepository.findOne(id);
    if (!existing) return false;
    return this.accountRepository.remove(id);
  }

  private toOptionalDecimal(value?: number | Decimal | null): Decimal | undefined {
    if (value === null || value === undefined) return undefined;
    return value instanceof Decimal ? value : new Decimal(value);
  }

   async testDecimalFields() {
    console.log('=== TESTING DECIMAL FIELDS ===');
    
    const account = await this.prisma.account.findFirst();
    console.log('Raw account from DB:', account);
    console.log('Balance type:', typeof account?.balance);
    console.log('Balance value:', account?.balance);
    
    const transaction = await this.prisma.transaction.findFirst();
    console.log('Raw transaction from DB:', transaction);
    console.log('Amount type:', typeof transaction?.amount);
    console.log('Amount value:', transaction?.amount);
    
    console.log('=== END TEST ===');
  }
}
