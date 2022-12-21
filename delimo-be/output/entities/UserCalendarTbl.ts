import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "./Users";
import { UserTodayResponse } from "./UserTodayResponse";

@Index("fk_user_id_for_calendar_idx", ["fkUserId"], {})
@Entity("user_calendar_tbl", { schema: "delimo" })
export class UserCalendarTbl {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "fk_user_id", nullable: true })
  fkUserId: number | null;

  @ManyToOne(() => Users, (users) => users.userCalendarTbls, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "fk_user_id", referencedColumnName: "id" }])
  fkUser: Users;

  @OneToMany(
    () => UserTodayResponse,
    (userTodayResponse) => userTodayResponse.fkCalendar
  )
  userTodayResponses: UserTodayResponse[];
}
