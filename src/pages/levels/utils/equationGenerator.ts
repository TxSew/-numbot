import { LevelSettings } from '../../../types/backend';
import { EquationConfig, EquationNumber } from '../types/equation';
import { evaluateExpression } from './expressionEvaluator';

interface GeneratedQuestion {
    numbers: number[];
    result: number;
    operation: string;
}

const areQuestionsEqual = (q1: GeneratedQuestion, q2: GeneratedQuestion): boolean => {
    return (
        q1.operation === q2.operation &&
        q1.result === q2.result &&
        q1.numbers.length === q2.numbers.length &&
        q1.numbers.every((num, index) => num === q2.numbers[index])
    );
};

const usedQuestions: GeneratedQuestion[] = [];

const hasDependency = (expression: string | undefined, variable: string): boolean => {
    return !!expression && expression.includes(`@${variable}`);
};

const evaluateValueWithDependencies = (expression: string, evaluatedValues: Record<string, number>): number => {
    // console.log('\n=== evaluateValueWithDependencies ===');
    // console.log('Expression:', expression);
    // console.log('Evaluated values:', evaluatedValues);

    // Check if it's a simple comma-separated list without variables AND without functions
    if (expression.includes(',') && !expression.includes('@')) {
        // console.log('Processing as simple comma-separated list');
        // First, get all possible values including ranges
        const allValues = expression
            .split(',')
            .map((part) => {
                if (part.includes('-')) {
                    const [start, end] = part.split('-').map(Number);
                    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
                }
                return [Number(part.trim())];
            })
            .flat();

        // console.log('Available values:', allValues);
        const result = allValues[Math.floor(Math.random() * allValues.length)];
        // console.log('Selected value:', result);
        return result;
    }

    // console.log('Processing with evaluateExpression');
    const result = evaluateExpression(expression, {
        v1: evaluatedValues.V1,
        v2: evaluatedValues.V2,
        v3: evaluatedValues.V3,
        v4: evaluatedValues.V4,
    });
    // console.log('evaluateExpression result:', result);

    const finalResult = Array.isArray(result) ? result[Math.floor(Math.random() * result.length)] : result;
    // console.log('Final result:', finalResult);
    return finalResult;
};

export const generateEquation = (settings: LevelSettings): EquationConfig => {
    // console.log('\n=== generateEquation ===');
    // console.log('Input settings:', settings);

    let attempts = 0;
    const maxAttempts = 50;
    let equation: EquationConfig;

    do {
        attempts++;
        equation = generateUniqueEquation(settings);

        const currentQuestion: GeneratedQuestion = {
            numbers: equation.numbers.map((n) => n.value),
            result: equation.result,
            operation: equation.operators[0],
        };

        const isDuplicate = usedQuestions.some((q) => areQuestionsEqual(q, currentQuestion));

        if (!isDuplicate || attempts >= maxAttempts) {
            usedQuestions.push(currentQuestion);
            break;
        }
    } while (attempts < maxAttempts);

    return equation;
};

