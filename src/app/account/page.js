"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Qr from "@/components/qr";
import TimerProfile from "@/components/TimerProfile";
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
// import "./page-style.css";
import Image from "next/image";
import { updateImage, updateBannerImage, updatePackDetails, updateProfile, updateAboutMe, userConnection, userLog } from "@/services/user";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import imagePlaceholder from "../../assets/images/propic.png";
import logo from "../../components/Navbar/vgo 1.png";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';
import CommonListing from "@/components/CommonListing";
import { productBySellerId } from "@/services/product";
import { getClassDataById } from "@/services/class";

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

function mapUserDataToReactElement(userConnectionData) {
  // onClick={() => router.push(`/orders/${item._id}`)}
  return (
    <a key={userConnectionData._id} href={`/user-profile/${userConnectionData._id}`} className="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
      <img src={userConnectionData.imageURL || 'https://placeholder.com/16x16'} className="w-16 rounded-full" />
      <p className="text-center font-bold text-sm mt-1">{userConnectionData.name}</p>
      <p className="text-xs text-gray-500 text-center">{userConnectionData.role}</p>
    </a>
  );
}
function moreDetailsView(UserClassdata, userName) {
  console.log("🚀 ~ file: page.js:8 ~ moreDetailsView ~ UserClassdata:", UserClassdata)

  const renderNames = (level) => {
    return UserClassdata?.map((user) => (
      user.class_lvl === level && (
        <div key={user._id} className={`rounded-lg items-center flex justify-center w-[214px] py-1 m-2 ${userName === user.name ? 'bg-green-500' : 'bg-gray-400'}`}>
          <h1 className="text-gray-900 text-sm p-2">{user.name}</h1>
        </div>
      )
    ));
  };

  return (
    <div className="absolute right-10 z-10  bg-gray-200 p-5">
      <h1 className="items-center flex justify-center">Class Details</h1>
      <div>
        {[1, 2, 3, 4].map((level) => (
          <div key={level} className="flex flex-auto mt-8 items-center">
            <h1 className="text-gray-900 text-sm  ">Lvl:{level}</h1>
            <div>{renderNames(level)}</div>
          </div>
        ))}
      </div>
    </div>
  );
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
  const [userData, setUserData] = useState([]);
  const [userProduct, setProductData] = useState([]);
  const [logData, setlogData] = useState([]);
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
  console.log(user, "account user")

  async function handleUserConnection() {
    console.log(user?._id, "user?._id");
    const testVal = await userConnection(user?._id);
    // if (Array.isArray(testVal.checkUser)) {
    //   setUserData(testVal.checkUser);
    // } else {
    //   console.error("Data is not an array:", testVal.checkUser);
    // }
    // // setUserData(testVal);
    // console.log("🚀 ~ file: page.js:115 ~ Account ~ testVal:", testVal.checkUser)
    return testVal.checkUser
  }

  useEffect(() => {

    const fetchData = async () => {
      const data = await handleUserConnection();
      setUserData(data);
    };

    fetchData();
  }, []);

  async function getActivityLog() {
    console.log(user?._id, "user?._id");
    const activitylog = await userLog(user?._id);
    console.log("🚀 ~ file: page.js:152 ~ getActivityLog ~ activitylog:", activitylog)
    return activitylog.extractApprovedDeposits
  }

  useEffect(() => {

    const fetchData = async () => {
      const Logdata = await getActivityLog();
      console.log("🚀 ~ file: page.js:160 ~ fetchData ~ Logdata:", Logdata)
      setlogData(Logdata);
    };

    fetchData();

    // Fetch data every 2 minutes
    const fetchDataInterval = setInterval(fetchData, 2 * 60 * 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(fetchDataInterval);

  }, [setlogData]);

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
      // https://api.whatsapp.com/
      // router.push("https://api.whatsapp.com/");
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
        toast.success("File Uploaded.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success("File Not Uploaded.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

    }
  }

  async function handleBannerImg(event) {
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
        const res = await updateBannerImage(user._id, extractImageUrl);
        setUser(res?.finalData?.user);
        console.log(res, "Image");
        toast.success("File Uploaded.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success("File Not Uploaded.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

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

  async function shareProfileToUser() {
    router.push("/login")
  }
  const [AlertMsg, setAlertMsg] = useState(true);
  async function closeMsg() {
    setAlertMsg(false);
    // setAlertErrMsg(false);
  }

  async function selectedAddpackshoppingMallCount() {
    // shoppingMallCount
    const res = await updatePackDetails(user._id, "shoppingMallCount")
    setUser(res?.finalData?.user);
    setAlertMsg(false);
  }

  async function selectedAddpacktotalShops() {
    // totalShops
    const res = await updatePackDetails(user._id, "totalShops")
    setUser(res?.finalData?.user);
    setAlertMsg(false);
  }

  useEffect(() => {

    const fetchProductData = async () => {
      const getAllProducts = await productBySellerId(user._id);
      console.log("🚀 ~ file: page.js:586 ~ fetchProductData ~ getAllProducts:", getAllProducts.data)
      setProductData(getAllProducts.data);
      console.log("🚀 ~ userProduct", userProduct);
    };

    fetchProductData();
  }, []);

  async function getProducts() {
    const getAllProducts = await productBySellerId("658455013e4effa61aeb71bf");
    console.log("🚀 ~ file: page.js:594 ~ getProducts ~ getAllProducts:", getAllProducts)
    setProductData(getAllProducts);
    console.log("🚀 ~ file: gg")

    return getAllProducts;
  }

  const [detailsid, setDetailsid] = useState("");
  const [UserClassdata, setUserClassdata] = useState([]);
  const [showclassDetails, setClassDetails] = useState(false);
  async function viewMore(id, classId) {
    setDetailsid(id)
    const res = await getClassDataById(classId)
    setUserClassdata(res.data)
    console.log("🚀 ~ file: page.js:119 ~ viewMore ~ res:", res);
    setClassDetails(!showclassDetails);
  }

  return (
    <>
      {
        user?.shoppingMallCount == 0 && user?.totalShops == 0 && AlertMsg && user.role != "customer" ? (
          <div class="rounded fixed top-0 left-0 flex items-center justify-center w-full h-full z-10"
            onClick={closeMsg}
            style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
            x-show="open">
            <div class=" h-auto p-4 mx-2 text-left bg-white rounded-3xl shadow-xl dark:bg-gray-800 md:max-w-xl md:p-6 lg:p-8 md:mx-0"
            >
              {/* <div class="flex justify-end mb-4">
                <button
                  onClick={closeMsg}
                  class=" dark:text-blue-400 dark:hover:text-blue-500 hover:text-blue-700">
                  x
                </button>
              </div> */}
              <div class="flex justify-center mb-4">
                <button
                  onClick={closeMsg}
                  class=" dark:text-blue-400 dark:hover:text-blue-500 hover:text-blue-700">
                  <Image
                    src={logo}
                    alt="User 1"
                    className="ml-2 h-16 w-16 md:h-16 md:w-16 object-cover transform scale-100"
                  />
                </button>
              </div>
              <div class="mb-4 text-center">
                <h2 class="text-2xl font-bold leading-snug text-gray-900 dark:text-gray-400">
                  HI - {user?.name}
                </h2>
                <div class="mt-4 ">
                  <p class="text-lg leading-5 text-gray-500 dark:text-gray-400">
                    Please Select Your <a href="#" class="text-myOrange font-bold">Package!</a>
                    {/* Please select your package! Note: <a href="#" class="text-myOrange font-bold">You can't change your package after selecting it.</a> */}
                  </p>
                  <div className="flex mt-2">
                    <p class="text-mb p-3 w-1/2 leading-5 text-gray-500 dark:text-gray-400 border rounded-2xl">
                      A shopping mall is a single location for several (six) types of your business
                    </p>
                    <p class="text-mb p-3 w-1/2  ml-1 leading-5 text-gray-500 dark:text-gray-400 border rounded-2xl">
                      An Store is just space for your main business only
                    </p>
                  </div>
                </div>
              </div>
              <span class="justify-center  gap-3 rounded-md shadow-sm flex text-xs">
                <button
                  style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                  class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-3xl px-3 py-3 font-semibold"
                  onClick={selectedAddpackshoppingMallCount}
                >
                  Select Shopping Mall
                </button>
                <button
                  style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                  class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-3xl px-3 py-3 font-semibold"
                  onClick={selectedAddpacktotalShops}
                >
                  Select Online Shop
                </button>
              </span>
              <div class="mt-4 flex items-center justify-center">
                <p class="text-xs lg:text-sm leading-5 text-gray-500 dark:text-gray-400">
                  Note: <a href="#" class="text-myOrange font-bold">You can't change your package after selecting it.</a>
                </p>
              </div>
            </div>
          </div >
        ) : null
      }
      <div class="h-full bg-gray-200 p-8">
        <div class="bg-white rounded-lg shadow-xl pb-8">

          {/* end of togle settings  */}
          <div class="w-full h-[250px] relative">
            <div x-data="{ openSettings: false }" class="absolute right-2 mt-4 rounded">
              <button
                onClick={() => setOpenSettings(!openSettings)} // Toggle the state when the button is clicked
                class="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20"
                title="Settings"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </button>
              {/* setting  */}
              <div x-show="openSettings" class={`bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl ${openSettings ? 'block' : 'hidden'}`}>
                <div class="py-2 border-b">
                  <p class="text-gray-400 text-xs px-6 uppercase mb-1">Share Profile</p>
                  {/* <button class="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200" onClick={handleCopyUserId}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                    </svg>
                    <span class="text-sm text-gray-700">Share Profile</span>
                    {copySuccess && (
                      <span className="text-white-600 text-xs">
                        (Copied to clipboard)
                      </span>
                    )}
                  </button> */}
                  <div className="px-6 py-1.5">
                    <WhatsappShareButton
                      url={`https://www.vigour.space/user-profile/${user?._id}`} >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </div>

                  {/* <p className="propile-userId">
                  Ref id :
                  <span onClick={handleCopyUserId} style={{ cursor: "pointer" }}>
                    {user?._id}{" "}
                    <i
                      style={{ marginLeft: "10px" }}
                      className="fa fa-file text-italic text-lg"
                    ></i>
                  </span>
                  {copySuccess && (
                    <span className="text-white-600 ml-2">
                      (Copied to clipboard)
                    </span>
                  )}
                </p> */}
                </div>
                {/* <div class="py-2">
                <p class="text-gray-400 text-xs px-6 uppercase mb-1">Feedback</p>
                <button class="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  <span class="text-sm text-gray-700">Report</span>
                </button>
              </div> */}
              </div>
              {/* end of setting */}
            </div>
            {/* <div class="lg:relative sm:flex"> */}
            <img src={user?.bannerURL ? user?.bannerURL : "https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"} class="w-full h-full rounded-tl-lg rounded-tr-lg " />
            <input
              accept="image/*"
              max="1000000"
              type="file"
              name="file-image-banner"
              id="file-image-banner"
              className="hidden"
              onChange={handleBannerImg}
              style={{ display: "none" }}
            />
            <label htmlFor="file-image-banner" className="bottom-0 right-1 absolute w-12 h-12 border-4 border-red-500 bg-red-500 dark:border-gray-800 rounded-full flex items-center justify-center cursor-pointer">
              <i className="fa fa-camera "></i>
            </label>
            {/* </div> */}
          </div>
          <div class="flex flex-col items-center -mt-20">

            <div class="relative">
              <img src={user?.imageURL ? user?.imageURL : imagePlaceholder} class="w-40 h-40 border-4 border-orange-600 rounded-full bg-hero bg-cover bg-no-repeat" />
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
              <label htmlFor="file-image" className="bottom-0 right-5 absolute w-12 h-12 border-4 border-red-500 bg-red-500 dark:border-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                <i className="fa fa-camera "></i>
              </label>
            </div>

            <div class="flex items-center space-x-2 mt-2">
              <p class="text-2xl text-black font-bold">{user?.name}</p>
              <span class="bg-blue-500 rounded-full p-1" title="Verified">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>

            </div>
            <button class=" flex justify-center items-center px-6 py-1.5 space-x-2 hover:bg-gray-200" onClick={handleCopyUserId}>
              <span class="text-sm text-gray-700">{user?._id}</span>
              {copySuccess && (
                <span className="text-gray-800 text-xs">
                  (Copied to clipboard)
                </span>
              )}
              {/* <p class="text-sm"><a href={`/user-profile/${user?._id}`} class="text-cyan-600">Share Profile</a></p> */}

            </button>
          </div>

          {/* user role and class */}
          <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
            <div class="flex items-center space-x-4 mt-2">
              <button class="flex items-center bg-orange-600  text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg> */}
                <span>User Role: {user?.role}</span>
              </button>
              <button class="flex items-center bg-orange-600  text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                onClick={() => viewMore(user?._id, user?.classId)}
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                  </svg> */}
                <span>User Class: {user?.class_name}</span>
              </button>

            </div>

          </div>
          {/* end of user role and class */}
        </div>
        {
          showclassDetails && detailsid == user?._id &&
          moreDetailsView(UserClassdata, user?.name)
        }
        <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-x-4 h-full">
          <div />
          {/* Statistics */}
          <div class="flex-1 bg-white rounded-lg shadow-xl p-8  ">
            <div class="flex items-center justify-between">
              <h4 class="text-xl text-gray-900 font-bold">Statistics</h4>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
              <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-indigo-600">Total Points</span>
                  <span class="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Total:{user?.memberCount * 1500}</span>
                </div>
                <div class="flex items-center justify-between mt-6">
                  <div>
                    <svg class="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div class="flex flex-col">
                    <div class="flex items-end">
                      {/* <span class="text-2xl 2xl:text-3xl text-black font-bold">{user?.profit}</span> */}
                      <span class="text-2xl 2xl:text-3xl text-black font-bold">{user?.memberCount * 1500}</span>
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
                      <span class="text-2xl 2xl:text-3xl font-bold text-black">0</span>
                      <div class="flex items-center ml-2 mb-1">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        {/* <span class="font-bold text-sm text-gray-500 ml-0.5">5%</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl" onClick={handleUserConnection}>
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
                      <span class="text-2xl 2xl:text-3xl font-bold text-black">{user?.memberCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End of Statistics */}
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
                  className="text-xs bg-gray-200 hover:bg-gray-500 text-black hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-pointer"
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

                      <a href={`https://api.whatsapp.com/send?phone=${user?.whatsapp}`} target="_blank" rel="noopener noreferrer" className="socialIcon">
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
                <div class="absolute h-full border border-dashed border-opacity-50 border-secondary border-black"></div>
                {logData?.map((controlItem, key) =>
                  <div class="flex items-center w-full my-6 -ml-1.5">
                    <div class="w-1/12 z-10">
                      <div class="w-3.5 h-3.5 bg-orange-600 rounded-full"></div>
                    </div>
                    <div class="w-11/12">
                      <p class="text-sm text-black font-semibold">{controlItem.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* End of Activity log */}
          </div>
          <div class="w-full flex flex-col 2xl:w-1/3">
            <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
              <div class="flex items-center justify-between">
                <span class="text-xl text-gray-900 font-bold">Your package will expire in</span>
              </div>
              <TimerProfile />
              <div class="flex items-center justify-between">
                <span class="text-xl text-gray-900 font-bold">
                  {
                    user?.role == "member" || user?.role == "customer" ? "Company QR" : "Your QR"
                  }
                </span>
              </div>
              {/* <div
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
              </div> */}
              {
                user?.role == "member" ? (<Qr profileUrl={"https://www.vigour.space"} />)
                  : user?.role == "customer" ? (<Qr profileUrl={"https://www.vigour.space"} />)
                    : (<Qr profileUrl={"https://www.vigour.space/user-profile/" + user?._id} />)
              }

            </div>
          </div>

        </div>
        <div class="bg-white rounded-lg shadow-xl p-8">
          <div class="flex items-center justify-between">
            <h4 class="text-xl text-gray-900 font-bold">Connections ({user?.memberCount})</h4>
            <a href="/user-class" title="View All">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
              </svg>
            </a>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-8 mt-8">
            {userData.map(mapUserDataToReactElement)}
          </div>

        </div>
        <div class="bg-white rounded-lg shadow-xl p-8 mt-4">
          {/* <CommonListing data={userProduct} /> */}
          <div class="flex items-center justify-between">
            <h4 class="text-xl text-gray-900 font-bold">Your Products ({userProduct?.length})</h4>
            <a href="#" title="View All">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
              </svg>
            </a>
          </div>
          <section class="flex items-center ">
            <div class="pt-5">
              <div class="grid grid-cols-1 gap-4 lg:gap-6 sm:gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {userProduct && userProduct.length
                  ? userProduct.map((item) => (
                    <div class="relative overflow-hidden bg-white rounded-xl dark:bg-gray-700 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 cursor-pointer"
                      onClick={() =>
                        router.push(`/product/${item._id}`)
                      }
                      key={item._id}
                    >
                      <div class="relative overflow-hidden p-5">
                        <div class="mb-5 overflow-hidden ">
                          <img class="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110" src={item.imageUrl} alt="" />
                        </div>
                        {item.onSale === "yes" ? (
                          <button class="absolute top-0 left-0 p-3 bg-orange-500 rounded-l-none hover:bg-orange-600 rounded-b-xl">
                            <p className="rounded-full text-sm uppercase tracking-wide text-white sm:py-1 sm:px-3">
                              {item.priceDrop}% Off
                            </p>
                          </button>
                        ) : null}
                      </div>
                      <a>
                        <h3 class="px-5 mb-1 text-lg font-bold dark:text-white h-10"> {item.name} </h3>
                      </a>
                      <div class="px-5 p-2">
                        <p class="mt-1 text-sm text-slate-400">{item.location ? item.location : "Colombo"}</p>
                        <div class="flex gap-1 text-orange-400 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path
                              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path
                              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path
                              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path
                              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-star" viewBox="0 0 16 16">
                            <path
                              d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </div>
                      </div>
                      <div class="flex">
                        <div class="w-1/2 px-5 pb-3">
                          <p class="text-md font-bold text-orange-500 dark:text-orange-300">
                            {item.price -
                              (item.price * item.priceDrop) /
                              100}
                          </p>
                          <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">{`LKR ${item.price}`}</span>
                        </div>
                        <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  ))
                  : <p>No matching products found</p>
                }
              </div>
            </div>
          </section>
        </div>
        <Notification />
      </div >
    </>
  );
}
