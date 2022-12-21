import { Column, Entity, OneToMany } from "typeorm";
import { FriendsTbl } from "./FriendsTbl";
import { UserCalendarTbl } from "./UserCalendarTbl";
import { UsersVisitLog } from "./UsersVisitLog";

@Entity("users", { schema: "delimo" })
export class Users {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "email", length: 45 })
  email: string;

  @Column("varchar", { name: "password", length: 45 })
  password: string;

  @Column("varchar", { name: "nickname", length: 20 })
  nickname: string;

  @Column("varchar", { name: "unique_id", length: 45 })
  uniqueId: string;

  @Column("text", { name: "device_id" })
  deviceId: string;

  @OneToMany(() => FriendsTbl, (friendsTbl) => friendsTbl.friend1)
  friendsTbls: FriendsTbl[];

  @OneToMany(() => FriendsTbl, (friendsTbl) => friendsTbl.friend2)
  friendsTbls2: FriendsTbl[];

  @OneToMany(() => UserCalendarTbl, (userCalendarTbl) => userCalendarTbl.fkUser)
  userCalendarTbls: UserCalendarTbl[];

  @OneToMany(() => UsersVisitLog, (usersVisitLog) => usersVisitLog.fkUser)
  usersVisitLogs: UsersVisitLog[];
}
