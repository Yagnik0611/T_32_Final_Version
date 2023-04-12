import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
  } from "@material-tailwind/react";
  import { useCallback } from "react";
  import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { authorsTableData, projectsTableData } from "@/data";
  
  export function ViewBookings() {
    const [feedbacks,setFeedBacks]= useState("")
    const [bookingData, setBookingData] = useState([]);
    const userId = localStorage.getItem("userId");
    const [selectedBooking, setSelectedBooking] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleViewClick = (data) => {
      console.log(data);
      setSelectedBooking(data);
      setShowModal(true);
    };
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(
            `http://localhost:3000/park/bookings}`,
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
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
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
                    {["user","park_name", "facility", "booking_date"].map((el) => (
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
                    ({ user,park_name, facility, booking_date }, key) => {
                      const className = `py-3 px-5 ${
                        key === bookingData.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={key}>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {user}
                            </Typography>
                          </td>
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
      </div>
    );
  }
  
  export default ViewBookings;
  