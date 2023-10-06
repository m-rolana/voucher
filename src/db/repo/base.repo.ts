import { DataSource } from "typeorm";
import { Repo } from "../types";


class BaseRepo {
    private dataSource: DataSource;
    protected repo: Repo;

    constructor(dataSource: DataSource, entity: string) {
        this.dataSource = dataSource;
        this.repo = this.dataSource.getRepository(entity);
    }

    get originalRepo() {
        return this.repo;
    }

    create(data: object) {
        return this.repo.save(data);
    }

    findById(id: string) {
        return this.repo.findOne({
            where: { id },
        });
    }
}

export default BaseRepo;