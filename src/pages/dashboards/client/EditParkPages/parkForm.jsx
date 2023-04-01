import React, { useRef, useState } from "react";

function ParkForm({ onSubmitSuccess }) {
  const [dragging, setDragging] = useState({});
  const [files, setFiles] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const [parkData, setParkData] = useState({
    parkClientOwner: "",
    parkName: "",
    parkLocation: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setParkData({ ...parkData, [name]: value });
  };

  const handleReset = () => {
    setParkData({
      parkClientOwner: "",
      parkName: "",
      parkLocation: "",
      email: "",
      phone: "",
    });
    setFiles([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all inputs are valid
    const allInputsValid = Object.keys(parkData).every(
      (name) => !validateInput(name)
    );

    // Only show the alert if all inputs are valid
    if (allInputsValid) {
      window.alert("Please wait 5 to 7 business days to complete this process");
      console.log(parkData);
      console.log(files);
      const formData = new FormData();
      formData.append("email", parkData.email);
      formData.append("name", parkData.parkName);
      formData.append("location", parkData.parkLocation);
      formData.append("Client_id", parkData.parkClientOwner);

      Object.entries(files).forEach(([name, data]) => {
        formData.append(name, data);
      });

      if (onSubmitSuccess) {
        onSubmitSuccess(); // Close the ParkFormModal after successful submission
      }
    } else {
      console.warn("Some inputs are invalid. Please check and try again.");
    }
  };

  const handleDragOver = (section) => (event) => {
    event.preventDefault();
    if (!dragging[section]) {
      setDragging((prev) => ({
        ...prev,
        [section]: true,
      }));
    }
  };

  const handleDragLeave = (section) => (event) => {
    event.preventDefault();
    setDragging((prev) => ({
      ...prev,
      [section]: false,
    }));
  };

  const handleDrop = (section) => (event) => {
    event.preventDefault();
    setDragging((prev) => ({
      ...prev,
      [section]: false,
    }));

    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => ({
      ...prevFiles,
      [section]: [...(prevFiles[section] || []), ...droppedFiles],
    }));
  };

  const createDropHandler = (section) => (event) => {
    event.preventDefault();

    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => ({
      ...prevFiles,
      [section]: [...(prevFiles[section] || []), ...droppedFiles],
    }));

    // Reset the dragging state for the current section
    setDragging((prev) => ({
      ...prev,
      [section]: false,
    }));
  };

  const sections = [
    "Land title/deed",
    "Purchase agreement",
    "Zoning by laws",
    "Building permits",
  ];

  const fileInputRef = useRef();

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const validateInput = (name) => {
    switch (name) {
      case "email":
        return parkData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ? ""
          : "Invalid email address";
      case "phone":
        return parkData.phone.match(
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
        )
          ? ""
          : "Invalid phone number";
      default:
        return parkData[name].length > 0 ? "" : "This field is required";
    }
  };

  const renderInputError = (name) => {
    const errorMessage = validateInput(name);
    return errorMessage ? (
      <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
    ) : null;
  };

  return (
    <div className="flex items-center justify-center ">
      {isVisible && (
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="  space-y-6 rounded-lg bg-white p-4 shadow-md"
        >
          <h1 className="mb-6 text-center text-2xl font-semibold">
            Park Information
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Park Client Owner",
                name: "parkClientOwner",
                type: "text",
              },
              { label: "Park Name", name: "parkName", type: "text" },
              { label: "Park Location", name: "parkLocation", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "tel" },
            ].map(({ label, name, type }) => (
              <div key={name} className="block">
                <label class="mb-3 block text-base font-medium ">
                  {label}:
                </label>
                <input
                  type={type}
                  name={name}
                  value={parkData[name]}
                  onChange={handleInputChange}
                  className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {sections.map((section, index) => (
              <div key={section} className="mb-4 rounded-md border">
                <div className="w-full rounded-md bg-gray-200 p-2 text-left font-bold">
                  {section}
                </div>
                <div className="p-4">
                  <div
                    onDragOver={handleDragOver(section)}
                    onDragLeave={handleDragLeave(section)}
                    onDrop={createDropHandler(section)}
                    className={`rounded-md border-2 border-dashed p-4 ${
                      dragging[section]
                        ? "border-indigo-300"
                        : "border-gray-300"
                    }`}
                  >
                    <p className="text-center">
                      {files[section] && files[section].length > 0 ? (
                        <ul className="list-inside list-disc">
                          {files[section].map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      ) : (
                        "Drag and drop files here or click to select"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            {" "}
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
            <button
              type="reset"
              className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ParkForm;
