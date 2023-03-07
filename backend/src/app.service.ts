import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto, FileItemDto, CreateNewFile, RenameFileDto } from './dto';

const fs = require("fs")
const path = require("path")
const dirTree = require("directory-tree");

@Injectable()
export class AppService {

 private dirTreeConfig = { attributes:['mtime','size','type'] }

 async deleteFolder(path: string): Promise<FileItemDto> {
   await this.folderNotFoundError(path);

   const node = this.getTreeByPath(path)

   this.fsDeleteFolder(path)

   return node;
 }

 async deleteFile(path: string): Promise<FileItemDto> {
  await this.fileNotFoundError(path)

  const node = this.getTreeByPath(path)

  this.fsDeleteFile(path)

  return node;
}

  private async folderNotFoundError(path: string) {
    if(!await this.isDirectory(path)){
      throw new NotFoundException(`Folder = ${path} not found`)
    }
  }

  private async fileNotFoundError(path: string) {
    if(!await this.isFile(path)){
      throw new NotFoundException(`File = ${path} not found`)
    }
  }

  private async fileAlreadyExistsError(folder, fileName) {
    const exists = await this.isFile(`${folder}/${fileName}`)
    if(exists) throw new BadRequestException(`File = ${fileName} already exists`)
 }

  async fileExists(path: string) {
    return fs.existsSync(path)
  }

  async renameFile({ directory, newName, oldName, rewrite  }: RenameFileDto): Promise<any> {
    await this.inValidDestinationErorr(directory);
    const newFilePath = `${directory}/${newName}`;
    const oldFilePath = `${directory}/${oldName}`;

    const exists = this.exists(oldFilePath);
    if(!exists) throw new BadRequestException('File that you want to rename does not exist')
    
    if(!rewrite) {
       const exists = this.exists(newFilePath);
       if(exists) throw new BadRequestException('New file name is already taken')
    }
  
    await fs.renameSync(oldFilePath, newFilePath);

    return this.getTreeByPath(newFilePath)
  }

  private exists(path: string): boolean {
    return fs.existsSync(path)
  }

  async upload(path: string,file:Express.Multer.File): Promise<any> {
    await this.folderNotFoundError(path);

    return fs.writeFileSync(`${path}/${file.originalname}`, file.buffer)
  } 

  async createNewFile({ extension, destination, name }: CreateNewFile): Promise<FileItemDto> {
      const fileName = `${name}.${extension}`;
      await this.fileAlreadyExistsError(destination, fileName);
      await this.folderNotFoundError(destination);
      const fullFilePath = `${destination}/${fileName}`
      await fs.openSync(fullFilePath, 'w')
      return this.getTreeByPath(fullFilePath)
  }

  async createFile({ name, extension, destination }: CreateNewFile) {
    await this.folderNotFoundError(destination);
    const newFile = `${name}.${extension}`;
    await this.fileAlreadyExistsError(destination,newFile);

    const newFileDest = `${destination}/${newFile}`;
    fs.openSync(newFileDest, 'w');
    return this.getTreeByPath(newFileDest)

  }

  async createFolder({ destination, name }: CreateFolderDto): Promise<FileItemDto>{
    const exists = this.fileExists(destination);
    if(exists) {
        const isDirectory = await this.isDirectory(destination);
        if(!isDirectory) {
          throw new BadRequestException('Destination should be a valid folder')
        }
        const path = `${destination}/${name}`;
        const folderExists = await this.derectoryExists(path);
      
        if(folderExists) {
          throw new BadRequestException(`Forder = ${name} already exists in ${destination}`)
        }

        await fs.mkdirSync(path);

        return this.getTreeByPath(path)
      } else {
        throw new BadRequestException(`Wrong folder destination = ${path}`)
      }
    }

    private async fsDeleteFolder(dir: string): Promise<void>  {
        return await fs.rmSync(dir, { recursive: true, force: true });
    }

  private async fsDeleteFile(file: string): Promise<void>  {
      return  await fs.unlinkSync(file);
  }

  private isDirectory(path: string): Promise<boolean> {
    return new Promise((resolve): any => {
      try {
        const isDir = fs.statSync(path).isDirectory();
        const exists = fs.existsSync(path)
        resolve(isDir && exists)
      } catch(e) {
        resolve(false)
      }
    })
  }

  private isFile(path: string): Promise<boolean> {
    return new Promise((resolve): any => {
      try {
        const isDir = fs.statSync(path).isDirectory();
        const exists = fs.existsSync(path)
        resolve(!isDir && exists)
      } catch(e) {
        resolve(false)
      }
    })
  }

  private inValidDestinationErorr(path: string): void {
    const exist = fs.existsSync(path);
    if(!exist) throw new BadRequestException('Invalid file/folder path')
  }

  private derectoryExists(path: string): Promise<boolean> {
    return new Promise((resolve,reject): any => {
      fs.access(path, function(error) {
        if (error) {
          resolve(false)
        } else {
           resolve(true)
        }
      })
    })
  }

  private getTreeByPath(path: string) {
    return dirTree(path, this.dirTreeConfig)
  }

  public directoryTree(){
    return this.getTreeByPath(process.env.FILES_FOLDER)
  }
}
