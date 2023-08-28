import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { Button } from "components/UI";
import { useContext } from "react";
import UIControlContext from "context/UIControlContext";
import {
  LoadTIFF,
  LoadVectorData,
  LoadWMS,
  LocationAnalysis,
} from "components/Tools";

function Toolbox() {
  const {
    toolBox,
    setToolBox,
    setAttributeTable,
    attributeTable,
  } = useContext(UIControlContext);
  const handleToolbox = () => {
    setToolBox(!toolBox);
  };
  const handleAttributeTable = () => {
    setAttributeTable(!attributeTable);
  };
  return (
    <>
      {toolBox && (
        <div className="absolute top-6  border-2 z-20 w-86 bg-white m-3">
          <Tabs aria-label="Basic tabs" defaultValue={0}>
            <TabList>
              <Tab>Load Vector File </Tab>
              <Tab>WMS</Tab>
              <Tab>Raster</Tab>
              <Tab>Analysis</Tab>
            </TabList>
            <TabPanel value={0}>
              <LoadVectorData />
            </TabPanel>
            <TabPanel value={1}>
              <LoadWMS />
            </TabPanel>
            <TabPanel value={2}>
              load geotiff
              <LoadTIFF />
            </TabPanel>
            <TabPanel value={3}>
              <LocationAnalysis />
            </TabPanel>
          </Tabs>
        </div>
      )}

      <div className="right-10 w-10 top-1  z-51 absolute flex-row  mt-0 overflow-hidden ">
        <Button iconName="tool" onClick={handleToolbox} />
        <Button
          iconName="table"
          onClick={handleAttributeTable}
        />
      </div>
    </>
  );
}

export default Toolbox;
