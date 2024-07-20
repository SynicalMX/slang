import type { Block, Costume, List, Sound, Target, Variable, Comment } from "./types";
import generateAssetHash from "./util/file";
import type ScriptBuilder from "./script";

const EXTRACT_FILE_FROM_PATH = /[^\\/:*?"<>|\r\n]+$/g;
const EXTRACT_FILENAME = /(^\w+(?=\.))/g;
const EXTRACT_FILE_EXT = /[0-9a-z]+$/i;

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

	// FIXME: Regex for some reason gives undefined results, making output invalid.
	// FIXME: Make assets not be required to be in an assets folder.

	/**
	 *
	 * @param relativePath The asset filename.
	 * @param dataFormat Regex is busted, so this is a temporary hack.
	 * @param bitmap The resolution of the image for bitmap images. Defaults to 2, or 1 for non-bitmaps.
	 * @returns
	 */
	public addCostume(relativePath: string, dataFormat: string, bitmap?: boolean): ScratchObject {
		const assetHash = generateAssetHash(`assets/${relativePath}`);
		// const assetFullFilename = EXTRACT_FILE_FROM_PATH.exec(relativePath)?.[0];
		// const assetFilename = EXTRACT_FILENAME.exec(assetFullFilename as string)?.[0];

		if (!bitmap) {
			this.costumes.push({
				assetId: assetHash as string,
				bitmapResolution: 1,
				name: `costume${this.costumes.length + 1}`,
				dataFormat: dataFormat,
				md5ext: `${assetHash as string}.${dataFormat}`,
				rotationCenterX: 0,
				rotationCenterY: 0,
			});
		} else {
			this.costumes.push({
				assetId: assetHash as string,
				bitmapResolution: 2,
				name: `costume${this.costumes.length + 1}`,
				dataFormat: dataFormat,
				md5ext: `${assetHash as string}.${dataFormat}`,
				rotationCenterX: 0,
				rotationCenterY: 0,
			});
		}

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
	 * @returns Raw target for project.
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
	constructor(currentCostume: number, layerOrder: number) {
		super(true, "Stage", currentCostume, layerOrder)
	}
}

export class ScratchSprite extends ScratchObject {
	constructor(name: string, currentCostume: number, layerOrder: number) {
		super(false, name, currentCostume, layerOrder)
	}
}
