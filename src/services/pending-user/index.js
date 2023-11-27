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

export const getAllAdminPendingdirectors = async () => {
  try {
    const res = await fetch("https://www.vigour.space/api/admin/all-director", {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const confirmNewDirector = async (item) => {
  try {
    const response = await fetch("/api/admin/confirm-director", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    const finalData = await response.json();

    return finalData;
  } catch (e) {
    console.log("error", e);
  }
};

export const declineDirector = async (itemId) => {
  try {
    const res = await fetch(`/api/admin/decline-director?id=${itemId}`, {
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

export const getAllAdminPendinghrs = async () => {
  try {
    const res = await fetch("https://www.vigour.space/api/admin/all-hr", {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const confirmNewHr = async (item) => {
  try {
    const response = await fetch("/api/admin/confirm-hr", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    const finalData = await response.json();

    return finalData;
  } catch (e) {
    console.log("error", e);
  }
};

export const declineHr = async (itemId) => {
  try {
    const res = await fetch(`/api/admin/decline-hr?id=${itemId}`, {
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
      `https://www.vigour.space/api/admin/user-by-category?id=${id}`,
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
      `https://www.vigour.space/api/admin/user-by-id?id=${id}`,
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
