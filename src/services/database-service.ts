import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

export interface CompanyData {
    "Company Name": string;
    [key: string]: string | number;
}

const databasePath = path.resolve(__dirname, '../../data/database.csv');

export class DatabaseService {
    private records: CompanyData[] = [];

    constructor() {
        this.loadDatabase();
    }

    private loadDatabase(): void {
        fs.createReadStream(databasePath)
            .pipe(parse({ columns: true, cast: true }))
            .on('data', (row: CompanyData) => {
                this.records.push(row);
            })
            .on('error', (err: Error) => {
                console.error(`Failed to load database: ${err.message}`);
            });
    }

    public extract(companyName: string): CompanyData | undefined {
        return this.records.find(company => company["Company Name"] === companyName);
    }
}