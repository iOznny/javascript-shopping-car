// Variables
const car = document.querySelector('#carrito');
const list_courses = document.querySelector('#lista-cursos');
const container_car = document.querySelector('#lista-carrito tbody');
const btn_clear = document.querySelector('#vaciar-carrito');
let items = [];

// Show shopping car in html


loadEventsListeners();
function loadEventsListeners() {
    // Add courses
    list_courses.addEventListener('click', addCourse);

    // Delete courses in car
    car.addEventListener('click', deleteCourse);

    // Clean car
    btn_clear.addEventListener('click', () => {        
        items = [];
        showItems();
    });
}

// Add course
function addCourse(e) {   
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {        
        const course_selected = e.target.parentElement.parentElement;
        readContainerCourse(course_selected);
    }
}

// Delete course in array
function deleteCourse(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const id = e.target.getAttribute('data-id');

        // Delete in array with filter()
        items = items.filter(course => course.id !== id);
        showItems();
    }
}

// Read information of course
function readContainerCourse(course) {
    // Create object with the container course 
    const course_info = {
        id: course.querySelector('a').getAttribute('data-id'),
        imagen: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        amount: 1,
    }

    // Checking if exist in items
    if (items.some(item => item.id === course_info.id)) {      
        // Update amount course  
        const courses = items.map(item => {
            if (item.id === course_info.id) {
                // Returns the updated object
                item.amount++;
                return item;
            } else {
                // Returns objects that are not updated
                return item;
            }
        });

        item = [...courses];
    } else {
        // Add elements in array
        items = [...items, course_info];        
    }

    showItems();
}

// Show items in html
function showItems() {
    // Clean html
    clearCourses();

    items.forEach(item => {
        const { id, title, price, imagen, amount } = item;
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${ imagen }" width="100" alt="${ title }" />
            </td>
            <td>${ title }</td>
            <td>${ price }</td>
            <td>${ amount }</td>
            <td><a href="#" class="borrar-curso" data-id="${ id }"> X </a></td>
        `;

        // Add html in tbody
        container_car.appendChild(row);
    });
}

// Clean items in html
function clearCourses() {
    // Slot 
    container_car.innerHTML = '';

    // Remove child
    while (container_car.firstChild) {
        container_car.removeChild(container_car.firstChild);
    }
}