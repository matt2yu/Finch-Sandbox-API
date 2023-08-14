document.addEventListener('DOMContentLoaded', function() {
    const companyInfoDiv = document.getElementById('companyInfo');
    const companyErrorDiv = document.getElementById('companyError'); 
    const employeeDirectoryDiv = document.getElementById('employeeDirectory');
    const userDetailsDiv = document.getElementById('userDetails'); 

    const companyInfo = JSON.parse(sessionStorage.getItem('companyInfo'));
    const employeeDirectory = JSON.parse(sessionStorage.getItem('employeeDirectory'));
    
    if (companyInfo) {
        const companyInfoHTML = `
            <p><strong>ID:</strong> ${companyInfo.id}</p>
            <p><strong>Legal Name:</strong> ${companyInfo.legal_name}</p>
            <p><strong>Entity Type:</strong> ${companyInfo.entity.type}</p>
            <p><strong>EIN:</strong> ${companyInfo.ein}</p>
            <p><strong>Primary Email:</strong> ${companyInfo.primary_email}</p>
            <p><strong>Primary Phone Number:</strong> ${companyInfo.primary_phone_number}</p>
            <h3>Departments</h3>
            <ul>
                ${companyInfo.departments.map(department => `<li>${department.name}</li>`).join('')}
            </ul>
            <h3>Locations</h3>
            <ul>
                ${companyInfo.locations.map(location => `<li>${location.line1}, ${location.city}, ${location.state}, ${location.postal_code}, ${location.country}</li>`).join('')}
            </ul>
            ${companyInfo.accounts ? `<h3>Accounts</h3>
            <ul>
                ${companyInfo.accounts.map(account => `<li>${account.institution_name}, ${account.account_name}, ${account.account_number}, ${account.account_type}, ${account.routing_number}</li>`).join('')}
            </ul>` : ''}
        `;
        companyInfoDiv.innerHTML = companyInfoHTML;
    } else {
        companyErrorDiv.innerHTML = `<p>Company information is not available for provider. Endpoint not implemented.</p>`;
    }

    if (employeeDirectory) {
        const individuals = employeeDirectory.individuals;

        if (individuals && individuals.length > 0) {
            const userList = document.createElement('ul');
            individuals.forEach(user => {
                const userItem = document.createElement('li');
                const userLink = document.createElement('a');
                userLink.textContent = user.first_name + ' ' + user.last_name;
                userLink.href = '#';
                userLink.addEventListener('click', () => {
                    displayUserDetails(user);
                });
                userItem.appendChild(userLink);
                userList.appendChild(userItem);
            });
            employeeDirectoryDiv.appendChild(userList);
        } else {
            employeeDirectoryDiv.innerHTML = '<p>No employee directory available.</p>';
        }
    } 
    
    userDetailsDiv.innerHTML = ''; 
});

function displayUserDetails(user) {
    const userDetailsDiv = document.getElementById('userDetails');

    userDetailsDiv.innerHTML = `
        <h3>${user.first_name} ${user.last_name}</h3>
        <p>ID: ${user.id}</p>
        <p>Middle Name: ${user.middle_name || 'N/A'}</p>
        <p>Manager ID: ${user.manager ? user.manager.id || 'N/A' : 'N/A'}</p>
        <p>Department: ${user.department ? user.department.name || 'N/A' : 'N/A'}</p>
        <p>Active: ${user.is_active ? 'Yes' : 'No'}</p>
    `;
}
