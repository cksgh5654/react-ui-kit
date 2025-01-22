import React, { useState } from "react";
import {
  Tabs,
  Carousel,
  Breadcrumb,
  Pagination,
  Popover,
  Calendar,
  Progress,
  Modal,
  DatePicker,
  Select,
} from "./components";
import ExamplePage from "./components/Progress/ExamplePage";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalItems = 400;
  const pageSize = 10;

  const handleChangeTab = (index: number) => {
    console.log(`Tab changed to index: ${index}`);
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

      <Carousel itemLength={3}>
        <Carousel.ItemList>
          <Carousel.Item index={0}></Carousel.Item>
          <Carousel.Item index={1}></Carousel.Item>
          <Carousel.Item index={2}></Carousel.Item>
        </Carousel.ItemList>
        <Carousel.Navigator />
        <Carousel.Indicator />
      </Carousel>

      <Calendar onChange={handleChangeDate} value={new Date()}>
        <Calendar.Current />
        <Calendar.Navigator />
        <Calendar.Body />
      </Calendar>

      <Breadcrumb width="100px">
        <Breadcrumb.Item href="/a">1</Breadcrumb.Item>
        <Breadcrumb.Item href="/a-a">2</Breadcrumb.Item>
        <Breadcrumb.Item href="/a-a-a">3</Breadcrumb.Item>
        <Breadcrumb.Item href="/a-a-a-a">4</Breadcrumb.Item>
        <Breadcrumb.Item href="/a-a-a-a-a">5</Breadcrumb.Item>
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

      <Modal
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        open={isOpen}
      >
        <Modal.Backdrop />
        <Modal.Trigger>
          {/** Trigger UI를 사용자 단에서 자유롭게 설정 가능하게. **/}

          <a href="#">열기</a>
        </Modal.Trigger>
        <Modal.Content>
          {/** Close UI를 사용자 단에서 자유롭게 설정 가능하게. **/}
          <div
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: "white",
            }}
          >
            <Modal.Close>
              <button>닫기</button>
              <button>닫기</button>
              <button>닫기</button>
            </Modal.Close>
            <div>Modal Content</div>
          </div>
        </Modal.Content>
      </Modal>

      <ExamplePage />

      <DatePicker date={new Date()} onChangeDate={handleChangeDate} />

      <Select onChange={handleChangeValue} value={selectedValue}>
        <Select.Trigger />
        <Select.Content>
          <Select.Item value={"1"}>One</Select.Item>
          <Select.Item value={"2"}>Two</Select.Item>
          <Select.Item value={"3"}>Three</Select.Item>
        </Select.Content>
      </Select>
    </>
  );
}

export default App;
