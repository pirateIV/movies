import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen">
      <h1 className="text-9xl">404</h1>
      <div className="text-center">
        <h3>Not Found</h3>

        <blockquote>
          <cite>This page isn't here</cite>
        </blockquote>

        <div className="my-5">
          <div onClick={() => navigate(-1)} className="text-blue-600">
            <span>Go back</span> 👈🏿
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
