"use client";

const RadialGridCard = ({
  className = "",
  dotColor = "#00D4FF",
  dotSize = "1px",
  spacing = "15px",
  opacity = 0.15,
}) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full rounded-full overflow-hidden z-0 ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}, transparent ${dotSize})`,
          backgroundSize: `${spacing} ${spacing}`,
          backgroundPosition: `${spacing} ${spacing}`,
          opacity: opacity,
        }}
      />
    </div>
  );
};

export default RadialGridCard;
