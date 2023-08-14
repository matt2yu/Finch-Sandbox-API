# Finch-Sandbox-API

This project demonstrates how to interact with the Finch Sandbox API to create a sandbox provider and get an access token. Using the token, the app will retrieve company and employee information using Node.js and Axios. It also includes the use of the `cors-anywhere` proxy server to address CORS issues during local development.

## Endpoints Used

- **POST /api/sandbox/create**: This endpoint is used to create a sandbox provider and return an access token for authentication.

- **GET /api/employer/company**: This endpoint retrieves company information.

- **GET /api/employer/directory**: This endpoint retrieves employee directory information.

## Setup and Usage

1. Clone the repository:
git clone <https://github.com/matt2yu/Finch-Sandbox-API.git>
cd finch-api-demo

2. Install dependencies:
npm i axios
npm i express
npm i body-parser
npm i -g cors-anywhere

3. cors-anywhere
Activate cors-anywhere session @ https://cors-anywhere.herokuapp.com/

## Notes
- 'company', 'directory', 'individual', 'employment' are the only products included in the request payload for POST /api/sandbox/create
- Input for providerId is required. Error message will appear if providerId is not selected
- Input for employee_size is restricted between 1-200
  
