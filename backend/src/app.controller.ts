import { Controller, Get, Query, Delete, UseInterceptors, Post, UploadedFile, Body, Param, Put} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadQueryDto, CreateFolderDto, FileItemDto, CreateNewFile, RenameFileDto } from './dto';
import { FileType } from './enum';

@Controller('files')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  tree(): any {
    return this.appService.directoryTree()
  }
  
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Query() query: FileUploadQueryDto, @UploadedFile() file: Express.Multer.File): Promise<FileItemDto>  {
    return this.appService.upload(query.destination,file)
  }

  @Put('rename')
  async rename(@Body() body: RenameFileDto): Promise<FileItemDto>  {
    return this.appService.renameFile(body)
  }

  @Delete(`type(${FileType.FILE}|${FileType.DIRECTORY})`)
  async deleteFile(@Query('path') path: string, @Param('type') type: FileType): Promise<FileItemDto>  {
    if(type === FileType.FILE) {
      return this.appService.deleteFile(path);
    } else {
      return this.appService.deleteFolder(path);
    }
  }

  @Post(`new/${FileType.FILE}`)
  async newFile(@Body() body: CreateNewFile): Promise<any> {
   return this.appService.createFile(body)
  }

  @Post(`new/${FileType.DIRECTORY}`)
  async newFolder(@Body() body: CreateFolderDto): Promise<FileItemDto> {
      return this.appService.createFolder(body)
  }
}
