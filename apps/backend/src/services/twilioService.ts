// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
exports.sendWhatsAppReminder = void 0;
import twilio from 'twilio';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const client = (accountSid === null || accountSid === void 0 ? void 0 : accountSid.startsWith('AC')) && authToken ? (0, twilio.default)(accountSid, authToken) : null;
const sendWhatsAppReminder = (to, message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!client) {
        console.warn('Twilio no está configurado. Simulando envío de WhatsApp:');
        console.warn(`Para: ${to}, Mensaje: ${message}`);
        return;
    }
    try {
        // Asegurarse de que el número comience con whatsapp: (ej. whatsapp:+549...)
        const toWithPrefix = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
        yield client.messages.create({
            body: message,
            from: twilioNumber,
            to: toWithPrefix
        });
        console.log(`Recordatorio enviado a ${to}`);
    }
    catch (error) {
        console.error(`Error enviando WhatsApp a ${to}:`, error);
    }
});
export { sendWhatsAppReminder };
