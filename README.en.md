# VMALL (Huawei Mall)

## Project Introduction

VMALL is a Huawei Mall application developed based on HarmonyOS, implementing core e-commerce functions such as product display, search, shopping cart, and personal center. The application adopts modern UI design and smooth interaction experience to provide users with convenient shopping services.

**Key Technologies and Components**:
- **WaterFlow Container**: Implements waterfall layout for product lists, supporting adaptive arrangement of product cards of different sizes
- **LazyForEach**: Loads product data on demand, optimizing scrolling performance and memory usage
- **Swiper Component**: Implements home page carousel function to display recommended products
- **Tabs Component**: Implements bottom navigation bar, supporting page switching between home page, classification, shopping cart, and my page

### Extended Features

- Product detail page
- Product search function
- Shopping cart management
- Personal center

## Team Division of Labor

This project was completed by a four-person team with the following division of labor:

| Member | Responsible Module | Main Responsibilities |
| ------ | ------------------ | -------------------- |
| Ma Minze | Search Function | Responsible for search results display, search history management, search keyword processing |
| Jiang Le | Product Detail Page | Responsible for product detail page UI layout, product information display, image browsing |
| Hu Weikang | Personal Center | Responsible for personal center page design, user information display, order management entry |
| Tian Yanshuo | Shopping Cart | Responsible for shopping cart page design, product adjustment functions, checkout process implementation |

## Extended Function Implementation

### 1. Product Detail Page

**Function Description**: Displays detailed product information, including product images, name, price, description, specifications, etc.

**Implementation Plan**:
- Use `ProductDetailPage.ets` to implement the product detail page
- Adopt multi-level layout to display product information, including image carousel, basic product information, detailed description, etc.
- Implement product collection, add to cart and other interactive functions
- Support product specification selection and quantity adjustment

**Core Files**:
- `entry/src/main/ets/pages/ProductDetailPage.ets`
- `entry/src/main/ets/viewmodel/ProductItem.ets`

**Display Images**:
<img src="entry/src/main/resources/base/media/detail1.png" alt="Product detail page main image display" style="width: 300px; margin-right: 10px;">
<img src="entry/src/main/resources/base/media/detail2.png" alt="Product detail page information display" style="width: 300px;">

### 2. Search Function

**Function Description**: Allows users to search for products by keywords and display search results.

**Implementation Plan**:
- Develop `SearchComponent.ets` search component, integrated at the top of the home page
- Implement search box input and search button click event handling
- Use `LazyForEach` to load search results on demand for performance optimization
- Support search history and hot search terms display

**Core Files**:
- `entry/src/main/ets/view/SearchComponent.ets`
- `entry/src/main/ets/viewmodel/HomeViewModel.ets`

**Display Images**:
<img src="entry/src/main/resources/base/media/search1.png" alt="Search component interface display" style="width: 300px; margin-right: 10px;">
<img src="entry/src/main/resources/base/media/search2.png" alt="Search results display" style="width: 300px;">

### 3. Shopping Cart

**Function Description**: Manages products added by users, supporting product quantity adjustment, deletion, checkout and other operations.

**Implementation Plan**:
- Create `CartPage.ets` shopping cart page
- Use local storage to simulate shopping cart data persistence
- Implement product quantity increase/decrease, select all/unselect all, delete product and other functions
- Calculate total product price and quantity statistics

**Core Files**:
- `entry/src/main/ets/pages/CartPage.ets`

**Display Images**:
<img src="entry/src/main/resources/base/media/shoppingcart1.png" alt="Shopping cart empty state interface" style="width: 200px; margin-right: 10px;">
<img src="entry/src/main/resources/base/media/shoppingcart2.png" alt="Shopping cart product list display" style="width: 200px; margin-right: 10px;">
<img src="entry/src/main/resources/base/media/shoppingcart3.png" alt="Shopping cart checkout interface" style="width: 200px;">

