export default class GeneralHelper {
    transformDate(date: string, time): Date {
        const dateTime =  new Date(date);
        if (time && time.length) {
            const timeArr = time.split(':');

            if (timeArr.length) {
                dateTime.setHours(timeArr[0], timeArr[1]);
                console.log(dateTime);
                return dateTime;
            }
        }
        dateTime.setHours(0, 0);
        return dateTime;
    }
}
