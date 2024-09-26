import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
    constructor() {
        super('Sport already exist', HttpStatus.CONFLICT);
    }
}
