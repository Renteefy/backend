import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Asset extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: "varchar", length: 200, unique: true, nullable: false })
  assetID: string;
  @Column({ type: "text", nullable: false }) title: string;
  @Column({ type: "varchar", default: "Others" }) category: string;
  @Column({ type: "text", nullable: true }) description: string;
  @Column({ type: "int", default: 0 }) price: number;
  @Column({ type: "text", nullable: true }) interval: string;
  @Column({ type: "text", nullable: true }) owner: string;
  @Column({ type: "text", nullable: true }) rentedBy: string;
  @Column({ type: "simple-array", nullable: true }) image_urls: [string];
  @Column({ type: "simple-array", nullable: true }) reviews: [string];
  @Column({ type: "boolean", default: false }) isAvailable: boolean;
  @Column({ type: "int", nullable: true }) stars: number;
  @Column({ type: "int", nullable: true }) insurance_amt: number;
}
