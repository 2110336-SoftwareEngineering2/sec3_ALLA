import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
export class PublicFile {
  @PrimaryGeneratedColumn()
  public Fid: number;
 
  @Column()
  public url: string;
 
  @Column()
  public key: string;  //uniquely identifies the file in the bucket
}
 
//export default PublicFile;