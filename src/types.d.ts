import { ScratchObject, ScratchStage } from "./object";
import { Opcode } from "./opcodes";
import ProjectBuilder from "./project";
import ScriptBuilder from "./script";

export type ScratchValue = string | number | Array<string | number>;

export interface ScratchCompiler {
	ProjectBuilder: typeof ProjectBuilder;
	ScriptBuilder: typeof ScriptBuilder;
	ScratchSprite: typeof ScratchSprite;
	ScratchStage: typeof ScratchStage;
	Opcode: typeof Opcode;
	ScratchType: typeof ScratchType;
}

export interface Variable {
	name: string;
	value: number | string;
	isCloud?: boolean;
}

export interface List {
	name: string;
	values: Array<number | string>;
}

export interface Block {
	opcode: string;
	next: string | null;
	parent: string | null;
	inputs: {[input: string]: Array<unknown>};
	fields: {[field: string]: Array<unknown>};
	shadow: boolean;
	topLevel: boolean;
	x?: number;
	y?: number;
}

export interface Comment {
	blockId: string;
	x: number;
	y: number;
	minimized: boolean;
	text: string;
}

export interface Asset {
	name: string;
	dataFormat: string;
	assetId: string;
	md5ext: string;
}

export interface Costume extends Asset {
	bitmapResolution?: number;
	rotationCenterX: number;
	rotationCenterY: number;
}

export interface Sound extends Asset {
	rate: number;
	sampleCount: number;
}

export interface Target {
	isStage: boolean;
	name: string;
	variables: {[uid: string]: Variable};
	lists: {[uid: string]: List};
	broadcasts: {[uid: string]: string};
	blocks: {[uid: string]: Block};
	comments: {[uid: string]: Comment};
	currentCostume: number;
	costumes: Array<Costume>;
	sounds: Array<Sound>;
	layerOrder: number;
	volume: number;
}

export enum MonitorMode {
	DEFAULT = "default",
	LARGE = "large",
	SLIDER = "slider",
	LIST = "list"
}

export interface Monitor {
	id: string;
	mode: MonitorMode;
	opcode: Opcode;
	params: {[type: string]: string};
	spriteName: string | null;
	value: ScratchValue;
	width: number;
	height: number;
	x: number;
	y: number;
	visible: boolean;
}

export interface Metadata {
	semver: string;
	vm: string;
	agent: string;
}

export interface Project {
	targets: Array<Target>;
	monitors: Array<Monitor>;
	extensions: Array<string>;
	meta: Metadata;
}
