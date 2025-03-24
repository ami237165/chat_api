import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mobileNumber: string;

  @Column()
  password: string; // For now, plain text (we'll hash it later)
}
