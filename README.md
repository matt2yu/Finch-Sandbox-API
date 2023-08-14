# Finch-Sandbox-API

This project demonstrates how to interact with the Finch Sandbox API to create a sandbox provider and get an access token. Using the token, the app will retrieve company and employee information using Node.js and Axios. It also includes the use of the `cors-anywhere` proxy server to address CORS issues during local development.

## Endpoints Used

- **POST /api/sandbox/create**: endpoint is used to create a sandbox provider and return an access token for authentication

- **GET /api/employer/company**: endpoint retrieves company information

- **GET /api/employer/directory**: endpoint retrieves employee directory information

## Setup and Usage

1. Clone the repository:
git clone <https://github.com/matt2yu/Finch-Sandbox-API.git>
2. Install dependencies:
  - npm i axios
  - npm i express
  - npm i body-parser
  - npm i -g cors-anywhere
3. Activate cors-anywhere
  - cors-anywhere session: https://cors-anywhere.herokuapp.com/
4. Run server
  - Run in terminal: node server.js
  - Go to http://localhost:3000 in your web browser

## Notes
- 'company', 'directory', 'individual', 'employment' are the only products included in the request payload for POST /api/sandbox/create
- Input for providerId is required. Error message will appear if providerId is not selected and errorCode400 is returned
- Input for employee_size is restricted between 1-200
- Retrieving company data is not implemented for some providerId's. Error message will appear if errorCode501 is returned
  
