# Database Migration #

## npm command to install:

```bash
sudo npm install sequelize-cli -g
```



## To create migration file:
```bash
sequelize migration:generate --name [model-name]
```

## creates models and migration file:
```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```


## Changes to existing models
```bash
npx sequelize-cli migration:create --name modify_users_add_new_fields
```


## Run migrations:
```bash
sequelize db:migrate
npx sequelize-cli db:migrate
```


## Undo latest migration:
```bash
npx sequelize-cli db:migrate:undo
```