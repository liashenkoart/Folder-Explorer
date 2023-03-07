"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const platform_express_1 = require("@nestjs/platform-express");
const dto_1 = require("./dto");
const enum_1 = require("./enum");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    tree() {
        return this.appService.directoryTree();
    }
    async uploadFile(query, file) {
        return this.appService.upload(query.destination, file);
    }
    async rename(body) {
        return this.appService.renameFile(body);
    }
    async deleteFile(path, type) {
        if (type === enum_1.FileType.FILE) {
            return this.appService.deleteFile(path);
        }
        else {
            return this.appService.deleteFolder(path);
        }
    }
    async newFile(body) {
        return this.appService.createFile(body);
    }
    async newFolder(body) {
        return this.appService.createFolder(body);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "tree", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FileUploadQueryDto, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Put)('rename'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RenameFileDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "rename", null);
__decorate([
    (0, common_1.Delete)(`type(${enum_1.FileType.FILE}|${enum_1.FileType.DIRECTORY})`),
    __param(0, (0, common_1.Query)('path')),
    __param(1, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteFile", null);
__decorate([
    (0, common_1.Post)(`new/${enum_1.FileType.FILE}`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateNewFile]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "newFile", null);
__decorate([
    (0, common_1.Post)(`new/${enum_1.FileType.DIRECTORY}`),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateFolderDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "newFolder", null);
AppController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map