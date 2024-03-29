export interface Transaction {
  id: number;
  from_wallet_id: string;
  to_wallet_id: string;
  amount: number;
  timestamp: string;
}
