# <span style='color: red'>IMPORTANT: <br /> Please do not eject this project. If you want to edit webpack configuration, please override instead of eject. ^_^</span>

## Project Structure
### `/src`
* The root directory, where all the source code of the application is stored. This is the heart of the ReactJS project, where all the logic and interface is built.
### `/assets`
* Store static files such as images, fonts, or other shared resources throughout the application. This is where files that do not change during the entire execution of the application are placed.
### `/components`
* Contains reusable components that are shared between different parts of the application. These components are often small building blocks that help build the interface.
### `/context`
* This is where global state is managed using the Context API or Redux-related logic. This directory is especially useful when you need to share state between multiple components in your application.
### `/features`
* Organize modules by feature, grouping related components, styles, and logic together. This organization helps clearly separate each function in the application.
### `/hooks`
* Store React Custom Hooks. These hooks help encapsulate reusable logic, for example, hooks for handling forms or connecting to an API.
### `/layouts`
* Includes components that define the structure of the application, such as headers, footers, or layout wrappers. This is where the overall look and feel of the entire application is managed.
### `/pages`
* Contains page-level components. This is where pages like the home page, product detail page, or contact page are defined...
### `/routes`
* Contains routes for each page of the website, used in the routing structure of the React Router DOM.
### `/services`
* Manages API calls, connections to external services, or integrations with third-party libraries. This is where data is handled to and from the server.
### `/store`
* Manage reducers for each web page in the project
### `/styles`
* Store CSS, SCSS, or global style files and component-specific styles. Makes managing and reusing style rules easy.
### `/utils`
* Contains utility functions and helpers that are common to the entire application. For example, date formatting, string manipulation, or input validation.