# Faebook

![alt-text](/docs/screenshots/darcy-profile-page.png "Darcy")

## Summary

**Faebook** is a real-time, immersive social networking site inspired by [Facebook](https://www.facebook.com) and uniquely tailored for fans of the Zodiac Academy book series by Caroline Peckham and Susanne Valenti. In this magical world, users are assigned a zodiac sign based on their date of birth during signup, which determines their "House" and magical attributes, creating a personalized and thematic experience. The "About Me" section is enriched with fields such as a fae's Power Elements, Magic Order, and Academy House, replacing the traditional fields like education, hometown, and workplace found on Facebook.

## Live Demo

Explore **Faebook** live at [faebook.fly.dev](https://faebook.fly.dev). For the best experience, try logging in as one of the characters from the Zodiac Academy universe. Otherwise, enjoy creating your own account and exploring the features!

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

![alt-text](/docs/screenshots/login.png "Log In")
![alt-text](/docs/screenshots/signup.png "Sign In")

### Posts

Posts have a polymorphic `content` column which allows for other content to be displayed in addition to the post body.
This allows for posts to display an attached picture, or a preview of a URL, inside of them.

### Automatic Parsing of URLs in Posts

When users include URLs in their post the link is automatically parsed and meta-data is fetched using LinkPreview API. The metadata is then stored in the db as a polymorphic association to the post.
A thumbnail and description of the URL is then displayed in the `Post` next to what was originally typed.
![alt-text](/docs/gifs/post-url-attached.gif "Post Url")

### Photo Upload

Using the React Context as the single source of truth allows for images to update everywhere on the site in real-time. Whenever a user updates their avatar or cover photo, it is reflected immediately everywhere on the site and to other users.

Faebook leverages ActionStorage and AWS for optimal storage of photos. Uploaded images are automatically stored on AWS in various sizes, ensuring that pages always display images of the correct size and aspect ratio.

Users can attach photos to posts, which will be saved in a `Timeline` Album. A preview of the photo can be seen before creating the post.

![alt-text](/docs/gifs/profile-photo-upload.gif "Photo Upload")

### Real-Time Chat Messenger

Faebook includes a real-time chat messenger, enabling seamless communication between users. This feature is implemented using Rails' ActionCable for WebSocket functionality, ensuring real-time updates as users exchange messages.

**How It Works:**

- The frontend connects to the WebSocket server using ActionCable.
- Each chat is represented as a conversation, uniquely identified by the participants involved.
- Messages are sent and received via the WebSocket connection, which automatically updates the chat interface for both participants without the need for page refreshes.

**How to Use:**

1. Navigate to a friend's profile page by clicking on their name or avatar in the Friends section.
2. On their profile page, just below their cover photo, you'll see a Messenger button.
3. Click the Messenger button to initiate a chat.
4. The chat window opens, and you can start typing and sending messages in real time.

![alt-text](/docs/gifs/messaging-max-geraldine.gif "Max-Geraldine-Messages")

### Mobile-responsiveness

Faebook is fully mobile-responsive, allowing users to enjoy the platform on any device. CSS media queries (@media screen) have been used extensively to adapt the layout and components for smaller screens, ensuring an optimized and seamless experience on mobile devices.

![alt-text](/docs/gifs/mobile-version.gif "Photo Upload")

## Disclaimer

This project, Faebook, is a fan-made clone created for educational purposes. It is not affiliated with or endorsed by Meta Platforms, Inc. (the owners of Facebook) or by Caroline Peckham and Susanne Valenti (the authors of Zodiac Academy).

- The Facebook logo, design, and related intellectual property are the property of Meta Platforms, Inc.
- Zodiac Academy characters, names, and world-building elements are the intellectual property of Caroline Peckham and Susanne Valenti.

This project is intended solely for personal learning and exploration of web development concepts. No commercial use is intended or permitted.

## Contact

For any questions or support, please contact me at diana.m.chirica@gmail.com
