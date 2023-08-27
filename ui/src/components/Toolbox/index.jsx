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
} from "components/Tools";

function Toolbox() {
  const { toolBox, setToolBox } = useContext(
    UIControlContext
  );
  const handleToolbox = () => {
    setToolBox(!toolBox);
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
            </TabList>
            <TabPanel value={0}>
              vector
              <LoadVectorData />
            </TabPanel>
            <TabPanel value={1}>
              wms
              <LoadWMS />
            </TabPanel>
            <TabPanel value={2}>
              raster
              <LoadTIFF />
            </TabPanel>
          </Tabs>
        </div>
      )}

      <div className="right-1 w-10 bottom-72  z-51 absolute flex-row  mt-0 overflow-hidden ">
        <Button iconName="tool" onClick={handleToolbox} />
      </div>
    </>
  );
}

export default Toolbox;
