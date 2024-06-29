import { Outlet } from "react-router-dom";
import Container from "./Container";

const MainContent = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default MainContent;
