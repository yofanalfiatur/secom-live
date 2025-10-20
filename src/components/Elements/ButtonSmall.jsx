import { Link } from "@/i18n/navigation";

const ButtonSmall = (props) => {
  const { href, target, children, className } = props;

  return (
    <>
      <Link
        href={href}
        target={target}
        className={`flex flex-col max-w-max max-h-max font-raleway bg-tosca text-white text-[20px] px-4 py-3.5 rounded-[5px] tracking-[3px] leading-none uppercase ${className}`}
      >
        {children}
      </Link>
    </>
  );
};

export default ButtonSmall;
