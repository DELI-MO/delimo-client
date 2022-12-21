import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("fk_user_id_for_visited_idx", ["fkUserId"], {})
@Entity("users_visit_log", { schema: "delimo" })
export class UsersVisitLog {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "fk_user_id" })
  fkUserId: number;

  @Column("tinyint", {
    name: "today_visited",
    nullable: true,
    default: () => "'0'",
  })
  todayVisited: number | null;

  @Column("tinyint", {
    name: "today_responded",
    nullable: true,
    default: () => "'0'",
  })
  todayResponded: number | null;

  @Column("date", { name: "last_visited", nullable: true })
  lastVisited: string | null;

  @ManyToOne(() => Users, (users) => users.usersVisitLogs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "fk_user_id", referencedColumnName: "id" }])
  fkUser: Users;
}
