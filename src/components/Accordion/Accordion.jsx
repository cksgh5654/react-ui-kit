import { useState } from "react";
import Accordionbutton from "./AccordionButton";
import AccordionContent from "./AccordionContent";

const Accordion = () => {
  const [activeIndexList, setActiveIndexList] = useState([]);

  const onClickAccordionButton = (index) => {
    if (activeIndexList.includes(index)) {
      setActiveIndexList((prev) =>
        prev.filter((prevIndex) => prevIndex !== index)
      );
    } else {
      setActiveIndexList((prev) => [...prev, index]);
    }
  };

  return (
    <>
      <Accordionbutton
        title={"ACC-1"}
        index={0}
        onClickAccordionButton={onClickAccordionButton}
      />
      <AccordionContent isActive={activeIndexList.includes(0)}>
        <div>
          <h3>Accordion-Content-1</h3>
        </div>
      </AccordionContent>

      <Accordionbutton
        title={"ACC-1"}
        index={1}
        onClickAccordionButton={onClickAccordionButton}
      />

      <AccordionContent isActive={activeIndexList.includes(1)}>
        <div>
          <h3>Accordion-Content-2</h3>
        </div>
      </AccordionContent>

      <Accordionbutton
        title={"ACC-1"}
        index={2}
        onClickAccordionButton={onClickAccordionButton}
      />

      <AccordionContent isActive={activeIndexList.includes(2)}>
        <div>
          <h3>Accordion-Content-3</h3>
        </div>
      </AccordionContent>
    </>
  );
};

export default Accordion;
