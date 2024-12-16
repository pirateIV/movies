import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (window.history.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center size-full gap-4">
      <h2 className="text-3xl">This page could not be found</h2>
      <p className="text-xl opacity-50 text-center">
        Looks like you've followed a broken link or entered a URL that doesn't
        exist on this site.
      </p>

      <div>
        <button
          className="border py-1.5 px-3.5 opacity-50 rounded-md hover:opacity-100 hover:text-[rgb(64,193,173)]"
          onClick={() => handleNavigation()}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
