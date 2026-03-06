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
import * as client from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new client.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield bcrypt.hash('admin123', 10);
        const admin = yield prisma.user.upsert({
            where: { email: 'admin@turnos.com' },
            update: {},
            create: {
                nombre: 'Administrador',
                email: 'admin@turnos.com',
                password: hash,
                role: 'ADMIN',
                telefono: '+5491100000000'
            },
        });
        console.log('✅ Usuario Administrador creado/verificado:');
        console.log('Email:', admin.email);
        console.log('Password: admin123');
        // Seed Profesionales
        const profesionales = [
            { nombre: 'Dr. Juan Pérez', email: 'juan.perez@turnos.com', telefono: '+5491100000001' },
            { nombre: 'Dra. María Gómez', email: 'maria.gomez@turnos.com', telefono: '+5491100000002' }
        ];
        for (const p of profesionales) {
            const pHash = yield bcrypt.hash('profesional123', 10);
            yield prisma.user.upsert({
                where: { email: p.email },
                update: {
                    precioConsulta: 5000,
                    diasLaborables: "1,2,3,4,5",
                    horaInicio: "09:00",
                    horaFin: "18:00"
                },
                create: {
                    nombre: p.nombre,
                    email: p.email,
                    password: pHash,
                    role: 'PROFESIONAL',
                    telefono: p.telefono,
                    precioConsulta: 5000,
                    diasLaborables: "1,2,3,4,5",
                    horaInicio: "09:00",
                    horaFin: "18:00"
                },
            });
            console.log(`✅ Profesional creado/verificado: ${p.nombre} (${p.email}) - Password: profesional123`);
        }
    });
}
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
    }));
