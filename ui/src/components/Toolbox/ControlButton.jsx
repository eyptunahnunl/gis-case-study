import { Button } from "components/UI";
import UIControlContext from "context/UIControlContext";
import React, { useContext } from "react";

function ControlButton() {
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

export default ControlButton;
