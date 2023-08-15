const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cors());

let accessToken = null;

app.post('/getAccessToken', async (req, res) => {
    try {
        const { providerId, employeeSize, productz } = req.body;

        // Make the API request to obtain the access token
        const response = await axios.post('https://sandbox.tryfinch.com/api/sandbox/create', {
                provider_id: providerId,  
                employee_size: employeeSize, 
                products: productz,

            headers: {
                'Content-Type': 'application/json'            }
        });
        accessToken = response.data.access_token; 
        res.json(response.data); 
    } catch (error) {
        console.error('Error obtaining access token:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/getCompanyInfo', async (req, res) => {
    try {
        if (!accessToken) {
            return res.status(401).send('Unauthorized');
        }
        const response = await axios.get('https://sandbox.tryfinch.com/api/employer/company', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const companyInfo = response.data; 
        res.json(companyInfo);
    } catch (error) {
        console.error('Error fetching company information:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/getEmployeeDirectory', async (req, res) => {
    try {
        if (!accessToken) {
            return res.status(401).send('Unauthorized');
        }

        const response = await axios.get('https://sandbox.tryfinch.com/api/employer/directory', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const employeeDirectory = response.data; 
        res.json(employeeDirectory);
    } catch (error) {
        console.error('Error fetching employee directory:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
