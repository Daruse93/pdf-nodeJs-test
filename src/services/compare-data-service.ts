import {CompanyData} from './database-service';
import {CompanyPDFData} from "./pdf-service";

interface ComparisonResult {
    pdfData: CompanyPDFData;
    companyData: CompanyData;
    differences: Record<string, { database: string; pdf: string | number }>;
}

export function compareData(pdfData: CompanyPDFData, companyData: CompanyData): Record<string, any> {
    const comparisonResult: ComparisonResult = {
        pdfData,
        companyData,
        differences: {}
    };


    // Iterate over keys from both objects
    const allKeys = [...new Set(
        [
            ...Object.keys(pdfData),
            ...Object.keys(companyData)
        ]
    )];

    for (const key of allKeys) {
        const companyValue = companyData[key] || '';
        const pdfValue = pdfData[key] || '';

        if (companyValue !== pdfValue) {
            comparisonResult.differences[key] = {
                database: String(companyValue),
                pdf: String(pdfValue)
            };
        }
    }

    return comparisonResult;
}