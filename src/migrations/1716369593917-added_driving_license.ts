import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedDrivingLicense1716369593917 implements MigrationInterface {
  name = 'AddedDrivingLicense1716369593917';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "driving_license" boolean`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "driving_license"`);
  }
}
