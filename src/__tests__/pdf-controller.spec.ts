import { describe, it, expect } from 'vitest';
import { Request, Response } from 'express';

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
});