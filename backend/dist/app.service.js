"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const dirTree = require("directory-tree");
let AppService = class AppService {
    constructor() {
        this.dirTreeConfig = { attributes: ['mtime', 'size', 'type'] };
    }
    async deleteFolder(path) {
        await this.folderNotFoundError(path);
        const node = this.getTreeByPath(path);
        this.fsDeleteFolder(path);
        return node;
    }
    async deleteFile(path) {
        await this.fileNotFoundError(path);
        const node = this.getTreeByPath(path);
        this.fsDeleteFile(path);
        return node;
    }
    async folderNotFoundError(path) {
        if (!await this.isDirectory(path)) {
            throw new common_1.NotFoundException(`Folder = ${path} not found`);
        }
    }
    async fileNotFoundError(path) {
        if (!await this.isFile(path)) {
            throw new common_1.NotFoundException(`File = ${path} not found`);
        }
    }
    async fileAlreadyExistsError(folder, fileName) {
        const exists = await this.isFile(`${folder}/${fileName}`);
        if (exists)
            throw new common_1.BadRequestException(`File = ${fileName} already exists`);
    }
    async fileExists(path) {
        return fs.existsSync(path);
    }
    async renameFile({ directory, newName, oldName, rewrite }) {
        await this.inValidDestinationErorr(directory);
        const newFilePath = `${directory}/${newName}`;
        const oldFilePath = `${directory}/${oldName}`;
        const exists = this.exists(oldFilePath);
        if (!exists)
            throw new common_1.BadRequestException('File that you want to rename does not exist');
        if (!rewrite) {
            const exists = this.exists(newFilePath);
            if (exists)
                throw new common_1.BadRequestException('New file name is already taken');
        }
        await fs.renameSync(oldFilePath, newFilePath);
        return this.getTreeByPath(newFilePath);
    }
    exists(path) {
        return fs.existsSync(path);
    }
    async upload(path, file) {
        await this.folderNotFoundError(path);
        return fs.writeFileSync(`${path}/${file.originalname}`, file.buffer);
    }
    async createNewFile({ extension, destination, name }) {
        const fileName = `${name}.${extension}`;
        await this.fileAlreadyExistsError(destination, fileName);
        await this.folderNotFoundError(destination);
        const fullFilePath = `${destination}/${fileName}`;
        await fs.openSync(fullFilePath, 'w');
        return this.getTreeByPath(fullFilePath);
    }
    async createFile({ name, extension, destination }) {
        await this.folderNotFoundError(destination);
        const newFile = `${name}.${extension}`;
        await this.fileAlreadyExistsError(destination, newFile);
        const newFileDest = `${destination}/${newFile}`;
        fs.openSync(newFileDest, 'w');
        return this.getTreeByPath(newFileDest);
    }
    async createFolder({ destination, name }) {
        const exists = this.fileExists(destination);
        if (exists) {
            const isDirectory = await this.isDirectory(destination);
            if (!isDirectory) {
                throw new common_1.BadRequestException('Destination should be a valid folder');
            }
            const path = `${destination}/${name}`;
            const folderExists = await this.derectoryExists(path);
            if (folderExists) {
                throw new common_1.BadRequestException(`Forder = ${name} already exists in ${destination}`);
            }
            await fs.mkdirSync(path);
            return this.getTreeByPath(path);
        }
        else {
            throw new common_1.BadRequestException(`Wrong folder destination = ${path}`);
        }
    }
    async fsDeleteFolder(dir) {
        return await fs.rmSync(dir, { recursive: true, force: true });
    }
    async fsDeleteFile(file) {
        return await fs.unlinkSync(file);
    }
    isDirectory(path) {
        return new Promise((resolve) => {
            try {
                const isDir = fs.statSync(path).isDirectory();
                const exists = fs.existsSync(path);
                resolve(isDir && exists);
            }
            catch (e) {
                resolve(false);
            }
        });
    }
    isFile(path) {
        return new Promise((resolve) => {
            try {
                const isDir = fs.statSync(path).isDirectory();
                const exists = fs.existsSync(path);
                resolve(!isDir && exists);
            }
            catch (e) {
                resolve(false);
            }
        });
    }
    inValidDestinationErorr(path) {
        const exist = fs.existsSync(path);
        if (!exist)
            throw new common_1.BadRequestException('Invalid file/folder path');
    }
    derectoryExists(path) {
        return new Promise((resolve, reject) => {
            fs.access(path, function (error) {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    getTreeByPath(path) {
        return dirTree(path, this.dirTreeConfig);
    }
    directoryTree() {
        return this.getTreeByPath(process.env.FILES_FOLDER);
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map