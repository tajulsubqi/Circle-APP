import { MigrationInterface, QueryRunner } from "typeorm"

export class MyMigration1703748138299 implements MigrationInterface {
  name = "MyMigration1703748138299"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Likes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "thread_id" integer, CONSTRAINT "PK_1c26def97ac3b554ea7c21be2c9" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "replies" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "thread_id" integer, CONSTRAINT "PK_08f619ebe431e27e9d206bea132" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "thread" ("id" SERIAL NOT NULL, "content" character varying, "image" character varying, "user_id" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cabc0f3f27d7b1c70cf64623e02" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profile_picture" character varying DEFAULT 'https://bit.https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0/broken-link', "profile_description" character varying DEFAULT 'hai from server', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "follows" ("id" SERIAL NOT NULL, "creadet_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "followersId" integer, "followedId" integer, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "followers" ("follower_id" integer NOT NULL, "following_id" integer NOT NULL, CONSTRAINT "PK_8fc3b802b0b818a7f4c2b4c30ca" PRIMARY KEY ("follower_id", "following_id"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_e11d02e2a1197cfb61759da5a8" ON "followers" ("follower_id") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_95627c64d9f57814010a003032" ON "followers" ("following_id") `,
    )
    await queryRunner.query(
      `ALTER TABLE "Likes" ADD CONSTRAINT "FK_e7bf078b4e3c2c8122abc1b48c7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "Likes" ADD CONSTRAINT "FK_d23922a20de3fb889f6cee5ab69" FOREIGN KEY ("thread_id") REFERENCES "thread"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "replies" ADD CONSTRAINT "FK_c961efa3687d100ed22cd409534" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "replies" ADD CONSTRAINT "FK_1af58ca9000874da2171004d164" FOREIGN KEY ("thread_id") REFERENCES "thread"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "thread" ADD CONSTRAINT "FK_268f824f2f1f84dac247b7776fe" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "follows" ADD CONSTRAINT "FK_bf77ff070e6577680f2716f2652" FOREIGN KEY ("followersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "follows" ADD CONSTRAINT "FK_d5ab44405d07cecac582c6448bf" FOREIGN KEY ("followedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "followers" ADD CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "followers" ADD CONSTRAINT "FK_95627c64d9f57814010a003032e" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "followers" DROP CONSTRAINT "FK_95627c64d9f57814010a003032e"`,
    )
    await queryRunner.query(
      `ALTER TABLE "followers" DROP CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87"`,
    )
    await queryRunner.query(
      `ALTER TABLE "follows" DROP CONSTRAINT "FK_d5ab44405d07cecac582c6448bf"`,
    )
    await queryRunner.query(
      `ALTER TABLE "follows" DROP CONSTRAINT "FK_bf77ff070e6577680f2716f2652"`,
    )
    await queryRunner.query(
      `ALTER TABLE "thread" DROP CONSTRAINT "FK_268f824f2f1f84dac247b7776fe"`,
    )
    await queryRunner.query(
      `ALTER TABLE "replies" DROP CONSTRAINT "FK_1af58ca9000874da2171004d164"`,
    )
    await queryRunner.query(
      `ALTER TABLE "replies" DROP CONSTRAINT "FK_c961efa3687d100ed22cd409534"`,
    )
    await queryRunner.query(
      `ALTER TABLE "Likes" DROP CONSTRAINT "FK_d23922a20de3fb889f6cee5ab69"`,
    )
    await queryRunner.query(
      `ALTER TABLE "Likes" DROP CONSTRAINT "FK_e7bf078b4e3c2c8122abc1b48c7"`,
    )
    await queryRunner.query(`DROP INDEX "public"."IDX_95627c64d9f57814010a003032"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_e11d02e2a1197cfb61759da5a8"`)
    await queryRunner.query(`DROP TABLE "followers"`)
    await queryRunner.query(`DROP TABLE "follows"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TABLE "thread"`)
    await queryRunner.query(`DROP TABLE "replies"`)
    await queryRunner.query(`DROP TABLE "Likes"`)
  }
}
