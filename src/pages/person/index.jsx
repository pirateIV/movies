import { imgBaseURL } from "@/config/tmdbAPI";
import { getPerson } from "@/services/tmdb";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const buildURL = (imagePath, size) =>
  `${imgBaseURL}/f_webp&s_${size}/tmdb/${imagePath}`;

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
    <div className="max-w-[1200px] w-full h-dvh mx-auto flex order-first lg:order-last">
      <div className="grid grid-cols-[400px_1fr] gap-4 p-4">
        {/* Person Image */}
        <div className="block aspect-3/4 bg-[#9ca3af1a]">
          {person?.profile_path ? (
            <img
              width={400}
              height={600}
              className="object-cover w-full h-full"
              src={buildURL(person.profile_path, "400x600")}
              srcSet={`${buildURL(person.profile_path, "400x600")} 1x, ${buildURL(person.profile_path, "800x1200")} 2x`}
              alt={person?.name + "'s avatar"}
              fetchpriority="low"
            />
          ) : (
            <div className="h-full flex items-center justify-center opacity-20">
              <div className="i-ph:user ma text-4xl"></div>
            </div>
          )}
        </div>

        {/* Person Details */}
        <div className="p-4">
          <h1 className="text-3xl mb-4">{person?.name}</h1>
          <div className="mb-2">
            <strong className="opacity-70">{person?.known_for_department}</strong>
          </div>
          <div className="leading-relaxed opacity-80 whitespace-pre-line">
            {person?.biography || "Biography not available."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Person;
