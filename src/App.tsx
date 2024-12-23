import {
  Tabs,
  Carousel,
  Breadcrumb,
  Pagination,
  Popover,
  Calendar,
} from "./components";

function App() {
  const handleChangeTab = (index: number) => {
    console.log(index);
  };

  const handleChangeDate = (index: Date) => {
    console.log(index);
  };

  const handlePageChange = (index: number) => {
    console.log(index);
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
      <Pagination total={235} value={0} onPageChange={handlePageChange}>
        <Pagination.Buttons />
        <Pagination.Navigator />
      </Pagination>
      <Popover position="bottom-left">
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content>Place content for the popover here.</Popover.Content>
      </Popover>
    </>
  );
}

export default App;
