"use client";
import { Link } from "@/i18n/navigation";

const ButtonPrimary = (props) => {
  const { href, target, children, className } = props;

  return (
    <>
      <Link
        href={href}
        target={target}
        className={`flex flex-col items-center w-full max-w-full sm:max-w-max sm:max-h-max font-raleway bg-tosca text-white text-sm lg:text-base px-4 py-4 lg:px-5 lg:py-5 rounded-[5px] tracking-[4px] leading-none uppercase transition-all ease duration-200 hover:bg-navyblue ${className}`}
      >
        {children}
      </Link>
    </>
  );
};

export default ButtonPrimary;

// "use client";
// import { Link } from "@/i18n/navigation";
// import { useRouter } from "next/navigation";

// const ButtonPrimary = (props) => {
//   const { href, target, children, className } = props;
//   const router = useRouter();

//   const handleClick = async (e) => {
//     if (!href || !href.includes("#")) return; // kalau bukan anchor, biarin default

//     e.preventDefault();

//     const [path, hash] = href.split("#");

//     // navigasi ke path tanpa auto scroll
//     await router.push(path || "/", { scroll: false });

//     // kasih delay agar page sempat render
//     setTimeout(() => {
//       if (hash) {
//         const el = document.getElementById(hash);
//         if (el) {
//           el.scrollIntoView({ behavior: "smooth", block: "start" });
//         }
//       }
//     }, 400);
//   };

//   return (
//     <Link
//       href={href}
//       target={target}
//       onClick={handleClick}
//       className={`flex flex-col items-center w-full max-w-full sm:max-w-max sm:max-h-max font-raleway bg-tosca text-white text-sm lg:text-base px-4 py-4 lg:px-5 lg:py-5 rounded-[5px] tracking-[4px] leading-none uppercase transition-all ease duration-200 hover:bg-navyblue ${className}`}
//     >
//       {children}
//     </Link>
//   );
// };

// export default ButtonPrimary;
