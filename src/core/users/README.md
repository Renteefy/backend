## Core structure

This README defines the project structure for each of the core elements

Files involved:

1. file.interface.ts
2. file.model.ts
3. file.router.ts
4. controllerFunctions folder

### file.interface.ts

This holds the types declartion for the mongoose object and Controllerfunctions.

### file.model.ts

This makes the mongoose model and exports it.

### file.router.ts

This exports an express router that pull its business logic from controller function folder

### ControllerFunctions

Business logic code goes here in form of files. Each Route is a new file. This helps in keeping the code short and testing specific routes in complete isolation.

### Ideal Workflow

- Make a route in controllerFunctions. eg. Login.ts --> write code, export function.
- Import the route in file.router.ts file. eg. `import Login from "./controllerFunctions/Login";`
- Pass the route in the router file. eg. ` userRouter.post("/login", Login);`
- add the checkJWT middleware (if required) ` userRouter.post("/login",JWT.checkJWT, Login);`
