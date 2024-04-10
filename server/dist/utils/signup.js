"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
const getData_1 = __importDefault(require("./getData"));
const signup = (inputVars, query) => __awaiter(void 0, void 0, void 0, function* () {
    const key = process.env.CRYPTO_HASH_KEY || '';
    const encryptedPass = crypto_js_1.default.AES.encrypt(inputVars === null || inputVars === void 0 ? void 0 : inputVars.password, key);
    inputVars.password = encryptedPass.toString();
    const graphql = {
        query: query,
        variables: inputVars
    };
    const data = yield (0, getData_1.default)(graphql);
    return data;
});
exports.default = signup;
