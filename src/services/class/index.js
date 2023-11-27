import Cookies from "js-cookie";

export const getAllClassDatas = async () => {
    try {
      const res = await fetch("/api/hr/class/get-all-classes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
  
      const data = await res.json();
  
      return data;
    } catch (e) {
      console.log(e);
    }
  };