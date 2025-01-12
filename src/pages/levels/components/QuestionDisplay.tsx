import { ILevel, LevelType } from '../../../types/backend';
import { EquationConfig } from '../types/equation';
import NumbersTypeDisplay from './question-type-display/NumbersTypeDisplay';
import ValueBlocksTypeDisplay from './question-type-display/ValueBlocksTypeDisplay';

interface QuestionDisplayProps {
    equation: EquationConfig;
    isResponsive?: boolean;
    answer?: string;
    levelConfigWithCount: ILevel;
}

const gameDisplayMap: Record<
    LevelType,
    (props: {
        equation: EquationConfig;
        answer?: string;
        isResponsive?: boolean;
        answerPosition?: 'left' | 'right';
    }) => JSX.Element
> = {
    [LevelType.numbers]: NumbersTypeDisplay,
    [LevelType.valueBlocks]: ValueBlocksTypeDisplay,
};

export default function QuestionDisplay({
    equation,
    levelConfigWithCount,
    isResponsive = false,
    answer,
}: QuestionDisplayProps) {
    const DisplayComponent =
        gameDisplayMap[levelConfigWithCount.type as LevelType] || gameDisplayMap[LevelType.valueBlocks];

    return (
        <DisplayComponent
            equation={equation}
            answer={answer ?? "?"}
            isResponsive={isResponsive}
            answerPosition={levelConfigWithCount.settings?.answer_position}
        />
    );
}
