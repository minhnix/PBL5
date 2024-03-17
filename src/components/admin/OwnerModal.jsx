/* eslint-disable no-useless-escape */
import axios from "axios";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const OwnerModal = ({ setModal, type, ownerId }) => {
  let [owner, setOwner] = useState({});
  let [phoneError, setPhoneError] = useState("");
  let [nameError, setNameError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [addressError, setAddressError] = useState("");
  let [responseMessage, setResponseMessage] = useState("");
  useEffect(() => {
    type != "Create" &&
      axios
        .get(`http://localhost:3000/api/owners/${ownerId}`)
        .then((response) => {
          setOwner(response.data.data.owner[0]);
        });
  }, [ownerId]);

  function handleChange(e) {
    e.target.name == "phone" && setPhoneError("");
    e.target.name == "email" && setEmailError("");
    e.target.name == "address" && setAddressError("");
    e.target.name == "name" && setNameError("");
    setResponseMessage("");
    setOwner({ ...owner, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    type == "Create" && handleCreate();
    type == "Update" && handleUpdate();
  }
  function handleCreate() {
    let validate = handleValidate();

    validate &&
      axios.post(`http://localhost:3000/api/owners`, owner).then((response) => {
        setResponseMessage(response.data.status);
      });
  }
  function handleUpdate() {
    let validate = handleValidate();

    validate &&
      axios
        .patch(`http://localhost:3000/api/owners/${ownerId}`, owner)
        .then((response) => {
          setResponseMessage(response.data.status);
        });
  }
  function handleValidate() {
    let validate = true;
    let phoneExp =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const emailExp =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!phoneExp.test(owner.phone)) {
      setPhoneError("Phone number invalid");
      validate = false;
    }
    if (!owner.name || !owner.name.trim()) {
      setNameError("Name cannot be empty");
      validate = false;
    }
    if (!owner.email || !owner.email.trim().toLowerCase().match(emailExp)) {
      setEmailError("Email invalid");
      validate = false;
    }
    if (!owner.address || !owner.address.trim()) {
      setNameError("Address cannot be empty");
      validate = false;
    }
    return validate;
  }
  return (
    <div
      onClick={() => {
        // setModal(false);
      }}
      className="fixed bg-[rgba(0,0,0,0.05)]  top-0 left-0 right-0 bottom-0  z-50 flex items-center justify-center"
    >
      <form
        onClick={(e) => {
          e.preventDefault();
        }}
        className="w-[400px] px-6 py-5 flex flex-col  rounded border bg-white "
      >
        <div className="flex justify-between items-start ">
          <span className="text-black text-base font-semibold ">
            {type} owner
          </span>
          <div
            onClick={() => {
              setModal((pre) => {
                return !pre;
              });
            }}
            className="w-6 h-6 hover:bg-[#0000000f] flex items-center justify-center rounded cursor-pointer"
          >
            <i className="text-xl text-[#fffffff] bx bx-x"></i>
          </div>
        </div>
        <span
          className={`mb-1 text-[14px] text-success-color ${
            responseMessage ? "visible" : "invisible"
          }`}
        >
          {type} owner success!
        </span>

        <div className="w-full flex flex-col">
          <label
            className="text-[14px] text-black pb-2 flex items-center"
            htmlFor=""
          >
            <span className="text-[red] mr-1">*</span>
            <span>Name</span>
          </label>
          <input
            className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${
              nameError
                ? "focus:border-border-error-color border-border-error-color"
                : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
            }`}
            type="text"
            name="name"
            placeholder="Name"
            readOnly={type == "View" ? true : false}
            value={owner?.name || ""}
            onChange={handleChange}
          />
          <span
            className={`${
              nameError ? "visible" : "invisible"
            } text-sm text-error-color`}
          >
            {nameError}.
          </span>
        </div>
        <div className="w-full flex flex-col">
          <label
            className="text-[14px] text-black pb-2 flex items-center"
            htmlFor=""
          >
            <span className="text-[red] mr-1">*</span>
            <span>Phone</span>
          </label>
          <input
            className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${
              phoneError
                ? "focus:border-border-error-color border-border-error-color"
                : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
            }`}
            type="text"
            name="phone"
            readOnly={type == "View" ? true : false}
            value={owner?.phone || ""}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Phone"
          />
          <span
            className={`${
              phoneError ? "visible" : "invisible"
            } text-sm text-error-color`}
          >
            {phoneError}.
          </span>
        </div>
        <div className="w-full flex flex-col">
          <label
            className="text-[14px] text-black pb-2 flex items-center"
            htmlFor=""
          >
            <span className="text-[red] mr-1">*</span>
            <span>Email</span>
          </label>
          <input
            className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${
              emailError
                ? "focus:border-border-error-color border-border-error-color"
                : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
            }`}
            type="text"
            name="email"
            readOnly={type == "View" ? true : false}
            onChange={(e) => {
              handleChange(e);
            }}
            value={owner?.email || ""}
            placeholder="Email"
          />
          <span
            className={`${
              emailError ? "visible" : "invisible"
            } text-sm text-error-color`}
          >
            {emailError}.
          </span>
        </div>
        <div className="w-full flex flex-col">
          <label
            className="text-[14px] text-black pb-2 flex items-center"
            htmlFor=""
          >
            <span className="text-[red] mr-1">*</span>
            <span>Address</span>
          </label>
          <input
            className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${
              addressError
                ? "focus:border-border-error-color border-border-error-color"
                : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
            }`}
            type="text"
            name="address"
            readOnly={type == "View" ? true : false}
            placeholder="Address"
            onChange={(e) => {
              handleChange(e);
            }}
            value={owner?.address || ""}
          />
          <span
            className={`${
              addressError ? "visible" : "invisible"
            } text-sm text-error-color`}
          >
            {addressError}.
          </span>
        </div>
        <div className="mt-3 flex justify-end items-center gap-2">
          {type != "View" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModal(false);
                }}
                className="px-[15px] py-1 text-sm rounded hover:border-primary-color hover:text-primary-color border transition-all delay-75"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-[15px] py-1 text-sm rounded text-white bg-primary-color hover:opacity-80 transition-all delay-75"
              >
                Save
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default OwnerModal;
