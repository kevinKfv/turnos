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
};
exports.comparePassword = exports.hashPassword = void 0;
import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt.default.hash(password, SALT_ROUNDS);
});
export { hashPassword };
const comparePassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt.default.compare(password, hash);
});
export { comparePassword };
