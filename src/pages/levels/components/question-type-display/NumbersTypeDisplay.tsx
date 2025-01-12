// import React from 'react';
import { EquationConfig } from '../../types/equation';
import NumbersTypeQuestionRightIcon from '../../../../assets/icon/icon-tsx/NumbersTypeQuestionRightIcon';
import NumbersTypeQuestionLeftIcon from '../../../../assets/icon/icon-tsx/NumbersTypeQuestionLeftIcon';

export interface NumbersTypeDisplayProps {
    equation: EquationConfig;
    answer?: string;
    isResponsive?: boolean;
    answerPosition?: 'left' | 'right';
}

export default function NumbersTypeDisplay(props: NumbersTypeDisplayProps) {
    const { equation, answer, answerPosition = 'right', isResponsive = false } = props;

    const renderEquation = () => {
        const parts: string[] = [];
        equation.numbers.forEach((num, index) => {
            if ((equation.answer_required === 'value_1' && index === 0) ||
                (equation.answer_required === 'value_2' && index === 1)) {
                parts.push(answer || "");
            } else {
                parts.push(num.value.toString());
            }

            if (index < equation.numbers.length - 1) {
                parts.push(` ${equation.operators[index]} `);
            }
        });

        const equationPart = parts.join('');
        return answerPosition === 'right' ? equationPart + ' =' : '= ' + equationPart;
    };

    if (answerPosition === 'right') {
        return (
            <NumbersTypeQuestionRightIcon
                isResponsive={isResponsive}
                equationText={renderEquation()}
                answerText={equation.answer_required === 'answer' ? answer : (equation.displaySum ?? equation.result).toString()}
            />
        );
    }

    return (
        <NumbersTypeQuestionLeftIcon
            isResponsive={isResponsive}
            equationText={renderEquation()}
            answerText={equation.answer_required === 'answer' ? answer : (equation.displaySum ?? equation.result).toString()}
        />
    );
}
