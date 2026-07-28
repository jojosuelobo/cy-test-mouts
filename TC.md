# API

## Login
### Login with valid credentials
prerequisites: Registered user
Expected response 200 and authentication token

### Login with invalid credentials
Expected response 401 and error message for invalid email or password

---

## User

### Create user
Expected response 201 and `"message": "Cadastro realizado com sucesso"` with `_id`

### Create already registered user
Expected response 400 and `"message": "Este email já está sendo usado"`

### Get users
prerequisites: Users already registered
Expected response 200 and list of users in response with user data

### Get an user by id
prerequisites: User already registered
Expected response 200 and user data

### Get an user with invalid ID
Expected response 400 or 404 with error message

### Update user
prerequisites: User already registered
Expected response 200 and `"message": "Registro alterado com sucesso"`

### Update non-existent user
Expected response 404 and error message

### Delete user
prerequisites: User already registered
Expected response 200 and `"message": "Registro excluído com sucesso"`

### Delete non-existent user
Expected response 404 and error message