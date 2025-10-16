import { InternalServerErrorException } from '@nestjs/common';
import { writeFileSync, promises, constants, unlinkSync } from 'fs';
export class FileManager {
  static async saveFile(file: Express.Multer.File): Promise<string> {
    const path = Date.now() + '-' + file.originalname;
    writeFileSync(process.cwd() + '/public/' + path, file.buffer);
    return path;
  }
  static deleteFile(path: string): boolean {
    try {
      unlinkSync(this.convertToRealPath(path));
      return true;
    } catch {
      return false;
    }
  }
  static async updateFile(
    relPath: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const realPath = this.convertToRealPath(relPath);
    return this.checkFileExists(realPath)
      .then((res) => {
        if (res) {
          this.deleteFile(relPath);
          return this.saveFile(file);
        }
        return this.saveFile(file);
      })
      .catch((err) => {
        throw new InternalServerErrorException('Error al guardar Archivo');
      });
  }
  static checkFileExists(path: string): Promise<boolean> {
    return promises
      .access(path, constants.F_OK)
      .then(() => true)
      .catch(() => false);
  }
  static convertToRealPath(path: string): string {
    return process.cwd() + '/public/' + path;
  }
}
