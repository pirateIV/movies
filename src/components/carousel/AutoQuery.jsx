import MediaCard from "../media/Card";
import CarouselBase from "./Base";

const CarouselAutoQuery = ({ media, queries }) => {
  return queries.map((query, i) => (
    <CarouselBase key={i} query={query}>
      {media[i]?.map((item, i) => (
        <MediaCard key={i} item={item} query={query} />
      ))}
    </CarouselBase>
  ));
};

export default CarouselAutoQuery;
