import Cookies from "js-cookie";

export const registerNewUser = async (formData,UpdatedimageURL) => {
  try {
    formData.imageURL = UpdatedimageURL;
    const response = await fetch("/api/register/customer-register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      
      body: JSON.stringify(formData),
    });

    const finalData = await response.json();
    
    return finalData;
  } catch (e) {
    console.log("error", e);
  }
};

export const registerNewAdmin = async (formData) => {
  try {
    
    const response = await fetch("/api/register/admin-register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      
      body: JSON.stringify(formData),
    });

    const finalData = await response.json();

    return finalData;
  } catch (e) {
    console.log("error", e);
  }
};

export const registerNewDirector = async (formData) => {
  try {
    
    const response = await fetch("/api/register/director-register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      
      body: JSON.stringify(formData),
    });

    const finalData = await response.json();

    return finalData;
  } catch (e) {
    console.log("error", e);
  }
};

export const registerNewHr = async (formData) => {
  try {
    
    const response = await fetch("/api/register/hr-register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      
      body: JSON.stringify(formData),
    });

    const finalData = await response.json();

    return finalData;
  } catch (e) {
    console.log("error", e);
  }
};

export const updateUser = async (formData) => {
  try {
    const res = await fetch("/api/register/freelancer-register", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateAUser = async (formData) => {
    try {
      console.log(formData, "user")
      const res = await fetch("/api/update-user", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      cache: "no-store",
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  export const updateClassRef = async (uId,rId) => {
    try {
      const bodyData = {
        uId: uId,
        rId: rId,
      };
      console.log(bodyData, "index form datas")
      const res = await fetch("/api/update-class", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      cache: "no-store",
        body: JSON.stringify(bodyData),
      });
  
      const data = await res.json();
  
      return data;
    } catch (e) {
      console.log(e);
    }
  };


