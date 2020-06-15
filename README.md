## TODO List API with Express and MongoDB

#### Before running the application, 
- run `yarn` or `npm install` to install dependencies.
- update the `.env` file with your database URL and Application Port. There is no requirement to create any database in mongo db manually.

#### Following endpoints are available:
- GET /api/todos - Get a list of all incomplete TODO items (default). You may send an optional parameter `includeDone=1` to include completed TODO items as well.

- GET /api/todos/:id - Get a single TODO item

- POST /api/todos - Create a new TODO item
###### Parameters:
* Title (required)
* description (optional)
* dueDate (optional)

- PUT /api/todos/:id - Update an exsiting TODO item. If the item does not exists, you will get a 404 result.
###### Parameters:
* Title (required)
* description (optional)
* dueDate (optional)
* done (optional, The todo remains in not-done state, until this parameter is supplied with a true value)

- DELETE /api/todos/:id - Delete an existing TODO item. If the item does not exists, you will get a 404 result.
