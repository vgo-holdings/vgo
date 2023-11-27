"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { confirmNewHr, declineHr } from "@/services/pending-user";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductButton({ item }) {
  const pathName = usePathname();
  const {
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);
  const router = useRouter();

  async function handleAddDirector(item) {
    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await confirmNewHr(item);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  async function handleDeleteDirector(item) {
    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await declineHr(item._id);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  return (
    <>
      <button
        className="text-white text-sm font-semibold px-4 py-2 rounded-md mt-4 w-full"
        style={{ backgroundColor: "#e84118" }}
        onClick={() => {
          handleAddDirector(item);
        }}
      >
        Approve
      </button>
      <button
        className="text-white text-sm font-semibold px-4 py-2 rounded-md mt-4 w-full"
        style={{ backgroundColor: "#e84118" }}
        onClick={() => handleDeleteDirector(item)}
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Declining Director"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Decline"
        )}
      </button>
    </>)
}
