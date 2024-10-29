import { useState } from "react";
import Accordionbutton from "./AccordionButton";
import AccordionContent from "./AccordionContent";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onClickAccordionButton = (index) => {
    setActiveIndex(index);
    console.log(index);
  };

  return (
    <>
      <Accordionbutton
        title={"ACC-1"}
        index={0}
        onClickAccordionButton={onClickAccordionButton}
      />
      <AccordionContent isActive={activeIndex === 0}>
        <div>
          <h3>Accordion-Content-1</h3>
        </div>
      </AccordionContent>

      <Accordionbutton
        title={"ACC-1"}
        index={1}
        onClickAccordionButton={onClickAccordionButton}
      />

      <AccordionContent isActive={activeIndex === 0}>
        <div>
          <h3>Accordion-Content-2</h3>
        </div>
      </AccordionContent>

      <Accordionbutton
        title={"ACC-1"}
        index={2}
        onClickAccordionButton={onClickAccordionButton}
      />

      <AccordionContent isActive={activeIndex === 0}>
        <div>
          <h3>Accordion-Content-3</h3>
        </div>
      </AccordionContent>
    </>
  );
};

export default Accordion;
