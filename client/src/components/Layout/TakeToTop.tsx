import React from "react";
import ScrollToTop from "../../Utils/ScrollToTop";

const TakeToTop = () => {
  return (
    <button
      onClick={() => ScrollToTop()}
      className="fixed bottom-10 right-[-2.5rem] translate-x-[-100%] translate-y-[-100%] z-30 "
    >
      <svg
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        className="w-[50px] h-[50px] rounded-full iconify iconify--twemoji"
        preserveAspectRatio="xMidYMid meet"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fill="#37a9eb"
            d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
          ></path>
          <path fill="#FFF" d="M22 29v-9h7L18 7L7 20h7v9z"></path>
        </g>
      </svg>
    </button>
  );
};

export default TakeToTop;
