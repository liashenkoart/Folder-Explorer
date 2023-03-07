import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@ValidatorConstraint({ name: 'customPath', async: false })
export class DestinationStartWith implements ValidatorConstraintInterface {
  validate(path: string, args: ValidationArguments) {
    return path === process.env.FILES_FOLDER || (path.startsWith(`${process.env.FILES_FOLDER}/`) && path.length > `${process.env.FILES_FOLDER}/`.length);
  }
  defaultMessage(args: ValidationArguments) {
    return 'Wrong directory';
  }
}

export class FileUploadQueryDto {
  @IsString()
  @Validate(DestinationStartWith)
  readonly destination: string;
}

export class RenameFileDto {
  @ApiProperty({
    type: String,
    description: 'Directory/File name where new folder should be created'
  })
  @IsString()
  @IsNotEmpty()
  @Validate(DestinationStartWith)
  readonly directory: string;

  @ApiProperty({
    type: String,
    description: 'File name that should be changed'
  })
  @IsString()
  @IsNotEmpty()
  readonly oldName: string;

  @ApiProperty({
    type: String,
    description: 'New file name'
  })
  @IsString()
  @IsNotEmpty()
  readonly newName: string;

  @ApiProperty({
    type: Boolean,
    description: 'Should rewrite existing file'
  })
  @IsOptional()
  @IsBoolean()
  readonly rewrite: boolean = false;
}

export class CreateFolderDto {
    @ApiProperty({
      type: String,
      description: 'Directory name where new folder should be created'
    })
    @IsString()
    @IsNotEmpty()
    @Validate(DestinationStartWith)
    readonly directory: string;

    @ApiProperty({
      type: String,
      description: 'Name of new folder'
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}


export class CreateNewFile {
  @ApiProperty({
    type: String,
    description: 'Directory name where file should be created'
  })
  @IsString()
  @IsNotEmpty()
  @Validate(DestinationStartWith)
  readonly directory: string;

  @ApiProperty({
    type: String,
    description: 'Name of new file'
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;


  @ApiProperty({
    type: String,
    description: 'Extension of new file'
  })
  @IsString()
  @IsNotEmpty()
  readonly extension: string;
}

export class FileItemDto {
  @ApiProperty({ example: 'root_folder/example.txt' })
  @IsString()
  @IsNotEmpty()
  readonly path: string;

  @ApiProperty({ example: 'example.txt'})
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 756 })
  @IsNumber()
  readonly size: number;

  @ApiProperty({ example: '2022-12-01T08:41:14.099Z' })
  @IsDateString()
  readonly mtime: string;

  @ApiProperty({ example: 'file'})
  @IsString()
  @IsNotEmpty()
  readonly type: string;
}



export class FolderItemDto {
  @ApiProperty({ example: 'root_folder' })
  @IsString()
  @IsNotEmpty()
  readonly path: string;

  @ApiProperty({ example: 'root_folder'})
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 756 })
  @IsNumber()
  readonly size: number;

  @ApiProperty({ example: '2022-12-01T08:41:14.099Z' })
  @IsDateString()
  readonly mtime: string;

  @ApiProperty({ example: 'directory'})
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({
    isArray: true,
    type: FileItemDto
  })
  readonly children: FileItemDto;
}



  // {
  //   "path": "test_folder/new_file.txt",
  //   "name": "new_file.txt",
  //   "mtime": "2022-12-01T08:41:14.099Z",
  //   "size": 0,
  //   "type": "file"
  // }

  // "path": "test_folder/new_image_folder",
  // "name": "new_image_folder",
  // "children": [],
  // "mtime": "2022-12-01T08:42:07.414Z",
  // "size": 0,
  // "type": "directory"