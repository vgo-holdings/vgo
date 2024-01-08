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

export const getClassDataById = async (id) => {
    try {
      const res = await fetch(`/api/get-all-classes?id=${id}`, {
        method: "GET",
        cache: "no-store",
        // headers: {
        //   Authorization: `Bearer ${Cookies.get("token")}`,
        // },
      });
  
      const data = await res.json();
  
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  // export const shopById = async (id) => {
  //   try {
  //     const res = await fetch(
  //       `https://www.vgo.lk/api/admin/shop-by-id?id=${id}`,
  //       {
  //         method: "GET",
  //         cache: "no-store",
  //       }
  //     );
  
  //     const data = await res.json();
  
  //     return data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };