import { IsNotEmpty, IsString, IsBoolean, IsOptional} from 'class-validator';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  @Validate(DestinationStartWith)
  readonly directory: string;

  @IsString()
  @IsNotEmpty()
  readonly oldName: string;

  @IsString()
  @IsNotEmpty()
  readonly newName: string;

  @IsOptional()
  @IsBoolean()
  readonly rewrite: boolean = false;
}

export class CreateFolderDto {
    @IsString()
    @IsNotEmpty()
    @Validate(DestinationStartWith)
    readonly destination: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;
}


export class CreateNewFile {
  @IsString()
  @IsNotEmpty()
  @Validate(DestinationStartWith)
  readonly destination: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly extension: string;
}

export class FileItemDto {
  @IsString()
  @IsNotEmpty()
  readonly path: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  children: []
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