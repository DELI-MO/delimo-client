import { Column, Entity, OneToMany } from "typeorm";
import { FriendsTbl } from "./FriendsTbl";

@Entity("friend_status_tbl", { schema: "delimo" })
export class FriendStatusTbl {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "status_name", length: 45 })
  statusName: string;

  @OneToMany(() => FriendsTbl, (friendsTbl) => friendsTbl.friendStatusCode2)
  friendsTbls: FriendsTbl[];
}
