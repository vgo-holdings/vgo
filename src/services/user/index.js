//add a new user service

import Cookies from "js-cookie";

export const addNewUser = async (formData) => {
  try {
    const response = await fetch("/api/admin/add-user", {
      method: "POST",
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

export const getAllAdminUsers = async () => {
  try {
    const res = await fetch("https://www.vigour.space/api/admin/all-users", {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAUser = async (formData) => {
  try {
    const res = await fetch("/api/admin/update-user", {
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

export const updateProfile = async (formData) => {
  try {
    const res = await fetch("/api/update-profile", {
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

export const updateAboutMe = async (formData) => {
  try {
    const res = await fetch("/api/update-user-about", {
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

export const deleteAUser = async (id) => {
  try {
    const res = await fetch(`/api/admin/delete-user?id=${id}`, {
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

export const userByCategory = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/user-by-category?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const userById = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/user-by-id?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const userProfileShare = async (id) => {
  console.log("🚀 ~ file: index.js:153 ~ userConnection ~ id:", id)

  const newFormData = {
    "user_id": id,
  }

  try {
    const res = await fetch(
      "/api/user-profile-share",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        cache: "no-store",
        body: JSON.stringify(newFormData),
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log("kkk");
    console.log(e);
  }
};

export const userLog = async (id) => {
  console.log("🚀 ~ file: index.js:183 ~ userLog ~ id:", id)

  const newFormData = {
    "user_id": id,
  }

  try {
    console.log(newFormData, "Log")
    const response = await fetch("http://localhost:3000/api/user-activity-log", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      cache: "no-store",
      body: JSON.stringify(newFormData),
    }); 

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("error in here")
    console.log(error);
  }
};

export const userConnection = async (id) => {
  console.log("🚀 ~ file: index.js:153 ~ userConnection ~ id:", id)

  const newFormData = {
    "user_id": id,
  }

  try {
    const res = await fetch(
      "/api/user-connection",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        cache: "no-store",
        body: JSON.stringify(newFormData),
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log("kkk");
    console.log(e);
  }
};

export const updateImage = async (id,imageUrl) => {
  console.log(id, imageUrl, "dn sapada")
    const newFormData = {
      "user_id": id,
      "imageURL": imageUrl,
    }
  try {
    const res = await fetch("/api/update-image", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      cache: "no-store",
      body: JSON.stringify(newFormData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
