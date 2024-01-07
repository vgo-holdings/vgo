export const login = async (formData) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (nic,phoneNumber) => {
  const formData = {
    nic,
    phoneNumber,
  }
  try {
    const response = await fetch("/api/forgot-password-all/find-user-email", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (nic,password) => {
  const formData = {
    nic,
    password,
  }
  try {
    const response = await fetch("/api/forgot-password-all/reset-password", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const msgTest = async (msg,number) => {
  console.log("🚀 ~ file: index.js:20 ~ msgTest ~ formData:", msg)
  console.log("im in msg");
  try {
    const response = await fetch( 
    `https://app.notify.lk/api/v1/send?user_id=[26355]&api_key=HeryEJQmT4LXI6mGN2Gu&sender_id=NotifyDEMO&to=${number}&message=${msg}`,
    {
      method: "POST",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("im in error");
    console.log(error);
  }
};

