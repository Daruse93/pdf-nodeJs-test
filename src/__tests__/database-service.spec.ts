import { DatabaseService, CompanyData } from '../services/database-service';
import { expect, describe, it, beforeEach } from 'vitest'

describe('DatabaseService', () => {
    let databaseService: DatabaseService;

    beforeEach(async () => {
        databaseService = new DatabaseService("TEST_KEY");

        await new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    });

    it('should initialize with records loaded from the database', () => {
        expect(databaseService['records'].length).toBeGreaterThan(0);
    });

    it('should return correct company data when extracting by company name', () => {
        const companyName = 'TechCorp'
        const companyData: CompanyData = {
            "Company Name": companyName,
            "Industry": 'Technology',
        };
        const extractedData = databaseService.extract(companyName);
        Object.entries(companyData).forEach(([key, value]) => {
            expect(extractedData).toHaveProperty(key, value);
        });
    });

    it('should return undefined when extracting with non-existing company name', () => {
        const nonExistingCompanyName = 'Non-existent Company';
        const extractedData = databaseService.extract(nonExistingCompanyName);
        expect(extractedData).toBeUndefined();
    });
});