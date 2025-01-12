import { LevelSettings } from "../../../types/backend";

export interface EquationNumber {
    value: number;
    isAnswer: boolean;
    maxBlocks: number;
    displaySum?: number;
}

export interface EquationConfig extends Partial<LevelSettings> {
    numbers: EquationNumber[];
    operators: string[];
    result: number;
    displaySum?: number;
}
