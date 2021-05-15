# Project design

This readme holds the design approach for each core elements.

It breaks down to the following files:

1. file.interface.ts
   - this file holds the type defination required for the model and other functions.
   - Change this file if you want to change new different properties of the mongoose model
2. file.model.ts
   - exports the mongoose model following the schema
3. file.router.ts
   - glues the controller functions together into one router which is then exported for server.ts to user
4. file.controller.ts
   - holds the code for each route
   - Notice the utilization of services in every route
   - This approach helps in keeping the controller code clean and detached from the business logic. It also helps in better integration tests in the future.
5. file.services.ts
   - holds the code for all main logic and db calls in various functions, exports these functions in a packed object
   - detached and runs without importing any modules
   - helps mock the db well

**Ideal Workflow:**

- Write all the logic in the services file in forms of parameterized functions, export.
- Import those functions in the controller file where you'll add the code for endpoint handling, Export from controller file
- Import in Router where you add the endpoint url

**Sidenote** : ditched the old structure for now. Because simplicity>organization
