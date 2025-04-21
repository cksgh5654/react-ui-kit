### `UI Package(@repo/react-ui-kit)`

## **Accordion**

### Source

[src/components/Accordion / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/Accordion)

### Children

- Root
- Item
- Trigger
- Content

### Example

```jsx
<Accordion>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>item-1 trigger</Accordion.Trigger>
    <Accordion.Content>item-1 Content.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>item-2 trigger</Accordion.Trigger>
    <Accordion.Content>item-2 Content.</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

## **Breadcrumb**

### Source

[src/components/Breadcrumb / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/Breadcrumb)

### Children

- Root
- Item

### Example

```jsx
<Breadcrumb width="100px">
  <Breadcrumb.Item href="/a">1</Breadcrumb.Item>
  <Breadcrumb.Item href="/a-a">2</Breadcrumb.Item>
  <Breadcrumb.Item href="/a-a-a">3</Breadcrumb.Item>
  <Breadcrumb.Item href="/a-a-a-a">4</Breadcrumb.Item>
  <Breadcrumb.Item href="/a-a-a-a-a">5</Breadcrumb.Item>
</Breadcrumb>
```

## **Calendar**

### Source

[src/components/Calendar / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/Calendar)

### Children

- Root
- Current
- Navigator
- Body

### Example

```jsx
<Calendar onChange={handleChangeDate} value={new Date()}>
  <Calendar.Current />
  <Calendar.Navigator />
  <Calendar.Body />
</Calendar>
```

## **Carousel**

### Source

[src/components/Carousel / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/Carousel)

### Children

- Root
- ItemList
- Item
- Navigator
- Indicator

### Example

#### 캐러셀 기본

```jsx
<Carousel>
  <Carousel.ItemList>
    <Carousel.Item index={0}></Carousel.Item>
    <Carousel.Item index={1}></Carousel.Item>
    <Carousel.Item index={2}></Carousel.Item>
  </Carousel.ItemList>
  <Carousel.Navigator />
  <Carousel.Indicator />
</Carousel>
```

#### 캐러셀 커스텀(내비게이터, 인디게이터)

```jsx
<Carousel>
  <Carousel.ItemList>
    <Carousel.Item index={0}></Carousel.Item>
    <Carousel.Item index={1}></Carousel.Item>
    <Carousel.Item index={2}></Carousel.Item>
  </Carousel.ItemList>
  <Carousel.Navigator>
    {(prev, next) => (
      <div>
        <span onClick={prev}>이전</span>
        <span onClick={next}>다음</span>
      </div>
    )}
  </Carousel.Navigator>
  <Carousel.Indicator>
    {(indexes, to) =>
      indexes.map((index) => (
        <span key={index} onClick={() => to(index)}>
          {index + 1}
        </span>
      ))
    }
  </Carousel.Indicator>
</Carousel>
```

## **CarouselInfinite**

### Source

[src/components/CarouselInfinite / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/CarouselInfinite)

### Children

- Root
- Item
- ItemContainer
- ItemList
- ItemNavigator

### Example

```jsx
<CarouselInfinite>
  <CarouselInfinite.ItemContainer>
    <CarouselInfinite.ItemList>
      {items.map((item, index) => {
        return (
          <CarouselInfinite.Item index={index}>
            {(carouselIndex) => <Component props={item} />}
          </CarouselInfinite.Item>
        );
      })}
    </CarouselInfinite.ItemList>
  </CarouselInfinite.ItemContainer>
  <CarouselInfinite.Navigator></CarouselInfinite.Navigator>
