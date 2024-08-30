import PersonCard from "./Card";
import CarouselBase from "../carousel/Base";

const CreditsList = ({ item }) => {
  return (
    <>
      {item?.credits?.cast.length > 0 && (
        <CarouselBase query={{ title: "Cast" }}>
          {item?.credits?.cast?.map((item, i) => (
            <PersonCard key={i} item={item} query={{ type: "person" }} />
          ))}
          {/* {item?.credits?.crew?.slice(20, 40).map((item, i) => (
            <PersonCard key={i} item={item} query={{ type: "person" }} />
          ))} */}
        </CarouselBase>
      )}
    </>
  );
};

export default CreditsList;
