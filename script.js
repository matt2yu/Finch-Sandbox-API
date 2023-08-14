const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'; 

document.addEventListener('DOMContentLoaded', function() {
    const apiForm = document.getElementById('apiForm');
    const errorMessage = document.getElementById('errorMessage'); 


    apiForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const providerId = document.getElementById('providerId').value;
        const employeeSize = document.getElementById('employeeSize').value;

        try {
            const accessToken = await getAccessToken(providerId, employeeSize);
            const companyInfo = await getCompanyInfo(accessToken);
            const employeeDirectory = await getEmployeeDirectory(accessToken);

            sessionStorage.setItem('companyInfo', JSON.stringify(companyInfo));
            sessionStorage.setItem('employeeDirectory', JSON.stringify(employeeDirectory));

            window.location.href = 'results.html';
        } catch (error) {
            errorMessage.textContent = `A provider must be selected.`;
            console.error('Error:', error.message);
        }
    });
});

async function getAccessToken(providerId, employeeSize) {
    const products = [
        'company', 'directory', 'individual', 'employment' // not including payment and pay_statement
    ];

    const response = await axios.post(corsAnywhereUrl + 'https://sandbox.tryfinch.com/api/sandbox/create', {
        provider_id: providerId,
        products: products,
        employee_size: employeeSize
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data.access_token;
}

async function getCompanyInfo(accessToken) {
    try {
        const response = await axios.get(corsAnywhereUrl + 'https://sandbox.tryfinch.com/api/employer/company', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 501) {
            return null;
        }
    }
}

async function getEmployeeDirectory(accessToken) {
    const response = await axios.get(corsAnywhereUrl+ 'https://sandbox.tryfinch.com/api/employer/directory', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data;
}
