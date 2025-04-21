import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Tabs,
  Breadcrumb,
  Pagination,
  Calendar,
  Modal,
  Select,
  Accordion,
  Toaster,
  CarouselInfinite,
  useToast,
  CarouselXscroll,
  Popover,
} from "./components";
import ExamplePage from "./components/Progress/ExamplePage";
import CarouselInfiniteItem from "@ui/CarouselInfinite/CarouselInfiniteItem";

type SelectedItem = {
  label: ReactNode;
  value: string;
};

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [baseRect, setBaseRect] = useState(new DOMRect());
  const [modalRect, setModalRect] = useState(new DOMRect());
  const itemListRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLHeadingElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();
  const totalItems = 400;
  const pageSize = 10;

  const calculateBaseDivRect = () => {
    if (!baseRef.current) return;
    setBaseRect(baseRef.current.getBoundingClientRect());
    if (modalRef.current) {
      setModalRect(modalRef.current.getBoundingClientRect());
    }
  };

  useEffect(() => {
    calculateBaseDivRect();

    const handleResize = () => {
      calculateBaseDivRect();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChangeTab = (index: number) => {
    console.log(`Tab changed to index: ${index}`);
  };

  const handleClickOpenToast = () => {
    toast({
      title: "ToastTitle",
      description: "ToastDescription",
      duration: 5000,
    });
  };

  const handleChangeDate = (index: Date) => {
    console.log(`Date changed to: ${index}`);
  };

  const handlePageChange = (index: number) => {
    setCurrentPage(index);
  };

  // Generate dummy data for 400 items
  const dummyData = Array.from(
    { length: totalItems },
    (_, i) => `Item ${i + 1}`
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    label: "영화",
    value: "movie",
  });

  // Calculate items for the current page
  const startIdx = currentPage * pageSize;
  const endIdx = startIdx + pageSize;
  const currentPageItems = dummyData.slice(startIdx, endIdx);

  const [selectedValue, setSelectedValue] = useState<string>("1");
  const handleChangeValue = (selectedValue: string) => {
    setSelectedValue(selectedValue);
    console.log(selectedValue);
  };

  return (
    <>
      <Tabs onChangeTab={handleChangeTab}>
        <Tabs.MenuList>
          <Tabs.Menu index={1}>Menu1</Tabs.Menu>
          <Tabs.Menu index={2}>Menu2</Tabs.Menu>
          <Tabs.Menu index={3}>Menu3</Tabs.Menu>
        </Tabs.MenuList>
        <Tabs.Pannel index={1}>Content1</Tabs.Pannel>
        <Tabs.Pannel index={2}>Content2</Tabs.Pannel>
        <Tabs.Pannel index={3}>Content3</Tabs.Pannel>
      </Tabs>
      <h1>캐러샐</h1>
      <Calendar
        chevronColor="#fff"
        onChange={handleChangeDate}
        value={new Date()}
      >
        <Calendar.Current />
        <Calendar.Navigator />
        <Calendar.Body />
      </Calendar>
      <Breadcrumb chevronColor="#fff" width="100px">
        <Breadcrumb.Item href="/a">1</Breadcrumb.Item>
        <Breadcrumb.Item href="/a-a">2</Breadcrumb.Item>
        <Breadcrumb.Item href="/a-a-a">3</Breadcrumb.Item>
        <Breadcrumb.Item href="/a-a-a-a">4</Breadcrumb.Item>
      </Breadcrumb>
      <Pagination
        total={totalItems}
        value={currentPage}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        blockSize={15}
      >
        <Pagination.Buttons />
        <Pagination.Navigator />
      </Pagination>
      <div>
        <h2>Current Page Items:</h2>
        <ul>
          {currentPageItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      {/* <Popover position="bottom-left">
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Place content for the popover here.</Popover.Content>
      </Popover> */}
      <h1 ref={modalRef}>모달</h1>
      <Modal
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        open={isOpen}
      >
        <Modal.Backdrop />
        <Modal.Trigger>
          <a href="#">열기</a>
        </Modal.Trigger>
        <Modal.Content>
          <div
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: "white",
            }}
          >
            <Modal.Close>
              <button>닫기</button>
            </Modal.Close>
            <Popover position="bottom-left">
              <Popover.Trigger>Open</Popover.Trigger>
              <Popover.Content>
                Place content for the popover here.
              </Popover.Content>
            </Popover>
          </div>
        </Modal.Content>
      </Modal>{" "}
      <Popover position="bottom-left">
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Place content for the popover here.</Popover.Content>
      </Popover>
      <ExamplePage />
      <h1>셀렉트</h1>
      <Select
        onChange={handleChangeValue}
        value={selectedValue}
        item={selectedItem}
        setItem={setSelectedItem}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Item value={"movie"}>영화</Select.Item>
          <Select.Item value={"actor"}>배우</Select.Item>
        </Select.Content>
      </Select>
      <h1>아코디언</h1>
      <Accordion chevronColor="#fff">
        <Accordion.Item value="item-1">
          <Accordion.Trigger chevron>item-1 trigger</Accordion.Trigger>
          <Accordion.Content>item-1 Content.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>item-2 trigger</Accordion.Trigger>
          <Accordion.Content>item-2 Content.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <h1>무한캐러샐</h1>
      <CarouselInfinite chevronColor="#fff">
        <CarouselInfinite.ItemContainer>
          <CarouselInfinite.ItemList>
            <CarouselInfiniteItem index={0}>
              {() => <div>0</div>}
            </CarouselInfiniteItem>
            <CarouselInfiniteItem index={1}>
              {() => <div>1</div>}
            </CarouselInfiniteItem>
            <CarouselInfiniteItem index={2}>
              {() => <div>1</div>}
            </CarouselInfiniteItem>
          </CarouselInfinite.ItemList>
        </CarouselInfinite.ItemContainer>
        <CarouselInfinite.Navigator />
        <CarouselInfinite.Indicator
          activeColor="red"
          styleType="dots"
          dotSize={20}
        />
      </CarouselInfinite>
      <CarouselXscroll
        chevronColor="#fff"
        baseRect={baseRect}
        pixelMove={modalRect.width}
        itemListRef={itemListRef}
        className="group"
      >
        <CarouselXscroll.ItemContainer className="h-full">
          <CarouselXscroll.Items className="flex gap-4">
            <div className="bg-blue-400 w-56 h-56 flex justify-center items-center text-white text-4xl rounded-xl">
              1
            </div>
            <div className="bg-blue-500 w-56 h-56 flex justify-center items-center text-white text-4xl rounded-xl">
              2
            </div>
            <div className="bg-blue-600 w-56 h-56 flex justify-center items-center text-white text-4xl rounded-xl">
              3
            </div>
            <div className="bg-blue-700 w-56 h-56 flex justify-center items-center text-white text-4xl rounded-xl">
              4
            </div>
            <div className="bg-blue-800 w-56 h-56 flex justify-center items-center text-white text-4xl rounded-xl">
              5
            </div>
            <div className="bg-blue-900 w-56 h-56 flex justify-center items-center text-white text-4xl rounded-xl">
              6
            </div>
          </CarouselXscroll.Items>
        </CarouselXscroll.ItemContainer>
        <CarouselXscroll.Navigator />
      </CarouselXscroll>
      <h1>토스트</h1>
      <button onClick={handleClickOpenToast}>open toast</button>;
      <ul>
        <li style={{ height: "100px" }}>content</li>
        <li style={{ height: "100px" }}>content</li>
        <li style={{ height: "100px" }}>content</li>
        <li style={{ height: "100px" }}>content</li>
        <li style={{ height: "100px" }}>content</li>
        <li style={{ height: "100px" }}>content</li>
        <li style={{ height: "100px" }}>content</li>
        <li style={{ height: "100px" }}>content</li>
        <li style={{ height: "100px" }}>content</li>
      </ul>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
