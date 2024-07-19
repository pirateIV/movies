import CarouselBase from "./Base";

const CarouselAutoQuery = ({ media, queries }) => {
  console.log(media);
  return queries.map((query, i) => <CarouselBase key={i} query={query} />);
};

export default CarouselAutoQuery;
