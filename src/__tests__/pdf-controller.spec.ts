import { describe, it, expect } from 'vitest';
import { Request, Response } from 'express';
import { Readable } from "node:stream";

import { uploadPdf } from '../controllers/pdf-controller';


describe('pdfController', () => {
    it('should return 400 if no file is uploaded', async () => {
        const req: Partial<Request> = { file: undefined };
        const res: Partial<Response> = {
            status: (code: number) => {
                expect(code).toBe(400);
                return res as Response;
            },
            send: (message: string) => {
                expect(message).toBe('No file uploaded.');
                return res as Response;
            }
        };

        await uploadPdf(req as Request, res as Response);
    });

    it('should return 500 if the file is damaged', async () => {
        const req: Partial<Request> = {
            file: {
                filename: 'sample.name',
                originalname: 'sample.name',
                mimetype: 'sample.type',
                path: 'sample.url',
                fieldname: 'test',
                size: 0,
                destination: 'test',
                buffer: Buffer.from('whatever'),
                encoding: 'utf8',
                stream: new Readable()
            },
            headers: {
                'x-api-key': 'TEST_KEY'
            }
        };

        const res: Partial<Response> = {
            status: (code: number) => {
                expect(code).toBe(500);
                return res as Response;
            },
            send: (message: string) => {
                expect(message).toBe('An error occurred: Cannot extract data. Invalid file provided.');
                return res as Response;
            }
        };

        await uploadPdf(req as Request, res as Response);
    });
});