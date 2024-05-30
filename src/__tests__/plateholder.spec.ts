import { expect, describe, it } from 'vitest'
import { CompanyPDFData } from "../services/pdf-service";
import { CompanyData } from "../services/database-service";
import { compareData } from "../services/compare-data-service";

const pdfData: CompanyPDFData = {
  'Company Name': 'TechCorp',
  'Industry': 'Technology',
  'Market Capitalization': 5000,
  'Revenue (in millions)': 1500,
  'EBITDA (in millions)': 300,
  'Net Income (in millions)': 100,
  'Debt (in millions)': 200,
  'Equity (in millions)': 800,
  'Enterprise Value (in millions)': 5400,
  'P/E Ratio': 25,
  'Revenue Growth Rate (%)': 10,
  'EBITDA Margin (%)': 20,
  'Net Income Margin (%)': 6.67,
  'ROE (Return on Equity) (%)': 12.5,
  'ROA (Return on Assets) (%)': 7.5,
  'Current Ratio': 2.5,
  'Debt to Equity Ratio': 0.25,
  'Location': 'San Francisco'
};

const companyData: CompanyData = {
  'Company Name': 'TechCorp',
  'Industry': 'Technology',
  'Market Capitalization': 5000,
  'Revenue (in millions)': 1500,
  'EBITDA (in millions)': 300,
  'Net Income (in millions)': 100,
  'Debt (in millions)': 200,
  'Equity (in millions)': 800,
  'Enterprise Value (in millions)': 5400,
  'P/E Ratio': 25,
  'Revenue Growth Rate (%)': 10,
  'EBITDA Margin (%)': 20,
  'Net Income Margin (%)': 6.67,
  'ROE (Return on Equity) (%)': 12.5,
  'ROA (Return on Assets) (%)': 7.5,
  'Current Ratio': 2.5,
  'Debt to Equity Ratio': 0.25,
  'Location': 'San Francisco'
};

describe('Test suite', () => {
  it('should return empty differences if pdfData and companyData are identical', () => {
    const result = compareData(pdfData, companyData);
    expect(result.differences).toEqual({});
  });

  it('should return differences if pdfData and companyData are different', () => {
    const modifiedPdfData = { ...pdfData, 'Location': 'New York' };
    const result = compareData(modifiedPdfData, companyData);
    expect(result.differences).toEqual({ Location: { database: 'San Francisco', pdf: 'New York' } });
  });

  it('should handle missing fields in pdfData', () => {
    const partialPdfData: CompanyPDFData = { ...pdfData};
    delete partialPdfData['Company Name']
    delete partialPdfData['Industry']

    const result = compareData(partialPdfData, companyData);

    expect(result.differences).toEqual({
      'Company Name': { database: 'TechCorp', pdf: '' },
      Industry: { database: 'Technology', pdf: '' }
    });
  });

  it('should handle missing fields in data', () => {
    const partialCompanyData: CompanyData = {...companyData};
    delete partialCompanyData['Market Capitalization']
    delete partialCompanyData['Revenue (in millions)']

    const result = compareData(pdfData, partialCompanyData);

    expect(result.differences).toEqual({
      'Market Capitalization': { database: '', pdf: '5000' },
      'Revenue (in millions)': { database: '', pdf: '1500' }
    });
  });
})
