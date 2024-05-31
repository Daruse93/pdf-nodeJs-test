import { Request, Response } from "express";

import { PdfService } from '../services/pdf-service';
import { DatabaseService } from '../services/database-service';
import { compareData } from '../services/compare-data-service';

const apiKey = process.env.API_KEY || 'TEST_KEY';
const pdfService = new PdfService(apiKey);
const databaseService = new DatabaseService(apiKey);

export const uploadPdf = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
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