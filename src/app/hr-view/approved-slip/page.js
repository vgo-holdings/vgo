import ApprovedListing from "@/components/ApprovedListing";
import { getAllSellerDeposits } from "@/services/bank-deposit";

export default async function AdminAllUsers() {

  const allSellerDeposits = await getAllSellerDeposits()

  return <ApprovedListing data={allSellerDeposits && allSellerDeposits.data}/>
}