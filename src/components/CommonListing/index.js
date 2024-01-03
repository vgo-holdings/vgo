"use client";

import { useRouter } from "next/navigation";
import ProductTile from "./ProductTile";
import React, { useEffect, useState } from "react";
import Notification from "../Notification";
import Image from "next/image";
import bannerIMage from "../../assets/images/assets/img2.png";
import "./page-style.css";
export default function CommonListing({ data }) {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(true);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    router.refresh();
  }, []);

  const [productName, setproductName] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [cityFilter, setcityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    // Update filteredData whenever any filter changes
    const newFilteredData = data.filter(item =>
      (priceFilter ? item.priceRange === priceFilter : true) &&
      (locationFilter ? item.location === locationFilter : true) &&
      (cityFilter ? item.city === cityFilter : true) &&
      (categoryFilter ? item.category === categoryFilter : true)
    );

    setFilteredData(newFilteredData);
  }, [priceFilter, locationFilter,cityFilter,categoryFilter]);

  async function handleSearch() {
    console.log("search and give relavent data")
    console.log(productName)

    const newFilteredData = data.filter(item =>
      item.name.toLowerCase().includes(productName.toLowerCase())
    );

    setFilteredData(newFilteredData);

    console.log(filteredData, "filteredData");

  }
  function filtermenu() {
    console.log("🚀 ~ file: page.js:15 ~ filtermenu ~ setShowFilters:", showFilters)
    setShowFilters(!showFilters);
  }

  async function handleSearchInstance(productNameBySearch) {
    console.log("search and give relavent data")
    console.log(productNameBySearch)

    const newFilteredData = data.filter(item =>
      item.name.toLowerCase().includes(productNameBySearch.toLowerCase())
    );

    setFilteredData(newFilteredData);

    console.log(filteredData, "filteredData");
  }

  return (
    <div className="shop-mainContainer">
      <div className="shop-banner">
        <p style={{ marginBottom: "auto", marginTop: "auto" }}>
          <span style={{ color: "#e84118" }}>Shopping</span> the way you like it
        </p>
        <Image
          src={bannerIMage}
          className="shop-bannerImage"
          alt="shop-banner"
          width={500}
          height={500}
        />
      </div>

      <div class="w-full lg:w-[92%] shadow p-5 rounded-lg bg-white">
        <div class="flex">
          {/* <div class="absolute flex items-center ml-2 h-full">
            <svg class="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
            </svg>
          </div> */}

          <input
            type="text"
            placeholder="Search for products...."
            class="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            onChange={(e) => setproductName(e.target.value)}
          />
          <button className="bg-orange-500 p-3 border rounded"
            onClick={handleSearch}>
            <i className="fa fa-search"></i>
          </button>
        </div>

        <div class="flex items-center justify-between mt-4">
          <p class="font-medium">
            Filters
          </p>
          <div>
            <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
              Reset Filter
            </button>
            <button class="ml-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md" onClick={filtermenu}>
              {
                showFilters ? ("Hide Filter") : ("Show Filter")
              }
            </button>
          </div>
        </div>
        {
          showFilters &&
          <div>
            <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={(e) => setPriceFilter(e.target.value)}>
                <option value="">Any Price</option>
                <option value="price1">LKR 0 - LKR 10,000</option>
                <option value="price2">LKR 10,000 - LKR 20,000</option>
                <option value="price3">LKR 20,000 - LKR 50,000</option>
                <option value="price4">LKR 50,000 +</option>
              </select>

              <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={(e) => setLocationFilter(e.target.value)}>
                <option value="">Location</option>
                <option value="Colombo">Colombo</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Badulla">Badulla</option>
                <option value="Ratnapura">Ratnapura</option>
                <option value="Kegale">Kegale</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Mannar">Mannar</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Vavuniya">Vavuniya</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Matale">Matale</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Hambanthota">Hambanthota</option>
                <option value="Rathnapura">Rathnapura</option>
                <option value="Batticaloa">Batticaloa</option>
              </select>

              <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={(e) => setcityFilter(e.target.value)}>
                <option value="">City</option>
                {
                  locationFilter == "Ampara" ? (
                    <>
                      <option value="Addalaichchenai">Addalaichchenai</option>
                      <option value="Akkarepattu">Akkarepattu</option>
                      <option value="Alayadivembu">Alayadivembu</option>
                      <option value="Ampara">Ampara</option>
                      <option value="Damana">Damana</option>
                      <option value="Dehiattakandiya">Dehiattakandiya</option>
                      <option value="Irakkamam">Irakkamam</option>
                      <option value="Kalmunai">Kalmunai</option>
                      <option value="Karaitivu">Karaitivu</option>
                      <option value="Lahugala">Lahugala</option>
                      <option value="Maha Oya">Maha Oya</option>
                      <option value="Navithanveli">Navithanveli</option>
                      <option value="Nintavur">Nintavur</option>
                      <option value="Padiyathalawa">Padiyathalawa</option>
                      <option value="Pottuvil">Pottuvil</option>
                      <option value="Sainthamaruthu">Sainthamaruthu</option>
                      <option value="Sammanthurai">Sammanthurai</option>
                      <option value="Uhana">Uhana</option>
                    </>
                  ) : locationFilter === "Batticaloa" ? (
                    <>
                      <option value="Araiyampathy">Araiyampathy</option>
                      <option value="Batticaloa">Batticaloa</option>
                      <option value="Chenkalady">Chenkalady</option>
                      <option value="Eravur">Eravur</option>
                      <option value="Kaluvanchikudy">Kaluvanchikudy</option>
                      <option value="Kattankudy">Kattankudy</option>
                      <option value="Kiran">Kiran</option>
                      <option value="Kokkadichcholai">Kokkadichcholai</option>
                      <option value="Oddamavadi">Oddamavadi</option>
                      <option value="Pasikudah">Pasikudah</option>
                      <option value="Vakarai">Vakarai</option>
                      <option value="Valaichchenai">Valaichchenai</option>
                      <option value="Vavunathivu">Vavunathivu</option>
                      <option value="Vellavely">Vellavely</option>
                    </>
                  ) : locationFilter === "Trincomalee" ? (
                    <>
                      <option value="Gomarankadawala">Gomarankadawala</option>
                      <option value="Kantalai">Kantalai</option>
                      <option value="Kinniya">Kinniya</option>
                      <option value="Kuchchaveli">Kuchchaveli</option>
                      <option value="Morawewa">Morawewa</option>
                      <option value="Muttur">Muttur</option>
                      <option value="Seruvila">Seruvila</option>
                      <option value="Siripura">Siripura</option>
                      <option value="Thampalakamam">Thampalakamam</option>
                      <option value="Trincomalee">Trincomalee</option>
                      <option value="Verugal">Verugal</option>
                    </>
                  ) : locationFilter === "Anuradhapura" ? (
                    <>
                      <option value="Anuradhapura">Anuradhapura</option>
                      <option value="Bulnewa">Bulnewa</option>
                      <option value="Eppawala">Eppawala</option>
                      <option value="Galenbindunuwewa">Galenbindunuwewa</option>
                      <option value="Galnewa">Galnewa</option>
                      <option value="Ganewalpola">Ganewalpola</option>
                      <option value="Habarana">Habarana</option>
                      <option value="Horowupotana">Horowupotana</option>
                      <option value="Ipalogama">Ipalogama</option>
                      <option value="Kahatagasdigiliya">Kahatagasdigiliya</option>
                      <option value="Kebithigollewa">Kebithigollewa</option>
                      <option value="Kebitigollawa">Kebitigollawa</option>
                      <option value="Kekirawa">Kekirawa</option>
                      <option value="Konapathirawa">Konapathirawa</option>
                      <option value="Konwewa">Konwewa</option>
                      <option value="Madatugama">Madatugama</option>
                      <option value="Mahailuppallama">Mahailuppallama</option>
                      <option value="Mahavilachchiya">Mahavilachchiya</option>
                      <option value="Maradankadawala">Maradankadawala</option>
                      <option value="Medawachchiya">Medawachchiya</option>
                      <option value="Mihintale">Mihintale</option>
                      <option value="Nochchiyagama">Nochchiyagama</option>
                      <option value="Padaviya">Padaviya</option>
                      <option value="Palagala">Palagala</option>
                      <option value="Palugaswewa">Palugaswewa</option>
                      <option value="Rajanganaya">Rajanganaya</option>
                      <option value="Rambewa">Rambewa</option>
                      <option value="Seeppukulama">Seeppukulama</option>
                      <option value="Talawa">Talawa</option>
                      <option value="Tambuttegama">Tambuttegama</option>
                      <option value="Thambuttegama">Thambuttegama</option>
                      <option value="Thirappane">Thirappane</option>
                      <option value="Yakalla">Yakalla</option>
                    </>
                  ) : locationFilter === "Polonnaruwa" ? (
                    // Add options for Polonnaruwa
                    <>
                      <option value="Aralaganwila">Aralaganwila</option>
                      <option value="Bakamuna">Bakamuna</option>
                      <option value="Dimbulagala">Dimbulagala</option>
                      <option value="Elahera">Elahera</option>
                      <option value="Galamuna">Galamuna</option>
                      <option value="Giritale">Giritale</option>
                      <option value="Hingurakgoda">Hingurakgoda</option>
                      <option value="Jayantipura">Jayantipura</option>
                      <option value="Kaduruwela">Kaduruwela</option>
                      <option value="Lankapura">Lankapura</option>
                      <option value="Manampitiya">Manampitiya</option>
                      <option value="Medirigiriya">Medirigiriya</option>
                      <option value="Minneriya">Minneriya</option>
                      <option value="Polonnaruwa">Polonnaruwa</option>
                      <option value="Sungawila">Sungawila</option>
                      <option value="Welikanda">Welikanda</option>
                    </>
                  ) : locationFilter === "Badulla" ? (
                    // Add options for Badulla
                    <>
                      <option value="Badulla">Badulla</option>
                      <option value="Bandarawela">Bandarawela</option>
                      <option value="Beragala">Beragala</option>
                      <option value="Diyatalawa">Diyatalawa</option>
                      <option value="Ella">Ella</option>
                      <option value="Haldummulla">Haldummulla</option>
                      <option value="Hali Ela">Hali Ela</option>
                      <option value="Haputale">Haputale</option>
                      <option value="Kandaketiya">Kandaketiya</option>
                      <option value="Lunugala">Lunugala</option>
                      <option value="Mahiyanganaya">Mahiyanganaya</option>
                      <option value="Meegahakivula">Meegahakivula</option>
                      <option value="Passara">Passara</option>
                      <option value="tennapanguwa">tennapanguwa</option>
                      <option value="Uva-Paranagama">Uva-Paranagama</option>
                      <option value="Welimada">Welimada</option>
                      <option value="Wiyaluwa">Wiyaluwa</option>
                    </>
                  ) : locationFilter === "Moneragala" ? (
                    // Add options for Moneragala
                    <>
                      <option value="Badalkumbura">Badalkumbura</option>
                      <option value="Bibile">Bibile</option>
                      <option value="Buttala">Buttala</option>
                      <option value="Kataragama">Kataragama</option>
                      <option value="Madulla">Madulla</option>
                      <option value="Medagama">Medagama</option>
                      <option value="Moneragala">Moneragala</option>
                      <option value="Okkampitiya">Okkampitiya</option>
                      <option value="Sevanagala">Sevanagala</option>
                      <option value="Siyambalanduwa">Siyambalanduwa</option>
                      <option value="Tanamalwila">Tanamalwila</option>
                      <option value="Wellawaya">Wellawaya</option>
                    </>
                  ) : locationFilter === "Colombo" ? (
                    // Add options for Colombo
                    <>
                      <option value="Angoda">Angoda</option>
                      <option value="Athurugiriya">Athurugiriya</option>
                      <option value="Avissawella">Avissawella</option>
                      <option value="Battaramulla">Battaramulla</option>
                      <option value="Boralesgamuwa">Boralesgamuwa</option>
                      <option value="Colombo 01">Colombo 01</option>
                      <option value="Colombo 02">Colombo 02</option>
                      <option value="Colombo 03">Colombo 03</option>
                      <option value="Colombo 04">Colombo 04</option>
                      <option value="Colombo 05">Colombo 05</option>
                      <option value="Colombo 06">Colombo 06</option>
                      <option value="Colombo 07">Colombo 07</option>
                      <option value="Colombo 08">Colombo 08</option>
                      <option value="Colombo 09">Colombo 09</option>
                      <option value="Colombo 10">Colombo 10</option>
                      <option value="Colombo 11">Colombo 11</option>
                      <option value="Colombo 12">Colombo 12</option>
                      <option value="Colombo 13">Colombo 13</option>
                      <option value="Colombo 14">Colombo 14</option>
                      <option value="Colombo 15">Colombo 15</option>
                      <option value="Dehiwala">Dehiwala</option>
                      <option value="Hanwella">Hanwella</option>
                      <option value="Homagama">Homagama</option>
                      <option value="Kaduwela">Kaduwela</option>
                      <option value="Kesbewa">Kesbewa</option>
                      <option value="Kohuwala">Kohuwala</option>
                      <option value="Kolonnawa">Kolonnawa</option>
                      <option value="Kosgama">Kosgama</option>
                      <option value="Kottawa">Kottawa</option>
                      <option value="Kotte">Kotte</option>
                      <option value="Maharagama">Maharagama</option>
                      <option value="Malabe">Malabe</option>
                      <option value="Mount Lavinia">Mount Lavinia</option>
                      <option value="Nawala">Nawala</option>
                      <option value="Nugegoda">Nugegoda</option>
                      <option value="Paddukka">Paddukka</option>
                      <option value="Pannipitiya">Pannipitiya</option>
                      <option value="Piliyandala">Piliyandala</option>
                      <option value="Rajagiriya">Rajagiriya</option>
                      <option value="Ranala">Ranala</option>
                      <option value="Ratmalana">Ratmalana</option>
                      <option value="Talawathugoda">Talawathugoda</option>
                      <option value="Wellampitiya">Wellampitiya</option>
                    </>
                  ) : locationFilter === "Gampaha" ? (
                    // Add options for Gampaha
                    <>
                      <option value="Attanagalla">Attanagalla</option>
                      <option value="Biyagama">Biyagama</option>
                      <option value="Delgoda">Delgoda</option>
                      <option value="Divlapitiya">Divlapitiya</option>
                      <option value="Dompe">Dompe</option>
                      <option value="Gampaha">Gampaha</option>
                      <option value="Ganemulla">Ganemulla</option>
                      <option value="Ja-Ela">Ja-Ela</option>
                      <option value="Kadawatha">Kadawatha</option>
                      <option value="Kandana">Kandana</option>
                      <option value="Katana">Katana</option>
                      <option value="Katunayake">Katunayake</option>
                      <option value="Kelaniya">Kelaniya</option>
                      <option value="Kiribathgoda">Kiribathgoda</option>
                      <option value="Mahara">Mahara</option>
                      <option value="Minuwangoda">Minuwangoda</option>
                      <option value="Mirigama">Mirigama</option>
                      <option value="Negombo">Negombo</option>
                      <option value="Nittambuwa">Nittambuwa</option>
                      <option value="Ragama">Ragama</option>
                      <option value="Veyangoda">Veyangoda</option>
                      <option value="Wattala">Wattala</option>
                    </>
                  ) : locationFilter === "Kalutara" ? (
                    // Add options for Kalutara
                    <>
                      <option value="Agalawatta">Agalawatta</option>
                      <option value="Aluthgama">Aluthgama</option>
                      <option value="Baduraliya">Baduraliya</option>
                      <option value="Bandaragama">Bandaragama</option>
                      <option value="Beruwala">Beruwala</option>
                      <option value="Bulathsinhala">Bulathsinhala</option>
                      <option value="Dodangoda">Dodangoda</option>
                      <option value="Horana">Horana</option>
                      <option value="Ingiriya">Ingiriya</option>
                      <option value="Kalutara">Kalutara</option>
                      <option value="Madurawela">Madurawela</option>
                      <option value="Matugama">Matugama</option>
                      <option value="Millaniya">Millaniya</option>
                      <option value="Panadura">Panadura</option>
                      <option value="Wadduwa">Wadduwa</option>
                      <option value="Walallavita">Walallavita</option>
                    </>
                  ) : locationFilter === "Galle" ? (
                    // Add options for Galle
                    <>
                      <option value="Ahangama">Ahangama</option>
                      <option value="Ahungalla">Ahungalla</option>
                      <option value="Ambalangoda">Ambalangoda</option>
                      <option value="Baddegama">Baddegama</option>
                      <option value="Balapitiya">Balapitiya</option>
                      <option value="Batapola">Batapola</option>
                      <option value="Bentota">Bentota</option>
                      <option value="Boossa">Boossa</option>
                      <option value="Elpitiya">Elpitiya</option>
                      <option value="Galle">Galle</option>
                      <option value="Habaraduwa">Habaraduwa</option>
                      <option value="Hikkaduwa">Hikkaduwa</option>
                      <option value="Hiniduma">Hiniduma</option>
                      <option value="Imaduwa">Imaduwa</option>
                      <option value="Karandeniya">Karandeniya</option>
                      <option value="Karapitiya">Karapitiya</option>
                      <option value="Koggala">Koggala</option>
                      <option value="Kosgoda">Kosgoda</option>
                      <option value="Mapalagama">Mapalagama</option>
                      <option value="Nagoda">Nagoda</option>
                      <option value="Neluwa">Neluwa</option>
                      <option value="Pitigala">Pitigala</option>
                      <option value="Rathgama">Rathgama</option>
                      <option value="Thawalama">Thawalama</option>
                      <option value="Udugama">Udugama</option>
                      <option value="Uragasmanhandiya">Uragasmanhandiya</option>
                      <option value="Wanduramba">Wanduramba</option>
                      <option value="Yakkalamulla">Yakkalamulla</option>
                    </>
                  ) : locationFilter === "Hambantota" ? (
                    // Add options for Hambantota
                    <>
                      <option value="Ambalantota">Ambalantota</option>
                      <option value="Angunukolapelessa">Angunukolapelessa</option>
                      <option value="Beliatta">Beliatta</option>
                      <option value="Hambantota">Hambantota</option>
                      <option value="Middeniya">Middeniya</option>
                      <option value="Tangalla">Tangalla</option>
                      <option value="Tissamaharama">Tissamaharama</option>
                      <option value="Walasmulla">Walasmulla</option>
                      <option value="Weeraketiya">Weeraketiya</option>
                    </>
                  ) : locationFilter === "Matara" ? (
                    // Add options for Matara
                    <>
                      <option value="Athuraliya">Athuraliya</option>
                      <option value="Akuressa">Akuressa</option>
                      <option value="Aparekka">Aparekka</option>
                      <option value="Denipitiya">Denipitiya</option>
                      <option value="Deniyaya">Deniyaya</option>
                      <option value="Devinuwara">Devinuwara</option>
                      <option value="Dikwella">Dikwella</option>
                      <option value="Gandara">Gandara</option>
                      <option value="Hakmana">Hakmana</option>
                      <option value="Kamburugamuwa">Kamburugamuwa</option>
                      <option value="Kamburupitiya">Kamburupitiya</option>
                      <option value="Karaputugala">Karaputugala</option>
                      <option value="Kekanadura">Kekanadura</option>
                      <option value="Kirinda">Kirinda</option>
                      <option value="Kotapola">Kotapola</option>
                      <option value="Malimbada">Malimbada</option>
                      <option value="Matara">Matara</option>
                      <option value="Mirissa">Mirissa</option>
                      <option value="Morawaka">Morawaka</option>
                      <option value="Mulatiyana">Mulatiyana</option>
                      <option value="Pasgoda">Pasgoda</option>
                      <option value="Pitabeddara">Pitabeddara</option>
                      <option value="Puhuwella">Puhuwella</option>
                      <option value="Thelijjawila">Thelijjawila</option>
                      <option value="Thihagoda">Thihagoda</option>
                      <option value="Tihagoda">Tihagoda</option>
                      <option value="Weligama">Weligama</option>
                      <option value="Welihinda">Welihinda</option>
                      <option value="Welipitiya">Welipitiya</option>
                    </>
                  ) : locationFilter === "Jaffna" ? (
                    // Add options for Jaffna
                    <>
                      <option value="Chankanai">Chankanai</option>
                      <option value="Chavakachcheri">Chavakachcheri</option>
                      <option value="Jaffna">Jaffna</option>
                      <option value="Karainagar">Karainagar</option>
                      <option value="Karaveddy">Karaveddy</option>
                      <option value="Kayts">Kayts</option>
                      <option value="Kopay">Kopay</option>
                      <option value="Maruthankerney">Maruthankerney</option>
                      <option value="Nallur">Nallur</option>
                      <option value="Point Pedro">Point Pedro</option>
                      <option value="Sandilipay">Sandilipay</option>
                      <option value="Tellippalai">Tellippalai</option>
                      <option value="Uduvil">Uduvil</option>
                      <option value="Velanai">Velanai</option>
                    </>
                  ) : locationFilter === "Kilinochchi" ? (
                    // Add options for Kilinochchi
                    <>
                      <option value="Iranamadu">Iranamadu</option>
                      <option value="Kandavalai">Kandavalai</option>
                      <option value="Kilinochchi">Kilinochchi</option>
                      <option value="Pallai">Pallai</option>
                      <option value="Paranthan">Paranthan</option>
                      <option value="Poonakary">Poonakary</option>
                      <option value="Velikkandal">Velikkandal</option>
                    </>
                  ) : locationFilter === "Mannar" ? (
                    // Add options for Mannar
                    <>
                      <option value="Adampan">Adampan</option>
                      <option value="Chilawathurai">Chilawathurai</option>
                      <option value="Madhu">Madhu</option>
                      <option value="Mannar">Mannar</option>
                      <option value="Nanaddan">Nanaddan</option>
                      <option value="Nachoikuda">Nachoikuda</option>
                      <option value="Pesalai">Pesalai</option>
                      <option value="Talaimannar">Talaimannar</option>
                      <option value="Thalvupadu">Thalvupadu</option>
                      <option value="Vankalai">Vankalai</option>
                      <option value="Vellankulam">Vellankulam</option>
                      <option value="Vidathaltheevu">Vidathaltheevu</option>
                      <option value="Willyamputhurai">Willyamputhurai</option>
                    </>
                  ) : locationFilter === "Mullativu" ? (
                    // Add options for Mullativu
                    <>
                      <option value="Manthai East">Manthai East</option>
                      <option value="Mankulam">Mankulam</option>
                      <option value="Mullaitivu">Mullaitivu</option>
                      <option value="Oddusuddan">Oddusuddan</option>
                      <option value="Puthukkudiyiruppu">Puthukkudiyiruppu</option>

                    </>
                  ) : locationFilter === "Vavuniya" ? (
                    // Add options for Vavuniya
                    <>
                      <option value="Cheddikulam">Cheddikulam</option>
                      <option value="Nedunkeni">Nedunkeni</option>
                      <option value="Vavuniya">Vavuniya</option>

                    </>
                  ) : locationFilter === "Kandy" ? (
                    // Add options for Kandy
                    <>
                      <option value="Akurana">Akurana</option>
                      <option value="Alawatugoda">Alawatugoda</option>
                      <option value="Ambatenna">Ambatenna</option>
                      <option value="Ampitiya">Ampitiya</option>
                      <option value="Daskara">Daskara</option>
                      <option value="Daulagala">Daulagala</option>
                      <option value="Delthota">Delthota</option>
                      <option value="Digana">Digana</option>
                      <option value="Galagedara">Galagedara</option>
                      <option value="Galhinna">Galhinna</option>
                      <option value="Gampola">Gampola</option>
                      <option value="Gelioya">Gelioya</option>
                      <option value="Hanguranketa">Hanguranketa</option>
                      <option value="Hapugastalawa">Hapugastalawa</option>
                      <option value="Harispattuwa">Harispattuwa</option>
                      <option value="Hatharaliyadda">Hatharaliyadda</option>
                      <option value="Kadugannawa">Kadugannawa</option>
                      <option value="Kadugannawa UC">Kadugannawa UC</option>
                      <option value="Kandy">Kandy</option>
                      <option value="Katugastota">Katugastota</option>
                      <option value="Kundasale">Kundasale</option>
                      <option value="Madawala">Madawala</option>
                      <option value="Madawala Bazaar">Madawala Bazaar</option>
                      <option value="Menikdiwela">Menikdiwela</option>
                      <option value="Minipe">Minipe</option>
                      <option value="Nawalapitiya">Nawalapitiya</option>
                      <option value="Pallekele">Pallekele</option>
                      <option value="Panvila">Panvila</option>
                      <option value="Pathadumbara">Pathadumbara</option>
                      <option value="Pathahewaheta">Pathahewaheta</option>
                      <option value="Peradeniya">Peradeniya</option>
                      <option value="Pilimatalawa">Pilimatalawa</option>
                      <option value="Poojapitiya">Poojapitiya</option>
                      <option value="Pussellawa">Pussellawa</option>
                      <option value="Talatuoya">Talatuoya</option>
                      <option value="Teldeniya">Teldeniya</option>
                      <option value="Thumpane">Thumpane</option>
                      <option value="Udapalatha">Udapalatha</option>
                      <option value="Ududumbara">Ududumbara</option>
                      <option value="Udunuwara">Udunuwara</option>
                      <option value="Ulapane">Ulapane</option>
                      <option value="Watadeniya">Watadeniya</option>
                      <option value="Wattegama">Wattegama</option>
                      <option value="Welamboda">Welamboda</option>
                      <option value="Yatinuwara">Yatinuwara</option>
                    </>
                  ) : locationFilter === "Matale" ? (
                    // Add options for Matale
                    <>
                      <option value="Dambulla">Dambulla</option>
                      <option value="Elkaduwa">Elkaduwa</option>
                      <option value="Galewela">Galewela</option>
                      <option value="Gammaduwa">Gammaduwa</option>
                      <option value="Inamaluwa">Inamaluwa</option>
                      <option value="Kaikawala">Kaikawala</option>
                      <option value="Kibissa">Kibissa</option>
                      <option value="Laggala Pallegama">Laggala Pallegama</option>
                      <option value="Madawala Ulpotha">Madawala Ulpotha</option>
                      <option value="Matale">Matale</option>
                      <option value="Nalanda">Nalanda</option>
                      <option value="Naula">Naula</option>
                      <option value="Palapathwela">Palapathwela</option>
                      <option value="Pallepola">Pallepola</option>
                      <option value="Rattota">Rattota</option>
                      <option value="Sigiriya">Sigiriya</option>
                      <option value="Ukuwela">Ukuwela</option>
                      <option value="Wahacotte">Wahacotte</option>
                      <option value="Yatawatta">Yatawatta</option>
                    </>
                  ) : locationFilter === "Nuwara Eliya" ? (
                    // Add options for Nuwara Eliya
                    <>
                      <option value="Agrapatana">Agrapatana</option>
                      <option value="Ambewela">Ambewela</option>
                      <option value="Bogawantalawa">Bogawantalawa</option>
                      <option value="Bopattalawa">Bopattalawa</option>
                      <option value="Dayagama">Dayagama</option>
                      <option value="Ginigathena">Ginigathena</option>
                      <option value="Haggala">Haggala</option>
                      <option value="Hapugastalawa">Hapugastalawa</option>
                      <option value="Hatton">Hatton</option>
                      <option value="Kotagala">Kotagala</option>
                      <option value="Kotmale">Kotmale</option>
                      <option value="Labukele">Labukele</option>
                      <option value="Laxapana">Laxapana</option>
                      <option value="Madulla">Madulla</option>
                      <option value="Maskeliya">Maskeliya</option>
                      <option value="Nanuoya">Nanuoya</option>
                      <option value="Nuwara Eliya">Nuwara Eliya</option>
                      <option value="Padiyapelella">Padiyapelella</option>
                      <option value="Ragala">Ragala</option>
                      <option value="Ramboda">Ramboda</option>
                      <option value="Rozella">Rozella</option>
                      <option value="Talawakele">Talawakele</option>
                      <option value="Udapussallawa">Udapussallawa</option>
                      <option value="Walapane">Walapane</option>
                      <option value="Watawala">Watawala</option>
                    </>
                  ) : locationFilter === "Kegalle" ? (
                    // Add options for Kegalle
                    <>
                      <option value="Ambepussa">Ambepussa</option>
                      <option value="Amitirigala">Amitirigala</option>
                      <option value="Aranayaka">Aranayaka</option>
                      <option value="Bulathkohupitiya">Bulathkohupitiya</option>
                      <option value="Dehiovita">Dehiovita</option>
                      <option value="Deraniyagala">Deraniyagala</option>
                      <option value="Galigamuwa">Galigamuwa</option>
                      <option value="Hemmathagama">Hemmathagama</option>
                      <option value="Karawanella">Karawanella</option>
                      <option value="Kegalle">Kegalle</option>
                      <option value="Kitulgala">Kitulgala</option>
                      <option value="Kotiyakumbura">Kotiyakumbura</option>
                      <option value="Mawanella">Mawanella</option>
                      <option value="Rambukkana">Rambukkana</option>
                      <option value="Ruwanwella">Ruwanwella</option>
                      <option value="Thalgaspitiya">Thalgaspitiya</option>
                      <option value="Warakapola">Warakapola</option>
                      <option value="Yatiyantota">Yatiyantota</option>
                    </>
                  ) : locationFilter === "Ratnapura" ? (
                    // Add options for Ratnapura
                    <>
                      <option value="Ayagama">Ayagama</option>
                      <option value="Balangoda">Balangoda</option>
                      <option value="Eheliyagoda">Eheliyagoda</option>
                      <option value="Elapatha">Elapatha</option>
                      <option value="Embilipitiya">Embilipitiya</option>
                      <option value="Godakawela">Godakawela</option>
                      <option value="Imbulpe">Imbulpe</option>
                      <option value="Kalawana">Kalawana</option>
                      <option value="Kiriella">Kiriella</option>
                      <option value="Kolonna">Kolonna</option>
                      <option value="Kuruwita">Kuruwita</option>
                      <option value="Nivitigala">Nivitigala</option>
                      <option value="Opanayaka">Opanayaka</option>
                      <option value="Pelmadulla">Pelmadulla</option>
                      <option value="Pinnawala">Pinnawala</option>
                      <option value="Rakwana">Rakwana</option>
                      <option value="Ratnapura">Ratnapura</option>
                      <option value="Weligepola">Weligepola</option>
                      <option value="Yatiyanthota">Yatiyanthota</option>
                    </>
                  ) : locationFilter === "Kurunegala" ? (
                    // Add options for Kurunegala
                    <>
                      <option value="Alawwa">Alawwa</option>
                      <option value="Bingiriya">Bingiriya</option>
                      <option value="Dambadeniya">Dambadeniya</option>
                      <option value="Dandagamuwa">Dandagamuwa</option>
                      <option value="Galgamuwa">Galgamuwa</option>
                      <option value="Giriulla">Giriulla</option>
                      <option value="Hettipola">Hettipola</option>
                      <option value="Hiripitiya">Hiripitiya</option>
                      <option value="Ibbagamuwa">Ibbagamuwa</option>
                      <option value="Katupotha">Katupotha</option>
                      <option value="Kuliyapitiya">Kuliyapitiya</option>
                      <option value="Kurunegala">Kurunegala</option>
                      <option value="Maho">Maho</option>
                      <option value="Mawathagama">Mawathagama</option>
                      <option value="Melsiripura">Melsiripura</option>
                      <option value="Narammala">Narammala</option>
                      <option value="Nikaweratiya">Nikaweratiya</option>
                      <option value="pahamune">pahamune</option>
                      <option value="Panagamuwa">Panagamuwa</option>
                      <option value="Pannala">Pannala</option>
                      <option value="Pannawa">Pannawa</option>
                      <option value="Polgahawela">Polgahawela</option>
                      <option value="Potuhera">Potuhera</option>
                      <option value="Ridigama">Ridigama</option>
                      <option value="Wariyapola">Wariyapola</option>
                      <option value="Wawathagama">Wawathagama</option>
                      <option value="Yapahuwa">Yapahuwa</option>
                    </>
                  ) : locationFilter === "Puttalam" ? (
                    // Add options for Puttalam
                    <>
                      <option value="Anamaduwa">Anamaduwa</option>
                      <option value="Chilaw">Chilaw</option>
                      <option value="Dankotuwa">Dankotuwa</option>
                      <option value="Kalpitiya">Kalpitiya</option>
                      <option value="Madampe">Madampe</option>
                      <option value="Mahakumbukkadawala">Mahakumbukkadawala</option>
                      <option value="Mundalama">Mundalama</option>
                      <option value="Nattandiya">Nattandiya</option>
                      <option value="Nawagattegama">Nawagattegama</option>
                      <option value="Pallama">Pallama</option>
                      <option value="Puttalam">Puttalam</option>
                      <option value="Vanathavilluwa">Vanathavilluwa</option>
                    </>
                  ) : null
                }
                
              </select>

              <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="">Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing and Fashion">Clothing and Fashion</option>
                <option value="Home and Furniture">Home and Furniture</option>
                <option value="Beauty and Personal Care">Beauty and Personal Care</option>
                <option value="Books, Movies, and Music">Books, Movies, and Music</option>
                <option value="Sports and Outdoors">Sports and Outdoors</option>
                <option value="Toys and Games">Toys and Games</option>
                <option value="Health and Wellness">Health and Wellness</option>
                <option value="Automotive">Automotive</option>
                <option value="Jewelry and Watches">Jewelry and Watches</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Food and Beverages">Food and Beverages</option>
                <option value="Pets">Pets</option>
                <option value="Art and Crafts">Art and Crafts</option>
                <option value="Home Improvement and Tools">Home Improvement and Tools</option>
                <option value="Travel and Luggage">Travel and Luggage</option>
                <option value="Baby and Maternity">Baby and Maternity</option>
                <option value="Gifts and Occasions">Gifts and Occasions</option>
                <option value="Electrical and Lighting">Electrical and Lighting</option>
                <option value="Garden and Outdoor Living">Garden and Outdoor Living</option>
              </select>
            </div>
          </div>
        }
      </div>

      <section class="flex items-center py-20 bg-gray-100 dark:bg-gray-800 lg:w-[92%]">
        <div class="px-4 mx-auto max-w-7xl">
          <div class="grid grid-cols-1 gap-4 lg:gap-6 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredData && filteredData.length
              ? filteredData.map((item) => (
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
      <div className="shop-container">
      </div>
    </div>
  );
}
