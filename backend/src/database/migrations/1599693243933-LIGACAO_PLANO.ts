import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';


export class LIGACAOPLANO1599693243933 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'LIGACAO_PLANO',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'ligacaoId',
                        type: 'uuid',
                    },
                    {
                        name: 'planoId',
                        type: 'uuid',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'LIGACAO_PLANO',
            new TableForeignKey({
                name: 'LIGACAO_PLANO_ligacaoId',
                columnNames: ['ligacaoId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'LIGACAO',
                onDelete: 'Cascade'
            }),
        );

        await queryRunner.createForeignKey(
            'LIGACAO_PLANO',
            new TableForeignKey({
                name: 'LIGACAO_PLANO_planoId',
                columnNames: ['planoId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'PLANO',
            }),
        );





    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
