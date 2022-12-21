import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AnswerTbl } from "./AnswerTbl";
import { DiaryTbl } from "./DiaryTbl";
import { UserCalendarTbl } from "./UserCalendarTbl";

@Index("fk_calendar_id_for_response_idx", ["fkCalendarId"], {})
@Entity("user_today_response", { schema: "delimo" })
export class UserTodayResponse {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "created_at" })
  createdAt: string;

  @Column("int", { name: "fk_calendar_id", nullable: true })
  fkCalendarId: number | null;

  @OneToMany(() => AnswerTbl, (answerTbl) => answerTbl.fkResponse)
  answerTbls: AnswerTbl[];

  @OneToMany(() => DiaryTbl, (diaryTbl) => diaryTbl.fkResponse)
  diaryTbls: DiaryTbl[];

  @ManyToOne(
    () => UserCalendarTbl,
    (userCalendarTbl) => userCalendarTbl.userTodayResponses,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "fk_calendar_id", referencedColumnName: "id" }])
  fkCalendar: UserCalendarTbl;
}
