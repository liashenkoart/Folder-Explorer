import { Controller, Get, Query, Delete, UseInterceptors, Post, UploadedFile, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadQueryDto, CreateFolderDto, FileItemDto, CreateNewFile } from './dto';

@Controller('files')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  tree(): any {
    return this.appService.directoryTree()
  }

  @Post('folder')
  @UseInterceptors(FileInterceptor('file'))
  async addFolder(@Body() body: CreateFolderDto): Promise<FileItemDto> {
    return this.appService.createFolder(body)
  }

  @Post('new')
  async newFile(@Body() body): Promise<FileItemDto> {
    return this.appService.createNewFile(body)
  }
  
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Query() query: FileUploadQueryDto, @UploadedFile() file: Express.Multer.File): Promise<FileItemDto>  {
    return this.appService.upload(query.destination,file)
  }

  @Delete('folder')
  async deleteFolder(@Query('path') path: string): Promise<FileItemDto>  {
    return this.appService.deleteFolder(path)
  }

  @Delete('file')
  async deleteFile(@Query('path') path: string): Promise<FileItemDto>  {
    return this.appService.deleteFile(path)
  }
}
