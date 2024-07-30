# Note-Taker

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## Description

This project is a Note-Taking Application designed to help small business owners write, save, and organize their thoughts and tasks. Keeping track of tasks and organizing thoughts is crucial for productivity and success, and this application provides a simple yet effective way to manage notes, ensuring that important information is easily accessible and well-organized. Built using modern web technologies including HTML, CSS, JavaScript, and Node.js with Express.js, the application consists of a landing page and a notes page. The landing page serves as an entry point, while the notes page allows users to view existing notes, add new notes, and interact with their notes seamlessly. The back-end server handles the storage and retrieval of notes, ensuring that data is saved persistently using the file system module. The application includes API endpoints for retrieving, adding, and deleting notes, making it functional and easy to use, effectively meeting the needs of small business owners.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

## Installation

To install the Note-Taking Application, first clone the repository using git clone https://github.com/demichele-c/Note-Taker.git and navigate into the project directory with cd Note-Taker. Ensure you have Node.js installed, then run npm install to install the necessary dependencies. Start the Express.js server with npm start and open your web browser to http://localhost:3001 to access the application. For customization, front-end files are located in the public directory, and back-end code can be modified in server.js and the routes directory. This will set up and run the Note-Taking Application on your local machine.

## Usage

To use the Note-Taking Application, start by navigating to the landing page at http://localhost:3001 in your web browser. From there, click the link to access the notes page. On the notes page, you will see a list of existing notes in the left-hand column and empty fields to enter a new note title and text in the right-hand column. Enter your note title and text, and the "Save Note" and "Clear Form" buttons will appear in the navigation at the top of the page. Click the "Save Note" button to save your new note, which will then appear in the left-hand column alongside other existing notes. To view an existing note, click on it in the left-hand column, and it will be displayed in the right-hand column. If you want to create a new note, click the "New Note" button in the navigation, which will present you with empty fields to enter a new note title and text. This intuitive interface allows you to efficiently write, save, and organize your notes.

## Contributing

We welcome contributions to the Note-Taking Application! To contribute, first fork the repository on GitHub and clone your fork to your local machine. Create a new branch for your changes with git checkout -b feature/your-feature-name, then make and test your modifications. Commit your changes with a descriptive message and push the branch to your fork. Next, create a pull request from your branch to the original repository, detailing your changes and any relevant information. Be prepared to address feedback and make any necessary updates. Please ensure that your contributions adhere to the project's coding standards and code of conduct. Thank you for helping improve the project!

## Tests

To test the Note-Taking Application, first ensure the server is running by executing npm start and confirm the application is accessible at http://localhost:3001. Perform manual testing by navigating to the application in your web browser, checking that the landing page and notes page load correctly, and verifying that existing notes are listed and new notes can be added, saved, and displayed properly. Use tools like Postman or curl to test API endpoints (GET /api/notes, POST /api/notes, DELETE /api/notes/:id) and ensure they function as expected.


## Questions

If you have any questions, please feel free to contact me at [demichele.charles@yahoo.com](mailto:demichele.charles@yahoo.com). You can also find more of my work at [demichele-c](https://github.com/demichele-c).

## License

This project is licensed under the MIT license. Click [here](https://opensource.org/licenses/MIT) for more details.
