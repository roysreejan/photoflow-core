# PhotoFlow Core

PhotoFlow is a full-stack social media application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to share photos, connect with others, and interact through likes, comments, and real-time updates. Designed with a responsive UI and scalable backend, PhotoFlow delivers a smooth and engaging social networking experience.

## Features

- User authentication (signup, login, logout, email verification with OTP)
- Password reset via email OTP
- User profile management (edit profile, profile picture upload)
- Follow/unfollow users
- Create, delete, like/dislike, and save/unsave posts
- Comment on posts
- Image upload and optimization (Cloudinary, Sharp)
- Secure API with JWT, HTTP-only cookies, and input sanitization
- Error handling and validation

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT, HTTP-only cookies
- **Image Uploads**: Cloudinary, Multer, Sharp
- **Email Service**: Nodemailer, Handlebars (for email templates)
- **Validation & Security**: Express Validator, Helmet, CORS, Input Sanitization
- **Environment Management**: dotenv
- **API Testing**: Postman

## Folder Structure

```
photoflow-core/
├── src/
│   ├── controllers/        # Route controllers for user, post, auth, error
│   │   ├── authController.js
│   │   ├── errorController.js
│   │   ├── postController.js
│   │   └── userController.js
│   ├── emailTemplate/      # Email templates (Handlebars)
│   │   └── otpTemplate.hbs
│   ├── middleware/         # Express middleware
│   │   ├── isAuthenticated.js
│   │   └── multer.js
│   ├── models/             # Mongoose models
│   │   ├── commentModel.js
│   │   ├── postModel.js
│   │   └── userModel.js
│   ├── routes/             # Express route definitions
│   │   ├── postRoutes.js
│   │   └── userRoutes.js
│   ├── utils/              # Utility functions and helpers
│   │   ├── appError.js
│   │   ├── catchAsync.js
│   │   ├── cloudinary.js
│   │   ├── datauri.js
│   │   ├── email.js
│   │   └── generateOtp.js
│   ├── app.js              # Express app setup
│   └── server.js           # Entry point for server
├── .env                    # Environment variables (not committed)
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
└── .vscode/                # VSCode settings (optional)
    └── settings.json
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (Atlas or local)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/roysreejan/photoflow-core
   cd photoflow-core
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your credentials.

4. **Start the development server:**
   ```sh
   npm run dev
   ```

   The server will run on `http://localhost:8000` by default.

## API Endpoints

### User Routes

- `POST /api/v1/users/signup` - Register a new user
- `POST /api/v1/users/verify` - Verify account with OTP
- `POST /api/v1/users/resend-otp` - Resend OTP
- `POST /api/v1/users/login` - Login
- `POST /api/v1/users/logout` - Logout
- `POST /api/v1/users/forget-password` - Request password reset OTP
- `POST /api/v1/users/reset-password` - Reset password with OTP
- `POST /api/v1/users/change-password` - Change password
- `GET /api/v1/users/profile/:id` - Get user profile
- `POST /api/v1/users/edit-profile` - Edit profile (with profile picture upload)
- `GET /api/v1/users/suggested-user` - Get suggested users
- `POST /api/v1/users/follow-unfollow/:id` - Follow/unfollow user
- `GET /api/v1/users/me` - Get current authenticated user

### Post Routes

- `POST /api/v1/posts/create-post` - Create a new post (with image upload)
- `GET /api/v1/posts/all` - Get all posts
- `GET /api/v1/posts/user-post/:id` - Get posts by user
- `POST /api/v1/posts/save-unsave-post/:postId` - Save/unsave a post
- `DELETE /api/v1/posts/delete-post/:id` - Delete a post
- `POST /api/v1/posts/like-dislike/:id` - Like/dislike a post
- `POST /api/v1/posts/comment/:id` - Add a comment to a post

## Environment Variables

See `.env.example` for all required environment variables:

- `NODE_ENV`
- `PORT`
- `DB`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `JWT_COOKIE_EXPIRES_IN`
- `EMAIL`
- `EMAIL_PASS`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## License

ISC

## Author

Sreejan Roy