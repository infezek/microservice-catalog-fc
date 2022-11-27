import { migrator } from "@fc/core/@seedwork/infra";
import { getConnectionToken } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing"
import { MigrationModule } from "../src/database/migration/migration.module"
import { Umzug } from "umzug";

describe("Migrate e2e", () => {
    let umzug: Umzug
    const totalMigration = 1
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MigrationModule]
        }).compile();
        const sequelize = moduleFixture.get(getConnectionToken())
        umzug = migrator(sequelize, { logger: undefined })
    })

    test("up command", async () => {
        await umzug.down({ to: 0 as any })
        const result = await umzug.up()
        expect(result).toHaveLength(totalMigration)
    })

    test("down command", async () => {
        await umzug.up()
        const result = await umzug.down({ to: 0 as any })
        expect(result).toHaveLength(totalMigration)
    })
})