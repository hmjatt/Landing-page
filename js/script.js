/*
Student Name: Harmeet Matharoo
Date Modified: September 7, 2023
File Name: script.js
Description: This JavaScript file named "script.js" contains functionality for my Personal Portfolio website.
*/

/* Course filtering and sorting */

//get search box element
const searchInput = document.getElementById('search');

//get filter element
const filterSelect = document.getElementById('filter');

//get sort element
const sortSelect = document.getElementById('sort');

//get course list element with all courses inside
const courseList = document.getElementById('course-list');


/* adding event listeners to search box, filter and sort elements */

// when the user inputs something in search box, run filterCourses function
searchInput.addEventListener('input', filterCourses);

// when the user changes option in filter element, run filterCourses function
filterSelect.addEventListener('change', filterCourses);

//  when the user changes option in sort element, run sortCourses function
sortSelect.addEventListener('change', sortCourses);


/* filterCourses function */
function filterCourses() {

    // convert whatever user inputs into lower case and store it inside a local variable
    const searchQuery = searchInput.value.toLowerCase();

    // get the value of current selected filter element option and store it inside a local variable
    const filterValue = filterSelect.value;

    // get list of courses and store them in an array
    const courses = Array.from(courseList.getElementsByTagName('li'));

    // for each item in the courses array call an anonymous function
    courses.forEach((course) => { // anonymous function start

        // get course name from item in the array and store it inside local variable
        const courseName = course.querySelector('h3').textContent.toLowerCase();

        // get course level from item in the array and store it inside local variable
        const level = course.querySelector('p:nth-child(2)').textContent.toLowerCase();

        // if the user input includes the name of the course, set this variable to true
        const matchesSearch = courseName.includes(searchQuery);

        /*
        if the value of the filter(Beginner,etc.) selected matches the course level set this variable to true.
        Also, if the user selects "All" option in the level selection box, set this variable to true.
        */
        const matchesFilter = filterValue === 'all' || level.includes(filterValue);

        /* set the style of current element(course) in  the array depending on if the user input matches
        the course name and if the user selected level matches the course level, show this element else
        hide it
        */
        course.style.display = matchesSearch && matchesFilter ? 'flex' : 'none';

        // anonymous funtion ends
    });
}

// Course sort function
function sortCourses() {
    // Get the value of the current selected sort element option
    const sortValue = sortSelect.value;

    // Get the list of courses and store them in an array
    const courses = Array.from(courseList.getElementsByTagName('li'));

    // For each item in the courses array call an anonymous function to sort it depending upon some condition
    courses.sort((a, b) => {  // anonymous funtion starts

        // get classname of a course
        const levelA = a.querySelector('p:nth-child(2)').textContent.toLowerCase();

        // get classname of another course
        const levelB = b.querySelector('p:nth-child(2)').textContent.toLowerCase();


        // compare the courses and sort them according to the sort value selected
        if (sortValue === 'lowest') {
            if (levelA < levelB) return -1;
            if (levelA > levelB) return 1;
        } else {
            if (levelA > levelB) return -1;
            if (levelA < levelB) return 1;
        }

        // default value
        return 0;

         // anonymous function ends
    });

    // Append the sorted course items back to the course list
    courses.forEach(course => {
        courseList.appendChild(course);
    });
}

// Call the filter and sort functions initially to show all courses
filterCourses();
sortCourses();