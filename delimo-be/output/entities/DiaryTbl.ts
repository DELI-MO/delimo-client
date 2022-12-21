import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { UserTodayResponse } from "./UserTodayResponse";

@Index("fk_response_id_for_diary_idx", ["fkResponseId"], {})
@Entity("diary_tbl", { schema: "delimo" })
export class DiaryTbl {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "fk_response_id" })
  fkResponseId: number;

  @Column("date", { name: "content" })
  content: string;

  @ManyToOne(
    () => UserTodayResponse,
    (userTodayResponse) => userTodayResponse.diaryTbls,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "fk_response_id", referencedColumnName: "id" }])
  fkResponse: UserTodayResponse;
}
