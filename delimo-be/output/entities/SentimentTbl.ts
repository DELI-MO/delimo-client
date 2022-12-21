import { Column, Entity, OneToMany } from "typeorm";
import { UserAnswerAnalysis } from "./UserAnswerAnalysis";

@Entity("sentiment_tbl", { schema: "delimo" })
export class SentimentTbl {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "sentiment_name", nullable: true, length: 45 })
  sentimentName: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(
    () => UserAnswerAnalysis,
    (userAnswerAnalysis) => userAnswerAnalysis.representativeSentimentCode2
  )
  userAnswerAnalyses: UserAnswerAnalysis[];
}
