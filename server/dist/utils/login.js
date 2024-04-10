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
const getData_1 = __importDefault(require("./getData"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (inputVars) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const query = `
    query MyQuery($email: String, $limit: Int) {
      user(where: {email: {_eq: $email}}, limit: $limit) {
        email
        id
        name
        password
      }
    }       
  `;
    const queryVars = {
        email: inputVars === null || inputVars === void 0 ? void 0 : inputVars.email,
        limit: 1
    };
    const graphql = {
        query: query,
        variables: queryVars
    };
    const response = yield (0, getData_1.default)(graphql);
    const key = process.env.CRYPTO_HASH_KEY || '';
    const decryptPass = crypto_js_1.default.AES.decrypt((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.user[0]) === null || _b === void 0 ? void 0 : _b.password, key);
    if (decryptPass.toString(crypto_js_1.default.enc.Utf8) === (inputVars === null || inputVars === void 0 ? void 0 : inputVars.password)) {
        const token = jsonwebtoken_1.default.sign({ user: inputVars }, key);
        return {
            status: 'success',
            message: 'access granted!',
            token: token,
            data: (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.user[0]
        };
    }
    return {
        status: 'error',
        message: 'Invalid credentials'
    };
});
exports.default = login;
