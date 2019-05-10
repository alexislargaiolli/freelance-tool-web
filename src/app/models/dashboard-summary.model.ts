export interface DashboardSummary {
    turnover: {
        total: number;
        totalDutyFree: number;
        totalWithoutPortage: number;
        totalWithoutPortageDutyFree: number;
    };

    portage: {
        total: number;
        totalDutyFree: number;
        totalSalary: number;
    };

    profit: {
        total: number;
        totalTax: number;
        totalDutyFree: number;
    };
}

