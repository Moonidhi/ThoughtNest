import React from "react";

const HeartButton = ({ isActive, onToggle, onSpark }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    if (onSpark) onSpark(event);
    if (onToggle) onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
        isActive
          ? "border-transparent bg-[rgba(232,230,227,0.2)]"
          : "border-[rgba(232,230,227,0.2)] bg-[rgba(18,18,18,0.6)]"
      }`}
      aria-label={isActive ? "Remove from saved" : "Save abstract"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`h-5 w-5 transition-all duration-300 ${
          isActive ? "fill-[#e8e6e3]" : "fill-transparent stroke-[#e8e6e3]"
        } group-hover:scale-105`}
        strokeWidth="1.6"
      >
        <path
          d="M12 20.5c-5-3.8-8-6.9-8-10.2 0-2.3 1.6-4.3 4.2-4.3 1.7 0 3.2.9 3.8 2.3.6-1.4 2.1-2.3 3.8-2.3 2.6 0 4.2 2 4.2 4.3 0 3.3-3 6.4-8 10.2z"
        />
      </svg>
    </button>
  );
};

export default HeartButton;
