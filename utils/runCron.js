import { CronJob } from "cron";

const everydayAtMidnightPattern = '0 0 * * *'

const runCron = ({ func, pattern = everydayAtMidnightPattern, startNow = false}) => {
  const job = new CronJob(pattern, func, null, startNow, 'Europe/London');
  job.start();
}

export default runCron;