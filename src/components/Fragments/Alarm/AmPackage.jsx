"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

const AmPackage = (props) => {
  const { packagesData, packagesSection } = props;

  const locale = useLocale();

  const [activeTab, setActiveTab] = useState(0); // 0 = Rent, 1 = Buy

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  // Animation for tab content
  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } },
  };

  // State terpisah untuk BUY dan RENT accordion
  const [isOpenBuy, setIsOpenBuy] = useState(false);
  const [isOpenRent, setIsOpenRent] = useState(false);

  const toggleBuyContent = () => {
    setIsOpenBuy((prev) => !prev);
  };

  const toggleRentContent = () => {
    setIsOpenRent((prev) => !prev);
  };

  return (
    <section className="pt-7 lg:pt-13 am-packages" id="am-packages">
      <div className="container mx-auto flex flex-col lg:items-center">
        <h2 className="text-darkblue text-[25px] lg:text-[40px] lg:text-center font-normal">
          {packagesSection.title}
        </h2>

        <p className="text-darkblue text-sm lg:text-lg lg:text-center lg:w-[70%] mt-3 mb-6 lg:mt-3 lg:mb-8">
          {packagesSection.desc}
        </p>

        {/* Tabs for Rent and Buy */}
        <div className="flex flex-col border-1 border-[#00000033] w-full lg:w-10/12 rounded-[5px] overflow-hidden">
          <div className="flex flex-row relative border-b-[1px] border-[#00000033]">
            <div className="w-1/2 relative first:border-r-[1px] first:border-[#00000033]">
              <button
                onClick={() => handleTabClick(0)} // 0 untuk Rent
                className={`w-full pt-4 pb-3 lg:px-6 lg:pb-5 lg:pt-8 flex flex-col items-center cursor-pointer relative z-10 border-b-[4px] lg:border-b-[9px] hover:bg-[#00AAAD33] transition-all duration-200 ease mb-[-1px]  ${
                  activeTab === 0
                    ? " border-[#00AAAD]"
                    : "bg-transparent border-transparent"
                }`}
              >
                <p
                  className={`text-xs lg:text-xl text-center uppercase tracking-[2px] lg:tracking-normal font-raleway font-normal ${
                    activeTab === 0 ? "text-navyblue" : "text-slate-500"
                  }`}
                >
                  {locale === "en" ? "Rent" : "Sewa"}
                </p>
              </button>
            </div>

            <div className="w-1/2 relative first:border-r-[1px] first:border-[#00000033]">
              <button
                onClick={() => handleTabClick(1)} // 1 untuk Buy
                className={`w-full pt-4 pb-3 lg:px-6 lg:pb-5 lg:pt-8 flex flex-col items-center cursor-pointer relative z-10 border-b-[4px] lg:border-b-[9px] hover:bg-[#00AAAD33] transition-all duration-200 ease mb-[-1px]  ${
                  activeTab === 1
                    ? " border-[#00AAAD]"
                    : "bg-transparent border-transparent"
                }`}
              >
                <p
                  className={`text-xs lg:text-xl text-center uppercase tracking-[2px] lg:tracking-normal font-raleway font-normal ${
                    activeTab === 1 ? "text-navyblue" : "text-slate-500"
                  }`}
                >
                  {locale === "en" ? "Buy" : "Beli"}
                </p>
              </button>
            </div>
          </div>

          {/* Tab content */}
          <div className="flex flex-col relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col"
              >
                {packagesData.map((item, index) => (
                  <div
                    key={`${activeTab}-${index}`}
                    className="flex flex-col lg:flex-row am-package__item border-b border-gray-200 last:border-b-0 overflow-hidden"
                  >
                    <div className="w-full lg:w-[30%] flex flex-col">
                      <div className="opacity-100 translate-y-0 transition duration-300 flex flex-col items-center">
                        <p className="bg-navyblue text-sm lg:text-lg text-white text-center py-2 rounded-b-[10px] w-[150px]">
                          {item.totalDevice}{" "}
                          {locale === "en" ? "Device" : "Perangkat"}
                        </p>
                      </div>
                      <div className="relative">
                        <Image
                          src={item.image}
                          alt="Package"
                          width={239}
                          height={156}
                          quality={100}
                          className="mx-auto pt-6 lg:pt-5 lg:pb-12"
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-[70%] p-6 flex flex-col justify-center">
                      <div>
                        <p className="text-center lg:text-start lg:text-[25px] font-bold font-raleway text-darkblue mb-2">
                          {item.title}
                        </p>
                        <p className="text-darkblue text-center lg:text-start mb-2">
                          {activeTab === 0 ? item.rentDesc : item.buyDesc}
                        </p>
                        {activeTab === 0 && (
                          <p className="text-xs lg:text-base font-bold text-navyblue leading-[1] mb-1 text-center lg:text-start">
                            {locale === "en" ? "Starting from" : "Mulai dari"}
                          </p>
                        )}
                        <div className="flex flex-col lg:flex-row items-center mb-2 gap-3 lg:gap-10">
                          <div className="flex flex-row items-start lg:w-max">
                            <p className="text-[25px] lg:text-[30px] text-navyblue leading-[1] w-full flex flex-row gap-2">
                              <span className="font-bold">
                                {locale === "en" ? "IDR" : "Rp"}{" "}
                              </span>
                              <span className="font-bold">
                                {activeTab === 0
                                  ? item.serviceFeeRent.basic
                                  : item.priceBuy}
                              </span>

                              {activeTab === 0 && (
                                <span>
                                  /{locale === "en" ? "month" : "bulan"}
                                </span>
                              )}
                            </p>
                          </div>

                          {activeTab === 1 && (
                            <div className="bg-[#CE2129] relative z-[1] text-white px-3 py-[4px] rounded text-sm flex flex-col items-center">
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 13 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute top-1/2 -translate-y-1/2 left-[-25px] scale-[180%]"
                              >
                                <circle
                                  cx="6.30964"
                                  cy="6.30964"
                                  r="6.30964"
                                  fill="#00529C"
                                />
                                <path
                                  d="M8.43516 6.06586V6.97445H6.94608V8.58972H5.93654V6.97445H4.44746V6.06586H5.93654V4.45059H6.94608V6.06586H8.43516Z"
                                  fill="white"
                                />
                              </svg>

                              <span className="text-[10px] leading-[1] mb-1 text-center">
                                {locale === "en"
                                  ? "Service Fee starting from"
                                  : "Biaya Layanan Mulai dari"}
                              </span>
                              <div className="flex flex-row items-start">
                                <p className="text-[8px] leading-[1] mr-[1px] mt-[1px]">
                                  {locale === "en" ? "IDR" : "Rp"}
                                </p>
                                <p className="text-sm leading-[1] flex flex-row gap-1">
                                  <span className="font-bold">
                                    {item.serviceFeeBuy.basic}
                                  </span>
                                  <span>
                                    /{locale === "en" ? "month" : "bulan"}
                                  </span>
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* see the differences */}
      <div className="flex flex-col pt-6 lg:pt-8 am-diff">
        {/* RENT */}
        {activeTab === 0 && (
          <div className="container mx-auto flex flex-col items-center am-dif__rent">
            <div className="w-full lg:w-10/12 flex flex-col">
              {/* Toggle Button */}
              <button
                onClick={toggleRentContent}
                className={`cursor-pointer bg-tosca w-full flex flex-row px-4 items-center justify-center gap-4  py-3 lg:py-4 transition-all duration-200 ease  ${
                  isOpenRent ? "rounded-t-[5px]" : "rounded-[5px]"
                }`}
              >
                <span className="text-white font-raleway text-sm lg:text-xl lg:font-normal tracking-[4px] uppercase">
                  {locale === "en" ? "SEE THE DIFFERENCES" : "LIHAT PERBEDAAN"}
                </span>
                <svg
                  width="15"
                  height="8"
                  viewBox="0 0 15 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-300 ${
                    isOpenRent ? "" : "rotate-180"
                  }`}
                >
                  <path
                    d="M14.2166 6.44286L7.49708 0L0.777582 6.44286C0.595038 6.61846 0.495251 6.85407 0.500174 7.09785C0.505096 7.34164 0.614325 7.57362 0.80383 7.74278C0.993335 7.91193 1.24759 8.0044 1.51067 7.99984C1.77375 7.99528 2.0241 7.89406 2.20664 7.71845L7.49708 2.64308L12.7934 7.71845C12.9759 7.89406 13.2262 7.99528 13.4893 7.99984C13.7524 8.0044 14.0067 7.91193 14.1962 7.74278C14.3857 7.57362 14.4949 7.34164 14.4998 7.09785C14.5047 6.85407 14.405 6.61846 14.2224 6.44286H14.2166Z"
                    fill="white"
                  />
                </svg>
              </button>

              {/* Accordion Content */}
              <div
                className={`flex flex-col relative transition-all duration-500 ease-in-out overflow-hidden rounded-b-[5px] shadow-[0px_4px_10px_0px_#00000026] ${
                  isOpenRent ? "max-h-[3000px]" : "max-h-0"
                }`}
              >
                <div className="md:overflow-visible overflow-x-auto flex flex-col bg-white mx-1 mb-1 relative z-[1] am-diff__wrap">
                  <div className="relative z-[1] h-full rounded-b-[3px] w-full">
                    {/* Head Content */}
                    <div className="grid grid-cols-12 border-b-[1px] border-[#0000001A]">
                      <div className="py-3 lg:py-6 border-r-[1px] border-[#0000001A] col-span-4 flex flex-col items-center justify-center">
                        <p className="font-raleway text-navyblue text-sm lg:text-xl font-bold uppercase">
                          {locale === "en" ? "Device" : "Perangkat"}
                        </p>
                      </div>
                      {packagesData.map((item, index) => (
                        <div
                          key={index}
                          className={`py-3 lg:py-6 col-span-4 flex flex-col items-center justify-center ${
                            index !== packagesData.length - 1
                              ? "border-r-[1px] border-[#0000001A]"
                              : ""
                          } `}
                        >
                          <p className="font-raleway text-navyblue text-sm lg:text-xl font-bold uppercase">
                            {item.title}
                          </p>
                        </div>
                      ))}
                    </div>
                    {/* Body Content */}

                    {/* Dapatkan semua device unik dari semua package */}
                    {(() => {
                      const allDevices = [];
                      packagesData.forEach((pkg) => {
                        pkg.devices.forEach((device) => {
                          if (!allDevices.find((d) => d.name === device.name)) {
                            allDevices.push({
                              name: device.name,
                              image: device.image,
                            });
                          }
                        });
                      });

                      return allDevices.map((device, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-12 border-b-[1px] border-[#0000001A]"
                        >
                          {/* Device */}
                          <div className="col-span-4 flex flex-col lg:flex-row items-center gap-2 lg:gap-6 border-r-[1px] border-[#0000001A] lg:min-h-[130px] p-5 lg:py-2 lg:px-10">
                            <Image
                              src={device.image}
                              alt={device.name}
                              width={88}
                              height={88}
                              className="w-[55px] h-[55px] lg:w-[88px] lg:h-[88px]"
                            />
                            <p className="font-raleway text-center lg:text-start text-sm lg:text-xl font-normal">
                              {device.name}
                            </p>
                          </div>

                          {/* Quantity untuk setiap package */}
                          {packagesData.map((pkg, pkgIndex) => {
                            // Cari device yang sesuai dalam package ini
                            const deviceInPackage = pkg.devices.find(
                              (d) => d.name === device.name
                            );
                            const quantity = deviceInPackage
                              ? deviceInPackage.quantity
                              : "-";

                            return (
                              <div
                                key={pkgIndex}
                                className={`col-span-4 flex flex-col items-center justify-center ${
                                  pkgIndex !== packagesData.length - 1
                                    ? "border-r-[1px] border-[#0000001A]"
                                    : ""
                                }`}
                              >
                                <p className="font-raleway lg:text-xl font-normal">
                                  {quantity}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      ));
                    })()}

                    {/* price */}
                    <div className="grid grid-cols-12 bg-tosca">
                      <div className="py-4 lg:py-6 col-span-4 flex flex-col items-center justify-center">
                        <p className="text-white text-[13px] lg:text-xl font-bold uppercase">
                          {locale === "en" ? "price" : "harga"}
                        </p>
                      </div>

                      {packagesData.map((item, index) => (
                        <div
                          key={index}
                          className="py-4 lg:py-6 col-span-4 flex flex-col items-center justify-center"
                        >
                          <p className="text-white text-[13px] lg:text-xl font-bold">
                            {locale === "en" ? "IDR" : "Rp"}{" "}
                            {item.serviceFeeRent.basic}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Icon Plus */}
                    <div className="w-full flex flex-col justify-center items-center">
                      <div className="my-3 lg:my-5 flex flex-col items-center w-[42px] h-[42px] lg:w-[70px] lg:h-[70px] justify-center  bg-navyblue rounded-full">
                        <div className="relative w-[14px] h-[14px] lg:w-[22px] lg:h-[22px]">
                          <span className="absolute left-1/2 top-0 h-full w-[3px] lg:w-[5px] bg-white -translate-x-1/2" />
                          <span className="absolute top-1/2 left-0 w-full h-[3px] lg:h-[5px] bg-white -translate-y-1/2" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-navyblue py-4 lg:py-6 flex flex-col items-center justify-center">
                      <p className="text-white text-sm lg:text-xl font-raleway font-semibold uppercase">
                        {locale === "en" ? "SERVICE FEE" : "BIAYA LAYANAN"}
                      </p>
                    </div>

                    {/* Service Fee Rent */}
                    <div className="grid grid-cols-12 border-b-[1px] border-[#0000001A]">
                      {/* Name */}
                      <div className="col-span-4 p-4 flex flex-row items-center justify-center border-r-[1px] border-[#0000001A] lg:min-h-[100px]">
                        <p className="text-xs text-darkblue text-center lg:text-xl font-normal">
                          {locale === "en"
                            ? "Service fee 24/7 monitoring only"
                            : "Biaya Layanan Pemantauan 24/7"}
                        </p>
                      </div>
                      {packagesData.map((item, index) => (
                        <div
                          className="col-span-4 p-4 flex flex-col items-center justify-center border-r-[1px] border-[#0000001A]"
                          key={index}
                        >
                          <p className="text-[13px] lg:text-xl text-darkblue font-bold">
                            {locale === "en" ? "IDR" : "Rp"}{" "}
                            {item.serviceFeeRent.basic}
                          </p>
                          <p className="text-[13px] lg:text-lg text-darkblue">
                            {"/"}
                            {locale === "en" ? "month" : "bulan"}
                          </p>
                        </div>
                      ))}

                      {/* Name */}
                      <div className="col-span-4 p-4 flex flex-row items-center justify-center border-r-[1px] border-[#0000001A] lg:min-h-[100px]">
                        <p className="text-xs text-darkblue text-center lg:text-xl font-normal">
                          {locale === "en"
                            ? "Service fee 24/7 monitoring + dispatch"
                            : "Biaya Layanan Pemantauan 24/7 + Respon Fisik"}
                        </p>
                      </div>
                      {packagesData.map((item, index) => (
                        <div
                          className="col-span-4 p-4 flex flex-col items-center justify-center border-r-[1px] border-[#0000001A]"
                          key={index}
                        >
                          <p className="text-[13px] lg:text-xl text-darkblue font-bold">
                            {locale === "en" ? "IDR" : "Rp"}{" "}
                            {item.serviceFeeRent.full}
                          </p>
                          <p className="text-[13px] lg:text-lg text-darkblue">
                            {"/"}
                            {locale === "en" ? "month" : "bulan"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* gradient border */}
                <div className="absolute top-0 left-0 w-full h-full z-0 animated-gradient-bg2 transition-all duration-200 ease opacity-100" />
              </div>

              {/* Hide Information Button - untuk RENT */}
              {isOpenRent && (
                <button
                  onClick={toggleRentContent}
                  className=" text-tosca text-sm font-semibold mt-8 lg:mt-8 uppercase cursor-pointer flex flex-row justify-center items-center gap-2 self-center"
                >
                  <p className="font-raleway font-normal text-xs tracking-[2px]">
                    {locale === "en"
                      ? "Hide Information"
                      : "Sembunyikan Informasi"}
                  </p>
                  <svg
                    width="15"
                    height="8"
                    viewBox="0 0 15 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-300 ${
                      isOpenRent ? "" : "rotate-180"
                    }`}
                  >
                    <path
                      d="M14.2166 6.44286L7.49708 0L0.777582 6.44286C0.595038 6.61846 0.495251 6.85407 0.500174 7.09785C0.505096 7.34164 0.614325 7.57362 0.80383 7.74278C0.993335 7.91193 1.24759 8.0044 1.51067 7.99984C1.77375 7.99528 2.0241 7.89406 2.20664 7.71845L7.49708 2.64308L12.7934 7.71845C12.9759 7.89406 13.2262 7.99528 13.4893 7.99984C13.7524 8.0044 14.0067 7.91193 14.1962 7.74278C14.3857 7.57362 14.4949 7.34164 14.4998 7.09785C14.5047 6.85407 14.405 6.61846 14.2224 6.44286H14.2166Z"
                      fill="#00AAAD"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* BUY */}
        {activeTab === 1 && (
          <div className="container mx-auto flex flex-col items-center am-dif__buy">
            <div className="w-full lg:w-10/12 flex flex-col">
              {/* Toggle Button */}
              <button
                onClick={toggleBuyContent}
                className={`cursor-pointer bg-tosca w-full flex flex-row px-4 items-center justify-center gap-4  py-3 lg:py-4 transition-all duration-200 ease  ${
                  isOpenBuy ? "rounded-t-[5px]" : "rounded-[5px]"
                }`}
              >
                <span className="text-white font-raleway text-sm lg:text-xl lg:font-normal tracking-[4px] uppercase">
                  {locale === "en" ? "SEE THE DIFFERENCES" : "LIHAT PERBEDAAN"}
                </span>
                <svg
                  width="15"
                  height="8"
                  viewBox="0 0 15 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-300 ${
                    isOpenBuy ? "" : "rotate-180"
                  }`}
                >
                  <path
                    d="M14.2166 6.44286L7.49708 0L0.777582 6.44286C0.595038 6.61846 0.495251 6.85407 0.500174 7.09785C0.505096 7.34164 0.614325 7.57362 0.80383 7.74278C0.993335 7.91193 1.24759 8.0044 1.51067 7.99984C1.77375 7.99528 2.0241 7.89406 2.20664 7.71845L7.49708 2.64308L12.7934 7.71845C12.9759 7.89406 13.2262 7.99528 13.4893 7.99984C13.7524 8.0044 14.0067 7.91193 14.1962 7.74278C14.3857 7.57362 14.4949 7.34164 14.4998 7.09785C14.5047 6.85407 14.405 6.61846 14.2224 6.44286H14.2166Z"
                    fill="white"
                  />
                </svg>
              </button>

              {/* Accordion Content */}
              <div
                className={`flex flex-col relative transition-all duration-500 ease-in-out overflow-hidden rounded-b-[5px] shadow-[0px_4px_10px_0px_#00000026] ${
                  isOpenBuy ? "max-h-[3000px]" : "max-h-0"
                }`}
              >
                <div className="md:overflow-visible overflow-x-auto flex flex-col bg-white mx-1 mb-1 relative z-[1] am-diff__wrap">
                  <div className="relative z-[1] h-full rounded-b-[3px] w-full">
                    {/* Head Content */}
                    <div className="grid grid-cols-12 border-b-[1px] border-[#0000001A]">
                      <div className="py-3 lg:py-6 border-r-[1px] border-[#0000001A] col-span-4 flex flex-col items-center justify-center">
                        <p className="font-raleway text-navyblue text-sm lg:text-xl font-bold uppercase">
                          {locale === "en" ? "Device" : "Perangkat"}
                        </p>
                      </div>
                      {packagesData.map((item, index) => (
                        <div
                          key={index}
                          className={`py-3 lg:py-6 col-span-4 flex flex-col items-center justify-center ${
                            index !== packagesData.length - 1
                              ? "border-r-[1px] border-[#0000001A]"
                              : ""
                          } `}
                        >
                          <p className="font-raleway text-navyblue text-sm lg:text-xl font-bold uppercase">
                            {item.title}
                          </p>
                        </div>
                      ))}
                    </div>
                    {/* Body Content */}

                    {/* Dapatkan semua device unik dari semua package */}
                    {(() => {
                      const allDevices = [];
                      packagesData.forEach((pkg) => {
                        pkg.devices.forEach((device) => {
                          if (!allDevices.find((d) => d.name === device.name)) {
                            allDevices.push({
                              name: device.name,
                              image: device.image,
                            });
                          }
                        });
                      });

                      return allDevices.map((device, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-12 border-b-[1px] border-[#0000001A]"
                        >
                          {/* Device */}
                          <div className="col-span-4 flex flex-col lg:flex-row items-center gap-2 lg:gap-6 border-r-[1px] border-[#0000001A] lg:min-h-[130px] p-5 lg:py-2 lg:px-10">
                            <Image
                              src={device.image}
                              alt={device.name}
                              width={88}
                              height={88}
                              className="w-[55px] h-[55px] lg:w-[88px] lg:h-[88px]"
                            />
                            <p className="font-raleway text-center lg:text-start text-sm lg:text-xl font-normal">
                              {device.name}
                            </p>
                          </div>

                          {/* Quantity untuk setiap package */}
                          {packagesData.map((pkg, pkgIndex) => {
                            // Cari device yang sesuai dalam package ini
                            const deviceInPackage = pkg.devices.find(
                              (d) => d.name === device.name
                            );
                            const quantity = deviceInPackage
                              ? deviceInPackage.quantity
                              : "-";

                            return (
                              <div
                                key={pkgIndex}
                                className={`col-span-4 flex flex-col items-center justify-center ${
                                  pkgIndex !== packagesData.length - 1
                                    ? "border-r-[1px] border-[#0000001A]"
                                    : ""
                                }`}
                              >
                                <p className="font-raleway lg:text-xl font-normal">
                                  {quantity}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      ));
                    })()}

                    {/* price */}
                    <div className="grid grid-cols-12 bg-tosca">
                      <div className="py-4 lg:py-6 col-span-4 flex flex-col items-center justify-center">
                        <p className="text-white text-[13px] lg:text-xl font-bold uppercase">
                          {locale === "en" ? "price" : "harga"}
                        </p>
                      </div>

                      {packagesData.map((item, index) => (
                        <div
                          key={index}
                          className="py-4 lg:py-6 col-span-4 flex flex-col items-center justify-center"
                        >
                          <p className="text-white text-[13px] lg:text-xl font-bold">
                            {locale === "en" ? "IDR" : "Rp"} {item.priceBuy}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Icon Plus */}
                    <div className="w-full flex flex-col justify-center items-center">
                      <div className="my-3 lg:my-5 flex flex-col items-center w-[42px] h-[42px] lg:w-[70px] lg:h-[70px] justify-center  bg-navyblue rounded-full">
                        <div className="relative w-[14px] h-[14px] lg:w-[22px] lg:h-[22px]">
                          <span className="absolute left-1/2 top-0 h-full w-[3px] lg:w-[5px] bg-white -translate-x-1/2" />
                          <span className="absolute top-1/2 left-0 w-full h-[3px] lg:h-[5px] bg-white -translate-y-1/2" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-navyblue py-4 lg:py-6 flex flex-col items-center justify-center">
                      <p className="text-white text-sm lg:text-xl font-raleway font-semibold uppercase">
                        {locale === "en" ? "SERVICE FEE" : "BIAYA LAYANAN"}
                      </p>
                    </div>

                    {/* Service Fee Buy */}
                    <div className="grid grid-cols-12 border-b-[1px] border-[#0000001A]">
                      {/* Name */}
                      <div className="col-span-4 p-4 flex flex-row items-center justify-center border-r-[1px] border-[#0000001A] lg:min-h-[100px]">
                        <p className="text-xs text-darkblue text-center lg:text-xl font-normal">
                          {locale === "en"
                            ? "Service fee 24/7 monitoring only"
                            : "Biaya Layanan Pemantauan 24/7"}
                        </p>
                      </div>
                      {packagesData.map((item, index) => (
                        <div
                          className="col-span-4 p-4 flex flex-col items-center justify-center border-r-[1px] border-[#0000001A]"
                          key={index}
                        >
                          <p className="text-[13px] lg:text-xl text-darkblue font-bold">
                            {locale === "en" ? "IDR" : "Rp"}{" "}
                            {item.serviceFeeBuy.basic}
                          </p>
                          <p className="text-[13px] lg:text-lg text-darkblue">
                            {"/"}
                            {locale === "en" ? "month" : "bulan"}
                          </p>
                        </div>
                      ))}

                      {/* Name */}
                      <div className="col-span-4 p-4 flex flex-row items-center justify-center border-r-[1px] border-[#0000001A] lg:min-h-[100px]">
                        <p className="text-xs text-darkblue text-center lg:text-xl font-normal">
                          {locale === "en"
                            ? "Service fee 24/7 monitoring + dispatch"
                            : "Biaya Layanan Pemantauan 24/7 + Respon Fisik"}
                        </p>
                      </div>
                      {packagesData.map((item, index) => (
                        <div
                          className="col-span-4 p-4 flex flex-col items-center justify-center border-r-[1px] border-[#0000001A]"
                          key={index}
                        >
                          <p className="text-[13px] lg:text-xl text-darkblue font-bold">
                            {locale === "en" ? "IDR" : "Rp"}{" "}
                            {item.serviceFeeBuy.full}
                          </p>
                          <p className="text-[13px] lg:text-lg text-darkblue">
                            {"/"}
                            {locale === "en" ? "month" : "bulan"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* gradient border */}
                <div className="absolute top-0 left-0 w-full h-full z-0 animated-gradient-bg2 transition-all duration-200 ease opacity-100" />
              </div>

              {/* Hide Information Button - untuk BUY */}
              {isOpenBuy && (
                <button
                  onClick={toggleBuyContent}
                  className=" text-tosca text-sm font-semibold mt-8 lg:mt-8 uppercase cursor-pointer flex flex-row justify-center items-center gap-2 self-center"
                >
                  <p className="font-raleway font-normal text-xs tracking-[2px]">
                    {locale === "en"
                      ? "Hide Information"
                      : "Sembunyikan Informasi"}
                  </p>
                  <svg
                    width="15"
                    height="8"
                    viewBox="0 0 15 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-300 ${
                      isOpenBuy ? "" : "rotate-180"
                    }`}
                  >
                    <path
                      d="M14.2166 6.44286L7.49708 0L0.777582 6.44286C0.595038 6.61846 0.495251 6.85407 0.500174 7.09785C0.505096 7.34164 0.614325 7.57362 0.80383 7.74278C0.993335 7.91193 1.24759 8.0044 1.51067 7.99984C1.77375 7.99528 2.0241 7.89406 2.20664 7.71845L7.49708 2.64308L12.7934 7.71845C12.9759 7.89406 13.2262 7.99528 13.4893 7.99984C13.7524 8.0044 14.0067 7.91193 14.1962 7.74278C14.3857 7.57362 14.4949 7.34164 14.4998 7.09785C14.5047 6.85407 14.405 6.61846 14.2224 6.44286H14.2166Z"
                      fill="#00AAAD"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col container mx-auto items-center">
        <div className="w-full lg:w-10/12 flex flex-col pb-9 lg:pb-20">
          {/* Hint */}
          <div
            className="text-[#13223399] mt-7 lg:mt-10 text-sm lg:text-[16px] package-note"
            dangerouslySetInnerHTML={{ __html: packagesSection.terms }}
          />
        </div>
      </div>
    </section>
  );
};

export default AmPackage;
