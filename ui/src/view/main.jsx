import { Container } from "components/Map";
import Toolbox from "components/Toolbox";
import { MapTools } from "components/Tools";

function Main() {
  return (
    <>
      <Container>
        <MapTools />
      </Container>
      <Toolbox />
    </>
  );
}

export default Main;