</CarouselInfinite>
```

## **CarouselXscroll**

### Source

[src/components/CarouselXscroll / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/CarouselXscroll)

### Children

- Root
- ItemContainer
- Items
- Navigator

### Example

#### 캐러셀 좌우 스크롤 기본

```jsx
const MainPage = () => {
  const baseRef = useRef < HTMLDivElement > null;
  const itemListRef = useRef < HTMLDivElement > null;
  const [baseRect, setBaseRect] = useState(new DOMRect());

  const calculateBaseDivRect = () => {
    if (!baseRef.current) return;
    setBaseRect(baseRef.current.getBoundingClientRect());
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

  return (
    <>
      <div ref={baseRef} className="font-extrabold text-6xl">
        이 div에 왼쪽에 맞춰서 첫번째 아이템이 정렬이 됩니다.
      </div>
      <CarouselXscroll
        baseRect={baseRect}
        pixelMove={200}
        itemListRef={itemListRef}
      >
        <CarouselXscroll.ItemContainer className="h-52">
          <CarouselXscroll.Items>
            <div className="w-52 h-52 bg-red-200">1</div>
            <div className="w-52 h-52 bg-red-200">2</div>
            <div className="w-52 h-52 bg-red-200">3</div>
            <div className="w-52 h-52 bg-red-200">4</div>
            <div className="w-52 h-52 bg-red-200">5</div>
            <div className="w-52 h-52 bg-red-200">6</div>
            <div className="w-52 h-52 bg-red-200">7</div>
            <div className="w-52 h-52 bg-red-200">8</div>
            <div className="w-52 h-52 bg-red-200">9</div>
            <div className="w-52 h-52 bg-red-200">10</div>
          </CarouselXscroll.Items>
        </CarouselXscroll.ItemContainer>
        <CarouselXscroll.Navigator />
      </CarouselXscroll>
    </>
  );
};
```

#### 캐러셀 좌우 스크롤 커스텀(내비게이터)

```jsx
<CarouselXscroll baseRect={baseRect} itemWidth={200} itemListRef={itemListRef}>
  <CarouselXscroll.ItemContainer className="h-52">
    <CarouselXscroll.Items>
      <div className="w-52 h-52 bg-red-200">1</div>
      <div className="w-52 h-52 bg-red-200">2</div>
      <div className="w-52 h-52 bg-red-200">3</div>
      <div className="w-52 h-52 bg-red-200">4</div>
      <div className="w-52 h-52 bg-red-200">5</div>
      <div className="w-52 h-52 bg-red-200">6</div>
      <div className="w-52 h-52 bg-red-200">7</div>
      <div className="w-52 h-52 bg-red-200">8</div>
      <div className="w-52 h-52 bg-red-200">9</div>
      <div className="w-52 h-52 bg-red-200">10</div>
    </CarouselXscroll.Items>
  </CarouselXscroll.ItemContainer>
  <CarouselXscroll.Navigator>
    {(prev, next, leftStyle, rightStyle) => (
      <>
        <span style={leftStyle} onClick={prev}>
          이전
        </span>
        <span style={rightStyle} onClick={next}>
          다음
        </span>
      </>
    )}
  </CarouselXscroll.Navigator>
</CarouselXscroll>
```

## **DatePicker**

### Source

[src/components/DatePicker / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/DatePicker)

### Children

- Root

### Example

```jsx
<DatePicker date={new Date()} onChangeDate={handleChangeDate} />
```

## **Modal**

### Source

[src/components/Modal / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/Modal)

### Children

- Root
- Backdrop
- Close
- Content
- Trigger

### Example

```jsx
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
      <div>Modal Content</div>
    </div>
  </Modal.Content>
</Modal>
```

## **Pagination**

### Source

[src/components/Pagination / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/Pagination)

### Children

- Root
- Buttons
- Navigator

### Example

```jsx
<Pagination total={235} value={0} onPageChange={handlePageChange}>
  <Pagination.Buttons />
  <Pagination.Navigator />
</Pagination>
```

## **Popover**

### Source

[src/components/Popover / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/Popover)

### Children

- Root
- Content
- Trigger

### Example

```jsx
<Popover position="bottom-left">
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content>Place content for the popover here.</Popover.Content>
</Popover>
```

## **Progress**

### Source

[src/components/Progress / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/Progress)

### Children

- Root

### Example

```jsx
<Progress stop={stop} />
```

## **Select**

### Source

[src/components/Select / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/Select)

### Children

- Root
- Content
- Item
- Trigger

### Example

```jsx
<Select
  onChange={handleChangeValue}
  value={selectedValue}
  item={selectedItem}
  setItem={setSelectedItem}
>
  <Select.Trigger />
  <Select.Content>
    <Select.Item value={"1"}>One</Select.Item>
    <Select.Item value={"2"}>Two</Select.Item>
    <Select.Item value={"3"}>Three</Select.Item>
  </Select.Content>
</Select>
```

## **Tabs**

### Source

[src/components/Tabs / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/Tabs)

### Children

- Root
- MenuList
- Menu
- Pannel

### Example

```jsx
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
```

## **Toast**

### Source

[src/components/Toast / react-ui-kit · github](https://github.com/cksgh5654/react-ui-kit/tree/master/src/components/Toast)

### Children

- Root

### Example

```jsx
const ExamplePage = () => {
  const { toast } = useToast();
  const handleClickOpenToast = () => {
    toast(
      {
        title: "ToastTitle",
        description: "ToastDescription",
        duration: 5000,
      },
      {
        position: "top-center",
      }
    );
  };
  return <button onClick={handleClickOpenToast}>open toast</button>;
};
```
