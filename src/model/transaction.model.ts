import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

// renter
// owner
// tranID
// status

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: "text", nullable: false }) renter: string;
  @Column({ type: "text", nullable: false }) owner: string;
  @Column({ type: "text", nullable: false }) status: string;
  @Column({ type: "text", nullable: false }) assetID: string;
  @Column({ type: "varchar", length: 200, unique: true, nullable: false })
  tranID: string;
}
