// @ts-nocheck
import app from './app';
import * as reminderCron from './cron/reminderCron';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
    // Iniciar cron jobs
    (0, reminderCron.startReminderCron)();
});
