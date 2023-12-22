"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { registerNewUser } from "@/services/register";
import imagePlaceholder from "../../../assets/images/propic.png";
// import "./page-style.css";

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
      (snapshot) => { },
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
      formData.password.trim() !== "" &&
      formData.first_name &&
      formData.first_name.trim() !== "" &&
      formData.last_name &&
      formData.last_name.trim() !== "" &&
      formData.district &&
      formData.district.trim() !== "" &&
      formData.city &&
      formData.city.trim() !== "" &&
      formData.whatsapp &&
      formData.whatsapp.trim() !== ""
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
        console.log(formData, "formData in handleChooseImage 4");
        return extractImageUrl;
      } else {
        console.error("Error uploading file. Image URL is empty.");
        toast.error("Error uploading file.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      console.log(formData, "formData in handleChooseImage 3");
      setFile(null);
    }
  }

  const [loading, setLoading] = useState(false);
  const [AlertMsg, setAlertMsg] = useState(false);
  const [AlertErrMsg, setAlertErrMsg] = useState(false);

  const [uName, setUname] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");

  async function showMsg(uname) {
    setUname(uname)
    setAlertMsg(true);
  }
  async function closeMsg() {
    setAlertMsg(false);
    setAlertErrMsg(false);
  }

  async function goToLogin() {
    router.push("/login")
  }

  async function handleRegisterOnSubmit() {
    setLoading(true);
    setPageLevelLoader(true);
    const userNameAl = formData.name;
    try {
      setLoading(true);
      const uploadedImageUrl = await handleChooseImage();
      const data = await registerNewUser(formData, uploadedImageUrl);
      if (uploadedImageUrl && data.success) {
        toast.success(data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setIsRegistered(true);
        setPageLevelLoader(false);
        setFormData(initialFormData);
        setSelectedImage(null);
        setLoading(false);
        showMsg(userNameAl);
      } else if (data.success) {
        toast.success(data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setIsRegistered(true);
        setPageLevelLoader(false);
        setFormData(initialFormData);
        setSelectedImage(null);
        setLoading(false);
        showMsg(userNameAl);
      } else {
        toast.error(data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setErrorMsg(data.message);
        setAlertErrMsg(true);
        setPageLevelLoader(false);
      }
      setPageLevelLoader(false);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error("Error during form submission:", error);
      setPageLevelLoader(false);
    } finally {
      setLoading(false);
    }
    setPageLevelLoader(false);
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

    <div className="bg-gray-100 w-full relative py-10">
      <div className=" min-h-screen sm:bg-gray-100 py-6 flex flex-col justify-center w-full">
        <div className="relative py-3 sm:max-w-10 md:mx-auto ml-3 mr-3" >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rotate-6 sm:rounded-3xl rounded-2xl rounded border-2 border-white">
          </div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl rounded-2xl sm:p-20" >
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-4xl font-semibold text-black flex justify-center">Sign Up</h1>
              </div>

              <div class="flex justify-center mt-5">
                <div class="relative">
                  <img class="w-40 h-40 border-4 border-orange-400 rounded-full bg-hero bg-cover bg-no-repeat" src={selectedImage ? selectedImage : imagePlaceholder} alt="" />
                  <input
                    accept="image/*"
                    max="1000000"
                    type="file"
                    name="file-image"
                    id="file-image"
                    className="hidden"
                    onChange={handleImage}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="file-image"
                    className="bottom-0 absolute right-5 transform translate-y-1/4 w-12 h-12 border-4 border-orange-600 bg-orange-600 rounded-full flex items-center justify-center cursor-pointer"
                  // className="bg-orange-600 rounded-full flex justify-center items-center w-12 h-12 "
                  >
                    <i className="fa fa-camera "></i>
                  </label>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  {registrationFormControls.map((controlItem, key) =>
                    controlItem.componentType === "input" && controlItem.label == "Display Name" ? (
                      <InputComponent
                        key={key}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        value={formData[controlItem.id]}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                      />
                    ) : null)}
                  <div class="flex -mx-3">
                    <div class="w-1/2 px-3 ">
                      <label for="" class="text-m font-semibold px-1">First name</label>
                      <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                        <input
                          type="text"
                          class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-orange-400"
                          placeholder="First name"
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              first_name: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div class="w-1/2 px-3 ">
                      <label for="" class="text-m font-semibold px-1">Last name</label>
                      <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                        <input
                          type="text"
                          class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-orange-400"
                          placeholder="Last name"
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              last_name: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {registrationFormControls.map((controlItem, key) =>
                    controlItem.componentType === "input" ? (
                      controlItem.label != "Display Name" && controlItem.label != "First name" && controlItem.label != "Last name" ? (
                        <InputComponent
                          key={key}
                          type={controlItem.type}
                          placeholder={controlItem.placeholder}
                          label={controlItem.label}
                          value={formData[controlItem.id]}
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              [controlItem.id]: event.target.value,
                            });
                          }}
                        />
                      ) : null
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
                  <div class="flex -mx-3">
                    <div class="w-full px-3 mt-5">
                      <button
                        style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                        class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-lg px-3 py-3 font-semibold"
                        disabled={!isFormValid() || loading}
                        onClick={handleRegisterOnSubmit}
                      >
                        {loading ? "REGISTERING" : "REGISTER NOW"}
                      </button>
                    </div>
                  </div>
                  <div class="text-center">
                    <p class="text-sm">Already have an account? <a href="/login" class="text-cyan-600">Sign In</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {AlertMsg ? (
        <div class="rounded absolute top-0 left-0 flex items-center justify-center w-full h-full " onClick={closeMsg}
          style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
          x-show="open">
          <div class=" h-auto p-4 mx-2 text-left bg-white rounded-3xl shadow-xl dark:bg-gray-800 md:max-w-xl md:p-6 lg:p-8 md:mx-0"
          >
            <div class="flex justify-center mb-4">
              <button onClick={closeMsg}
                class=" dark:text-blue-400 dark:hover:text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 fill-myOrange">
                  <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                </svg>
              </button>
            </div>
            <div class="mb-4 text-center">
              <h2 class="text-2xl font-bold leading-snug text-gray-900 dark:text-gray-400">
                HI - {uName}
              </h2>
              <div class="mt-4 ">
                <p class="text-mb leading-5 text-gray-500 dark:text-gray-400">
                  Welcome to <a href="#" class="text-myOrange font-bold">VGO</a> ! 🌟 Registration complete
                </p>
                <p class="text-mb leading-5 text-gray-500 dark:text-gray-400">
                  You're now part of our growing family. Ready to shop? Log in and discover a world of endless possibilities. Happy browsing!"
                </p>
              </div>
            </div>
            <span class="justify-center block gap-3 rounded-md shadow-sm md:flex">
              <button
                style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-3xl px-3 py-3 font-semibold"
                onClick={goToLogin}
              >
                Sign In
              </button>
            </span>
          </div>
        </div >
      ) : (AlertErrMsg ? (
        <div class="rounded absolute top-0 left-0 flex items-center justify-center w-full h-full " onClick={closeMsg}
          style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
          x-show="open">
          <div class=" h-auto p-4 mx-2 text-left bg-white rounded-3xl shadow-xl dark:bg-gray-800 md:max-w-xl md:p-6 lg:p-8 md:mx-0"
          >
            <div class="flex justify-center mb-4">
              <button onClick={closeMsg}
                class=" dark:text-blue-400 dark:hover:text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 fill-myOrange">
                  <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                </svg>
              </button>
            </div>
            <div class="mb-4 text-center">
              <h2 class="text-2xl font-bold leading-snug text-gray-900 dark:text-gray-400">
                HI - {ErrorMsg}
              </h2>
            </div>
            <span class="justify-center block gap-3 rounded-md shadow-sm md:flex">
              <button
                style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-3xl px-3 py-3 font-semibold"
                onClick={closeMsg}
              >
                Try Again
              </button>
            </span>
          </div>
        </div >
      ) : null
      )}
      <Notification />
    </div>
  );
}
