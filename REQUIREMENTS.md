# Storefront API Docs

## Users Route

### POST /users/signup

Creates a new account.

| Param      | Type   | Description            |
| ---------- | ------ | ---------------------- |
| first_name | string | First name of the user |
| last_name  | string | Last name of the user  |
| username   | string | Username of the user.  |
| password   | string | Password of the user.  |

Returns user and a token. Response example:

`{ user: { id: 1, first_name: "John", last_name: "Doe", username: "john" }, token: "xxx" }`

### POST /users/authenticate

Authenticates the user.

| Param    | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| username | string | Username assiociated with the user. |
| password | string | Password assiociated with the user. |

Returns user and a token. Response example:

`{ user: { id: 1, first_name: "John", last_name: "Doe", username: "john" }, token: "xxx" }`

### GET /users - TOKEN REQUIRED

Fetches all users. Response example:

`[{ id: 1, first_name: "John", last_name: "Doe", username: "john" }, ...]`

### GET /users/:id - TOKEN REQUIRED

Fetches user's info by id.

| Param | Type   | Description              |
| ----- | ------ | ------------------------ |
| id    | string | User ID to get info for. |

Returns user's info. Response example:

`{ id: 1, first_name: "John", last_name: "Doe", username: "john" }`

## Products Route

### GET /products

Fetches all products. Response example:

`[{ id: 1, name: "Product 1", price: 499, category: "MOBILE_PHONES" }]`

### GET /products/:id

Fetches product's info by id.

| Param | Type   | Description                 |
| ----- | ------ | --------------------------- |
| id    | string | Product ID to get info for. |

Returns product's info. Response example:

`{ id: 1, name: "Product 1", price: 499, category: "MOBILE_PHONES" }`

### POST /products - TOKEN REQUIRED

Creates a new product.

| Param    | Type   | Description             |
| -------- | ------ | ----------------------- |
| name     | string | Name of the product.    |
| price    | number | Price of the product.   |
| category | string | Category of the product |

Returns created product. Response example:

`{ id: 1, name: "Product 1", price: 499, category: "MOBILE_PHONES" }`

## Orders Route

### GET /user/:id/orders - TOKEN REQUIRED

Fetches all user orders.

| Param | Type   | Description                |
| ----- | ------ | -------------------------- |
| id    | string | User ID to get orders for. |

Response example:

`[{ id: 1, status: "ACTIVE", user_id: "1" }]`

### GET /user/:id/orders/completed - TOKEN REQUIRED

Fetches all user completed orders.

| Param | Type   | Description                |
| ----- | ------ | -------------------------- |
| id    | string | User ID to get orders for. |

Response example:

`[{ id: 1, status: "COMPLETE", user_id: "1" }]`

### POST /order/:id/complete - TOKEN REQUIRED

Marks order as complete.

| Param | Type   | Description                   |
| ----- | ------ | ----------------------------- |
| id    | string | Order ID to mark as complete. |

Returns order's info with complete status. Response example:

`{ id: 1, status: "COMPLETE", user_id: "1" }`

### POST /orders - TOKEN REQUIRED

Creates a new order associated with logged in user.

Returns created order. Response example:

`{ id: 1, status: "ACTIVE", user_id: "1" }`

## Dashboard Route

### GET /products/category/:category

Fetches all products of specific category.

| Param    | Type   | Description    |
| -------- | ------ | -------------- |
| category | string | Category name. |

Response example:

`{ id: 1, name: "Product 1", price: 499, category: "MOBILE_PHONES" }`

### GET /expensive

Fetches five most expensive products. Response example:

`[{ id: 1, name: "Product 1", price: 499, category: "MOBILE_PHONES" }, { id: 2, name: "Product 2", price: 399, category: "MOBILE_PHONES" }, ...]`

### GET /products_in_orders - TOKEN REQUIRED

Get all products in order. Response example:

`{ name: "Product 1", price: 499, order_id: "1" }`

### GET /users_with_orders - TOKEN REQUIRED

Get all users with orders. Response example:

`[{ id: 1, first_name: "John", last_name: "Doe", username: "john" }, ...]`

### POST /products/orders - TOKEN REQUIRED

Get all users with orders.

| Param      | Type   | Description              |
| ---------- | ------ | ------------------------ |
| product_id | string | Product ID.              |
| order_id   | string | Order ID.                |
| quantity   | number | Quantity of the product. |

Returns created order product. Response example:

`{ id: 1, quantity: 5, order_id: "1", product_id: "1" }`

## Data Shapes

### Product

| Param    | Type   | Description              |
| -------- | ------ | ------------------------ |
| id       | number | Product ID.              |
| name     | string | Name of the product.     |
| price    | number | Price of the product.    |
| category | string | Category of the product. |

### User

| Param      | Type   | Description             |
| ---------- | ------ | ----------------------- |
| id         | number | Product ID.             |
| username   | string | Username of the user.   |
| first_name | string | First name of the user. |
| last_name  | string | Last name of the user.  |
| password   | string | Password of the user.   |

### Orders

| Param   | Type   | Description                        |
| ------- | ------ | ---------------------------------- |
| id      | number | Order ID.                          |
| status  | string | Status of the order.               |
| user_id | string | User ID associated with the order. |

## Order Product

| Param      | Type   | Description              |
| ---------- | ------ | ------------------------ |
| id         | number | Order Product ID.        |
| quantity   | number | Quantity of the product. |
| order_id   | string | Order ID.                |
| product_id | string | Product ID.              |
