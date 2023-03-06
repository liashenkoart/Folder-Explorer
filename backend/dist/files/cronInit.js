"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = require("dayjs");
const cronController_1 = require("./cron/cronController");
const start = () => {
    const curentHour = (0, dayjs_1.default)().hour();
    const startTime = 5;
    const endTime = 23;
    if (curentHour < startTime || curentHour > endTime)
        return;
    (0, cronController_1.default)();
};
start();
//# sourceMappingURL=cronInit.js.map