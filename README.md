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
2. Login with the [guest account](#guest-account) or create your own using a tool such as `curl` or `Postman`.
3. Copy the JWT access token provided after login to make requests to an endpoint of your choosing, endpoint details can be found below.
## Guest Accounts
user login   -->  `Guest: guestPass1`\
admin login  -->  `Admin: adminPass1`
## 🔎 Endpoints
*Note: All endpoints are prefixed with "/api"*\
Endpoints are organised by auth access
### Overview
- [Public](#public)
  - [POST](#post)
  - [GET](#get)
- [User](#user)
  - [POST](#post-1)
  - [GET](#get-1)
  - [PUT](#put)
  - [DELETE](#delete)
- [Admin](#admin)
   - [POST](#post-2)
  - [GET](#get-2)
  - [PUT](#put-1)
  - [DELETE](#delete-1)

### Public
*Note: All endpoints are prefixed with "/api"*
#### POST
|Endpoint|Description|Response|
|--------|-----------|--------|
|/user/sign-up|Create an account|[res](#sign-up-response)|
|/user/log-in|Log into account|[res](#log-in-response)|

#### GET
|Endpoint|Description|Response|
|--------|-----------|--------|
|/tags|Get all tags|[res](#tags-get-response)|
|/tags/:tagName|Get tag by name|[res](#tag-get-response)|
|/articles|Get all articles|[res](#articles-get-response)|
|/articles/:id|Get article by id|[res](#article-get-response)|
|/user/refresh-token|Retrieve new access token|[res](#refresh-token-response)|


---

### User
*Note: All endpoints are prefixed with "/api"*
#### POST
|Endpoint|Description|Response|
|--------|-----------|--------|
|/articles/:id/comment|Post comment on article|[res](#comment-post-response)|

#### GET
|Endpoint|Description|Response|
|--------|-----------|--------|
|/user/:id/comments|Get list of user comments|[res](#comments-get-response)|

#### PUT
|Endpoint|Description|Response|
|--------|-----------|--------|
|

#### DELETE
|Endpoint|Description|Response|
|--------|-----------|--------|
|/user/comments/:id|Delete own comment|[res](#comments-delete-response)|

---

### Admin
*Note: All endpoints are prefixed with "/api"*
#### POST
|Endpoint|Description|Response|
|--------|-----------|--------|
|/tags|Create a new tag|[res](#tags-post-response)|
|/articles|Create a new article|[res](#articles-post-response)|


#### GET
|Endpoint|Description|Response|
|--------|-----------|--------|

#### PUT
|Endpoint|Description|Response|
|--------|-----------|--------|
|/tags/:tagName|Update existing tag|[res](#tag-put-response)|
|/articles/:id|Update existing article|[res](#article-put-response)|

#### DELETE
|Endpoint|Description|Response|
|--------|-----------|--------|
|/tags/:tagName|Delete tag|[res](#tag-delete-response)|
|/articles/:id|Delete article|[res](#article-delete-response)|
|/user/comments/:id|Delete a users comment|[res](#admin-comment-delete-response)|

## ↩️ Responses
### User
#### Sign-up response
On a successful sign-up the api will respond with json containing a success message along with the newly created user’
```json
{
    "message": "user created succesfully",
    "newUser": {
        "id": 3,
        "role": "USER",
        "username": "Guest",
        "email": null,
        "password": "$2a$10$jbSRYv49IfulSzJmJTGTiW3!l2z0pxnZ9QXeQW6D5jD4RtP97JC8ePS"
    }
}
```
#### Log-in response
After succesfully logging in, the client will be returned a new JWT access token
```json
{
    "jwt": "eyJhbGciOiJIUzMdfrhsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTsdhucei37n4NSwiZXhwIjoxNzI0MTY0NzA1fQ.IaaZu864xweQk3NvaRJnZRy9LjiWEWjZ2xFkt7mIuc73qQZjDxwlc1lbwNrAK2Wv"
}
```
#### Refresh Token response
Upon submitting a valid refresh token, a new JWT access token will be granted to the client.
```json
{
    "jwt": "eyJhbGciOiJIet4M4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyNNbOpW210OCwiZXhwIjoxNzI0MTY0ODY4fQ.bJY6JcKNSQWV0LkAg-FKM5JGstFfTiDSvChjPoL5ZvTyjaM_CxLPNnKcot8oQqHI"
}
```
#### Comments get response
#### Comments delete response
#### Admin comment delete response
### Tags
#### Tags get response
Api will respond with a list of all existing tags.
```json
{
    "tags": [
        {
            "tagName": "Training"
        },
        {
            "tagName": "Feeding"
        }
    ]
}
```
#### Tag get response
If a matching tag exists, json containing the tagName in question, and any related articles will be returned
#### Tags post response
Once a tag has been successfully created, api will respond with json containing the new tag.
```json
{
    "newTag": {
        "tagName": "Training"
    }
}
```
#### Tag put response
#### Tag delete response
### Articles
#### Articles get response
A get request to articles will return a json list of all existing articles
```json
{
    "articles": [
        {
            "id": 2,
            "title": "Train your dog to sit",
            "body": "Always wanted a dog that sits on command? ....",
            "task": null,
            "authorId": 4,
            "created": "2024-08-20T15:54:45.894Z",
            "published": false
        },
        {
            "id": 1,
            "title": "Training your dog to wait for their food",
            "body": "Follow these steps to have a perfectly behaved pup....",
            "task": null,
            "authorId": 4,
            "created": "2024-08-20T15:44:06.155Z",
            "published": false
        }
    ]
}
```
#### Article get response
The api will return json containing the article with a matching id
```json
{
    "article": {
        "id": 2,
        "title": "Train your dog to sit",
        "body": "Always wanted a dog that sits on command? ....",
        "task": null,
        "authorId": 4,
        "created": "2024-08-20T15:54:45.894Z",
        "published": false
    }
}
```
#### Articles post response
After posting a newly written article, the api will return json including extra information such as 'authorId', 'created' and 'published'.
```json
{
    "article": {
        "id": 1,
        "title": "Training your dog to wait for their food",
        "body": "Follow these steps to have a perfectly behaved pup....",
        "task": null,
        "authorId": 4,
        "created": "2024-08-20T15:44:06.155Z",
        "published": false
    }
}
```
#### Article put response
#### Article delete response
#### Comment post response


---
## 🖇️ Credits
This software uses the following packages
- [Node.js](https://nodejs.org/en/download/package-manager)
- [Express](https://expressjs.com)
- [Express-validator](https://express-validator.github.io/docs/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [Passport.js](https://www.passportjs.org)
- [uuid](https://github.com/uuidjs/uuid#readme)
- [obscenity](https://github.com/jo3-l/obscenity#readme)
- [dotenv](https://github.com/motdotla/dotenv#readme)
- [Prisma](https://www.prisma.io)
