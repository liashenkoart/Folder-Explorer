/// <reference types="multer" />
import { AppService } from './app.service';
import { FileUploadQueryDto, CreateFolderDto, FileItemDto } from './dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    tree(): any;
    addFolder(body: CreateFolderDto): Promise<FileItemDto>;
    newFile(body: any): Promise<FileItemDto>;
    uploadFile(query: FileUploadQueryDto, file: Express.Multer.File): Promise<FileItemDto>;
    deleteFolder(path: string): Promise<FileItemDto>;
    deleteFile(path: string): Promise<FileItemDto>;
}
