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
To clone and run this app you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/package-manager)(which comes with npm) installed.
enter the following in your command line:
```
# Clone this repository
$ git clone https://github.com/CiaranO-C/WagWise

# Go into the repository
$ cd WagWise

# Install dependencies
$ npm install

# Run the server
$ npm run server
```
## 📝 Usage
1. Configure local .env file.
2. Login with the guest account or create your own using a tool such as `curl` or `Postman`.
3. Copy the JWT access token provided after login to make requests to an endpoint of your choosing, endpoint details can be found below.
## 🔎 Endpoints
*Note: All endpoints are prefixed with "/api"*
Endpoints are organised by auth access
### Access
- [Public](#public)
  - [GET](#get)
- [User](#user)
  - [POST](#post)
  - [GET](#get-1)
  - [PUT](#put)
  - [DELETE](#delete)
- [Admin](#admin)
   - [POST](#post-1)
  - [GET](#get-2)
  - [PUT](#put-1)
  - [DELETE](#delete-1)
### Public
*Note: All endpoints are prefixed with "/api"*
#### GET
|Endpoint|Description|
|--------|-----------|
