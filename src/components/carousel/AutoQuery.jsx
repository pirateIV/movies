import CarouselBase from "./Base";

const CarouselAutoQuery = ({ media, queries }) => {
  return queries.map((query, i) => (
    <CarouselBase media={media[query.type]} query={query} />
  ));
};

export default CarouselAutoQuery;
