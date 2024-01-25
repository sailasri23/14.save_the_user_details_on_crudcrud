function handleFormSubmit(event) {
    event.preventDefault();
    const expense = event.target.expense.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    // Create expense object
    const expenseData = {
        expense,
        description,
        category
    };


    axios.post('https://crudcrud.com/api/cf96e8c47c924810895b5ff8fceae155/expensetracker',expenseData)
    .then((response) => {
        showscreen(response.data._id, response.data)
    })
    .catch((err)=>{
        document.body.innerHTML = document.body.innerHTML+"<h4> Something went wrong</h4>"
        console.log(err);

    })
   }
   function showscreen(key, expenseData) {
    const parentele = document.getElementById("userList");
    const childele = document.createElement('li');
    childele.className = 'list-group-item d-flex justify-content-between align-items-center';
    const expenseDetails = document.createElement('div');
    expenseDetails.innerHTML = `<strong>Expense:</strong> ${expenseData.expense} - <strong>Description:</strong> ${expenseData.description} - <strong>Category:</strong> ${expenseData.category}`;

   const buttonsContainer = document.createElement('div');

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        localStorage.removeItem(key);
        parentele.removeChild(childele);
    };

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'btn btn-warning ms-2';
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
        editExpense(key, expenseData);
        parentele.removeChild(childele);
    };

    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(editButton);

    childele.appendChild(expenseDetails);
    childele.appendChild(buttonsContainer);

    parentele.insertBefore(childele, parentele.firstChild);
}

function editExpense(key, expenseData) {
    localStorage.removeItem(key);
    // Populate form fields with existing values
    document.getElementById('expense').value = expenseData.expense;
    document.getElementById('description').value = expenseData.description;
    document.getElementById('category').value = expenseData.category;
}
