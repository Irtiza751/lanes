import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Workspace } from "../entities/workspace.entity";
import { Repository } from "typeorm";

@Injectable()
export class WorkspaceProvider {
  constructor(
    /**
     * Injecting workspace repository
    */
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>
  ) { }

  findById(id: number) {
    return this.workspaceRepository.findOne({ where: { id } })
  }
}