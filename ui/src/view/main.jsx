import { Container } from "components/Map";
import Toolbox from "components/Toolbox";
import { AttributeTable, MapTools } from "components/Tools";
import LayersContext from "context/LayerContext";
import UIControlContext from "context/UIControlContext";
import { useContext } from "react";

function Main() {
  const { attributeTable } = useContext(UIControlContext);
  const {
    setActiveFId,
    activeFId,
    setActiveLayerID,
    activeLayerID,
    activeLayer,
  } = useContext(LayersContext);

  console.log("activedadfj adg", activeLayerID);
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
