import { imgBaseURL } from "@/config/tmdbAPI";
import { getPerson } from "@/services/tmdb";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Person = () => {
  const params = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const getPersonDetails = async () => {
      const data = await getPerson(params.id);
      setPerson(data);
      console.log(data);
    };
    getPersonDetails();
  }, [params]);

  return (
    <div className="max-w-[75rem] mx-auto order-first lg:order-last">
      <div className="grid grid-cols-[auto,1fr] p-4">
        {/* <div> */}
        <img
          src={`${imgBaseURL}f_webp&s-400x600/tmdb/${person?.profile_path}`}
          width="400"
          height="600"
          className="aspect-[3/4]"
          alt={person?.name + "'s avatar"}
        />
        {/* </div> */}
        <div className="p-4">
          <h1 className="text-3xl mb-4">{person?.name}</h1>
          <div className="leading-relaxed opacity-80 whitespace-pre-line">
            {person?.biography}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Person;
