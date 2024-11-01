# slang

slang (scratch language) is a scripting language that compiles into playable [Scratch](https://scratch.mit.edu/) games.

## Example Usage

Usage is very clunky currently, this will be fixed in 0.2.0

Particullarily, inputs will be changed instead of using raw format, and use spread operator instead.

```ts
import scratch from "slang";

const testCode = new scratch.ScriptBuilder(scratch.Opcode.EVENT_WHENFLAGCLICKED)
  .next(scratch.Opcode.LOOKS_SAYFORSECS, {
    MESSAGE: [scratch.ScratchType.SHADOW, [scratch.ScratchType.STRING, "Hello!"]], // Shadow blocks exist because of Blockly
    SECS: [scratch.ScratchType.SHADOW, [scratch.ScratchType.NUMBER, "2"]]
  });

const testSprite = new scratch.ScratchSprite("TestSprite", 0, 1)
  .addCostume("costume1.svg") // Path is relative
  .addCode(testCode);

const stage = new scratch.ScratchStage(0) // Argument is costume number
  .addCostume("stage1.svg");

new scratch.ProjectBuilder()
  .addTarget(stage) // Targets are sprites and stages.
  .addTarget(testSprite)
  .build("project"); // project filename (without .sb3 extension)
```

## Supported Feature Checklist

- :white_check_mark: Targets (Sprites and Stages)
- :white_check_mark: Scripts
- :white_check_mark: Extensions
- :white_check_mark: Costumes
- :x: Sounds

If there's any features missing, please make an issue to let me know!

## Known Bugs

- For some reason, some assets are ignored entirely, being replaced with working ones for some odd reason.

If you discovered a bug not listed here, please make an issue!
