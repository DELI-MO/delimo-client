import { Column, Entity, OneToMany } from "typeorm";
import { AnswerTbl } from "./AnswerTbl";

@Entity("privacy_tbl", { schema: "delimo" })
export class PrivacyTbl {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 45 })
  title: string | null;

  @Column("int", { name: "privacy_state", nullable: true })
  privacyState: number | null;

  @OneToMany(() => AnswerTbl, (answerTbl) => answerTbl.fkPrivacyState)
  answerTbls: AnswerTbl[];
}
