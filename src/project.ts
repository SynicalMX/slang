import JSZip from "jszip";
import { readFileSync, writeFile, existsSync } from "fs";
import { resolve } from "path";
import { cwd } from "process";
import type { ScratchObject } from "./object";
import type { Project } from "./types";

export enum ScratchExtension {
	PEN,
	WEDO2,
	MUSIC,
	MICROBIT,
	TEXT2SPEECH,
	TRANSLATE,
	VIDEOSENSING,
	EV3,
	MAKEYMAKEY,
	BOOST,
	GDXFOR
}

export default class ProjectBuilder {
	private data: Project;

	constructor() {
		this.data = {
			targets: [],
			monitors: [],
			extensions: [],
			meta: {
				semver: "3.0.0",
				vm: "4.3.0",
				agent: "scratch-compiler 0.1.0",
			}
		}
	}

	public addExtension(extension: ScratchExtension) {
		this.data.extensions.push(ScratchExtension[extension].toLowerCase());
	}

	public addTarget(object: ScratchObject): ProjectBuilder {
		this.data.targets.push(object.export());
		return this;
	}

	public build(output: string): void {
		const addedFiles: string[] = []
		const zip = new JSZip();
		const projectData = JSON.stringify(this.data);
		zip.file("project.json", projectData);
		this.data.targets.forEach((target) => {
			target.costumes.forEach((costume) => {
				const filename = `${costume.name}.${costume.dataFormat}`;
				const filepath = resolve(cwd(), "assets", filename);

				if (!addedFiles.includes(filename) && existsSync(filepath)) {
					console.log(`Attempting to add ${filename} to zip.`)
					addedFiles.push(filename);
					const data = readFileSync(filepath, "binary");
					zip.file(costume.md5ext, data);
				}
			});
		});

		zip.generateAsync({type:"nodebuffer"}).then(function(content) {
			writeFile(resolve(cwd(), `${output}.sb3`), content, () => {
				console.log("Built project successfully!");
			});
		});
	}
}