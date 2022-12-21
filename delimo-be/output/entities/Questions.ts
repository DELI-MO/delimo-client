import { Column, Entity, OneToMany } from "typeorm";
import { AnswerTbl } from "./AnswerTbl";

@Entity("questions", { schema: "delimo" })
export class Questions {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "title" })
  title: string;

  @OneToMany(() => AnswerTbl, (answerTbl) => answerTbl.fkQuestion)
  answerTbls: AnswerTbl[];
}
