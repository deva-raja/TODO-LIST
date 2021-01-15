import { endOfToday } from "date-fns";
const today = new Date();
console.log(today);
var result = endOfToday();
console.log(result > today);
