/// <reference types="multer" />
import { CreateFolderDto, FileItemDto, CreateNewFile } from './dto';
export declare class AppService {
    private dirTreeConfig;
    deleteFolder(path: string): Promise<FileItemDto>;
    deleteFile(path: string): Promise<FileItemDto>;
    private folderNotFoundError;
    private fileNotFoundError;
    private fileAlreadyExistsError;
    fileExists(path: string): Promise<any>;
    upload(path: string, file: Express.Multer.File): Promise<any>;
    createNewFile({ extension, destination, name }: CreateNewFile): Promise<FileItemDto>;
    createFolder({ destination, name }: CreateFolderDto): Promise<FileItemDto>;
    private fsDeleteFolder;
    private fsDeleteFile;
    private isDirectory;
    private isFile;
    private derectoryExists;
    private getTreeByPath;
    directoryTree(): any;
}
