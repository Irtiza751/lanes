import { StatusWorkflow } from '@/features/issues/entities/status-workflows';
import { WorkflowCategory } from '@/features/issues/enums/workflow-category.enum';
import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class StatusWorkflowSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const statuses = [
      {
        name: 'Backlog',
        color: '#9e9e9e',
        category: WorkflowCategory.BACKLOG,
        sortOrder: 1,
        isDefault: true,
        project: null,
      },
      {
        name: 'To-Do',
        color: '#2196f3',
        category: WorkflowCategory.TODO,
        sortOrder: 2,
        isDefault: true,
        project: null,
      },
      {
        name: 'In-Progress',
        color: '#ff9800',
        category: WorkflowCategory.INPROGRESS,
        sortOrder: 3,
        isDefault: true,
        project: null,
      },
      {
        name: 'Done',
        color: '#4caf50',
        category: WorkflowCategory.DONE,
        sortOrder: 4,
        isDefault: true,
        project: null,
      },
    ];

    for (const data of statuses) {
      em.create(StatusWorkflow, data);
    }
  }
}
