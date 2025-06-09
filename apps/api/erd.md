```sql
Table users {
  id uuid [pk]
  name varchar
  email varchar [unique]
  password varchar
  created_at timestamp
  updated_at timestamp
}

Table tasks {
  id uuid [pk]
  title varchar
  description text
  status varchar [note: 'todo, in_progress, done']
  priority varchar [note: 'low, medium, high']
  due_date timestamp
  user_id uuid [ref: > users.id]
  created_at timestamp
  updated_at timestamp
}

Table tags {
  id uuid [pk]
  name varchar
  user_id uuid [ref: > users.id]
}

Table task_tags {
  task_id uuid [ref: > tasks.id]
  tag_id uuid [ref: > tags.id]
  Note: 'Many-to-Many: task ↔ tag'
}

Table collaborators {
  task_id uuid [ref: > tasks.id]
  user_id uuid [ref: > users.id]
  Note: 'Many-to-Many: task ↔ user as collaborator'
}

Table activity_logs {
  id uuid [pk]
  task_id uuid [ref: > tasks.id]
  user_id uuid [ref: > users.id]
  action varchar [note: 'e.g., updated_status, added_tag']
  message text
  created_at timestamp
}

```