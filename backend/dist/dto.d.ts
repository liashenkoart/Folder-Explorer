import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class DestinationStartWith implements ValidatorConstraintInterface {
    validate(path: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class FileUploadQueryDto {
    destination: string;
}
export declare class CreateFolderDto {
    destination: string;
    name: string;
}
export declare class CreateNewFile {
    destination: string;
    name: string;
    extension: string;
}
export declare class FileItemDto {
    path: string;
    name: string;
    children: [];
}
