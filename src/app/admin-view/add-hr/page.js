import HrListing from "@/components/HrListing";
import { getAllAdminPendinghrs } from "@/services/pending-user"


export default async function AdminAllPendinghrs() {

  const allAdminPendinghrs = await getAllAdminPendinghrs()

  return <HrListing data={allAdminPendinghrs && allAdminPendinghrs.data}/>
}