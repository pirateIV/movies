const StarsRate = ({ value, width = "w-25" }) => {
  return (
    <div aspect="11/2" className={`relative hue-rotate-[320deg] ${width}`}>
      <img
        src="/stars.webp"
        height={16}
        width={100}
        className="absolute inset-0"
        aria-hidden="true"
        alt=""
      />
      <img
        src="/stars-filled.webp"
        height={16}
        width={100}
        style={{ clipPath: `inset(0 ${(10 - value) * 10}% 0 0)` }}
        aria-hidden="true"
        alt=""
      />
    </div>
  );
};

export default StarsRate;