### 4. Personal Center

**Function Description**: User personal center, displaying user information and related function entries.

**Implementation Plan**:
- Design personal center page layout, including user avatar, nickname, order information, etc.
- Implement order management, address management, favorites and other function entries
- Provide setting options, such as theme switching, message notification, etc.

**Core Files**:
- Related resources: `entry/src/main/ets/assets/我的.png`

**Display Images**:
<img src="entry/src/main/resources/base/media/carmine.png" alt="Personal center user avatar display" style="width: 100px; margin-right: 10px;">
<img src="entry/src/main/resources/base/media/ic_coupons.png" alt="Personal center coupons function entry" style="width: 100px; margin-right: 10px;">
<img src="entry/src/main/resources/base/media/ic_tab_profile.png" alt="Personal center bottom navigation icon" style="width: 100px;">

## Technical Implementation

### Concepts

- **WaterFlow**: A waterfall container for implementing irregular layouts of product lists
- **FlowItem**: A child component of the waterfall container, used to display a single product card
- **LazyForEach**: Iterates over data and creates components on demand, optimizing scrolling performance and memory usage
- **Swiper**: Carousel component, used for home page product recommendation display
- **Tabs**: Tab component, used to implement bottom navigation bar (home page, classification, shopping cart, my)

### Project Structure

```
entry/src/main/ets/
├── assets/          # Static resource files
├── common/          # Common constants and tool classes
├── entryability/    # Application entry
├── pages/           # Page components
│   ├── CartPage.ets        # Shopping cart page
│   ├── HomePage.ets        # Home page
│   └── ProductDetailPage.ets # Product detail page
├── view/            # Custom components
│   ├── ClassifyComponent.ets  # Classification component
│   ├── FlowItemComponent.ets  # Waterfall item component
│   ├── SearchComponent.ets    # Search component
│   ├── SwiperComponent.ets    # Carousel component
│   └── WaterFlowComponent.ets # Waterfall container component
└── viewmodel/       # View models
    ├── HomeViewModel.ets       # Home page view model
    ├── ProductItem.ets         # Product data model
    └── WaterFlowDataSource.ets # Waterfall data source
```

### Key Data Structures

#### Product Data Structure (ProductItem)

```typescript
export interface IProductItem {
  /**
   * Product image URL
   */
  image_url: string;

  /**
   * Product name
   */
  name: string;

  /**
   * Product discount
   */
  discount: string;

  /**
   * Product price
   */
  price: string;

  /**
   * Product promotion information
   */
  promotion: string;

  /**
   * Product bonus points
   */
  bonus_points: string;

  /**
   * Product detail
   */
  detail: string | string[];

  /**
   * Product category index (0: Home, 1: Phone, 2: Computer, 3: Food, 4: Wearable, 5: Headphone, 6: Furniture)
   */
  category: number;
}
```

**Core Field Description**:
- `image_url`: Product image network address or local resource path
- `name`: Complete product name
- `discount`: Product discount information, such as "8.5折"
- `price`: Product price, such as "¥1999"
- `promotion`: Product promotion activity information, such as "满1000减100"
- `bonus_points`: Points that can be obtained by purchasing the product
- `detail`: Product detailed description, supporting string or string array format
- `category`: Product category index, used for category filtering and display

## How to Use

1. Start the application and enter the home page to view products displayed in waterfall layout
2. Click on a product card to enter the product detail page
3. Use the top search box to search for products
4. Click on the bottom navigation bar to enter the shopping cart page
5. Click on the bottom navigation bar to enter the personal center

## Constraints

1. This application only supports running on Huawei phones
2. HarmonyOS version: HarmonyOS 5.0.5 Release or later
3. DevEco Studio version: DevEco Studio 6.0.0 Release or later
4. HarmonyOS SDK version: HarmonyOS 6.0.0 Release SDK or later

## License

See [LICENSE](LICENSE) file
