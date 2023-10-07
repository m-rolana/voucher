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

    async find(options: object) {
        return this.repo.find(options);
    }

    async deleteById(id: string, isSoft: boolean = true) {
        const method = isSoft ? 'softDelete' : 'delete';
        const result = await this.repo[method](id);

        return {
            success: !!result.affected,
        };
    }

    findById(id: string) {
        return this.repo.findOne({
            where: { id },
        });
    }
}

export default BaseRepo;