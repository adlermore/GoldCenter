"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { JsonContext } from "@/context/jsonContext";
import ReactSelect from "react-select";
import InputMask from "react-input-mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema } from "@/validation/quoteSchema";
import request from "@/utils/hooks/request";

function QuoteForm() {

  //dynamic Option Data
  const [serviceDateOptions, setServiceDateOption] = useState([]);
  const [serviceOptions, setServiceOption] = useState([]);

  //Context Connection
  const { activeService } = useContext(JsonContext);
  const [disabledBtn, setDisabledBtn] = useState(false);

  //validation init
  const { register: quoteForm, reset, setError, handleSubmit: handleSubmitForm, control, formState: { errors: errorsQuote } } = useForm({
    resolver: zodResolver(quoteSchema)
  });

  //sumbition Data
  const quoteSubmit = async (dataForm) => {

    setDisabledBtn(true);
    // const selectedServices = dataForm.services?.map(option => option.value);
    // const selectedServicesDate = dataForm.serviceDate?.value;

    const newData = {
      ...dataForm,
      register_by : 'email'
      // services: selectedServices,
      // serviceDate: selectedServicesDate,
      // service_timeframe_id: selectedServicesDate
    }

    request('https://black.dev.itfabers.com/api' + '/v2/auth/signup', 'POST', newData)
      .then((res) => {
        if (res) {
          reset()
          document.body.classList.remove("quote_opened");
          document.body.style.overflowY = "scroll";
          setDisabledBtn(false);
          document.body.style.overflow = "hidden";
          document.body.classList.add("success_opened");
        } else {
          if (res.errors) {
            Object.keys(res.errors).forEach(key => {
              const errorMessage = res.errors[key][0];
              setError(key, { message: errorMessage });
              setDisabledBtn(false);
            })
          }
        }
      })
  };

  return (
    <form onSubmit={handleSubmitForm(quoteSubmit)} className="w-full">
      <div className={errorsQuote?.name ? "form_block has_error" : "form_block"}>
        <div className="quoteForm_label text-base font-semibold mb-[5px]">
          Full Name <span className="text-sm font-regular">(required)</span>
        </div>
        <input
          placeholder="Enter full name"
          autoComplete="on"
          className="form-control"
          name="name"
          {...quoteForm("name", { required: true, minLength: 5 })}
        />
        <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
          {errorsQuote?.name?.message}
        </p>
      </div>
      <div className={errorsQuote?.email ? "form_block has_error" : "form_block"}  >
        <div className="quoteForm_label text-base font-semibold mb-[5px]">
          Email Name <span className="text-sm font-regular">(required)</span>
        </div>
        <input
          placeholder="Enter your email address"
          autoComplete="on"
          className="form-control"
          name="email"
          {...quoteForm("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        <p className="form_error form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
          {errorsQuote?.email?.message}
        </p>
      </div>
      <div className={errorsQuote?.password ? "form_block has_error" : "form_block"}>
        <div className="quoteForm_label text-base font-semibold mb-[5px]">
          PassWord <span className="text-sm font-regular">(required)</span>
        </div>
        <input
          placeholder="Enter full name"
          autoComplete="on"
          className="form-control"
          name="password"
          type="password"
          {...quoteForm("password", { required: true, minLength: 5 })}
        />
        <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
          {errorsQuote?.password?.message}
        </p>
      </div>
      {/* <div className="grid grid-cols-2 gap-20 horizontal-row laptop:gap-0 laptop:grid-cols-1">    
        <div
          className={errorsQuote.phone ? "form_block has_error" : "form_block"}
        >
          <div className="quoteForm_label text-base font-semibold mb-[5px]">
            Phone Number{" "}
            <span className="text-sm font-regular">(required)</span>
          </div>
          <InputMask
            {...quoteForm("phone", { required: true })}
            mask="(999)-999-9999"
            placeholder="Enter your phone number"
            type="tel"
            autoComplete="on"
            className="form-control"
            defaultValue={''}
          />
          <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
            {errorsQuote?.phone?.message}
          </p>
        </div>
      </div> */}
      {/* <div className="grid grid-cols-2 gap-20 horizontal-row laptop:gap-0 laptop:grid-cols-1">
        <div className={errorsQuote?.vehicle_year ? "form_block has_error" : "form_block"} >
          <div className="quoteForm_label text-base font-semibold mb-[5px]">
            Vehicle Year{" "}
            <span className="text-sm font-regular">(required)</span>
          </div>
          <input
            placeholder="Enter your vehicle year"
            autoComplete="on"
            className="form-control"
            type="number"
            name="vehicle_year"
            {...quoteForm("vehicle_year", { required: true })}
          />
          <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
            {errorsQuote?.vehicle_year?.message}
          </p>
        </div>
        <div className={errorsQuote?.vehicle_make_or_model ? "form_block has_error" : "form_block"}>
          <div className="quoteForm_label text-base font-semibold mb-[5px]">
            Vehicle Make or Model{" "}
            <span className="text-sm font-regular">(required)</span>
          </div>
          <input
            placeholder="Enter your vehicle make and model"
            autoComplete="on"
            className="form-control"
            name="vehicle_make_or_model"
            {...quoteForm("vehicle_make_or_model", { required: true })}
          />
          <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
            This field is required
          </p>
        </div>
      </div> */}
      {/* {serviceOptions.length > 0 ? (
        <div
          className={
            errorsQuote?.services?.message ? "form_block sellect_section has_error" : "form_block"}
        >
          <div className="quoteForm_label text-base font-semibold mb-[5px]">
            Choose the service you prefer{" "}
            <span className="text-sm font-regular">(required)</span>
          </div>
          <Controller
            name="services"
            control={control}
            defaultValue={activeService && [serviceOptions.find(option => option.value === activeService)]}
            rules={{
              required: serviceOptions.find(option => option.value === activeService)
                ? false
                : "Select one or more here...",
            }}
            render={({ field }) => (
              <ReactSelect
                isMulti
                className="register_sellect"
                options={serviceOptions}
                placeholder="Select one or more here..."
                {...field}
              />
            )}
          />
          <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
            This field is required
          </p>
        </div>
      ) : (
        <div className="form_block">
          <div className="quoteForm_label text-base font-semibold mb-[5px]">
            Choose the service you prefer{" "}
            <span className="text-sm font-regular">(required)</span>
          </div>
          <input
            className="form-control !pl-[20px] opacity-40"
            placeholder="Select one or more here"
          />
        </div>
      )} */}
      {/* <div
        className={errorsQuote?.serviceDate?.message ? "form_block sellect_section has_error" : "form_block"} >
        <div className="quoteForm_label text-base font-semibold mb-[5px]">
          How soon do you need service?{" "}
          <span className="text-sm font-regular">(required)</span>
        </div>
        <Controller
          name="serviceDate"
          control={control}
          rules={{
            required: "Select one here...e",
          }}
          render={({ field }) => (
            <ReactSelect
              instanceId
              className="register_sellect"
              options={serviceDateOptions}
              placeholder="Select one here..."
              {...field}
            />
          )}
        />
        <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
          This field is required
        </p>
      </div> */}
      <button
        type="submit"
        className={
          disabledBtn
            ? " !opacity-50 pointer-events-none [&>svg]:opacity-100 relative submit_btn h-[40px] w-full max-w-[348px] bg-[#0071DC] text-base font-semibold text-white duration-300 hover:opacity-70 mx-auto justify-center flex items-center"
            : " relative [&>svg]:opacity-0 submit_btn h-[40px] w-full max-w-[348px] bg-siteCrem text-base font-semibold text-white duration-300 hover:opacity-70 mx-auto justify-center flex items-center"
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
        {disabledBtn ? "Registration ..." : " Registration"}
      </button>
    </form>
  );
}

export default QuoteForm;
