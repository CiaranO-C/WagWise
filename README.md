
&nbsp;![wagwise-header](https://github.com/user-attachments/assets/c4ad3afe-a46a-47d5-aef5-d48369f158a4)

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
|/user/sign-up|Create an account|[Sign-up response](#sign-up-response)|
|/user/log-in|Log into account|[Log in response](#log-in-response)|

#### GET
|Endpoint|Description|Response|
|--------|-----------|--------|
|/tags|Gets all article tags|[Get all tags response](#tags-get-response)|
|/tags/:tagName|Get tag by name|[Get Tag name response](#tag-get-response)|
|/articles|Gets all published articles|[Get all articles response](#articles-get-response)|
|/articles/:id|Gets a single article by id|[Get article response](#article-get-response)|
|/user/refresh-token|A valid refresh token retrieve a fresh access token|[Refresh token resposne](#refresh-token-response)|


---

### User
*Note: All endpoints are prefixed with "/api"*
#### POST
|Endpoint|Description|Response|
|--------|-----------|--------|
|/articles/:id/comment|Posts a comment on current article|[Post comment response](#comment-post-response)|

#### GET
|Endpoint|Description|Response|
|--------|-----------|--------|
|/user/comments|Gets list of users own comments|[Get comments response](#comments-get-response)|

#### PUT
|Endpoint|Description|Response|
|--------|-----------|--------|
|

#### DELETE
|Endpoint|Description|Response|
|--------|-----------|--------|
|/user/comments/:id|User can delete their own comment|[Delete comment response](#comments-delete-response)|

---

### Admin
*Note: All endpoints are prefixed with "/api"*
#### POST
|Endpoint|Description|Response|
|--------|-----------|--------|
|/tags|Creates a new article tag|[Post tag response](#tags-post-response)|
|/articles|Creates a new article|[Post article response](#articles-post-response)|


#### GET
|Endpoint|Description|Response|
|--------|-----------|--------|

#### PUT
|Endpoint|Description|Response|
|--------|-----------|--------|
|/tags/:tagName|Updates an existing tags name|[Put tag response](#tag-put-response)|
|/articles/:id|Updates an existing article by id|[Put article response](#article-put-response)|

#### DELETE
|Endpoint|Description|Response|
|--------|-----------|--------|
|/tags/:tagName|Deletes article tag|[Delete tag response](#tag-delete-response)|
|/articles/:id|Delete any article by id|[Delete article response](#article-delete-response)|
|/user/admin/comments/:id|Delete any non-admin users comment|[Delete comment response](#admin-comment-delete-response)|

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
#### Comments GET response
A successful GET request will return a response containing a json list of all the current users comments, including the articleID.
```json
{
    "comments": [
        {
            "id": 1,
            "text": "I can't wait to win Crufts!",
            "authorId": 3,
            "articleId": 1
        },
        {
            "id": 2,
            "text": "thanks for the tips!",
            "authorId": 3,
            "articleId": 1
        }
    ]
}
```
#### Comments DELETE response
A DELETE request to a users own comment, will return a json response containing the deleted comment.
```json
{
    "deleted": {
        "id": 2,
        "text": "thanks for the tips!",
        "authorId": 3,
        "articleId": 1
    }
}
```
#### Admin comment DELETE response
A DELETE request by an admin can remove any comment, on success the server will respond with json containing the deleted comment.
```json
{
    "deleted": {
        "id": 4,
        "text": "This article SUCKS and SO DO YOU!!!!!!!",
        "authorId": 3,
        "articleId": 1
    }
}
```
### Tags
#### Tags GET response
The API will respond with a list of all existing tags.
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
#### Tag GET response
If a matching tag exists, json containing the tagName in question, and any related articles will be returned
```json
{
    "tag": {
        "tagName": "Training",
        "articles": [
            {
                "id": 1,
                "title": "Training your dog to wait for their food",
                "body": "Follow these steps to have a perfectly behaved pup....",
                "task": null,
                "authorId": 4,
                "created": "2024-08-20T15:44:06.155Z",
                "published": false
            },
            {
                "id": 2,
                "title": "Train your dog to sit",
                "body": "Always wanted a dog that sits on command? ....",
                "task": null,
                "authorId": 4,
                "created": "2024-08-20T15:54:45.894Z",
                "published": false
            }
        ]
    }
}
```
#### Tags POST response
Once a tag has been successfully created, api will respond with json containing the new tag.
```json
{
    "newTag": {
        "tagName": "Training"
    }
}
```
#### Tag PUT response
A successful PUT request will return json containing the previous name of the tag, and the newly updated tag
```json
{
    "previous": "Training",
    "updated": {
        "tagName": "Obedience Training"
    }
}
```
#### Tag DELETE response
A successful DELETE request will return json containing the deleted tag
```json
{
    "deleted": {
        "tagName": "Feeding"
    }
}
```
### Articles
#### Articles GET response
A GET request to articles will return a json list of all existing articles
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
#### Article GET response
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
#### Articles POST response
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
#### Article PUT response
A successful PUT request will return json containing the updated article.
```json
{
    "article": {
        "id": 2,
        "title": "Train your dog paw!",
        "body": "We already know sit... lets train paw! ...",
        "task": null,
        "authorId": 4,
        "created": "2024-08-20T15:54:45.894Z",
        "published": false
    }
}
```
#### Article DELETE response
A successful DELETE request will respond with json containing the deleted article.
```json
{
    "deleted": {
        "id": 2,
        "title": "Train your dog paw!",
        "body": "We already know sit... lets train paw! ...",
        "task": null,
        "authorId": 4,
        "created": "2024-08-20T15:54:45.894Z",
        "published": false
    }
}
```
#### Comment POST response
A successful POST request will respond with json containing the newly created comment
```json
{
    "comment": {
        "id": 1,
        "text": "I can't wait to win Crufts!",
        "authorId": 4,
        "articleId": 1
    }
}
```

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
