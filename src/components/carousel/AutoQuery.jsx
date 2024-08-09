import CarouselBase from "./Base";

const CarouselAutoQuery = ({ media, queries }) => {
  return queries.map((query, i) => (
    <CarouselBase media={media[i]} key={i} query={query} />
  ));
};

export default CarouselAutoQuery;
