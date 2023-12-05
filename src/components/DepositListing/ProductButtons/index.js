"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { approveDeposit, declineDeposit } from "@/services/bank-deposit";
import { updateClassRef } from "@/services/register";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductButton({ item }) {
  const pathName = usePathname();
  const {
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
  const router = useRouter();
  
   const refreshData = () => {
      router.refresh();
    }
  
  const isAdminView = pathName.includes("admin-view");
  const isSellerView = pathName.includes("seller-view");

  async function handleDeclineDeposit(item) {
    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await declineDeposit(item._id);

    if (res.success) {
      refreshData();
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }
  
  async function handleUpdateUserAndClass(uid,rfid) {
    const res1 = await updateClassRef(uid,rfid)
    console.log(res1)
  }
  
  async function handleApprove(getItem) {
    setComponentLevelLoader({ loading: true, id: getItem._id });
    await handleUpdateUserAndClass(item.user_id,item.refkey);
    const res = await approveDeposit({ _id: getItem._id});

    if (res.success) {
      refreshData();
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }

    console.log(res);
  }

  return (  
    <>
      <button
        className="text-white text-sm font-semibold px-4 py-2 rounded-md mt-4 w-full"
        style={{ backgroundColor: "#e84118" }}
        onClick={() => handleApprove(item)}
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        componentLevelLoader.id === item._id ? (
          <ComponentLevelLoader
            text={"Approving"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Approve"
        )}
      </button>
      <button
        className="text-white text-sm font-semibold px-4 py-2 rounded-md mt-4 w-full"
        style={{ backgroundColor: "#e84118" }}
        onClick={() => handleDeclineDeposit(item)}
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        componentLevelLoader.id === item._id ? (
          <ComponentLevelLoader
            text={"Declining"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Decline"
        )}
      </button>
    </>
  )
}
