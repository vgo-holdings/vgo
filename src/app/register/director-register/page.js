"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { registerNewDirector } from "@/services/register";
import {
  directorRegistrationFormControls,
  firebaseConfig,
  firebaseStroageURL,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import imagePlaceholder from "../../../assets/images/propic.png";
import "./page-style.css";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file) {
  const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  if (file.size > maxSize) {
    toast.error("File size exceeds the limit (2MB).", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

const initialFormData = {
  imageURL: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  whatsapp: "",
  refkey: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(imagePlaceholder);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [file, setFile] = useState(null);
  const { pageLevelLoader, setPageLevelLoader, isAuthUser } =
    useContext(GlobalContext);

  const router = useRouter();

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.phone &&
      formData.phone.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== "" &&
      formData.refkey &&
      formData.refkey.trim() !== ""
      ? true
      : false;
  }

  async function handleImage(event) {
    const currentFile = event.target.files[0];
    setFile(currentFile);

    if (currentFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(currentFile);
    }
  }

  async function handleChooseImage() {
    setIsButtonDisabled(true);
    const extractImageUrl = await helperForUPloadingImageToFirebase(file);

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageURL: extractImageUrl,
      });
    }
    toast.success("File Uploaded.", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setFile(null);
  }

  async function handleRegisterOnSubmit() {
    setPageLevelLoader(true);
    const uploadPhoto = await handleChooseImage();
    const data = await registerNewDirector(formData);

    if (uploadPhoto && data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsRegistered(true);
      setPageLevelLoader(false);
      setFormData(initialFormData);
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
      setFormData(initialFormData);
    }

    console.log(data);
  }

  return (
    <div className="bg-white w-full  relative register-container">
      <div className="register-formContainer">
        <p className="w-full text-4xl font-medium text-center font-serif">
          {isRegistered
            ? "Registration Successfull !"
            : "Sign up for an Director Account"}
        </p>
        {isRegistered ? (
          <button
            className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                "
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        ) : (
          <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8    flex flex-col items-center justify-center">
              <div
                className="relative  border rounded-full  flex flex-col items-center  shadow-2xl justify-center h-48 w-48 max-h-48 max-w-48  "
                style={{ border: "1px solid #e8411e" }}
              >
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <img
                    src={selectedImage ? selectedImage : imagePlaceholder}
                    className={
                      !selectedImage
                        ? "w-full h-full object-cover rounded-full m-0 "
                        : "w-full h-full object-cover rounded-full m-0  register-formImage"
                    }
                    style={{ borderColor: "#e8411e" }}
                  />
                  {/* <button
                            onClick={handleChooseImage}
                            className={`text-white px-4 py-2 mt-2 rounded mr-2 ${
                              isButtonDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            style={{backgroundColor: "#e8411e"}}
                            disabled={isButtonDisabled}
                          >
                            Choose Photo
                          </button> */}
                  <div>
                    <input
                      accept="image/*"
                      max="1000000"
                      type="file"
                      name="file-image"
                      id="file-image"
                      className="register-formFileinput"
                      onChange={handleImage}
                    />
                    <label for="file-image" className="register-formFileinput">
                      <i className="fa fa-camera"></i>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {directorRegistrationFormControls.map((controlItem, key) =>
              controlItem.componentType === "input" ? (
                <InputComponent
                  key={key}
                  type={controlItem.type}
                  placeholder={controlItem.placeholder}
                  label={controlItem.label}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                  value={formData[controlItem.id]}
                />
              ) : controlItem.componentType === "select" ? (
                <SelectComponent
                  options={controlItem.options}
                  label={controlItem.label}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                  value={formData[controlItem.id]}
                />
              ) : null
            )}
            <button
              className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                   text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                   "
              disabled={!isFormValid()}
              onClick={handleRegisterOnSubmit}
            >
              {!pageLevelLoader ? (
                <ComponentLevelLoader
                  text={"Registering"}
                  color={"#ffffff"}
                  loading={pageLevelLoader}
                />
              ) : (
                "Register"
              )}
            </button>
          </div>
        )}
      </div>
      <Notification />
    </div>
  );
}
