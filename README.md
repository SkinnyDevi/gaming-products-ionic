# Gaming Products Stock - Ionic App
## Example app using Ionic as frontend and Spring Boot as backend.

This app allows you to manage all your stock available!
In this example, we use gaming products as an example of what could be done with the API.

To learn about Ionic, refer to the following link.
[Ionic Framework](https://ionicframework.com/)

To learn about the API basic functions, refer to [this Postman Documentation](https://documenter.getpostman.com/view/17831178/UUy7ZiNL) website.

## Guide Of Use and Installation

After pulling/installing the project and installing all necessary libraries and dependencies, through the terminal access *frontend* folder and do the following command: `ionic serve`. This will open a localhost with the Ionic App.

For the backend, you will need a working MySQL connection and access to databases. Run the file *'gamingProductsDB.sql'*.

After, use *Eclipse IDE* or a supported IDE to run Spring Boot.
If you run the frontend first, you'll get a little message at the top of the page in the Ionic App saying there's no server started.

Start Spring Boot, reload the Ionic App page and you should be good to go.

## Features to note about
To detect in the frontend wether the server is running, the Ionic app uses `ErrorInterceptor`s to detect certain HTTP Responses and work based on those. In this case, no server running defaults to the status code *_0_*.

GET Requests by ID that don't exists are handled by the class `GSProductNotFoundException` in the backend. This returns the HTTP status code *_404_* instead of a server error, which would correspond to the status code *_500_*
