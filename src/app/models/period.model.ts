import * as  moment from 'moment';

export interface Period {
    start: Date;
    end: Date;
}

export function listOfMonth(period: Period) {
    const current = moment(period.start);
    const end = moment(period.end);
    const months = [];
    while (current.isBefore(end)) {
        months.push(current.format('MMMM'));
        current.add(1, 'month');
    }
    return months;
}
