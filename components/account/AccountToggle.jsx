"use client";

import { JsonContext } from "@/context/jsonContext";
import IconUser from "@/public/icons/IconUser";
import { setAuthenticated } from "@/redux/authSlice";
import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import React, { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AccountToggle() {
  const { setActivePopup } = useContext(JsonContext);

	const [dropActive, setDropActive] = useState(false);
  const ref = useRef();

  // Get the authentication status from Redux
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user); // Optional: user data
  const dispatch = useDispatch();

  //Login Popup Open
  const loginPopupOpen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setActivePopup("login");
    setTimeout(() => {
      document.body.classList.add("login_opened");
      // document.body.style.overflow = "hidden";
    }, 100);
  };

  //Registr Popup Open
  const registerPopupOpen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setActivePopup("register");
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;

    setTimeout(() => {
      document.body.classList.add("register_opened");
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = scrollBarWidth + "px";
    }, 100);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear authentication
    dispatch(setAuthenticated(false));
    localStorage.removeItem("access_token"); // Clear token if stored
    // Optional: Add other logout processes
  };

	const dropToggle = () => {
    setDropActive(!dropActive);
  };

  useOnClickOutside(ref, () => {
    if (dropActive) {
      setDropActive(false);
    }
  });

  return (
    <div className="account_toggle flex justify-center items-center">
      <div className={`${dropActive && "drop_opened"} account_drop`}>
        <div className="drop_btn cursor-pointer" onClick={dropToggle} ref={ref}>
          <IconUser className="text-white [&>path]:fill-white" />
        </div>
        {isAuth ? (
          <div className="drop_ist" >
            <div>
						{`Hi ${user?.name || "User"}`}
            </div>
						<div>My Account</div>
						<div>Order History</div>
            <div onClick={handleLogout}> LogOut </div>
          </div>
        ) : (
          <div className="drop_ist">
            <a
              href="/"
              className="text-base laptopHorizontal:text-sm mobile:whitespace-nowrap mobile:px-8  uppercase flex mobile:text-xs bg-white px-16 laptopHorizontal:px-10 items-center  text-black h-40  font-semibold "
              onClick={(e) => registerPopupOpen(e)}
            >
              Registration
            </a>
            <a
              href="/"
              className="text-base laptopHorizontal:text-sm mobile:whitespace-nowrap mobile:px-8  uppercase flex mobile:text-xs bg-white px-16 laptopHorizontal:px-10 items-center  text-black h-40  font-semibold "
              onClick={(e) => loginPopupOpen(e)}
            >
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountToggle;