const generateUniqueEquation = (settings: LevelSettings): EquationConfig => {
    // console.log('\n=== generateEquation ===');
    // console.log('Input settings:', settings);

    const numbers: EquationNumber[] = [];
    let targetAnswer = 0;

    // Ensure operation is 'addition' if it's 'tap'
    const operation =
        settings.operation === undefined || settings.operation === 'tap' || settings.operation === 'more'
            ? 'addition'
            : settings.operation === 'mixed'
              ? Math.random() < 0.5
                  ? 'addition'
                  : 'subtraction'
              : settings.operation;

    const evaluatedValues: Record<string, number> = {};

    // Special case: If answer_required is value_1 and we have an answer
    if (settings.answer_required === 'value_1' && settings.answer && settings.value_1) {
        // console.log('Special case: answer_required is value_1');
        // First evaluate value_1
        const value1 = evaluateValueWithDependencies(settings.value_1, evaluatedValues);
        evaluatedValues['V1'] = value1;

        // Then evaluate answer
        const answer = evaluateValueWithDependencies(settings.answer, evaluatedValues);
        const targetAnswer = Array.isArray(answer) ? answer[0] : answer;

        // Calculate value_2 based on operation and answer
        const value2 = operation === 'addition' ? targetAnswer - value1 : value1 - targetAnswer;
        evaluatedValues['V2'] = value2;

        numbers.push({
            value: value1,
            isAnswer: true,
            maxBlocks: 100,
        });
        numbers.push({
            value: value2,
            isAnswer: false,
            maxBlocks: 100,
        });

        return {
            numbers,
            operators: [operation === 'addition' ? '+' : '-'],
            result: targetAnswer,
            displaySum: targetAnswer,
            show_sum: settings.show_sum ?? true,
            answer_required: 'value_1',
        };
    }

    // New case: If we have value_1 and answer with answer_required='answer'
    if (settings.value_1 && settings.answer && settings.answer_required === 'answer') {
        // console.log('settings.answer_required', settings.answer_required);
        // First evaluate value_1
        const value1 = evaluateValueWithDependencies(settings.value_1, evaluatedValues);
        evaluatedValues['V1'] = value1;

        // Then evaluate answer from the ranges
        const answer = evaluateValueWithDependencies(settings.answer, evaluatedValues);
        const selectedAnswer = Array.isArray(answer) ? answer[Math.floor(Math.random() * answer.length)] : answer;

        numbers.push({
            value: value1,
            isAnswer: false,
            maxBlocks: 100,
        });
        numbers.push({
            value: selectedAnswer,
            isAnswer: true,
            maxBlocks: 100,
        });

        return {
            numbers,
            operators: [operation === 'addition' ? '+' : '-'],
            result: operation === 'addition' ? value1 + selectedAnswer : value1 - selectedAnswer,
            show_sum: settings.show_sum ?? true,
            answer_required: 'answer',
        };
    }

    // Case 1: If value_1 is empty and we have answer and value_2
    if (!settings.value_1 && settings.answer && settings.value_2) {
        // First evaluate value_2
        const value2 = evaluateValueWithDependencies(settings.value_2, evaluatedValues);
        evaluatedValues['V2'] = value2;

        // Then evaluate answer
        const answer = evaluateValueWithDependencies(settings.answer, evaluatedValues);

        // Calculate value_1 based on operation
        if (operation === 'addition') {
            evaluatedValues['V1'] = Array.isArray(answer) ? answer[0] - value2 : answer - value2;
        } else {
            evaluatedValues['V1'] = Array.isArray(answer) ? answer[0] + value2 : answer + value2;
        }

        // Add numbers in correct order
        numbers.push({
            value: evaluatedValues['V1'],
            isAnswer: false,
            maxBlocks: 100,
        });
        numbers.push({
            value: value2,
            isAnswer: false,
            maxBlocks: 100,
        });

        targetAnswer = Array.isArray(answer) ? answer[0] : answer;

        return {
            numbers,
            operators: [operation === 'addition' ? '+' : '-'],
            result: targetAnswer,
            show_sum: settings.show_sum ?? true,
            answer_required: 'answer', // Force answer_required to be 'answer'
        };
    }

    // Case 2: If answer_required is 'value_2' and we have answer and value_1
    if (settings.answer_required === 'value_2' && settings.answer && settings.value_1) {
        // First evaluate value_1
        const value1 = evaluateValueWithDependencies(settings.value_1, evaluatedValues);
        evaluatedValues['V1'] = value1;

        // Then evaluate answer
        const answer = evaluateValueWithDependencies(settings.answer, evaluatedValues);
        const targetAnswer = Array.isArray(answer) ? answer[0] : answer;

        // Calculate value_2 based on operation
        if (operation === 'addition') {
            evaluatedValues['V2'] = targetAnswer - value1;
        } else {
            evaluatedValues['V2'] = value1 - targetAnswer;
        }

        // Skip if value_2 is 0
        if (evaluatedValues['V2'] === 0) {
            do {
                const value1 = evaluateValueWithDependencies(settings.value_1, evaluatedValues);
                evaluatedValues['V1'] = value1;
                evaluatedValues['V2'] = operation === 'addition' ? targetAnswer - value1 : value1 - targetAnswer;
            } while (evaluatedValues['V2'] === 0);
        }

        // Add numbers in correct order
        numbers.push({
            value: value1,
            isAnswer: false,
            maxBlocks: 100,
        });
        numbers.push({
            value: evaluatedValues['V2'],
            isAnswer: true,
            maxBlocks: 100,
            displaySum: targetAnswer,
        });

        return {
            numbers,
            operators: [operation === 'addition' ? '+' : '-'],
            result: evaluatedValues['V2'],
            displaySum: targetAnswer,
            show_sum: settings.show_sum ?? true,
            answer_required: 'value_2',
        };
    }

    // First pass: evaluate non-dependent values
    // console.log('\n--- First pass: non-dependent values ---');
    ['value_1', 'value_2', 'value_3', 'value_4'].forEach((key) => {
        const expression = settings[key as keyof LevelSettings] as string;
        // console.log(`\nChecking ${key}:`, expression);

        if (expression && !expression.includes('@')) {
            // console.log(`${key} has no dependencies, evaluating...`);
            const valueKey = key.toUpperCase().replace('VALUE_', 'V');
            evaluatedValues[valueKey] = evaluateValueWithDependencies(expression, {});
            // console.log(`${valueKey} evaluated to:`, evaluatedValues[valueKey]);
        } else if (expression) {
            // console.log(`${key} has dependencies, skipping for now`);
        }
    });

    // Second pass: evaluate dependent values
    // console.log('\n--- Second pass: dependent values ---');
    const dependentValues = ['value_1', 'value_2', 'value_3', 'value_4'].filter((key) => {
        const expression = settings[key as keyof LevelSettings] as string;
        return expression && expression.includes('@');
    });
    // console.log('Dependent values to process:', dependentValues);

    while (dependentValues.length > 0) {
        // console.log('\nRemaining dependent values:', dependentValues);

        const readyToEvaluate = dependentValues.find((key) => {
            const expression = settings[key as keyof LevelSettings] as string;
            const pendingDeps = ['V1', 'V2', 'V3', 'V4'].filter(
                (v) => hasDependency(expression, v) && !evaluatedValues[v]
            );
            // console.log(`Checking ${key} dependencies:`, pendingDeps);
            return pendingDeps.length === 0;
        });

        if (!readyToEvaluate) {
            console.error('Circular dependency detected or no evaluatable expressions found');
            break;
        }

        // console.log('\nEvaluating:', readyToEvaluate);
        const valueKey = readyToEvaluate.toUpperCase().replace('VALUE_', 'V');
        const expression = settings[readyToEvaluate as keyof LevelSettings] as string;
        evaluatedValues[valueKey] = evaluateValueWithDependencies(expression, evaluatedValues);
        // console.log(`${valueKey} evaluated to:`, evaluatedValues[valueKey]);

        dependentValues.splice(dependentValues.indexOf(readyToEvaluate), 1);
    }

    // Final pass: build numbers array
    // console.log('\n--- Final pass: building numbers array ---');
    ['value_1', 'value_2', 'value_3', 'value_4'].forEach((key) => {
        const expression = settings[key as keyof LevelSettings] as string;
        if (expression) {
            const valueKey = key.toUpperCase().replace('VALUE_', 'V');
            // console.log(`Adding ${key} (${valueKey}):`, evaluatedValues[valueKey]);
            numbers.push({
                value: evaluatedValues[valueKey],
                isAnswer: settings.answer_required === key,
                maxBlocks: 100,
            });
        }
    });

    targetAnswer =
        operation === 'addition'
            ? numbers.reduce((sum, num) => sum + num.value, 0)
            : numbers[0].value - numbers.slice(1).reduce((sum, num) => sum + num.value, 0);

    // console.log('\nFinal equation:', {
    //     numbers: numbers.map((n) => n.value),
    //     operators: operation,
    //     result: targetAnswer,
    //     showSum: settings.show_sum ?? true,
    //     answer_required: settings.answer_required ?? 'answer',
    // });

    return {
        numbers,
        operators: Array(numbers.length - 1).fill(operation === 'addition' ? '+' : '-'),
        result: targetAnswer,
        show_sum: settings.show_sum ?? true,
        answer_required: settings.answer_required ?? 'answer',
    };
};

export const resetUsedQuestions = () => {
    usedQuestions.length = 0;
};
