document.getElementById('apiForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    try {
        const formData = new FormData(event.target);
        const providerId = formData.get('providerId');
        const employeeSize = formData.get('employeeSize');

        const accessTokenResponse = await fetch('/getAccessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': event.target.origin
            },
            body: JSON.stringify({
                providerId,  
                employeeSize, 
                productz: ["company", "directory", "individual", "employment"]
            })
        });

        if (accessTokenResponse.ok) {
            const accessTokenData = await accessTokenResponse.json();
            const accessToken = accessTokenData.access_token;

            const companyInfoResponse = await fetch('/getCompanyInfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const companyInfo = await companyInfoResponse.json();

            const employeeDirectoryResponse = await fetch('/getEmployeeDirectory', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const employeeDirectory = await employeeDirectoryResponse.json();

            sessionStorage.setItem('companyInfo', JSON.stringify(companyInfo));
            sessionStorage.setItem('employeeDirectory', JSON.stringify(employeeDirectory));

            window.location.href = '/results.html';
        } else {
            const errorData = await accessTokenResponse.text();
            console.error('Error:', errorData);
        }
    } catch (error) {
        console.error(error);
    }
});
