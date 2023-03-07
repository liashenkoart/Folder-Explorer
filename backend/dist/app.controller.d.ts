/// <reference types="multer" />
import { AppService } from './app.service';
import { FileUploadQueryDto, CreateFolderDto, FileItemDto, CreateNewFile, RenameFileDto } from './dto';
import { FileType } from './enum';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    tree(): any;
    uploadFile(query: FileUploadQueryDto, file: Express.Multer.File): Promise<FileItemDto>;
    rename(body: RenameFileDto): Promise<FileItemDto>;
    deleteFile(path: string, type: FileType): Promise<FileItemDto>;
    newFile(body: CreateNewFile): Promise<any>;
    newFolder(body: CreateFolderDto): Promise<FileItemDto>;
}
