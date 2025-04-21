export const dateValidator = (value: string) => {
    const dates = value.split(',');
    if (dates.length === 1 || dates.length === 2) {
        for (const d of dates) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) {
                throw new Error('Invalid date format. Use YYYY-MM-DD');
            }
            if (isNaN(new Date(d).getTime())) {
                throw new Error('Invalid date value');
            }
        }
        return true;
    }
    throw new Error('Date must be in format YYYY-MM-DD or YYYY-MM-DD,YYYY-MM-DD');
}