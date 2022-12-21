import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { PrivacyTbl } from "./PrivacyTbl";
import { Questions } from "./Questions";
import { UserTodayResponse } from "./UserTodayResponse";
import { UserAnswerAnalysis } from "./UserAnswerAnalysis";

@Index("fk_privacy_state_id_idx", ["fkPrivacyStateId"], {})
@Index("fk_question_id_fora_idx", ["fkQuestionId"], {})
@Index("fk_response_id_for_answer_idx", ["fkResponseId"], {})
@Entity("answer_tbl", { schema: "delimo" })
export class AnswerTbl {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "fk_question_id" })
  fkQuestionId: number;

  @Column("date", { name: "created_at" })
  createdAt: string;

  @Column("int", { name: "fk_privacy_state_id" })
  fkPrivacyStateId: number;

  @Column("text", { name: "content" })
  content: string;

  @Column("int", { primary: true, name: "fk_response_id" })
  fkResponseId: number;

  @ManyToOne(() => PrivacyTbl, (privacyTbl) => privacyTbl.answerTbls, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "fk_privacy_state_id", referencedColumnName: "id" }])
  fkPrivacyState: PrivacyTbl;

  @ManyToOne(() => Questions, (questions) => questions.answerTbls, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "fk_question_id", referencedColumnName: "id" }])
  fkQuestion: Questions;

  @ManyToOne(
    () => UserTodayResponse,
    (userTodayResponse) => userTodayResponse.answerTbls,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "fk_response_id", referencedColumnName: "id" }])
  fkResponse: UserTodayResponse;

  @OneToOne(
    () => UserAnswerAnalysis,
    (userAnswerAnalysis) => userAnswerAnalysis.fkAnswer
  )
  userAnswerAnalysis: UserAnswerAnalysis;
}
