import DirectorListing from "@/components/DirectorListing";
import { getAllAdminPendingdirectors } from "@/services/pending-user"

export default async function AdminAllPendingdirectors() {

  const allAdminPendingdirectors = await getAllAdminPendingdirectors()

  return <DirectorListing data={allAdminPendingdirectors && allAdminPendingdirectors.data}/>
}