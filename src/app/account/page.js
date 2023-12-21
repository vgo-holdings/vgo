"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from "@/services/address";
import {
  addNewAddressFormControls,
  loginFormControls,
  updateProfileFormControls,
  updateSellerProfileFormControls,
  firebaseConfig,
  firebaseStroageURL,
} from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { handleVerify } from "@/services/verifyAccount";
import "./page-style.css";
import Image from "next/image";
import { updateImage, updateProfile, updateAboutMe } from "@/services/user";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file) {
  console.log(file, "file");
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

export default function Account() {
  const {
    user,
    setUser,
    addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showUpdateProfileForm, setShowUpdateProfileForm] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(user?.imageURL);
  const [formData, setFormData] = useState({
    _id: user?._id,
    imageURL: user?.imageURL,
    name: user?.name,
    password: "",
    role: user?.role,
    refkey: user?.refkey,
  });
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  console.log(formData, "account FormDatas")

  const calculateTimeLeft = () => {
    const createdAt = new Date(user?.createdAt);

    // Calculate expiration date based on user role
    let expireDate;
    if (user?.role === "freelancer") {
      // Freelancer countdown expires after 15 days
      expireDate = new Date(createdAt);
      expireDate.setDate(createdAt.getDate() + 15);
    } else if (user?.role === "member") {
      // Member countdown expires after 365 days
      expireDate = new Date(createdAt);
      expireDate.setDate(createdAt.getDate() + 365);
    } else {
      // No countdown for other roles
      return;
    }

    const currentDate = new Date();
    const timeLeft = expireDate.getTime() - currentDate.getTime();

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  async function handleVerifyPassword() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await handleVerify(formData);

    console.log(res);

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowUpdateProfileForm(true);
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  async function handleUpdateUserAbout() {
    // updateAboutMe
    // console.log(formData,"formdata in handleUpdateUserAbout")
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await updateAboutMe(formData);
    setUser(res?.finalData?.user);
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
    setAboutMe(false);
  }

  async function handleUpdateUser() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await updateProfile(formData);
    setUser(res?.finalData?.user);
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowUpdateProfileForm(false);
      setFormData({
        _id: user?._id,
        name: user?.name,
        imageURL: user?.imageURL,
        role: user?.role,
        email: user?.email,
        password: ""
      })
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData({
        _id: user?._id,
        name: user?.name,
        imageURL: user?.imageURL,
        role: user?.role,
        email: user?.email,
        password: ""
      })
    }
    setShowUpdateProfileForm(false);
  }

  const router = useRouter();

  async function extractAllAddresses() {
    setPageLevelLoader(true);
    const res = await fetchAllAddresses(user?._id);

    console.log(res);

    if (res.success) {
      setPageLevelLoader(false);

      setAddresses(res.data);
    }
  }

  function handleCopyUserId() {
    const userId = user?._id;
    if (userId) {
      const textArea = document.createElement("textarea");
      textArea.value = userId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);

      // Reset the success message after a short delay
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }
  }

  async function handleAddOrUpdateAddress() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentEditedAddressId !== null
        ? await updateAddress({
          ...addressFormData,
          _id: currentEditedAddressId,
        })
        : await addNewAddress({ ...addressFormData, userID: user?._id });

    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
      extractAllAddresses();
      setCurrentEditedAddressId(null);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    }
  }

  function handleUpdateAddress(getCurrentAddress) {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: getCurrentAddress.fullName,
      city: getCurrentAddress.city,
      country: getCurrentAddress.country,
      postalCode: getCurrentAddress.postalCode,
      address: getCurrentAddress.address,
    });
    setCurrentEditedAddressId(getCurrentAddress._id);
  }

  async function handleDelete(getCurrentAddressID) {
    setComponentLevelLoader({ loading: true, id: getCurrentAddressID });

    const res = await deleteAddress(getCurrentAddressID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      extractAllAddresses();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  async function handleImage(event) {
    const currentFile = event.target.files[0];
    if (currentFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(currentFile);
      const extractImageUrl = await helperForUPloadingImageToFirebase(
        currentFile
      );
      console.log(extractImageUrl, "extractImageUrl user");
      if (extractImageUrl !== "") {
        const res = await updateImage(user._id, extractImageUrl);
        setUser(res?.finalData?.user);
        console.log(res, "Image");
      }
      toast.success("File Uploaded.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  const [openSettings, setOpenSettings] = useState(false);
  const [openAboutMe, setAboutMe] = useState(false);

  useEffect(() => {
    if (user !== null) extractAllAddresses();
  }, [user]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const options = [
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
  ]

  const options2 = [
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
                                                      [],
  ]
  return (
    <>
      <div class="h-full bg-gray-200 p-8">
        <div class="bg-white rounded-lg shadow-xl pb-8">
          <div x-data="{ openSettings: false }" class="absolute right-12 mt-4 rounded">
            <button
              onClick={() => setOpenSettings(!openSettings)} // Toggle the state when the button is clicked
              class="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20"
              title="Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
              </svg>
            </button>
            {/* setting  */}
            <div x-show="openSettings" class={`bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl ${openSettings ? 'block' : 'hidden'}`}>
              <div class="py-2 border-b">
                <p class="text-gray-400 text-xs px-6 uppercase mb-1">Settings</p>
                <button class="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                  </svg>
                  <span class="text-sm text-gray-700">Share Profile</span>
                </button>
                <button class="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                  </svg>
                  <span class="text-sm text-gray-700">Block User</span>
                </button>
                <button class="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-sm text-gray-700">More Info</span>
                </button>
              </div>
              <div class="py-2">
                <p class="text-gray-400 text-xs px-6 uppercase mb-1">Feedback</p>
                <button class="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  <span class="text-sm text-gray-700">Report</span>
                </button>
              </div>
            </div>
            {/* end of setting */}
          </div>
          {/* end of togle settings  */}
          <div class="w-full h-[250px]">
            <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" class="w-full h-full rounded-tl-lg rounded-tr-lg" />
          </div>
          <div class="flex flex-col items-center -mt-20">
            {/* change with hight */}
            <div class="relative">
              <img src={user?.imageURL} class="w-40 h-40 border-4 border-white rounded-full" />
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
              {/* <label htmlFor="file-image" className="w-12 h-12 border-4 border-red-500 bg-red-500 rounded-full flex items-center justify-center cursor-pointer"> */}
              <label htmlFor="file-image" className="bottom-0 right-5 absolute w-12 h-12 border-4 border-red-500 bg-red-500 dark:border-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                <i className="fa fa-camera "></i>
              </label>
            </div>

            <div class="flex items-center space-x-2 mt-2">
              <p class="text-2xl">{user?.name}</p>
              <span class="bg-blue-500 rounded-full p-1" title="Verified">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
            </div>
            {/* <p class="text-gray-700">User Role: {user?.role}</p>
            {user?.class_name &&
              <p class="text-gray-700">User Class: {user?.class_name}</p>
            } */}

          </div>
          <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
            <div class="flex items-center space-x-4 mt-2">
              <button class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg> */}
                <span>User Role: {user?.role}</span>
              </button>
              <button class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                  </svg> */}
                <span>User Class: {user?.class_name}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-x-4 h-full">
          <div />
          <div class="flex-1 bg-white rounded-lg shadow-xl p-8  ">
            <div class="flex items-center justify-between">
              <h4 class="text-xl text-gray-900 font-bold">Statistics</h4>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
              <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-indigo-600">Total Revenue</span>
                  {/* <span class="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span> */}
                </div>
                <div class="flex items-center justify-between mt-6">
                  <div>
                    <svg class="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div class="flex flex-col">
                    <div class="flex items-end">
                      <span class="text-2xl 2xl:text-3xl font-bold">8,141</span>
                      <div class="flex items-center ml-2 mb-1">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        {/* <span class="font-bold text-sm text-gray-500 ml-0.5">3%</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-green-600">New Orders</span>
                  {/* <span class="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span> */}
                </div>
                <div class="flex items-center justify-between mt-6">
                  <div>
                    <svg class="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                  </div>
                  <div class="flex flex-col">
                    <div class="flex items-end">
                      <span class="text-2xl 2xl:text-3xl font-bold">217</span>
                      <div class="flex items-center ml-2 mb-1">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        {/* <span class="font-bold text-sm text-gray-500 ml-0.5">5%</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-blue-600">Connections</span>
                  {/* <span class="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span> */}
                </div>
                <div class="flex items-center justify-between mt-6">
                  <div>
                    <svg class="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <div class="flex flex-col">
                    <div class="flex items-end">
                      <span class="text-2xl 2xl:text-3xl font-bold">54</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
            <div class="flex items-center justify-between">
              <h4 class="text-xl text-gray-900 font-bold">About Me</h4>
              {openAboutMe ? (
                <button
                  onClick={() => {
                    setHideButton(!hideButton);
                    setAboutMe(false);
                  }}
                  className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-pointer"
                >
                  Cancel Edit About
                </button>
              ) :
                <button
                  onClick={() => {
                    setHideButton(!hideButton);
                    setAboutMe(true);
                    setFormData({
                      _id: user?._id,
                      email: user?.email,
                    });
                  }}
                  className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-pointer"
                >
                  Edit About
                </button>
              }
            </div>
            {openAboutMe ? (
              <div>
                <textarea
                  placeholder={user?.aboutMe}
                  rows="5"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      aboutMe: event.target.value,
                    })
                  }
                  class="mt-2 bg-gray-200 border-1 border-purple-500 rounded py-1  px-4 w-full text-gray-700 "
                  style={{ borderRight: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
                />
                <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                  <button onClick={handleUpdateUserAbout} class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Change About Me
                  </button>
                </div>
              </div>
            ) : (
              <p class="mt-2 text-gray-700">{user?.aboutMe}</p>

            )}
            {/* <p class="mt-2 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates obcaecati numquam error et ut fugiat asperiores. Sunt nulla ad incidunt laboriosam, laudantium est unde natus cum numquam, neque facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, magni odio magnam commodi sunt ipsum eum! Voluptas eveniet aperiam at maxime, iste id dicta autem odio laudantium eligendi commodi distinctio!</p> */}
          </div>
          <div />
        </div>
        <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div class="w-full flex flex-col 2xl:w-1/3">
            {/* Personal Info */}
            <div class="flex-1 bg-white rounded-lg shadow-xl p-8">

              <div class="flex items-center justify-between">
                <span class="text-xl text-gray-900 font-bold">Personal Info</span>
                {showUpdateProfileForm ? (
                  <button
                    onClick={() => {
                      setHideButton(!hideButton);
                      setShowUpdateProfileForm(false);
                      setFormData({
                        _id: user?._id,
                        imageURL: user?.imageURL,
                        name: user?.name,
                        email: user?.email,
                        password: "",
                        role: user?.role,
                      });
                    }}
                    className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-pointer"
                  >
                    Cancel Edit details
                  </button>
                ) :
                  <button
                    onClick={() => {
                      setHideButton(!hideButton);
                      setShowUpdateProfileForm(true);
                      setFormData({
                        _id: user?._id,
                        imageURL: user?.imageURL,
                        name: user?.name,
                        email: user?.email,
                        password: "",
                        role: user?.role,
                      });
                    }}
                    className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-pointer"
                  >
                    Edit details
                  </button>
                }
              </div>
              <ul class="mt-2 text-gray-700">
                <li class="flex border-y py-2">
                  <span class="font-bold w-36">Display name:</span>
                  {showUpdateProfileForm ? (
                    <input
                      placeholder={user?.name}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          name: event.target.value,
                        })
                      }
                      class="bg-gray-200 border-1 border-purple-500 rounded py-1  px-4 w-full text-gray-700 "
                      style={{ borderRight: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
                    />
                  ) : (
                    <span className="text-gray-700">{user?.name}</span>
                  )}
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-36">First name:</span>
                  {showUpdateProfileForm ? (
                    <input
                      placeholder={user?.first_name}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          first_name: event.target.value,
                        })
                      }
                      class="bg-gray-200 border-1 border-purple-500 rounded py-1  px-4 w-full text-gray-700 "
                      style={{ borderRight: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
                    />
                  ) : (
                    <span class="text-gray-700">{user?.first_name}</span>
                  )}
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-36">Last name:</span>
                  {showUpdateProfileForm ? (
                    <input
                      placeholder={user?.last_name}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          last_name: event.target.value,
                        })
                      }
                      class="bg-gray-200 border-1 border-purple-500 rounded py-1  px-4 w-full text-gray-700 "
                      style={{ borderRight: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
                    />
                  ) : (
                    <span class="text-gray-700">{user?.last_name}</span>
                  )}
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-36">Joined:</span>
                  <span class="text-gray-700">{new Date(user?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-36">Mobile:</span>
                  {showUpdateProfileForm ? (
                    <input
                      placeholder={user?.phone}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          phone: event.target.value,
                        })
                      }
                      class="bg-gray-200 border-1 border-purple-500 rounded py-1  px-4 w-full text-gray-700 "
                      style={{ borderRight: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
                    />
                  ) : (
                    <span class="text-gray-700">{user?.phone}</span>
                  )}
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-36">Email:</span>
                  <span class="text-gray-700">{user?.email}</span>
                </li>
                {showUpdateProfileForm ? (
                  <li class="flex border-b py-2">
                    <span class="font-bold w-36">District:</span>
                    <select
                      onChange={(event) => {
                        setSelectedDistrict(event.target.value),
                          setFormData({
                            ...formData,
                            district: event.target.value,
                          });
                      }}
                      className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    >
                      <option selected>{user?.district}</option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </li>
                ) :
                  <li class="flex border-b py-2">
                    <span class="font-bold w-36">District:</span>
                    <span class="text-gray-700">{user?.district}</span>
                  </li>
                }
                {showUpdateProfileForm ? (
                  <li class="flex border-b py-2">
                    <span class="font-bold w-36">City:</span>
                    <select
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          city: event.target.value,
                        });
                      }}
                      className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    >
                      <option selected>{user?.city}</option>
                      {options2.map((districtOptions, districtIndex) => (
                        districtOptions.map((option, index) => (
                          <option key={`${districtIndex}-${index}`} value={option}>
                            {option}
                          </option>
                        ))
                      ))}
                    </select>
                  </li>
                ) :
                  <li class="flex border-b py-2">
                    <span class="font-bold w-36">City:</span>
                    <span class="text-gray-700">{user?.city}</span>
                  </li>
                }
                {showUpdateProfileForm ? (
                  <ul class="mt-2 text-gray-700">
                    <li class="flex border-y py-2">
                      <span class="font-bold w-40">Facebook URL:</span>
                      <input
                        placeholder={user?.facebookURL}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            facebookURL: event.target.value,
                          })
                        }
                        class="bg-gray-200 border-1 border-purple-500 rounded py-1  px-4 w-full text-gray-700 "
                        style={{ borderRight: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
                      />
                    </li>
                    <li class="flex border-y py-2">
                      <span class="font-bold w-36">Youtube URL:</span>
                      <input
                        placeholder={user?.youtubeURL}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            youtubeURL: event.target.value,
                          })
                        }
                        class="bg-gray-200 border-1 border-purple-500 rounded py-1  px-4 w-full text-gray-700 "
                        style={{ borderRight: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
                      />
                    </li>
                    <li class="flex border-y py-2">
                      <span class="font-bold w-36">Whatsapp:</span>
                      <input
                        placeholder={user?.whatsapp}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            whatsapp: event.target.value,
                          })
                        }
                        class="bg-gray-200 border-1 border-purple-500 rounded py-1  px-4 w-full text-gray-700 "
                        style={{ borderRight: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
                      />
                    </li>
                  </ul>
                ) :
                  <li class="flex items-center border-b py-2 space-x-2">
                    <span class="font-bold w-36">Social Media:</span>
                    {user?.facebookURL &&
                      <a href={user?.facebookURL} target="_blank" rel="noopener noreferrer" className=" socialIcon">
                        <i className='fab fa-facebook socialIconFont'></i>
                      </a>
                    }
                    {user?.youtubeURL &&
                      <a href={user?.youtubeURL} target="_blank" rel="noopener noreferrer" className="  socialIcon">
                        <i className='fab fa-youtube socialIconFont'></i>
                      </a>
                    }
                    {user?.whatsapp &&
                      <a href={`https://wa.me/${user?.whatsapp}`} target="_blank" rel="noopener noreferrer" className="socialIcon">
                        <i className='fab fa-whatsapp socialIconFont'></i>
                      </a>
                    }
                  </li>
                }
              </ul>
              {showUpdateProfileForm &&
                <button
                  onClick={handleUpdateUser}
                  className="disabled:opacity-50 inline-flex items-center justify-center px-2 py-2 text-xs mt-4
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-full w-1/4
                     "
                  style={{ backgroundColor: "#e84118" }}
                >
                  {componentLevelLoader &&
                    componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Saving"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader &&
                        componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              }
            </div>
            {/* End of Personal Info */}
          </div>
          <div class="w-full flex flex-col 2xl:w-1/3">
            {/* Activity log */}
            <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
              <div class="flex items-center justify-between">
                <span class="text-xl text-gray-900 font-bold">Activity log</span>
              </div>
              <div class="relative px-4">
                <div class="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                <div class="flex items-center w-full my-6 -ml-1.5">
                  <div class="w-1/12 z-10">
                    <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="w-11/12">
                    <p class="text-sm">Profile informations changed.</p>
                  </div>
                </div>
                <div class="flex items-center w-full my-6 -ml-1.5">
                  <div class="w-1/12 z-10">
                    <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="w-11/12">
                    <p class="text-sm">
                      Connected with <a href="#" class="text-blue-600 font-bold">Colby Covington</a>.</p>
                  </div>
                </div>
                <div class="flex items-center w-full my-6 -ml-1.5">
                  <div class="w-1/12 z-10">
                    <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="w-11/12">
                    <p class="text-sm">Invoice <a href="#" class="text-blue-600 font-bold">#4563</a> was created.</p>
                  </div>
                </div>
                <div class="flex items-center w-full my-6 -ml-1.5">
                  <div class="w-1/12 z-10">
                    <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="w-11/12">
                    <p class="text-sm">
                      Message received from <a href="#" class="text-blue-600 font-bold">Cecilia Hendric</a>.</p>
                  </div>
                </div>
                <div class="flex items-center w-full my-6 -ml-1.5">
                  <div class="w-1/12 z-10">
                    <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="w-11/12">
                    <p class="text-sm">New order received <a href="#" class="text-blue-600 font-bold">#OR9653</a>.</p>
                  </div>
                </div>
                <div class="flex items-center w-full my-6 -ml-1.5">
                  <div class="w-1/12 z-10">
                    <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="w-11/12">
                    <p class="text-sm">
                      Message received from <a href="#" class="text-blue-600 font-bold">Jane Stillman</a>.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* End of Activity log */}
          </div>
          <div class="w-full flex flex-col 2xl:w-1/3">
            <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
              <div class="flex items-center justify-between">
                <span class="text-xl text-gray-900 font-bold">Your package will expire in</span>
              </div>
              <div class="relative px-4">
                <div className="flex flex-row space-x-4 my-4">
                  <div className="flex flex-col w-20   ">
                    <h1
                      className="text-md text-center text-white"
                      style={{ backgroundColor: "#e84118", color: "white" }}
                    >
                      Days
                    </h1>
                    <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                      <div className="flex items-center justify-center h-full">
                        <div
                          className="text-center text-3xl font-semibold"
                          style={{ color: "#e84118" }}
                        >
                          {countdown.days < 10
                            ? `0${countdown.days}`
                            : countdown.days}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-20  ">
                    <h1
                      className="text-md text-center text-white"
                      style={{ backgroundColor: "#e84118", color: "white" }}
                    >
                      Hours
                    </h1>
                    <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                      <div className="flex items-center justify-center h-full">
                        <div
                          className="text-center text-3xl font-semibold"
                          style={{ color: "#e84118" }}
                        >
                          {countdown.hours < 10
                            ? `0${countdown.hours}`
                            : countdown.hours}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-20">
                    <h1
                      className="text-md text-center text-white"
                      style={{ backgroundColor: "#e84118", color: "white" }}
                    >
                      Mins.
                    </h1>
                    <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                      <div className="flex items-center justify-center h-full">
                        <div
                          className="text-center text-3xl font-semibold"
                          style={{ color: "#e84118" }}
                        >
                          {countdown.minutes < 10
                            ? `0${countdown.minutes}`
                            : countdown.minutes}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-20">
                    <h1
                      className="text-md text-center text-white"
                      style={{ backgroundColor: "#e84118", color: "white" }}
                    >
                      Secs.
                    </h1>
                    <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                      <div className="flex items-center justify-center h-full">
                        <div
                          className="text-center text-3xl font-semibold"
                          style={{ color: "#e84118" }}
                        >
                          {countdown.seconds < 10
                            ? `0${countdown.seconds}`
                            : countdown.seconds}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xl text-gray-900 font-bold">Package details</span>
              </div>
              {/* <p className="ml-2 text-gray-500">Member Package</p> */}
              <div
                className="p-3 text-start space-y-4"
              >
                <div className="flex flex-row">
                </div>
                <div className="flex flex-row">
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10.4521 1.31159C11.2522 0.334228 12.7469 0.334225 13.5471 1.31159L14.5389 2.52304L16.0036 1.96981C17.1853 1.52349 18.4796 2.2708 18.6839 3.51732L18.9372 5.06239L20.4823 5.31562C21.7288 5.51992 22.4761 6.81431 22.0298 7.99598L21.4765 9.46066L22.688 10.4525C23.6653 11.2527 23.6653 12.7473 22.688 13.5475L21.4765 14.5394L22.0298 16.004C22.4761 17.1857 21.7288 18.4801 20.4823 18.6844L18.9372 18.9376L18.684 20.4827C18.4796 21.7292 17.1853 22.4765 16.0036 22.0302L14.5389 21.477L13.5471 22.6884C12.7469 23.6658 11.2522 23.6658 10.4521 22.6884L9.46022 21.477L7.99553 22.0302C6.81386 22.4765 5.51948 21.7292 5.31518 20.4827L5.06194 18.9376L3.51687 18.6844C2.27035 18.4801 1.52305 17.1857 1.96937 16.004L2.5226 14.5394L1.31115 13.5475C0.333786 12.7473 0.333782 11.2527 1.31115 10.4525L2.5226 9.46066L1.96937 7.99598C1.52304 6.81431 2.27036 5.51992 3.51688 5.31562L5.06194 5.06239L5.31518 3.51732C5.51948 2.2708 6.81387 1.52349 7.99553 1.96981L9.46022 2.52304L10.4521 1.31159ZM11.2071 16.2071L18.2071 9.20712L16.7929 7.79291L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3947 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3947 11.2071 16.2071Z" fill="black" fillRule="evenodd" /></svg>
                  <p className="ml-2 text-gray-500">30 Photos</p>
                </div>
                <div className="flex flex-row">
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10.4521 1.31159C11.2522 0.334228 12.7469 0.334225 13.5471 1.31159L14.5389 2.52304L16.0036 1.96981C17.1853 1.52349 18.4796 2.2708 18.6839 3.51732L18.9372 5.06239L20.4823 5.31562C21.7288 5.51992 22.4761 6.81431 22.0298 7.99598L21.4765 9.46066L22.688 10.4525C23.6653 11.2527 23.6653 12.7473 22.688 13.5475L21.4765 14.5394L22.0298 16.004C22.4761 17.1857 21.7288 18.4801 20.4823 18.6844L18.9372 18.9376L18.684 20.4827C18.4796 21.7292 17.1853 22.4765 16.0036 22.0302L14.5389 21.477L13.5471 22.6884C12.7469 23.6658 11.2522 23.6658 10.4521 22.6884L9.46022 21.477L7.99553 22.0302C6.81386 22.4765 5.51948 21.7292 5.31518 20.4827L5.06194 18.9376L3.51687 18.6844C2.27035 18.4801 1.52305 17.1857 1.96937 16.004L2.5226 14.5394L1.31115 13.5475C0.333786 12.7473 0.333782 11.2527 1.31115 10.4525L2.5226 9.46066L1.96937 7.99598C1.52304 6.81431 2.27036 5.51992 3.51688 5.31562L5.06194 5.06239L5.31518 3.51732C5.51948 2.2708 6.81387 1.52349 7.99553 1.96981L9.46022 2.52304L10.4521 1.31159ZM11.2071 16.2071L18.2071 9.20712L16.7929 7.79291L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3947 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3947 11.2071 16.2071Z" fill="black" fillRule="evenodd" /></svg>
                  <p className="ml-2 text-gray-500">5 Videos</p>
                </div>
                <div className="flex flex-row">
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10.4521 1.31159C11.2522 0.334228 12.7469 0.334225 13.5471 1.31159L14.5389 2.52304L16.0036 1.96981C17.1853 1.52349 18.4796 2.2708 18.6839 3.51732L18.9372 5.06239L20.4823 5.31562C21.7288 5.51992 22.4761 6.81431 22.0298 7.99598L21.4765 9.46066L22.688 10.4525C23.6653 11.2527 23.6653 12.7473 22.688 13.5475L21.4765 14.5394L22.0298 16.004C22.4761 17.1857 21.7288 18.4801 20.4823 18.6844L18.9372 18.9376L18.684 20.4827C18.4796 21.7292 17.1853 22.4765 16.0036 22.0302L14.5389 21.477L13.5471 22.6884C12.7469 23.6658 11.2522 23.6658 10.4521 22.6884L9.46022 21.477L7.99553 22.0302C6.81386 22.4765 5.51948 21.7292 5.31518 20.4827L5.06194 18.9376L3.51687 18.6844C2.27035 18.4801 1.52305 17.1857 1.96937 16.004L2.5226 14.5394L1.31115 13.5475C0.333786 12.7473 0.333782 11.2527 1.31115 10.4525L2.5226 9.46066L1.96937 7.99598C1.52304 6.81431 2.27036 5.51992 3.51688 5.31562L5.06194 5.06239L5.31518 3.51732C5.51948 2.2708 6.81387 1.52349 7.99553 1.96981L9.46022 2.52304L10.4521 1.31159ZM11.2071 16.2071L18.2071 9.20712L16.7929 7.79291L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3947 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3947 11.2071 16.2071Z" fill="black" fillRule="evenodd" /></svg>
                  <p className="ml-2 text-gray-500">Account valid for 01 year</p>
                </div>
                <div className="flex flex-row">
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10.4521 1.31159C11.2522 0.334228 12.7469 0.334225 13.5471 1.31159L14.5389 2.52304L16.0036 1.96981C17.1853 1.52349 18.4796 2.2708 18.6839 3.51732L18.9372 5.06239L20.4823 5.31562C21.7288 5.51992 22.4761 6.81431 22.0298 7.99598L21.4765 9.46066L22.688 10.4525C23.6653 11.2527 23.6653 12.7473 22.688 13.5475L21.4765 14.5394L22.0298 16.004C22.4761 17.1857 21.7288 18.4801 20.4823 18.6844L18.9372 18.9376L18.684 20.4827C18.4796 21.7292 17.1853 22.4765 16.0036 22.0302L14.5389 21.477L13.5471 22.6884C12.7469 23.6658 11.2522 23.6658 10.4521 22.6884L9.46022 21.477L7.99553 22.0302C6.81386 22.4765 5.51948 21.7292 5.31518 20.4827L5.06194 18.9376L3.51687 18.6844C2.27035 18.4801 1.52305 17.1857 1.96937 16.004L2.5226 14.5394L1.31115 13.5475C0.333786 12.7473 0.333782 11.2527 1.31115 10.4525L2.5226 9.46066L1.96937 7.99598C1.52304 6.81431 2.27036 5.51992 3.51688 5.31562L5.06194 5.06239L5.31518 3.51732C5.51948 2.2708 6.81387 1.52349 7.99553 1.96981L9.46022 2.52304L10.4521 1.31159ZM11.2071 16.2071L18.2071 9.20712L16.7929 7.79291L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3947 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3947 11.2071 16.2071Z" fill="black" fillRule="evenodd" /></svg>
                  <p className="ml-2 text-gray-500">Direct sale 10%</p>
                </div>
                <div className="flex flex-row">
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10.4521 1.31159C11.2522 0.334228 12.7469 0.334225 13.5471 1.31159L14.5389 2.52304L16.0036 1.96981C17.1853 1.52349 18.4796 2.2708 18.6839 3.51732L18.9372 5.06239L20.4823 5.31562C21.7288 5.51992 22.4761 6.81431 22.0298 7.99598L21.4765 9.46066L22.688 10.4525C23.6653 11.2527 23.6653 12.7473 22.688 13.5475L21.4765 14.5394L22.0298 16.004C22.4761 17.1857 21.7288 18.4801 20.4823 18.6844L18.9372 18.9376L18.684 20.4827C18.4796 21.7292 17.1853 22.4765 16.0036 22.0302L14.5389 21.477L13.5471 22.6884C12.7469 23.6658 11.2522 23.6658 10.4521 22.6884L9.46022 21.477L7.99553 22.0302C6.81386 22.4765 5.51948 21.7292 5.31518 20.4827L5.06194 18.9376L3.51687 18.6844C2.27035 18.4801 1.52305 17.1857 1.96937 16.004L2.5226 14.5394L1.31115 13.5475C0.333786 12.7473 0.333782 11.2527 1.31115 10.4525L2.5226 9.46066L1.96937 7.99598C1.52304 6.81431 2.27036 5.51992 3.51688 5.31562L5.06194 5.06239L5.31518 3.51732C5.51948 2.2708 6.81387 1.52349 7.99553 1.96981L9.46022 2.52304L10.4521 1.31159ZM11.2071 16.2071L18.2071 9.20712L16.7929 7.79291L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3947 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3947 11.2071 16.2071Z" fill="black" fillRule="evenodd" /></svg>
                  <p className="ml-2 text-gray-500">All Extra income</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="bg-white rounded-lg shadow-xl p-8">
          <div class="flex items-center justify-between">
            <h4 class="text-xl text-gray-900 font-bold">Connections (54)</h4>
            <a href="#" title="View All">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
              </svg>
            </a>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-8 mt-8">
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection1.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Diane Aguilar</p>
              <p class="text-xs text-gray-500 text-center">Member</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection2.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Frances Mather</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection3.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Carlos Friedrich</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection4.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Donna Serrano</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection5.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Randall Tabron</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection6.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">John McCleary</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection7.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Amanda Noble</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection8.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Christine Drew</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection9.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Lucas Bell</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection10.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Debra Herring</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection11.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Benjamin Farrior</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection12.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Maria Heal</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection13.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Edward Ice</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection14.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Jeffery Silver</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection15.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Jennifer Schultz</p>
            </a>
            <a href="#" class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
              <img src="https://vojislavd.com/ta-template-demo/assets/img/connections/connection16.jpg" class="w-16 rounded-full" />
              <p class="text-center font-bold text-sm mt-1">Joseph Marlatt</p>
            </a>
          </div>
        </div>
      </div >
    </>
  );
}
