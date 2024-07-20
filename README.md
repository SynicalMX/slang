# scratch-compiler (working name)

The goal of this project is to be able to use Typescript to programmatically create playable Scratch games.

In the future, you will be able to use Lua to create scratch games with this. But currently, it only supports the bare minimum of a scratch project.

## Example Usage

Usage is very clunky currently, this will be fixed in 0.2.0

```ts
import scratch from "scratch-compiler";

const testCode = new scratch.ScriptBuilder(scratch.Opcode.EVENT_WHENFLAGCLICKED)
	.next(scratch.Opcode.LOOKS_SAYFORSECS, {"MESSAGE":[1,[10,"Hello!"]],"SECS":[1,[4,"2"]]});

const testSprite = new scratch.ScratchSprite("TestSprite", 0, 1)
	.addCostume("costume1.svg", "svg")
	.addCode(testCode);

const stage = new scratch.ScratchStage(0, 0)
	.addCostume("stage1.svg", "svg");

new scratch.ProjectBuilder()
	.addTarget(stage)
	.addTarget(testSprite)
	.build("project");
```

## Supported Feature Checklist

- :white_check_mark: Targets (Sprites and Stages)
- :white_check_mark: Scripts
- :warning: Extensions (Partially, opcodes not implemented)
- :white_check_mark: Costumes
- :x: Sounds

If there's any features missing, please make an issue to let me know!

## Known Bugs

- For some reason, some assets are ignored entirely, being replaced with working ones for some odd reason.

If you discovered a bug not listed here, please make an issue!
