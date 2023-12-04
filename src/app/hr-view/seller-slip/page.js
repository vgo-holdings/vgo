import DepositListing from "@/components/DepositListing";
import { getAllDeposits } from "@/services/bank-deposit";

export default async function AdminAllUsers() {

  const allSellerDeposits = await getAllDeposits();

  return <DepositListing data={allSellerDeposits && allSellerDeposits.data}/>
}
