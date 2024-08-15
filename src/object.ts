import type { Block, Costume, List, Sound, Target, Variable, Comment } from "./types";
import generateAssetHash from "./util/file";
import type ScriptBuilder from "./script";

const EXTRACT_FILE_EXT = /\.[0-9a-z]+$/i;

/**
 * Base class for targets, extended by ScratchSprite and ScratchStage
 */
export abstract class ScratchObject {
	public isStage: boolean;
	public name: string;
	public variables: {[uid: string]: Variable}
	public lists: {[uid: string]: List};
	public broadcasts: {[uid: string]: string};
	public blocks: {[uid: string]: Block};
	public comments: {[uid: string]: Comment};
	public currentCostume: number;
	public costumes: Array<Costume>;
	public sounds: Array<Sound>;
	public layerOrder: number;
	public volume: number;

	constructor(isStage: boolean, name: string, currentCostume: number, layerOrder: number) {
		this.isStage = isStage;
		this.name = name;
		this.variables = {};
		this.lists = {};
		this.broadcasts = {};
		this.blocks = {};
		this.comments = {};
		this.currentCostume = currentCostume;
		this.costumes = [];
		this.sounds = [];
		this.layerOrder = layerOrder;
		this.volume = 100;
	}

	/**
	 *
	 * @param relativePath The asset filename.
	 * @param bitmap If true, it will increase the bitmap resolution to 2 instead of 1.
	 * @returns
	 */
	public addCostume(relativePath: string, bitmap?: boolean): ScratchObject {
		const assetHash = generateAssetHash(relativePath);

		// Extract the file extension, with the period
		const fullDataFormat = EXTRACT_FILE_EXT.exec(relativePath)?.[0];

		// Check if the file has an extension, if not throw error.
		if (typeof fullDataFormat !== "string") throw new Error("File doesn't have extension.");

		const dataFormat = fullDataFormat.substring(1) // remove the period

		let bitmapResolution = 1;
		if (bitmap) bitmapResolution++;

		this.costumes.push({
			assetId: assetHash as string,
			bitmapResolution: bitmapResolution,
			name: `costume${this.costumes.length + 1}`,
			dataFormat: dataFormat,
			md5ext: `${assetHash as string}${fullDataFormat}`,
			rotationCenterX: 0,
			rotationCenterY: 0,
		});

		return this;
	}

	/**
	 *
	 * @param script Uses a ScriptBuilder instance.
	 * @returns The current ScratchObject being built.
	 */
	public addCode(script: ScriptBuilder): ScratchObject {
		const oldBlocks = this.blocks;
		this.blocks = Object.assign(oldBlocks, script.export());
		return this;
	}

	/**
	 * This function is used internally to generate the target.
	 * @returns Raw target data for project.
	 */
	public export(): Target {
		return {
			isStage: this.isStage,
			name: this.name,
			variables: this.variables,
			lists: this.lists,
			broadcasts: this.broadcasts,
			blocks: this.blocks,
			comments: this.comments,
			currentCostume: this.currentCostume,
			costumes: this.costumes,
			sounds: this.sounds,
			layerOrder: this.layerOrder,
			volume: this.volume
		}
	}
}

export class ScratchStage extends ScratchObject {
	constructor(currentCostume: number) {
		super(true, "Stage", currentCostume, 0)
	}
}

export class ScratchSprite extends ScratchObject {
	constructor(name: string, currentCostume: number, layerOrder: number) {
		super(false, name, currentCostume, layerOrder)
	}
}
