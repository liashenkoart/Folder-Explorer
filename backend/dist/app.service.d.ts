/// <reference types="multer" />
import { CreateFolderDto, FileItemDto, CreateNewFile, RenameFileDto } from './dto';
export declare class AppService {
    private dirTreeConfig;
    deleteFolder(path: string): Promise<FileItemDto>;
    deleteFile(path: string): Promise<FileItemDto>;
    private folderNotFoundError;
    private fileNotFoundError;
    private fileAlreadyExistsError;
    fileExists(path: string): Promise<any>;
    renameFile({ directory, newName, oldName, rewrite }: RenameFileDto): Promise<any>;
    private exists;
    upload(path: string, file: Express.Multer.File): Promise<any>;
    createNewFile({ extension, destination, name }: CreateNewFile): Promise<FileItemDto>;
    createFile({ name, extension, destination }: CreateNewFile): Promise<any>;
    createFolder({ destination, name }: CreateFolderDto): Promise<FileItemDto>;
    private fsDeleteFolder;
    private fsDeleteFile;
    private isDirectory;
    private isFile;
    private inValidDestinationErorr;
    private derectoryExists;
    private getTreeByPath;
    directoryTree(): any;
}
