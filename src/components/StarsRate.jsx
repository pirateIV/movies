const StarsRate = (props) => {
  return (
    <div
      className={`relative aspect-11/2 w-25 hue-rotate-[320deg] ${props.width}`}
    >
      <img src="/stars.webp" className="absolute inset-0" aria-hidden="true" />
      <img
        src="/stars-filled.webp"
        style={{
          clipPath: `inset(0 ${(10 - props.value) * 10}% 0 0)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default StarsRate;
