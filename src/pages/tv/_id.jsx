import { useParams } from "react-router-dom";

const TVShow = () => {
  const { tvId } = useParams();
  console.log(tvId);

  return (
    <>
      <h1>{tvId}</h1>
    </>
  );
};

export default TVShow;
