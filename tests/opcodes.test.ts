/**
 * @fileoverview Due to how scratch handles its opcodes, they seem to have MULTIPLE naming conventions, so here we test for all of them.
 */

import { expect, test } from "bun:test";
import { Opcode, getOpcodeName } from "../src/opcodes";

test("Opcodes Naming Conventions", () => {
	expect(getOpcodeName(Opcode.EVENT_BROADCASTANDWAIT), "normal_expectedcase").toBe("event_broadcastandwait");
	expect(getOpcodeName(Opcode.PEN_SET_PEN_COLOR_TO_COLOR), "oneside_caseTest").toBe("pen_setPenColorToColor");
	expect(getOpcodeName(Opcode.TEXTTOSPEECH_SET_LANGUAGE), "text2speech").toBe("text2speech_setLanguage");
	expect(getOpcodeName(Opcode.VIDEOSENSING_WHEN_MOTION_GREATER_THAN), "bothSides_caseTest").toBe("videoSensing_whenMotionGreaterThan");
});
