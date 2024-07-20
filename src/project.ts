import JSZip from "jszip";
import { readFileSync, writeFile, existsSync } from "fs";
import { resolve } from "path";
import { cwd } from "process";
import type { ScratchObject } from "./object";
import type { Project } from "./types";

/**
 * This enum contains all the valid extensions that scratch accepts.
 */
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

/**
 * This class allows the project to be built into a zip file.
 * You use this to add your targets, extensions, and monitors.
 */
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

	/**
	 * Adds a scratch extension to the project.
	 * @param extension A valid scratch extension.
	 * @returns The current project being built.
	 */
	public addExtension(extension: ScratchExtension): ProjectBuilder {
		this.data.extensions.push(ScratchExtension[extension].toLowerCase());
		return this;
	}

	/**
	 * Adds a target to a project.
	 * @param object This can be a ScratchSprite or ScratchStage.
	 * @returns The current project being built.
	 */
	public addTarget(object: ScratchObject): ProjectBuilder {
		this.data.targets.push(object.export());
		return this;
	}

	/**
	 * Finishes building the project, and outputs it into the current working directory.
	 * @param output The output name of the project without the '.sb3' extension.
	 */
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