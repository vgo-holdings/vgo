import CommonListing from "@/components/CommonListing";
import { getAllAdminShops } from "@/services/shop";



export default async function AdminAllShops() {

  const allAdminShops = await getAllAdminShops()

  return <CommonListing data={allAdminShops && allAdminShops.data}/>
}
