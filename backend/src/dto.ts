import { IsNotEmpty, IsString } from 'class-validator';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate } from 'class-validator';

@ValidatorConstraint({ name: 'customPath', async: false })
export class DestinationStartWith implements ValidatorConstraintInterface {
  validate(path: string, args: ValidationArguments) {
    return path === process.env.FILES_FOLDER || (path.startsWith(`${process.env.FILES_FOLDER}/`) && path.length > `${process.env.FILES_FOLDER}/`.length);
  }
  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) is too short or too long!';
  }
}

export class FileUploadQueryDto {
  @IsString()
  @IsNotEmpty()
  public destination: string;
}

export class CreateFolderDto {
    @IsString()
    @IsNotEmpty()
    @Validate(DestinationStartWith, {
      message: 'Title is too short or long!',
    })
    public destination: string;

    @IsString()
    @IsNotEmpty()
    public name: string;
}


export class CreateNewFile {
  @IsString()
  @IsNotEmpty()
  @Validate(DestinationStartWith, {
    message: 'Title is too short or long!',
  })
  public destination: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public extension: string;
}



  export class FileItemDto {
    @IsString()
    @IsNotEmpty()
    public path: string;

    @IsString()
    @IsNotEmpty()
    public name: string;

    children: []
  }