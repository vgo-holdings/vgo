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

export const getAllDeposits = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/hr/false-deposits", {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const approveDeposit = async (formData) => {
  try {
    console.log(formData, "approve")
    const response = await fetch("/api/hr/approve-deposit", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    }); 

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const declineDeposit = async (itemId) => {
  try {
    const res = await fetch(`/api/hr/delete-deposit?id=${itemId}`, {
      method: "DELETE",
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
