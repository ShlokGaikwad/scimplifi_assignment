# File Upload and Session Management API

This is a simple Express.js API for uploading files, managing sessions, and performing calculations based on the content of uploaded files.

## Create Session
- URL: /api/v1/create-session
- Method: POST
- Description: Creates a new session and returns a unique session ID.
- Response:
   - session_id: Unique identifier for the created session.

## Upload File and Calculate Result
Upload a file containing mathematical equations to a session and calculate the total result.

- URL: /api/v1/upload-file/:session_id
- Method: POST
- Request Parameters:
- session_id: Unique identifier of the session.
- Request Body:
   - Form data with a file field named "file" containing the mathematical equations.
- Response:
   - result: Total result of all equations in the session after the upload.
     
