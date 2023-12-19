"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { registerNewUser } from "@/services/register";
import imagePlaceholder from "../../../assets/images/propic.png";
import "./page-style.css";

import {
  // registrationFormControls,
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
      formData.password.trim() !== ""
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
    if (file) {
      const extractImageUrl = await helperForUPloadingImageToFirebase(file);
      console.log(extractImageUrl, "extractImageUrl in reg");
  
      if (extractImageUrl) {
        console.log("Setting formData with imageURL:", extractImageUrl);
        toast.success("File Uploaded.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(formData,"formData in handleChooseImage 4");
        return extractImageUrl;
      } else {
        console.error("Error uploading file. Image URL is empty.");
        toast.error("Error uploading file.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      console.log(formData,"formData in handleChooseImage 3");
      setFile(null);
    }
  }


  async function handleRegisterOnSubmit() {

    setPageLevelLoader(true);

    try {
      const uploadedImageUrl = await handleChooseImage();
      const data = await registerNewUser(formData,uploadedImageUrl);

      if (uploadedImageUrl && data.success) {
            toast.success(data.message, {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            setIsRegistered(true);
            setPageLevelLoader(false);
            setFormData(initialFormData);
            setSelectedImage(null);
          } else if(data.success){
            toast.success(data.message, {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            setIsRegistered(true);
            setPageLevelLoader(false);
            setFormData(initialFormData);
            setSelectedImage(null);
          } else {
            toast.error(data.message, {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            setPageLevelLoader(false);
          }
          setPageLevelLoader(false);
          console.log(data);
    }catch (error) {
      console.error("Error during form submission:", error);
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const registrationFormControls = [
    {
      id: "name",
      type: "text",
      placeholder: "Enter your Display name",
      label: "Display Name",
      componentType: "input",
    },
    {
      id: "first_name",
      type: "text",
      placeholder: "Enter your first name",
      label: "First name",
      componentType: "input",
    },
    {
      id: "last_name",
      type: "text",
      placeholder: "Enter your Last name",
      label: "Last name",
      componentType: "input",
    },
    {
      id: "nic",
      type: "text",
      placeholder: "Enter your NIC",
      label: "NIC",
      componentType: "input",
    },
    {
      id: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email",
      componentType: "input",
    },
    {
      id: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password",
      componentType: "input",
    },
    {
      id: "phone",
      type: "text",
      placeholder: "Enter your phone number",
      label: "Contact No",
      componentType: "input",
    },
    {
      id: "whatsapp",
      type: "text",
      placeholder: "Enter your whatsapp number",
      label: "Whatsapp No",
      componentType: "input",
    },
    {
      id: "district",
      type: "text",
      placeholder: "Select your district",
      label: "District",
      componentType: "select",
      options: [
        'Ampara',
        'Anuradhapura',
        'Badulla',
        'Batticaloa',
        'Colombo',
        'Galle',
        'Gampaha',
        'Hambantota',
        'Jaffna',
        'Kalutara',
        'Kandy',
        'Kegalle',
        'Kilinochchi',
        'Kurunegala',
        'Mannar',
        'Matale',
        'Matara',
        'Monaragala',
        'Mullaitivu',
        'Nuwara Eliya',
        'Polonnaruwa',
        'Puttalam',
        'Ratnapura', 
        'Trincomalee',
        'Vavuniya',
        // Add more districts as needed
      ],
      onChange: (event) => {
        setSelectedDistrict(event.target.value);
        setFormData({
          ...formData,
          district: event.target.value,
        });
      },
      value: selectedDistrict,
    },
    {
      id: "city",
      type: "text",
      placeholder: "Select your city",
      label: "City",
      componentType: "select",
      options: 
      selectedDistrict === "Ampara" ? ["Addalaichchenai", "Akkarepattu", "Alayadivembu", "Ampara", "Damana", "Dehiattakandiya", "Irakkamam", "Kalmunai", "Karaitivu", "Lahugala", "Maha Oya", "Navithanveli", "Nintavur", "Padiyathalawa", "Pottuvil", "Sainthamaruthu", "Sammanthurai", "Uhana"] :
      selectedDistrict === "Batticaloa" ? ["Araiyampathy", "Batticaloa", "Chenkalady", "Eravur", "Kaluvanchikudy", "Kattankudy", "Kiran", "Kokkadichcholai", "Oddamavadi", "Pasikudah", "Vakarai", "Valaichchenai", "Vavunathivu", "Vellavely"] :

      selectedDistrict === "Trincomalee" ? ["Gomarankadawala", "Kantalai", "Kinniya", "Kuchchaveli", "Morawewa", "Muttur", "Seruvila", "Siripura", "Thampalakamam", "Trincomalee", "Verugal"] :

      selectedDistrict === "Anuradhapura" ? ["Anuradhapura", "Bulnewa", "Eppawala", "Galenbindunuwewa", "Galnewa", "Ganewalpola", "Habarana", "Horowupotana", "Ipalogama", "Kahatagasdigiliya", "Kebithigollewa", "Kebitigollawa", "Kekirawa", "Konapathirawa", "Konwewa", "Madatugama", "Mahailuppallama", "Mahavilachchiya", "Maradankadawala", "Medawachchiya", "Mihintale", "Nochchiyagama", "Padaviya", "Palagala", "Palugaswewa", "Rajanganaya", "Rambewa", "Seeppukulama", "Talawa", "Tambuttegama", "Thambuttegama", "Thirappane", "Yakalla"] :

      selectedDistrict === "Polonnaruwa" ? ["Aralaganwila", "Bakamuna", "Dimbulagala", "Elahera", "Galamuna", "Giritale", "Hingurakgoda", "Jayantipura", "Kaduruwela", "Lankapura", "Manampitiya", "Medirigiriya", "Minneriya", "Polonnaruwa", "Sungawila", "Welikanda"] :

      selectedDistrict === "Badulla" ? ["Badulla", "Bandarawela", "Beragala", "Diyatalawa", "Ella", "Haldummulla", "Hali Ela", "Haputale", "Kandaketiya", "Lunugala", "Mahiyanganaya", "Meegahakivula", "Passara", "tennapanguwa", "Uva-Paranagama", "Welimada", "Wiyaluwa"] :

      selectedDistrict === "Moneragala" ? ["Badalkumbura", "Bibile", "Buttala", "Kataragama", "Madulla", "Medagama", "Moneragala", "Okkampitiya", "Sevanagala", "Siyambalanduwa", "Tanamalwila", "Wellawaya"] :

      selectedDistrict === "Colombo" ? ["Angoda", "Athurugiriya", "Avissawella", "Battaramulla", "Boralesgamuwa", "Colombo 01", "Colombo 02", "Colombo 03", "Colombo 04", "Colombo 05", "Colombo 06", "Colombo 07", "Colombo 08", "Colombo 09", "Colombo 10", "Colombo 11", "Colombo 12", "Colombo 13", "Colombo 14", "Colombo 15", "Dehiwala", "Hanwella", "Homagama", "Kaduwela", "Kesbewa", "Kohuwala", "Kolonnawa", "Kosgama", "Kottawa", "Kotte", "Maharagama", "Malabe", "Mount Lavinia", "Nawala", "Nugegoda", "Paddukka", "Pannipitiya", "Piliyandala", "Rajagiriya", "Ranala", "Ratmalana", "Talawathugoda", "Wellampitiya"] :

      selectedDistrict === "Gampaha" ? ["Attanagalla", "Biyagama", "Delgoda", "Divlapitiya", "Dompe", "Gampaha", "Ganemulla", "Ja-Ela", "Kadawatha", "Kandana", "Katana", "Katunayake", "Kelaniya", "Kiribathgoda", "Mahara", "Minuwangoda", "Mirigama", "Negombo", "Nittambuwa", "Ragama", "Veyangoda", "Wattala"] :

      selectedDistrict === "Kalutara" ? ["Agalawatta", "Aluthgama", "Baduraliya", "Bandaragama", "Beruwala", "Bulathsinhala", "Dodangoda", "Horana", "Ingiriya", "Kalutara", "Madurawela", "Matugama", "Millaniya", "Panadura", "Wadduwa", "Walallavita"] :

      selectedDistrict === "Galle" ? ["Ahangama", "Ahungalla", "Ambalangoda", "Baddegama", "Balapitiya", "Batapola", "Bentota", "Boossa", "Elpitiya", "Galle", "Habaraduwa", "Hikkaduwa", "Hiniduma", "Imaduwa", "Karandeniya", "Karapitiya", "Koggala", "Kosgoda", "Mapalagama", "Nagoda", "Neluwa", "Pitigala", "Rathgama", "Thawalama", "Udugama", "Uragasmanhandiya", "Wanduramba", "Yakkalamulla"] :

      selectedDistrict === "Hambantota" ? ["Ambalantota", "Angunukolapelessa", "Beliatta", "Hambantota", "Middeniya", "Tangalla", "Tissamaharama", "Walasmulla", "Weeraketiya"] :

      selectedDistrict === "Matara" ? ["Athuraliya", "Akuressa", "Aparekka", "Denipitiya", "Deniyaya", "Devinuwara", "Dikwella", "Gandara", "Hakmana", "Kamburugamuwa", "Kamburupitiya", "Karaputugala", "Kekanadura", "Kirinda", "Kotapola", "Malimbada", "Matara", "Mirissa", "Morawaka", "Mulatiyana", "Pasgoda", "Pitabeddara", "Puhuwella", "Thelijjawila", "Thihagoda", "Tihagoda", "Weligama", "Welihinda", "Welipitiya"] :

      selectedDistrict === "Jaffna" ? ["Chankanai", "Chavakachcheri", "Jaffna", "Karainagar", "Karaveddy", "Kayts", "Kopay", "Maruthankerney", "Nallur", "Point Pedro", "Sandilipay", "Tellippalai", "Uduvil", "Velanai"] :

      selectedDistrict === "Kilinochchi" ? ["Iranamadu", "Kandavalai", "Kilinochchi", "Pallai", "Paranthan", "Poonakary", "Velikkandal"] :

      selectedDistrict === "Mannar" ? ["Adampan", "Chilawathurai", "Madhu", "Mannar", "Nanaddan"] :

      selectedDistrict === "Mullativu" ? ["Ehatugaswewa", "Mullativu", "Oddusuddan", "Pandiyankulam", "Puthukkudiyiruppu", "Thunukkai"] :

      selectedDistrict === "Vavuniya" ? ["Vavuniya", "Nedunkeni", "Cheddikulam"] :

      selectedDistrict === "Kandy" ? ["Akurana", "Alawatugoda", "Ambatenna", "Ampitiya", "Daskara", "Daulagala", "Delthota", "Digana", "Galagedara", "Galhinna", "Gampola", "Gelioya", "Hanguranketa", "Hapugastalawa", "Harispattuwa", "Hatharaliyadda", "Kadugannawa", "Kadugannawa UC", "Kandy", "Katugastota", "Kundasale", "Madawala", "Madawala Bazaar", "Menikdiwela", "Minipe", "Nawalapitiya", "Pallekele", "Panvila", "Pathadumbara", "Pathahewaheta", "Peradeniya", "Pilimatalawa", "Poojapitiya", "Pussellawa", "Talatuoya", "Teldeniya", "Thumpane", "Udapalatha", "Ududumbara", "Udunuwara", "Ulapane", "Watadeniya", "Wattegama", "Welamboda", "Yatinuwara"] :

      selectedDistrict === "Matale" ? ["Dambulla", "Elkaduwa", "Galewela", "Gammaduwa", "Inamaluwa", "Kaikawala", "Kibissa", "Laggala Pallegama", "Madawala Ulpotha", "Matale", "Nalanda", "Naula", "Palapathwela", "Pallepola", "Rattota", "Sigiriya", "Ukuwela", "Wahacotte", "Yatawatta"] :

      selectedDistrict === "Nuwara Eliya" ? ["Agrapatana", "Ambewela", "Bogawantalawa", "Bopattalawa", "Dayagama", "Ginigathena", "Haggala", "Hapugastalawa", "Hatton", "Kotagala", "Kotmale", "Labukele", "Laxapana", "Madulla", "Maskeliya", "Nanuoya", "Nuwara Eliya", "Padiyapelella", "Ragala", "Ramboda", "Rozella", "Talawakele", "Udapussallawa", "Walapane", "Watawala"] :

      selectedDistrict === "Kegalle" ? ["Ambepussa", "Amitirigala", "Aranayaka", "Bulathkohupitiya", "Dehiovita", "Deraniyagala", "Galigamuwa", "Hemmathagama", "Karawanella", "Kegalle", "Kitulgala", "Kotiyakumbura", "Mawanella", "Rambukkana", "Ruwanwella", "Thalgaspitiya", "Warakapola", "Yatiyantota"] :

      selectedDistrict === "Ratnapura" ? ["Ayagama", "Balangoda", "Eheliyagoda", "Elapatha", "Embilipitiya", "Godakawela", "Imbulpe", "Kahawatta", "Kalawana", "Kiriella", "Kolonne", "Kuruwita", "Nivitigala", "Opanayaka", "Panamure", "Pelmadulla", "Pelmadulla", "Pohorabawa", "Rakwana", "Ratnapura", "Weligepola"] :

      selectedDistrict === "Kurunegala" ? ["Alawwa", "Bingiriya", "Dambadeniya", "Dandagamuwa", "Galgamuwa", "Giriulla", "Hettipola", "Hiripitiya", "Ibbagamuwa", "Katupotha", "Kuliyapitiya", "Kurunegala", "Maho", "Mawathagama", "Melsiripura", "Narammala", "Nikaweratiya", "pahamune", "Panagamuwa", "Pannala", "Pannawa", "Polgahawela", "Potuhera", "Ridigama", "Wariyapola", "Wawathagama", "Yapahuwa"] :

      selectedDistrict === "Puttalam" ? ["Anamaduwa", "Battuluoya", "Chilaw", "Dankotuwa", "Eluvankulam", "Kalpitiya", "Madampe", "Mahawewa", "Marawila", "Mundel", "Nattandiya", "Nuraicholai", "Palavi", "Puttalam", "Thillaiyadi", "Wennappuwa"] :

      [], // Add city options based on the district
      onChange: (event) => {
        setSelectedCity(event.target.value);
        setFormData({
          ...formData,
          city: event.target.value,
        });
      },
      value: selectedCity,
    }
  ];

  return (
    <div className="bg-white w-full  relative register-container">
      <div className="register-formContainer">
        <p className="w-full text-4xl font-medium text-center text-black font-arial">
          {isRegistered ? "Registration Successfull !" : "Sign Up"}
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
            {registrationFormControls.map((controlItem, key) => 
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
                  key={key}
                  options={controlItem.options}
                  label={controlItem.label}
                  onChange={controlItem.onChange}
                  value={controlItem.value}
                />
              ) : null
            )}
            <div className="w-full flex items-center justify-center pt-6">
              <button
                className=" disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center px-6 py-4 text-lg 
                    text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-lg w-1/2 border mr-10 border-transparent shadow-sm hover:bg-white hover:text-white focus:outline-none
                   "
                style={{ backgroundColor: "#e84118" }}
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
              <button
                className="inline-flex items-center justify-center bg-white px-6 py-4 text-lg  rounded-lg w-1/2 border
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                onClick={() => router.push("/login")}
                style={{ color: "#e84118", borderColor: "#e84118" }}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
      <Notification />
    </div>
  );
}
