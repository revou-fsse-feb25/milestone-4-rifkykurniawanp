export interface Account {
    id: number;
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    balance: number;
    currency: 'IDR' | 'USD' | 'EUR' | 'JPY';
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}
