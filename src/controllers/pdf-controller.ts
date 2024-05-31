import { Request, Response } from "express";

import { PdfService } from '../services/pdf-service';
import { DatabaseService } from '../services/database-service';
import { compareData } from '../services/compare-data-service';

const pdfServiceApiKey = process.env.PDF_SERVICE_KEY  || 'TEST_KEY';
const databaseServiceApiKey = process.env.DATABASE_SERVICE_KEY  || 'TEST_KEY';

const pdfService = new PdfService(pdfServiceApiKey);
const databaseService = new DatabaseService(databaseServiceApiKey);

export const uploadPdf = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== pdfServiceApiKey) {
        return res.status(401).send("Unauthorized.");
    }

    try {
        const filePath = req.file.destination + req.file.originalname;
        const pdfData = await pdfService.extract(filePath);
        const companyData = databaseService.extract(pdfData['Company Name'] as string);

        if (!companyData) {
            return res.status(404).send("Company not found.");
        }

        const comparisonResult = compareData(pdfData, companyData);

        res.json(comparisonResult);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(`An error occurred: ${error.message}`);
        }
    }
};