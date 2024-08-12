# Faebook

## Summary

**Faebook** is a fully real-time social-networking site inspired by [Facebook](https://www.facebook.com) and tailored for characters of Zodiac Academy books. In **Faebook**, users are assigned a zodiac sign based on their date of birth provided during signup. The "About Me" section features unique details such as a fae's power elements, magic order and academy house, replacing the traditional fields like education, hometown, and workplace found on Facebook.
**Faebook** is deployed using [Fly](https://fly.io/)

### Back End

**Faebook** is built using Ruby on Rails with a PostgreSQL database. Data requests are handled by AXIOS requests and responses are in JSON format, built with Jbuilder. The backend was developed using Test-Driven Development (TDD) and all routes are tested with Rails Minitest.

### Front End

**Faebook** is a single-page app built using React on the frontend. It utilizes WebSockets via ActionCable to implement real-time updates. React Context is used to manage state and ensure seamless integration between the frontend and backend.

**Faebook** uses:

- [React](https://react.dev)
- [React-Icons](https://github.com/react-icons/react-icons)
- [React-Modal](https://github.com/reactjs/react-modal)
- [React-Redux](https://github.com/reactjs/react-redux)
- [BCrypt](https://github.com/codahale/bcrypt-ruby) for authorization
- [LinkPreview](https://www.linkpreview.net/)
- [Vite](https://github.com/vitejs/vite) for compiling

## Features

### Authentication

Session authentication is handled on the backend using BCrypt and enforced with session tokens. Automatic redirection to the login/signup page occurs when not logged in.
![alt-text](/docs/screenshots/login.gif "Photo Upload")
![alt-text](/docs/screenshots/signup.gif "Photo Upload")

### Posts

Posts have a polymorphic `content` column which allows for other content to be displayed in addition to the post body.
This allows for posts to display an attached picture, or a preview of a URL, inside of them.

### Automatic Parsing of URLs in Posts

When users include URLs in their post the link is automatically parsed and meta-data is fetched using LinkPreview API. The metadata is then stored in the db as a polymorphic association to the post.
A thumbnail and description of the URL is then displayed in the `Post` next to what was originally typed.
![alt-text](/docs/gifs/post-url-attached.gif "Photo Upload")

### Photo Upload

Using the React Context as the single source of truth allows for images to update everywhere on the site in real-time. Whenever a user updates their avatar or cover photo, it is reflected immediately everywhere on the site and to other users.

Faebook leverages ActionStorage and AWS for optimal storage of photos. Uploaded images are automatically stored on AWS in various sizes, ensuring that pages always display images of the correct size and aspect ratio.

Users can attach photos to posts, which will be saved in a `Timeline` Album. A preview of the photo can be seen before creating the post.

![alt-text](/docs/gifs/profile-photo-upload.gif "Photo Upload")

### Real-Time Chat Messenger

Faebook includes a real-time chat messenger. This feature is implemented using ActionCable and Rails Context to connect the frontend to the backend's WebSocket, ensuring seamless real-time communication.

## Installation and configuration

To document whatever steps are necessary to get the application up and running:

- Ruby version (ruby '3.2.3')

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...

## Contact

For any questions or support, please contact me at diana.m.chirica@gmail.com
