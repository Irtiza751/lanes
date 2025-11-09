select * from "user";
select * from "role";
select * from "workspace";
select * from "workspace_users";
select * from "project";
select * from "issue";

select * from "issue"
where project_id = 'ff44e7cb-5c37-41dc-94c6-16238fb948f6';
-- workspace users
select
	-- w.id as "id",
	u.name as "user",
	r.name as "role",
	w.name as "workspace",
	w.slug as "slug"
from "workspace_users" wu
join "user" u on u.id = wu.user_id
join "role" r on r.id = wu.role_id
join "workspace" w on w.id = wu.workspace_id
-- where u.id = '1d14a251-9309-47b9-a047-59525c0824f4'


select * from "status_workflow";

select * from "workspace"
where id = '39a35b1d-89e8-49fe-8110-446c73b3170e'

