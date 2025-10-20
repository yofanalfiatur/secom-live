"use client";

import { useLocale } from "next-intl";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ForgetPasswordForm = () => {
  const locale = useLocale();
  const [formData, setFormData] = useState({
    user: "",
    email: "",
  });

  // DITAMBAHKAN: State untuk menampung pesan error
  const [errors, setErrors] = useState({});

  // DITAMBAHKAN: Fungsi untuk menangani perubahan pada setiap input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hapus error saat pengguna mulai mengetik lagi
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // DITAMBAHKAN: Fungsi untuk validasi dan submit
  const handleSubmit = (fieldType) => {
    const newErrors = {};
    let isValid = true;

    // Validasi berdasarkan field mana yang di-submit
    if (fieldType === "user") {
      if (!formData.user.trim()) {
        newErrors.user =
          locale === "en" ? "Username is required!" : "Username wajib diisi!";
        isValid = false;
      }
    } else if (fieldType === "email") {
      if (!formData.email.trim()) {
        newErrors.email =
          locale === "en" ? "Email is required!" : "Email wajib diisi!";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        // Pengecekan format email sederhana menggunakan regex
        newErrors.email =
          locale === "en"
            ? "Invalid email format!"
            : "Format email tidak valid!";
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      // Jika valid, lanjutkan dengan logika pengiriman (misalnya, panggil API)
      console.log(`Submitting ${fieldType}:`, formData[fieldType]);
      // Di sini Anda akan menambahkan logika untuk mengirim data ke backend
    }
  };

  return (
    <>
      <div className="flex flex-col w-full form__wrap">
        <div className="h-full flex flex-col">
          {/* Username Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="relative overflow-hidden flex flex-col mb-2 lg:mb-6 w-full"
          >
            <p className="text-white font-medium text-[12px] lg:text-base mt-2 lg:mb-2 ml-[2px] tracking-[1px]">
              {locale === "en" ? "Forgot Password?" : "Lupa Password?"}
            </p>
            <div className="flex flex-row">
              <div
                className={`relative flex flex-col rounded-[5px] overflow-hidden w-[68%] lg:w-[80%] form__wrap__input ${
                  errors.user ? "border-red-500" : ""
                }`}
              >
                <input
                  type="text"
                  name="user"
                  id="user"
                  value={formData.user}
                  onChange={handleChange} // DITAMBAHKAN: Handler untuk input
                  className={`peer pb-2 px-3 pt-[20px] lg:pb-3 lg:px-4 lg:pt-[32px] text-navyblue text-[12px] lg:text-xl rounded-[3px] bg-white m-[3px] focus:outline-none`}
                />
                <label
                  htmlFor="user" // DIPERBAIKI: Sesuaikan dengan id input
                  className={`text-navyblue text-[12px] lg:text-xl tracking-[2px] absolute top-1/2 transform -translate-y-1/2 pointer-events-none left-[18px] peer-focus:text-[8px] lg:peer-focus:text-[10px] peer-focus:top-[15px] lg:peer-focus:top-[23px] transition-all duration-200 ease-in-out ${
                    formData.user
                      ? "!text-[8px] lg:!text-[10px] top-[15px] lg:top-[23px]"
                      : ""
                  }`}
                >
                  {locale === "en" ? "USERNAME" : "USERNAME"}
                </label>
              </div>
              <button
                onClick={() => handleSubmit("user")} // DITAMBAHKAN: Handler untuk tombol
                className="bg-tosca w-[30%] lg:w-[20%] cursor-pointer m-[3px] text-white text-sm lg:text-xl px-4 py-3 lg:px-5 lg:py-3.5 rounded-[5px] tracking-[3px] leading-none uppercase hover:bg-teal-600 transition-colors"
              >
                {locale === "en" ? "SEND" : "KIRIM"}
              </button>
            </div>
            {/* DITAMBAHKAN: Tampilan pesan error */}
            {errors.user && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-xs mt-2 ml-1 bg-[#ff4444b9] max-w-max px-2"
              >
                {errors.user}
              </motion.p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="relative overflow-hidden flex flex-col mb-2 lg:mb-6 w-full"
          >
            <p className="text-white font-medium text-[12px] lg:text-base mt-2 lg:mb-2 ml-[2px] tracking-[1px]">
              {locale === "en" ? "Forgot Username?" : "Lupa Username?"}
            </p>
            <div className="flex flex-row">
              <div
                className={`relative flex flex-col rounded-[5px] overflow-hidden w-[68%] lg:w-[80%] form__wrap__input ${
                  errors.email ? "border-red-500" : ""
                }`}
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange} // DITAMBAHKAN: Handler untuk input
                  className={`peer pb-2 px-3 pt-[20px] lg:pb-3 lg:px-4 lg:pt-[32px] text-navyblue text-[12px] lg:text-xl rounded-[3px] bg-white m-[3px] focus:outline-none`}
                />
                <label
                  htmlFor="email" // DIPERBAIKI: Sesuaikan dengan id input
                  className={`text-navyblue text-[12px] lg:text-xl tracking-[2px] absolute top-1/2 transform -translate-y-1/2 pointer-events-none left-[18px] peer-focus:text-[8px] lg:peer-focus:text-[10px] peer-focus:top-[15px] lg:peer-focus:top-[23px] transition-all duration-200 ease-in-out ${
                    formData.email
                      ? "!text-[8px] lg:!text-[10px] top-[15px] lg:top-[23px]"
                      : ""
                  }`}
                >
                  {locale === "en" ? "EMAIL" : "EMAIL"}
                </label>
              </div>
              <button
                onClick={() => handleSubmit("email")} // DITAMBAHKAN: Handler untuk tombol
                className="bg-tosca w-[30%] lg:w-[20%] cursor-pointer m-[3px] text-white text-sm lg:text-xl px-4 py-3 lg:px-5 lg:py-3.5 rounded-[5px] tracking-[3px] leading-none uppercase hover:bg-teal-600 transition-colors"
              >
                {locale === "en" ? "SEND" : "KIRIM"}
              </button>
            </div>
            {/* DITAMBAHKAN: Tampilan pesan error */}
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-xs mt-2 ml-1 bg-[#ff4444b9] max-w-max px-2"
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordForm;
