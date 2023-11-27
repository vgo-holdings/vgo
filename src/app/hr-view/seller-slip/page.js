import DepositListing from "@/components/DepositListing";
import { getAllSellerDeposits } from "@/services/bank-deposit";

export default async function AdminAllUsers() {

  const allSellerDeposits = await getAllSellerDeposits()

  return <DepositListing data={allSellerDeposits && allSellerDeposits.data}/>
}