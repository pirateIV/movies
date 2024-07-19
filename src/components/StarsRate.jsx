const StarsRate = ({ value, width = "w-25" }) => {
  return (
    <div className={`relative aspect-11/2 hue-rotate-[320deg] ${width}`}>
      <img src="/stars.webp" className="absolute inset-0" aria-hidden="true" />
      <img
        src="/stars-filled.webp"
        style={{
          clipPath: `inset(0 ${(10 - value) * 10}% 0 0)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default StarsRate;
