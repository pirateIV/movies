import Navigation from "components/Navigation";
import MainContent from "components/MainContent";
import ScrollToTop from "components/ScrollToTop";

const root = () => {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row-reverse">
        <ScrollToTop />
        <Navigation />
        <MainContent />
      </div>
    </>
  );
};

export default root;
