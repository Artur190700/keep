# Note Management System API Documentation

This document provides the details of the API endpoints for the Note Management System. The system supports user authentication and CRUD operations on notes.

## Base URL

The API is accessible at: `http://localhost:3000`

## Endpoints

### User Authentication

#### Sign Up

- **Endpoint:** `/signup`
- **Method:** `POST`
- **Body:**
  - `username`: String (required)
  - `password`: String (required)
- **Response:** User object and JWT token.

#### Log In

- **Endpoint:** `/login`
- **Method:** `POST`
- **Body:**
  - `username`: String (required)
  - `password`: String (required)
- **Response:** User object and JWT token.

### Notes

_Note: All notes endpoints require the user to be authenticated. The JWT token obtained during login must be included in the Authorization header as a Bearer token._

#### Create a New Note

- **Endpoint:** `/notes`
- **Method:** `POST`
- **Headers:**
  - `Authorization`: "Bearer [your_token]"
- **Body:**
  - `title`: String (required)
  - `content`: String (required)
- **Response:** Newly created note object.

#### Get All Notes of Logged-In User

- **Endpoint:** `/notes`
- **Method:** `GET`
- **Headers:**
  - `Authorization`: "Bearer [your_token]"
- **Response:** Array of note objects.

#### Get a Specific Note

- **Endpoint:** `/notes/{id}`
- **Method:** `GET`
- **Headers:**
  - `Authorization`: "Bearer [your_token]"
- **URL Parameters:**
  - `id`: Note ID
- **Response:** Note object.

#### Update a Specific Note

- **Endpoint:** `/notes/{id}`
- **Method:** `PUT`
- **Headers:**
  - `Authorization`: "Bearer [your_token]"
- **URL Parameters:**
  - `id`: Note ID
- **Body:**
  - `title`: String (optional)
  - `content`: String (required)
- **Response:** Updated note object.

#### Delete a Specific Note

- **Endpoint:** `/notes/{id}`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization`: "Bearer [your_token]"
- **URL Parameters:**
  - `id`: Note ID
- **Response:** Success message or error.

## Error Handling

- All endpoints may return an error response, typically with a status code of 400 for client errors or 500 for server errors.
- Authentication errors return a 401 status code.
- Accessing a non-existent note or an unauthorized note returns a 404 status code.
