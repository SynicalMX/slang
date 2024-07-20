import { Md5 } from "ts-md5";
import { resolve } from "path";
import { readFile } from "fs";
import { cwd } from "process";

const cache: Map<string, string> = new Map();

export default function generateAssetHash(relativePath: string): string | undefined {
	if (cache.has(relativePath)) {
		return cache.get(relativePath);
	}

	const md5 = new Md5();
	readFile(resolve(cwd(), relativePath), (err, data) => {
		if (err !== null) {
			throw err;
		}

		md5.appendStr(data.toString('utf-8'));
	});
	const hash = md5.end(false) as string;
	cache.set(relativePath, hash);
	return hash;
}