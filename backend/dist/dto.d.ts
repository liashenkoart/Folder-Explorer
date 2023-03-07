import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class DestinationStartWith implements ValidatorConstraintInterface {
    validate(path: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class FileUploadQueryDto {
    readonly destination: string;
}
export declare class RenameFileDto {
    readonly directory: string;
    readonly oldName: string;
    readonly newName: string;
    readonly rewrite: boolean;
}
export declare class CreateFolderDto {
    readonly destination: string;
    readonly name: string;
}
export declare class CreateNewFile {
    readonly destination: string;
    readonly name: string;
    readonly extension: string;
}
export declare class FileItemDto {
    readonly path: string;
    readonly name: string;
    children: [];
}
