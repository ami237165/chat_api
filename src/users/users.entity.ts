import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true,nullable:false})
  mobileNumber: string;

  @Column({nullable:false})
  password: string; // For now, plain text (we'll hash it later)

  @Column({nullable:false})
  name: string;

  @Column({nullable:false})
  email:string
}
