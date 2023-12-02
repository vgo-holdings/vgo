import Cookies from "js-cookie";

export const getAllSellerDeposits = async () => {
  try {
    const res = await fetch("https://www.vigour.space/api/hr/all-deposits", {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

  export const updateDeposit = async (formData, imageUrl) => {
    try {
      const name = formData["name"];
      const user_id = formData["user_id"];
      const refkey = formData["refkey"];

      const newFormData = {
        "name": name,
        "user_id": user_id,
        "refkey": refkey,
        "imageUrl": imageUrl,
      }
      console.log(newFormData,"newFormData in services");
      
      const response = await fetch("/api/bank-deposit", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(newFormData),
      });
  
      const data = await response.json();
      console.log(data,"data in services") 
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };
