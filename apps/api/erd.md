```sql
-- // user table will container the basic user info
Table user {
  id uuid [pk]
  name varchar
  email varchar [unique]
  password varchar
  created_at timestamp
  updated_at timestamp
}

-- // task table will have task content and the task creator id
Table task {
  id uuid [pk]
  project_id uuid [ref: > project.id]
  title varchar
  description text
  status varchar [note: 'todo, in_progress, done']
  priority varchar [note: 'low, medium, high']
  due_date timestamp
  created_by uuid [ref: > user.id]
  created_at timestamp
  updated_at timestamp
}

-- // table of tags
Table tag {
  id uuid [pk]
  name varchar
  user_id uuid [ref: > user.id]
}

-- // for many to many relation of task and tags
// many tags can belong to many tasks and viseversa
Table task_tag {
  task_id uuid [ref: > task.id]
  tag_id uuid [ref: > tag.id]
  Note: 'Many-to-Many: task ↔ tag'
}

-- // associating users whow are wokring a task(s) as members
Table task_member {
  id uuid [pk]
  task_id uuid [ref: > task.id]
  user_id uuid [ref: > user.id]
  role varchar [note: 'owner, collaborator, viewer']
  added_by uuid [ref: > user.id, note: 'Invited by']
  created_at timestamp
}

-- // for tracking the user's activity with tasks from creating, updating, deleting etc..
Table activity_log {
  id uuid [pk]
  task_id uuid [ref: > task.id]
  user_id uuid [ref: > user.id]
  action varchar [note: 'e.g., updated_status, added_tag']
  message text
  created_at timestamp
}

-- // project is for organizing the tasks a project based manner
Table project {
  id uuid [pk]
  created_by uuid [ref: > user.id]
  title varchar
  description varchar
  created_at timestamp
  updated_at timestamp
}

-- // workspace is for organizing porjects
Table workspace {
  id uuid [pk]
  name varchar
  description varchar
  logo_url varchr
  created_by uuid [ref: > user.id]
  created_at timestamp
  updated_at timestamp
}
```
