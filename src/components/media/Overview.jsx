import CreditsList from "../person/CreditsList";
import MediaInfo from "./Info";

const Overview = ({ item }) => {
  return (
    <>
      <MediaInfo item={item} />
      <CreditsList item={item} />
    </>
  );
};

export default Overview;
