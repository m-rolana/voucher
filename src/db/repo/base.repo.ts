import { DataSource, ObjectLiteral, Repository } from "typeorm";
import { DeleteResult, Repo } from "../types";

class BaseRepo {
    private readonly dataSource: DataSource;
    protected readonly repo: Repo;
    protected readonly modelName: string;

    constructor(dataSource: DataSource, entity: string) {
        this.dataSource = dataSource;
        this.repo = this.dataSource.getRepository(entity);
        this.modelName = '';
    }

    get originalRepo(): Repository<ObjectLiteral> {
        return this.repo;
    }

    create(data: object): Promise<object> {
        return this.repo.save(data);
    }

    async find(options: object): Promise<ObjectLiteral[]> {
        return this.repo.find(options);
    }

    async deleteById(id: string): Promise<DeleteResult> {
        const result = await this.repo
            .createQueryBuilder(this.modelName)
            .delete()
            .returning('*')
            .where(`id = '${id}'`)
            .andWhere(`deleted_at is null`)
            .execute();

        return {
            success: !!result.affected,
        };
    }

    findById(id: string): Promise<ObjectLiteral | null> {
        return this.repo.findOne({
            where: { id },
        });
    }
}

export default BaseRepo;