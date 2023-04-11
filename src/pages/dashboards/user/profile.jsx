import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import React, { Component } from "react";
import { useCallback } from "react";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";

export function Profile() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("../settings");
    console.log("hello");
  }
  const [showModal, setShowModal] = useState(false);

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setUserEmail] = useState("");
  const [gender, setgender] = useState("");
  const [selectedBooking, setSelectedBooking] = useState({});
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [province, setprovince] = useState("");
  const [zip_code, setzip_code] = useState("");
  const [response, setResponse] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [showBooking, setShowBooking] = useState("");
  const [profileImg, setprofileImg] = useState(null);
  const [about_me, setabout_me] = useState("");
  const onhandleClose = () => setShowBooking(false);
  const [bookingData, setBookingData] = useState([]);
  const userId = localStorage.getItem("userId");

  const handleViewClick = (data) => {
    console.log(data);
    setSelectedBooking(data);
    setShowModal(true);
  };
  const fetchData = async () => {
    try {
      fetch(`http://localhost:3000/user/profile/image/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          const profileImg = URL.createObjectURL(blob);
          setprofileImg(profileImg);
          console.log(profileImg);
          // Use the image URL here
        })
        .catch((error) => {
          console.error(`An error occurred: ${error}`);
        });
    } catch (err) {
      console.log(err.message);
    }
    try {
      const res = await fetch(`http://localhost:3000/user/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "GET",
        mode: "cors",
      });
      if (res.status != 200) {
        setTimeOut("true");

        {
          setTimeout(() => {
            Swal.fire({
              title: "Time out ",
              text: "Login Time Out ! Login Again",
              icon: "error",
              confirmButtonText: "ok",
            });
            navigate("../../auth/sign-up")("true")("false");
          }, 1);
        }
      }
      const resp = await res.json();
      console.log(resp);

      const {
        first_name,
        last_name,
        gender,
        email,
        address,
        city,
        country,
        province,
        zip_code,
        about_me,
      } = resp;
      setfirst_name(first_name);
      setlast_name(last_name);
      setgender(gender);
      setUserEmail(email);
      setaddress(address);
      setcity(city);
      setcountry(country);
      setprovince(province);
      setzip_code(zip_code);
      setabout_me(about_me);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3000/park/bookings/${userId}`,
          {
            method: "GET",
            mode: "cors",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBookingData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  const callback = useCallback(() => fetchData(), [userId]);

  useEffect(() => {
    callback();
  }, [callback]);
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                <div className="relative">
                  {profileImg ? (
                    <img
                      class="h-36 w-36 rounded-full"
                      src={profileImg}
                      // src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                     
                    />
                  ) : (
                    <img
                      class="h-36 w-36 rounded-full"
                     
                     
                    />
                  )}
                </div>
              </div>
              <div className="w-full px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right">
                <div className="mt-32 py-6 px-3 sm:mt-0">
                  <button
                    className="mb-1 rounded bg-pink-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600 sm:mr-2"
                    type="button"
                    onClick={handleClick}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="w-full px-4 lg:order-1 lg:w-4/12">
                <div className="flex justify-center py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                      22
                    </span>
                    <span className="text-blueGray-400 text-sm">Friends</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                      10
                    </span>
                    <span className="text-blueGray-400 text-sm">Photos</span>
                  </div>
                  <div className="p-3 text-center lg:mr-4">
                    <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                      89
                    </span>
                    <span className="text-blueGray-400 text-sm">Comments</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-blueGray-700 mb-2 mb-2 text-4xl font-semibold capitalize leading-normal">
                {first_name + " " + last_name}
              </h3>
              {address && city && province ? (
                <div className="text-blueGray-400 mt-0 mb-2 text-sm font-bold uppercase leading-normal">
                  <h6>
                    {" "}
                    <i className="fas fa-map-marker-alt text-blueGray-400 mr-2 text-lg"></i>
                    {address + ", " + city + ", "}
                  </h6>
                  {province + ", " + zip_code + ", " + country}
                </div>
              ) : (
                <p>...</p>
              )}

              <div className="text-blueGray-600 mb-2 mt-10 uppercase underline">
                <i className="fas fa-briefcase text-blueGray-400 mr-2 text-lg"></i>
                {email}
              </div>
              <div className="text-blueGray-600 mb-2">
                <i className="fas fa-university text-blueGray-400 mr-2 text-lg"></i>
                University of Computer Science
              </div>
            </div>
            <div className="border-blueGray-200 mt-10 border-t py-10 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 lg:w-9/12">
                  {about_me ? (
                    <p className="text-blueGray-700 mb-4 text-lg leading-relaxed">
                      {about_me}
                    </p>
                  ) : (
                    <p>Hello my name is {first_name + " " + last_name}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                All Bookings
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["park_name", "facility", "booking_date"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingData.map(
                    ({ park_name, facility, booking_date }, key) => {
                      const className = `py-3 px-5 ${
                        key === bookingData.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={key}>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {park_name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {facility}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {new Date(booking_date).toLocaleString()}
                            </Typography>
                          </td>
                          <td className={className}>
                            <button
                              className="mt-1 ml-3 rounded-md bg-green-600 py-1 px-3 text-white hover:bg-green-700 focus:outline-none"
                              onClick={() => handleViewClick(bookingData[key])}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
          </Card>
          {showModal && (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
        <div className="py-4 px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {selectedBooking.user}
            </h3>
            <button
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M13.414 12l5.293-5.293a1 1 0 00-1.414-1.414L12 10.586 6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12z" />
              </svg>
            </button>
          </div>
          <div className="text-sm text-gray-500 mb-4">
            {selectedBooking.facility && (
              <p>
                Facility Name: <span className="font-medium">{selectedBooking.facility}</span>
              </p>
            )}
            {selectedBooking.park_name && (
              <p>
                Park Name: <span className="font-medium">{selectedBooking.park_name}</span>
              </p>
            )}
            {selectedBooking.number_of_guests && (
              <p>
                Guests: <span className="font-medium">{selectedBooking.number_of_guests}</span>
              </p>
            )}
            {selectedBooking.start_time && selectedBooking.end_time && (
              <p>
                Duration:{" "}
                <span className="font-medium">{selectedBooking.start_time} - {selectedBooking.end_time}</span>
              </p>
            )}
            {selectedBooking.equipment && selectedBooking.equipment.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-900">Equipments:</h4>
                <ul className="list-disc pl-5">
                  {selectedBooking.equipment.map((item, index) => (
                    <li key={index} className="text-sm text-gray-500">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowModal(false)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Close
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
