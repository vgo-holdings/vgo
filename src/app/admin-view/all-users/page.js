import UserListing from "@/components/UserListing";
import { getAllAdminUsers } from "@/services/user";

export default async function AdminAllUsers() {

  const allAdminUsers = await getAllAdminUsers()

  return <UserListing data={allAdminUsers && allAdminUsers.data}/>
}