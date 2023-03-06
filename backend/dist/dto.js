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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileItemDto = exports.CreateNewFile = exports.CreateFolderDto = exports.FileUploadQueryDto = exports.DestinationStartWith = void 0;
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
let DestinationStartWith = class DestinationStartWith {
    validate(path, args) {
        return path === process.env.FILES_FOLDER || (path.startsWith(`${process.env.FILES_FOLDER}/`) && path.length > `${process.env.FILES_FOLDER}/`.length);
    }
    defaultMessage(args) {
        return 'Text ($value) is too short or too long!';
    }
};
DestinationStartWith = __decorate([
    (0, class_validator_2.ValidatorConstraint)({ name: 'customPath', async: false })
], DestinationStartWith);
exports.DestinationStartWith = DestinationStartWith;
class FileUploadQueryDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FileUploadQueryDto.prototype, "destination", void 0);
exports.FileUploadQueryDto = FileUploadQueryDto;
class CreateFolderDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.Validate)(DestinationStartWith, {
        message: 'Title is too short or long!',
    }),
    __metadata("design:type", String)
], CreateFolderDto.prototype, "destination", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFolderDto.prototype, "name", void 0);
exports.CreateFolderDto = CreateFolderDto;
class CreateNewFile {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.Validate)(DestinationStartWith, {
        message: 'Title is too short or long!',
    }),
    __metadata("design:type", String)
], CreateNewFile.prototype, "destination", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNewFile.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNewFile.prototype, "extension", void 0);
exports.CreateNewFile = CreateNewFile;
class FileItemDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FileItemDto.prototype, "path", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FileItemDto.prototype, "name", void 0);
exports.FileItemDto = FileItemDto;
//# sourceMappingURL=dto.js.map