# JWT Auth Token Demo

This repository demonstrates how JWT auth tokens work. It includes a simple example of adding a product with proper authentication using JWT.

## Getting Started

### Step 1: Clone the Repository
```sh
git clone https://github.com/chandisarandeni/awt-auth-token.git
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory and add the following:
```env
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your secret key, e.g., "ASDWDERQ#dasd!">
```

### Step 3: Install Dependencies
```sh
npm install
```

### Step 4: Start the Server
```sh
npm start
```

### Step 5: Test with Postman

Base URL:
```
http://localhost:3000
```

### Step 6: Register a User

Send a POST request to `/register` with the following JSON body:
```json
{
  "username": "<< enter email address >>",
  "password": "<< enter password >>",
  "role": "admin"
}
```

> If you omit the `role` field, the user will be registered as a **student** by default.

### Step 7: Login as admin

Send a POST request to `/login` with the following JSON body:
```json
{
  "username": "<< enter admin email address >>",
  "password": "<< enter password >>"
}
```

### Step 8: Copy the auth token and paste it in the Authorization header
```sh
Authorization: Bearer <your JWT token>
```


### Step 9: Add product

Send a POST request to `/add-product` with the following JSON body:
```json
{
  "productId": "<< unique product ID >>",
  "productName": "<< product name >>",
  "productDescription": "<< product description >>",
  "productPrice": << numeric value : ex -> 100 >>
}
```

### Step 10: Test the program with invalid credentials

- You can try different ways to test the validations

---
If you have any suggestions for improvement, feel free to submit a pull request.