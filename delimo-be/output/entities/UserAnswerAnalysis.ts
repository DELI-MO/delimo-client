import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { AnswerTbl } from "./AnswerTbl";
import { SentimentTbl } from "./SentimentTbl";

@Index(
  "fk_representative_sentiment_id_idx",
  ["representativeSentimentCode"],
  {}
)
@Entity("user_answer_analysis", { schema: "delimo" })
export class UserAnswerAnalysis {
  @Column("int", { primary: true, name: "fk_answer_id" })
  fkAnswerId: number;

  @Column("int", { name: "representative_sentiment_code", nullable: true })
  representativeSentimentCode: number | null;

  @OneToOne(() => AnswerTbl, (answerTbl) => answerTbl.userAnswerAnalysis, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "fk_answer_id", referencedColumnName: "id" }])
  fkAnswer: AnswerTbl;

  @ManyToOne(
    () => SentimentTbl,
    (sentimentTbl) => sentimentTbl.userAnswerAnalyses,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "representative_sentiment_code", referencedColumnName: "id" },
  ])
  representativeSentimentCode2: SentimentTbl;
}
