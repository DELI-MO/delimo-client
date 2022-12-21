import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { FriendStatusTbl } from "./FriendStatusTbl";
import { Users } from "./Users";

@Index("friend_status_code_id_idx", ["friendStatusCode"], {})
@Index("user_friend1_id_idx", ["friend1Id"], {})
@Index("user_friend2_id_idx", ["friend2Id"], {})
@Entity("friends_tbl", { schema: "delimo" })
export class FriendsTbl {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "friend1_id" })
  friend1Id: number;

  @Column("int", { name: "friend2_id" })
  friend2Id: number;

  @Column("int", { name: "friend_status_code" })
  friendStatusCode: number;

  @ManyToOne(
    () => FriendStatusTbl,
    (friendStatusTbl) => friendStatusTbl.friendsTbls,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "friend_status_code", referencedColumnName: "id" }])
  friendStatusCode2: FriendStatusTbl;

  @ManyToOne(() => Users, (users) => users.friendsTbls, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "friend1_id", referencedColumnName: "id" }])
  friend1: Users;

  @ManyToOne(() => Users, (users) => users.friendsTbls2, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "friend2_id", referencedColumnName: "id" }])
  friend2: Users;
}
