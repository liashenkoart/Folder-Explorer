import { Controller, Get, Query, Delete, Post, Body, Param, Put} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateFolderDto, FileItemDto, CreateNewFile, RenameFileDto, FolderItemDto } from './dto';
import { FileType } from './enum';
import { ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiOkResponse, ApiNotFoundResponse, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'The resource was returned successfully', type: FolderItemDto })
  tree(): FolderItemDto {
    return this.appService.directoryTree()
  }

  @Get(':node')
  @ApiOkResponse({ description: 'The resource was returned successfully', type: FolderItemDto })
  node(@Param('node') node: string): FolderItemDto {
    return this.appService.getNode(node)
  }
  
  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@Query() query: FileUploadQueryDto, @UploadedFile() file: Express.Multer.File): Promise<FileItemDto>  {
  //   return this.appService.upload(query.destination,file)
  // }

  @Put('rename')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async rename(@Body() body: RenameFileDto): Promise<FileItemDto | FolderItemDto>  {
    return this.appService.renameFile(body)
  }


  @Delete(`:type(${FileType.FILE}|${FileType.DIRECTORY})`)
  @ApiParam({
    name: 'type',
    required: true,
    schema: { oneOf: [{type: FileType.FILE}, {type: FileType.DIRECTORY}]},
    enum: FileType
  })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async deleteFile(@Query('path') path: string, @Param('type') type: FileType): Promise<FileItemDto>  {
    if(type === FileType.FILE) {
      return this.appService.deleteFile(path);
    } else {
      return this.appService.deleteFolder(path);
    }
  }

  @Post(`${FileType.FILE}`)
  @ApiCreatedResponse({ description: 'Created Succesfully', type: FileItemDto })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async newFile(@Body() body: CreateNewFile): Promise<any> {
     return this.appService.createFile(body)
  }

  @Post(`${FileType.DIRECTORY}`)
  @ApiCreatedResponse({ description: 'Created Succesfully', type: FolderItemDto })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async newFolder(@Body() body: CreateFolderDto): Promise<FileItemDto> {
      return this.appService.createFolder(body)
  }
}
