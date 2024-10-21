# WISE-C Backend

## Rutas del Backend

### Users

| Function                   | Method | Route                            | Params    | Middlewares         |
|----------------------------|--------|----------------------------------|-----------|---------------------|
| Create a User              | POST   | users/                           |           |                     |
| Get All Users              | GET    | users/                           |           |                     |
| Get Users by Sector        | GET    | users/sector                     |           |                     |
| Get User by Steam Area     | GET    | users/steam/:steam               | steam     |                     |
| Get Users by Location      | GET    | users/location/:location         | location  |                     |
| Get Users by Education     | GET    | users/education/:education       | education |                     |
| Get One User               | GET    | users/:id                        | id        |                     |
| Update a User              | PATCH  | users/:id                        | id        |                     |
| Delete a User              | DELETE | users/:id                        | id        |                     |

### Education

| Function                   | Method | Route                                 | Params  | Middlewares         |
|----------------------------|--------|---------------------------------------|---------|---------------------|
| Create an Education        | POST   | educations/                           |         |                     |
| Get All Education          | GET    | educations/                           |         |                     |
| Get One Education          | GET    | educations/:id                        | id      |                     |
| Update an Education        | PATCH  | educations/:id                        | id      |                     |
| Delete an Education        | DELETE | educations/:id                        | id      |                     |

### Location

| Function                   | Method | Route                                | Params  | Middlewares         |
|----------------------------|--------|--------------------------------------|---------|---------------------|
| Create a Location          | POST   | locations/                           |         |                     |
| Get All Locations          | GET    | locations/                           |         |                     |
| Get One Location           | GET    | locations/:id                        | id      |                     |
| Update a Location          | PATCH  | locations/:id                        | id      |                     |
| Delete a Location          | DELETE | locations/:id                        | id      |                     |

### Sector

| Function                   | Method | Route                              | Params  | Middlewares         |
|----------------------------|--------|------------------------------------|---------|---------------------|
| Create a Sector            | POST   | sectors/                           |         |                     |
| Get All Sectors            | GET    | sectors/                           |         |                     |
| Get One Sector             | GET    | sectors/:id                        | id      |                     |
| Update a Sector            | PATCH  | sectors/:id                        | id      |                     |
| Delete a Sector            | DELETE | sectors/:id                        | id      |                     |

### Steam

| Function                   | Method | Route                            | Params  | Middlewares         |
|----------------------------|--------|----------------------------------|---------|---------------------|
| Create a Steam             | POST   | steam/                           |         |                     |
| Get All Steams             | GET    | steam/                           |         |                     |
| Get One Steam              | GET    | steam/:id                        | id      |                     |
| Update a Steam             | PATCH  | steam/:id                        | id      |                     |
| Delete a Steam             | DELETE | steam/:id                        | id      |                     |
