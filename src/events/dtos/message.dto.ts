import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FileMetaDto {
  @IsString()
  filename: string;

  @IsString()
  fileType: string;

  @IsString()
  fileId: string;

  @IsString()
  previewUrl: string;

  @IsString()
  fileData: any; // optional: you may replace this with a stream or buffer depending on your use case
}

export class MessageDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileMetaDto)
  files?: FileMetaDto[];

  @IsBoolean()
  hasText: boolean;

  @IsBoolean()
  hasFiles: boolean;

  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  receiver: string;

  @IsString()
  @IsNotEmpty()
  id: string; // client-generated id (like timestamp)

  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsString()
  @IsNotEmpty()
  roomId:string
}
