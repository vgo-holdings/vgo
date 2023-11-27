//add a new shop service

import Cookies from "js-cookie";

export const addNewShop = async (formData) => {
  try {
    const response = await fetch("/api/admin/add-shop", {
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

export const getAllAdminShops = async () => {
  try {
    const res = await fetch("https://www.vigour.space/api/admin/all-shops", {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAShop = async (formData) => {
  try {
    const res = await fetch("/api/admin/update-shop", {
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

export const deleteAShop = async (id) => {
  try {
    const res = await fetch(`/api/admin/delete-shop?id=${id}`, {
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

export const shopByCategory = async (id) => {
  try {
    const res = await fetch(
      `https://www.vigour.space/api/admin/shop-by-category?id=${id}`,
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

export const shopById = async (id) => {
  try {
    const res = await fetch(
      `https://www.vigour.space/api/admin/shop-by-id?id=${id}`,
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
