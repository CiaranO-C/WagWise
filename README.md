![wagwise header](https://github.com/user-attachments/assets/f4021ad7-4cb7-4f37-811f-5b8783ce590b)
&nbsp;
&nbsp;
## 🐕 Introduction
Welcome to the Wag Wise API. This RESTful API connects to the backend of the Wag Wise website, handling all interactions with the site's content for both users and admins.
## 📌 Features
- A simple API that makes it easy to interact with blog data.
- Passport authentication and JWT authorization.
- Users are able to interact with articles via likes and comments.
- Admin's recieve full CRUD operations for users, articles, comments, and more.
## 😃 User Inteface
The source code for the public/user facing front-end can be found here: /*Insert repo link*/
## 🔧 Content Management System 
The source code for the Admin CMS front-end can be found here: /*Insert repo link*/
## ⬇️ Installation
1. Clone the repository to your local machine: `git clone https://github.com/CiaranO-C/WagWise.git`
2. Open the project directory: `cd WagWise`.
3. Install required dependencies: `npm install`.
4. Run the dev server: `npm run server`.
## 📝 Usage
1. Configure local .env file.
2. Login with the guest account or create your own using a tool such as `curl` or `Postman`.
3. Copy the JWT access token provided after login to make requests to an endpoint of your choosing, endpoint details can be found below.
## 🔎 Endpoints
*Note: All endpoints are prefixed with "/api"*
Endpoints are organised by authorisation
### Access
- Public
  - GET
- User
  - POST
  - GET
  - PUT
  - DELETE
- Admin
  - POST
  - GET
  - PUT
  - DELETE
### Public
*Note: All endpoints are prefixed with "/api"*
#### GET
|Endpoint|Description|
|--------|-----------|
