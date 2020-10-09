import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";


export class LIGACAO1599692120074 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'LIGACAO',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'valorOriginal',
                        type: 'decimal',
                        precision: 6,
                        scale: 2
                    },
                    {
                        name: 'origemDDDId',
                        type: 'uuid',
                    },
                    {
                        name: 'destinoDDDId',
                        type: 'uuid',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'LIGACAO',
            new TableForeignKey({
                name: 'DDDOrigem',
                columnNames: ['origemDDDId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'DDD',
            })
        )


        await queryRunner.createForeignKey(
            'LIGACAO',
            new TableForeignKey({
                name: 'DDDDestino',
                columnNames: ['destinoDDDId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'DDD',
            })
        )



    }
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
