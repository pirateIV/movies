const StarsRate = ({ value, width = "w-25" }) => {
    return (
        <div className={`relative aspect-11/2 hue-rotate-[320deg] ${width}`}>
            {/* Empty star background */}
            <img
                src="/stars.webp"
                height={16}
                width={100}
                className="absolute inset-0"
                aria-hidden="true"
                alt=""
            />
            {/* Filled star overlay */}
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
