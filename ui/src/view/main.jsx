import { Container } from "components/Map";
import Toolbox from "components/Toolbox";
import { AttributeTable, MapTools } from "components/Tools";
import UIControlContext from "context/UIControlContext";
import { useContext } from "react";

function Main() {
  const { attributeTable } = useContext(UIControlContext);
  return (
    <>
      <Container>
        <MapTools />
      </Container>
      <Toolbox />
      {attributeTable && <AttributeTable />}
    </>
  );
}

export default Main;
