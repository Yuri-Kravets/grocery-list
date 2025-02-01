
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.querySelector('#grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editID = '';

//submit form
form.addEventListener('submit', addItem);

//clear items
clearBtn.addEventListener('click', clearItems);


function addItem(e) {
    e.preventDefault();

    const value = grocery.value;
    const id = new Date().getTime().toString();

    if (value  && !editFlag) {
        const element = document.createElement('article');
        element.classList.add('grocery-item');
// add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `  <p class="title">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>`;
        list.appendChild(element);

        displayAlert('item added to the list', 'success');
        container.classList.add('show-container');

        addToLocalStorage(id, value);

        setBackToDefault();

    }
    else if(value && editFlag) {
        console.log('editing');
    }
    else{
        displayAlert('please enter value', 'danger');
    }
}
//display alert
function displayAlert(text, action) {
    alert.textContent = 'empty value';
    alert.classList.add(`alert-${action}`);
//remove alert
    setTimeout(function (){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    },1000)
}

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');

    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item)
        });
    }
    container.classList.remove('show-container');
    displayAlert('empty list', 'danger');
    setBackToDefault();
    localStorage.removeItem('list');
}

function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';

}

function addToLocalStorage(id, value) {
    console.log('added to local storage');
}