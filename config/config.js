import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});

export const db = {
    user: data.parsed.USER,
    host: data.parsed.HOST,
    database: data.parsed.DATABASE,
    password: data.parsed.PASSWORD,
};

export const api = {
    port: data.parsed.PORT,
};

// export const api = {
//     port: process.env.API_PORT || 3000,
// };

// export const db = {
//     user: "ywyoexjkwwbddn",
//     host: "ec2-34-225-159-178.compute-1.amazonaws.com",
//     database: "dbq5pkt37obf9k",
//     password: "b2e303f3a4add12d87158f15f922649a5991561025e583b87ca00c8f11689c99",
//     port: "5432",
// };

// export const db = {
//     user: 'postgres',
//     host: 'localhost',
//     database: 'CSDB',
//     password: 'root',
//     port: '5432',
// };