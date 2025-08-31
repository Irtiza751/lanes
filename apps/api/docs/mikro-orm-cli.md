# Mikro ORM cli docs

### Migrations

#### 1. To create migration run

This will create a migration file with a timestamp and you migration name eg:

```bash
yarn migration:create -- InitialMigration
```

#### 2. To run migration use this command

This will apply the migration changes in the database

```bash
yarn migration:up
```

#### 3. Basic usage

To roll back the last applied migration, execute the following command in your terminal:

```bash
yarn migration:down
```

#### 4. Rolling back to a Specific Version:

You can specify a target version to migrate down to using the --to or -t option. This will revert all migrations from the current state until the specified migration version is reached. For example, to revert all migrations:

```bash
yarn migration:down --to 2019101911
```
