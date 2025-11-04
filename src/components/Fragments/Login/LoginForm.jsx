"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";

const LoginForm = () => {
  const locale = useLocale();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Helper function to read cookie
  const readCookie = (name) => {
    if (typeof window === "undefined") return ""; // Guard clause for SSR
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return "";
  };

  // Check for saved login

  useEffect(() => {
    const savedLogin = readCookie("login");
    if (savedLogin) {
      setFormData((prev) => ({ ...prev, login: savedLogin }));
      setRememberMe(true);
    }
  }, []);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.login) {
      newErrors.login =
        locale === "en"
          ? "Username/Email is required!"
          : "Username/Email wajib diisi!";
    }
    if (!formData.password) {
      newErrors.password =
        locale === "en" ? "Password is required!" : "Kata sandi wajib diisi!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    if (!validateForm()) {
      e.preventDefault(); // Prevent form submission
      setIsLoading(false); // Reset loading state
    } else {
      setIsLoading(true);
      // Logika `doLoginTimeChecks()` sudah di-handle oleh hidden input di bawah.
      // Form akan disubmit secara alami ke action URL.
      // Tidak perlu `e.preventDefault()` jika validasi berhasil agar form bisa disubmit.
    }
  };

  return (
    <div className="w-full lg:p-8 form__wrap">
      {/* form action
       */}
      <form
        action="https://www.secomsmart.com/login.asp"
        method="POST"
        name="loginForm"
        id="loginForm"
        onSubmit={handleSubmit}
      >
        {/* Hidden inputs dari script client */}
        <input type="hidden" name="JavaScriptTest" value="1" />
        <input type="hidden" name="cookieTest" value="1" />
        <input
          type="hidden"
          name="loginFolder"
          value="https://secom.co.id/login"
        />

        <div className="h-full flex flex-col">
          {/* Username/Email Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="relative overflow-hidden flex flex-col mb-2 lg:mb-6 "
          >
            <div
              className={`relative flex flex-col rounded-[5px] overflow-hidden form__wrap__input ${
                errors.email ? "border-red-500" : ""
              }`}
            >
              <input
                type="text"
                name="login"
                id="login"
                value={formData.login}
                onChange={handleChange}
                className={`peer pb-2 px-3 pt-[20px] lg:pb-3 lg:px-4 lg:pt-[32px] text-navyblue text-[12px] lg:text-xl rounded-[3px] bg-white m-[3px] focus:outline-none`}
              />
              <label
                htmlFor="login"
                className={`text-navyblue text-[12px] lg:text-xl tracking-[2px] absolute top-1/2 transform -translate-y-1/2 pointer-events-none left-[18px] peer-focus:text-[8px] lg:peer-focus:text-[10px] peer-focus:top-[15px] lg:peer-focus:top-[23px] transition-all duration-200 ease-in-out ${
                  formData.login
                    ? "!text-[8px] lg:!text-[10px] top-[15px] lg:top-[23px]"
                    : ""
                }`}
              >
                {locale === "en" ? "USERNAME/EMAIL" : "USERNAME/EMAIL"}
              </label>
            </div>
            {errors.login && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-xs mt-2 ml-1 bg-[#ff4444b9] max-w-max px-2"
              >
                {errors.login}
              </motion.p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="relative overflow-hidden flex flex-col mb-2"
          >
            <div
              className={`relative flex flex-col rounded-[5px] overflow-hidden form__wrap__input`}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={`peer pb-2 px-3 pt-[20px] lg:pb-3 lg:px-4 lg:pt-[32px] text-navyblue text-[12px] lg:text-xl rounded-[3px] bg-white m-[3px] focus:outline-none `}
              />
              <label
                htmlFor="password"
                className={`text-navyblue text-[12px] lg:text-xl tracking-[2px] absolute top-1/2 transform -translate-y-1/2 pointer-events-none left-[18px] peer-focus:text-[8px] lg:peer-focus:text-[10px] peer-focus:top-[15px] lg:peer-focus:top-[23px] transition-all duration-200 ease-in-out ${
                  formData.password
                    ? "!text-[8px] lg:!text-[10px] top-[15px] lg:top-[23px]"
                    : ""
                }`}
              >
                {locale === "en" ? "PASSWORD" : "KATA SANDI"}
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 cursor-pointer" />
                ) : (
                  <Eye className="w-5 h-5 cursor-pointer" />
                )}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-xs mt-2 ml-1 bg-[#ff4444b9] max-w-max px-4"
              >
                {errors.password}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex items-center mt-2 mb-1"
          >
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <label
              htmlFor="rememberMe"
              className="text-white text-sm lg:text-lg font-raleway cursor-pointer"
            >
              {locale === "en" ? "Remember My Login" : "Ingat saya"}
            </label>
          </motion.div>

          <div className="text-left">
            <motion.a
              href="forget-password"
              target="_self"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="text-white text-sm lg:text-lg hover:text-blue-200 transition-colors duration-200 font-raleway cursor-pointer"
            >
              {locale === "en" ? "Forgot password?" : "Lupa kata sandi?"}
            </motion.a>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className={`cursor-pointer w-full py-3 lg:py-4 mt-5 lg:mt-9 rounded-[5px] tracking-[5px] font-raleway text-white text-sm lg:text-xl transition-all duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-tosca hover:bg-teal-600 active:bg-teal-700"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{locale === "en" ? "LOGGING IN..." : "MASUK..."}</span>
              </div>
            ) : locale === "en" ? (
              "LOGIN"
            ) : (
              "MASUK"
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
