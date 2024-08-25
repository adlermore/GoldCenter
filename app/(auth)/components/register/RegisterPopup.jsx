'use client';

import React, { useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { JsonContext } from '@/context/jsonContext';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validation/registerSchema";
import { register } from '@/redux/authSlice';
import useOnClickOutside from '@/utils/hooks/useOnClickOutside';
import IconClose from '@/public/icons/IconClose.jsx';
import InputMask from "react-input-mask";


function RegisterPopup() {

  const ref = useRef();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.auth);

  //Close Popup after outside click
  useOnClickOutside(ref, () => {
    if (document.body.classList.contains("register_opened")) {
      closeRegister()
    }
  });

  const closeRegister = () => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.body.classList.remove("register_opened");
    const fixedElements = document.querySelectorAll('.fixed-element');
    fixedElements.forEach(el => {
      el.style.paddingRight = "";
    });
  }

  //validation init
  const { register: registerForm, reset, setError, handleSubmit: handleSubmitForm, formState: { errors: errorsRegister } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  //sumbition Data
  const registerSubmit = async (dataForm) => {

    // setDisabledBtn(true);
    const newData = {
      ...dataForm,
      // password_confirmation: dataForm.password,
    }
    dispatch(register(newData));
    reset()
  };

  return (
    <div className="register_popup fixed left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center  transition-[top] top-0 opacity-0 w-full h-full z-[999] overflow-x-hidden overflow-y-auto bg-black bg-opacity-20 tablet:!p-20 tablet:h-[100dvh]">
      <div className="popup_container mobile:h-full mobile:overflow-x-hidden mobile:overflow-y-auto bg-[#F8F6F5] relative px-[60px] pt-[40px] pb-[30px] w-full max-w-[550px] z-30 mx-auto" ref={ref}>
        <div className="title_line w-full gap-10">
          <div className="popup_title text-[25px] uppercase">Create account</div>
          <div className='mt-[20px] text-[17px]'>Sign in to view your order history an update your details</div>
          <a
            href="/#"
            className="popup_close absolute right-[20px] top-[20px] cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              closeRegister();
            }}
          >
            <IconClose />
          </a>
        </div>
        <div className="register_form mt-[30px]">
          <form onSubmit={handleSubmitForm(registerSubmit)} className="w-full">
            <div className={errorsRegister?.name ? "form_block has_error" : "form_block"}>
              <div className="registerForm_label text-base font-light mb-[10px]">
                Full Name
              </div>
              <input
                placeholder="Enter full name"
                autoComplete="on"
                className="form-control"
                name="name"
                {...registerForm("name", { required: true, minLength: 5 })}
              />
              <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                {errorsRegister?.name?.message}
              </p>
            </div>
            <div className='grid grid-cols-2 gap-[30px]'>
              <div className={errorsRegister?.email ? "form_block has_error" : "form_block"}  >
                <div className="registerForm_label text-base font-light mb-[5px]">
                  Email
                </div>
                <input
                  placeholder="Enter your email address"
                  autoComplete="on"
                  className="form-control"
                  name="email"
                  {...registerForm("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                <p className="form_error form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                  {errorsRegister?.email?.message}
                </p>
              </div>
              <div
                className={errorsRegister.phone ? "form_block has_error" : "form_block"}
              >
                <div className="quoteForm_label text-base font-light mb-[5px]">
                  Phone
                </div>
                <InputMask
                  {...registerForm("phone", { required: true })}
                  mask="(999)-999-9999"
                  placeholder="Enter your password"
                  type="tel"
                  autoComplete="on"
                  className="form-control"
                  defaultValue={''}
                />
                <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                  {errorsRegister?.phone?.message}
                </p>
              </div>
            </div>
            <div className={errorsRegister?.password ? "form_block has_error" : "form_block"}>
              <div className="registerForm_label text-base font-light mb-[5px]">
                Password
              </div>
              <input
                placeholder="Enter full name"
                autoComplete="on"
                className="form-control"
                name="password"
                type="password"
                {...registerForm("password", { required: true, minLength: 5 })}
              />
              <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                {errorsRegister?.password?.message}
              </p>
            </div>
            <div className={errorsRegister?.password_confirmation ? "form_block has_error" : "form_block"}>
              <div className="registerForm_label text-base font-light mb-[5px]">
                Confirm Password
              </div>
              <input
                placeholder="Confirm your password"
                autoComplete="on"
                className="form-control"
                name="password_confirmation"
                type="password"
                {...registerForm("password_confirmation", { required: true, minLength: 5 })}
              />
              <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                {errorsRegister?.password_confirmation?.message}
              </p>
            </div>
            <button
              type="submit"
              className={
                status === 'loading'
                  ? " mt-[35px] !opacity-50 pointer-events-none [&>svg]:opacity-100 relative submit_btn h-[40px] w-full bg-[#0071DC] text-base font-semibold text-white duration-300 hover:opacity-70 mx-auto justify-center flex items-center"
                  : " mt-[35px] relative [&>svg]:opacity-0 submit_btn h-[40px] w-full bg-siteCrem text-base font-semibold text-white duration-300 hover:opacity-70 mx-auto justify-center flex items-center"
              }
            >
              <svg
                aria-hidden="true"
                role="status"
                className="absolute left-[calc(50%-60px)] inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                ></path>
              </svg>
              {status === 'loading' ? "Registration ..." : " Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPopup;