const determineNextValue = (values: number[]): number => {
    if (values.length < 2) return 0;

    const ranges = values.reduce((acc: number[][], curr, i) => {
        if (i === 0 || curr - values[i - 1] > 1) {
            acc.push([curr]);
        } else {
            acc[acc.length - 1].push(curr);
        }
        return acc;
    }, []);

    // If we have multiple ranges, look at their starting numbers
    if (ranges.length > 1) {
        const startNumbers = ranges.map((range) => range[0]);
        const rangeDiff = startNumbers[1] - startNumbers[0];
        return startNumbers[startNumbers.length - 1] + rangeDiff;
    }

    // If it's a single continuous sequence
    const differences = values.slice(1).map((val, i) => val - values[i]);
    const isArithmetic = differences.every((diff) => diff === differences[0]);
    if (isArithmetic) {
        return values[values.length - 1] + differences[0];
    }

    return values[values.length - 1];
};

export const evaluateExpression = (
    expression: string,
    values: { v1?: number; v2?: number; v3?: number; v4?: number }
): number | number[] => {
    // console.log('\n=== evaluateExpression ===');
    // console.log('Input expression:', expression);
    // console.log('Input values:', values);

    if (!expression) return 0;

    // Handle the specific case for "3-{@V1-12},12-{@V1-3}" format first
    const specialRangeMatch = expression.match(/^(\d+)-{@V1-(\d+)},(\d+)-{@V1-(\d+)}$/);
    if (specialRangeMatch) {
        const [_, start1, offset1, start2, offset2] = specialRangeMatch;
        // console.log('Special range match:', { start1, offset1, start2, offset2 });

        const v1 = values.v1 || 0;
        const range1End = v1 - Number(offset1);
        const range2End = v1 - Number(offset2);

        // Generate both ranges
        const range1 = Array.from({ length: range1End - Number(start1) + 1 }, (_, i) => Number(start1) + i);
        const range2 = Array.from({ length: range2End - Number(start2) + 1 }, (_, i) => Number(start2) + i);

        // Combine both ranges
        const combinedRange = [...range1, ...range2];
        // console.log('Combined ranges:', combinedRange);
        return combinedRange;
    }

    // Handle comma-separated expressions with UNITS
    if (expression.includes(',') && (expression.includes('UNITS') || expression.includes('NEXT_10'))) {
        // console.log('Processing comma-separated expression with functions');
        const parts = expression.split(',');
        const results = parts.flatMap((part) => {
            // Recursively evaluate each part
            const partResult = evaluateExpression(part.trim(), values);
            // console.log(`Part "${part.trim()}" evaluated to:`, partResult);
            return Array.isArray(partResult) ? partResult : [partResult];
        });
        // console.log('Combined results from all parts:', results);
        return results;
    }

    // Handle expressions with curly braces and variables in ranges
    const curlyRangeMatch = expression.match(/^{(.+)}-(\d+)$/);
    if (curlyRangeMatch && expression.includes('@V')) {
        const [_, leftExpr, endNum] = curlyRangeMatch;
        // console.log('Range expression found:', { leftExpr, endNum });

        // Replace variables first
        let processedExpr = leftExpr
            .replace(/@V1/g, String(values.v1 || 0))
            .replace(/@V2/g, String(values.v2 || 0))
            .replace(/@V3/g, String(values.v3 || 0))
            .replace(/@V4/g, String(values.v4 || 0));
        // console.log('After variable replacement:', processedExpr);

        // Handle NEXT_10 function if present
        if (processedExpr.includes('NEXT_10')) {
            // console.log('Processing NEXT_10 in expression:', processedExpr);
            processedExpr = processedExpr.replace(/NEXT_10\(([^)]+)\)/g, (_, value) => {
                try {
                    // console.log('Evaluating NEXT_10 with value:', value);
                    const evaluated = eval(value);
                    // console.log('Evaluated inner expression:', evaluated);
                    const result = Math.ceil(Number(evaluated) / 10) * 10;
                    // console.log(`NEXT_10 calculation: ${value} -> ${evaluated} -> ${result}`);
                    return String(result);
                } catch (error) {
                    console.error('Error in NEXT_10 evaluation:', error);
                    console.error('Failed value:', value);
                    return '0';
                }
            });
            // console.log('After NEXT_10 evaluation:', processedExpr);
        }

        // Handle UNITS function if present
        if (processedExpr.includes('UNITS')) {
            // console.log('Processing UNITS in expression:', processedExpr);
            processedExpr = processedExpr.replace(/UNITS\(([^)]+)\)/g, (_, value) => {
                try {
                    // console.log('Evaluating UNITS with value:', value);
                    const evaluated = eval(value);
                    // console.log('Evaluated inner expression:', evaluated);
                    const result = Math.abs(evaluated) % 10;
                    // console.log(`UNITS calculation: ${value} -> ${evaluated} -> ${result}`);
                    return String(result);
                } catch (error) {
                    console.error('Error in UNITS evaluation:', error);
                    console.error('Failed value:', value);
                    return '0';
                }
            });
            // console.log('After UNITS evaluation:', processedExpr);
        }

        try {
            // Evaluate the complete expression
            // console.log('Evaluating final expression:', processedExpr);
            const startNum = eval(processedExpr);
            const end = Number(endNum);
            // console.log(`Generating range from ${startNum} to ${end}`);

            if (startNum <= end) {
                return Array.from({ length: end - startNum + 1 }, (_, i) => startNum + i);
            } else {
                return Array.from({ length: startNum - end + 1 }, (_, i) => startNum - i);
            }
        } catch (error) {
            console.error('Error evaluating range:', error);
            console.error('Failed expression:', processedExpr);
            return [0];
        }
    }

    // Handle @A expressions
    if (expression.includes('@A')) {
        // First check for BOND_TO range in the full expression
        const bondToRangeMatch = expression.match(/{BOND_TO\((\d+),@A\)}-{BOND_TO\((\d+),@A\)}/);
        // console.log('Full expression bondToRangeMatch:', bondToRangeMatch);

        if (bondToRangeMatch) {
            const [fullMatch, startBond, endBond] = bondToRangeMatch;
            // console.log('Full expression bonds:', { startBond, endBond });

            // Get numeric values from parts before the BOND_TO expression
            const numericParts = expression
                .split(',')
                .filter((part) => !part.includes(fullMatch))
                .flatMap((part) => {
                    if (part.includes('-')) {
                        const [start, end] = part.split('-').map(Number);
                        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
                    }
                    return [Number(part)];
                })
                .filter((num) => !isNaN(num));
            // console.log('Numeric parts:', numericParts);

            const nextValue = determineNextValue(numericParts);
            // console.log('Next value for BOND_TO:', nextValue);

            const startValue = Number(startBond) - nextValue;
            const endValue = Number(endBond) - nextValue;
            // console.log('BOND_TO values:', { startValue, endValue });

            const [minValue, maxValue] = [startValue, endValue].sort((a, b) => a - b);
            const bondRange = Array.from({ length: maxValue - minValue + 1 }, (_, i) => minValue + i);
            // console.log('BOND_TO range:', bondRange);

            return [...numericParts, ...bondRange];
        }

        // If no BOND_TO range, proceed with normal processing
        const parts = expression.split(',').map((part) => part.trim());
        // console.log('Split parts:', parts);

        // Find the numeric values that come before @A expressions
        const numericValues = parts
            .filter((part) => !part.includes('@A'))
            .flatMap((part) => {
                if (part.includes('-')) {
                    const [start, end] = part.split('-').map(Number);
                    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
                }
                return [Number(part)];
            })
            .filter((num) => !isNaN(num));
        // console.log('Numeric values:', numericValues);

        // Calculate what @A should be based on the sequence
        const nextValue = numericValues.length > 0 ? determineNextValue(numericValues) : Math.random() < 0.5 ? 90 : 110;
        // console.log('Determined @A value:', nextValue);

        // Now process each part, replacing @A with the calculated value
        return parts.flatMap((part) => {
            if (!part.includes('@A')) {
                // Handle ranges in non-@A parts
                if (part.includes('-')) {
                    const [start, end] = part.split('-').map(Number);
                    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
                }
                return [Number(part)];
            }

            // Handle expressions like {BOND_TO(61,@A)}-{BOND_TO(69,@A)}
            const bondToRangeMatch = part.match(/{BOND_TO\((\d+),@A\)}-{BOND_TO\((\d+),@A\)}/);
            // console.log('Processing part:', part);
            // console.log('bondToRangeMatch:', bondToRangeMatch);

            // Handle expressions like 0-{(@A)} - special case with parentheses
            if (part.includes('(@A)')) {
                // For 0-{(@A)}, we want small sequential numbers (1-5)
                const possibleAs = [1, 2, 3, 4, 5];
                const selectedA = possibleAs[Math.floor(Math.random() * possibleAs.length)];
                const result = Array.from({ length: selectedA + 1 }, (_, i) => i);
                // console.log(`Calculating sequence with (@A): Generated sequence 0 to ${selectedA}`);
                return result;
            }

            // Handle expressions like 0-{@A} - without parentheses
            if (part.includes('-{@A}')) {
                // Get the answer values from the original expression
                const answerValues = expression
                    .split(',')
                    .map(Number)
                    .filter((num) => !isNaN(num));

                if (answerValues.length > 0) {
                    // Pick a random answer value to base our range on
                    const targetAnswer = answerValues[Math.floor(Math.random() * answerValues.length)];
                    // Generate a value that's less than the target answer to ensure equation makes sense
                    const maxPossibleValue = Math.max(1, targetAnswer - 1);
                    const selectedA = Math.floor(Math.random() * maxPossibleValue) + 1;
                    const result = Array.from({ length: selectedA + 1 }, (_, i) => i);
                    // console.log(
                    //     `Calculating sequence with @A based on answer ${targetAnswer}: Generated sequence 0 to ${selectedA}`
                    // );
                    return result;
                }

                // Fallback to small range if no answers found
                const selectedA = Math.floor(Math.random() * 3) + 2; // Random number between 2 and 4
                const result = Array.from({ length: selectedA + 1 }, (_, i) => i);
                // console.log(`Calculating sequence with @A (fallback): Generated sequence 0 to ${selectedA}`);
                return result;
            }

            if (bondToRangeMatch) {
                const [_, startBond, endBond] = bondToRangeMatch;
                // console.log('Extracted bonds:', { startBond, endBond, nextValue });
                // BOND_TO(x,y) should calculate x - y
                const startValue = Number(startBond) - nextValue;
                const endValue = Number(endBond) - nextValue;
                // console.log('Calculated values:', { startValue, endValue });
                const [minValue, maxValue] = [startValue, endValue].sort((a, b) => a - b);
                // console.log('Range bounds:', { minValue, maxValue });
                const result = Array.from({ length: maxValue - minValue + 1 }, (_, i) => minValue + i);
                // console.log('Generated range:', result);
                return result;
            }

            // Handle expressions like {50-@A}
            const reverseMatch = part.match(/{(\d+)-@A}/);
            // console.log('reverse match!', reverseMatch);
            if (reverseMatch) {
                const baseValue = Number(reverseMatch[1]);
                const possibleAs = [10, 20, 30, 40];
                const selectedA = possibleAs[Math.floor(Math.random() * possibleAs.length)];
                const result = baseValue - selectedA;
                // console.log(`Calculating {${baseValue}-@A}: ${baseValue} - ${selectedA} = ${result}`);
                return [result];
            }

            // Handle expressions like {@A-20}
            const match = part.match(/{@A-(\d+)}/);
            // console.log('match!', match);
            if (match) {
                const subtractValue = Number(match[1]);
                // For expressions like {@A-20}, we want @A minus the value
                const result = nextValue - subtractValue;
                // console.log(`Calculating {@A-${subtractValue}}: ${nextValue} - ${subtractValue} = ${result}`);
                return [result];
            }

            // Handle plain @A
            if (part === '@A') {
                return [nextValue];
            }

            return [];
        });
    }

    if (expression === '@V1') return values.v1 || 0;
    if (expression === '@V2') return values.v2 || 0;

    // Handle range expressions with a start number and curly braces (e.g., "2-{10-(UNITS(@V1))-1}")
    const rangeMatch = expression.match(/^(\d+)-{(.+)}$/);
    if (rangeMatch) {
        const startNum = Number(rangeMatch[1]);
        let endExpr = rangeMatch[2];

        // Replace variables first
        endExpr = endExpr
            .replace(/@V1/g, String(values.v1 || 0))
            .replace(/@V2/g, String(values.v2 || 0))
            .replace(/@V3/g, String(values.v3 || 0))
            .replace(/@V4/g, String(values.v4 || 0));

        // Handle BOND_TO function
        while (endExpr.includes('BOND_TO')) {
            endExpr = endExpr.replace(/BOND_TO\(([^,]+),([^)]+)\)/g, (_, num1, num2) => {
                try {
                    const evaluatedNum1 = eval(num1);
                    const evaluatedNum2 = eval(num2);
                    const bondResult = Number(evaluatedNum1) - Number(evaluatedNum2);
                    // console.log(`BOND_TO(${evaluatedNum1}, ${evaluatedNum2}) = ${bondResult}`);
                    return String(bondResult);
                } catch (error) {
                    console.error('Error in BOND_TO:', error);
                    return '0';
                }
            });
        }
        // console.log('After BOND_TO evaluation rangeMatch:', endExpr);

        // Handle UNITS function if present
        if (endExpr.includes('UNITS')) {
            endExpr = endExpr.replace(/UNITS\(([^)]+)\)/g, (_, value) => {
                try {
                    const evaluated = eval(value);
                    return String(Math.abs(evaluated) % 10);
                } catch (error) {
                    console.error('Error in UNITS evaluation:', error);
                    return '0';
                }
            });
            // console.log('After UNITS evaluation:', endExpr);
        }

        try {
            const endNum = eval(endExpr);
            // console.log(`Range: from ${startNum} to ${endNum}`);
            return Array.from({ length: endNum - startNum + 1 }, (_, i) => startNum + i);
        } catch (error) {
            console.error('Error evaluating range expression:', error);
            return [startNum];
        }
    }

    // Handle expressions with UNITS function first
    if (expression.includes('UNITS')) {
        // console.log('Handle expressions with UNITS function first');
        // Replace variables first
        let processedExpr = expression
            .replace(/@V1/g, String(values.v1 || 0))
            .replace(/@V2/g, String(values.v2 || 0))
            .replace(/@V3/g, String(values.v3 || 0))
            .replace(/@V4/g, String(values.v4 || 0));

        // Handle expressions like "{UNITS(@V1)+1}-7"
        const rangeMatch = processedExpr.match(/^{(.+)}-(\d+)$/);
        if (rangeMatch) {
            const [_, leftExpr, endNum] = rangeMatch;
            // console.log('Range expression found:', { leftExpr, endNum });

            // First evaluate UNITS function in the left expression
            let evaluatedLeft = leftExpr.replace(/UNITS\(([^)]+)\)/g, (_, value) => {
                try {
                    const evaluated = eval(value);
                    return String(Math.abs(evaluated) % 10);
                } catch (error) {
                    console.error('Error in UNITS evaluation:', error);
                    return '0';
                }
            });

            try {
                // Now evaluate the complete left expression
                const startNum = eval(evaluatedLeft);
                const end = Number(endNum);
                // console.log(`Generating range from ${startNum} to ${end}`);
                return Array.from({ length: end - startNum + 1 }, (_, i) => startNum + i);
            } catch (error) {
                console.error('Error evaluating range:', error);
                return [0];
            }
        }

        // Split by commas and process each part
        const parts = processedExpr.split(',').map((part) => {
            // Handle expressions like "{49-(UNITS(@V1))}"
            const curlyMatch = part.match(/{([^}]+)}/);
            if (curlyMatch) {
                const expr = curlyMatch[1];
                // First evaluate any UNITS functions inside the expression
                const processedExpr = expr.replace(/UNITS\(([^)]+)\)/g, (_, value) => {
                    try {
                        const evaluated = Number(value);
                        return String(Math.abs(evaluated) % 10);
                    } catch (error) {
                        console.error('Error in UNITS evaluation:', error);
                        return '0';
                    }
                });

                try {
                    // Now evaluate the entire expression
                    const result = eval(processedExpr);
                    // console.log(`Evaluated expression "${processedExpr}" to:`, result);
                    return result;
                } catch (error) {
                    console.error('Error evaluating expression:', error);
                    return null;
                }
            }

            // Handle range expressions
            if (part.includes('-')) {
                const [start, end] = part.split('-').map(Number);
                if (!isNaN(start) && !isNaN(end)) {
                    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
                }
            }

            // Handle plain numbers
            const num = Number(part);
            return !isNaN(num) ? num : null;
        });

        // Flatten arrays and filter out null values
        const result = parts.flat().filter((val) => val !== null && !isNaN(val));

        // console.log('Final processed parts:', result);
        return result;
    }

    // Handle the special case for UNITS with range
    if (expression.includes('UNITS') && expression.includes('-') && expression.includes('{')) {
        // First replace variables
        let processedExpr = expression.replace(/@V1/g, String(values.v1 || 0)).replace(/@V2/g, String(values.v2 || 0));
        // console.log('After @V1/@V2 replacement:', processedExpr);

        // Then evaluate UNITS
        processedExpr = processedExpr.replace(/UNITS\(([^)]+)\)/g, (_, value) => {
            return String(Number(value) % 10);
        });
        // console.log('After UNITS evaluation:', processedExpr);

        // Now process the curly braces
        const parts = processedExpr
            .split(',')
            .map((part) => {
                // Handle both cases: "num-{expr}" and "{expr}-num"
                const matchPrefix = part.match(/(\d+)-{(.+)}/);
                const matchSuffix = part.match(/{(.+)}-(\d+)/);

                if (matchPrefix) {
                    const [_, num, expr] = matchPrefix;
                    try {
                        const evaluated = eval(expr);
                        const start = Number(num);
                        const end = Number(evaluated);
                        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
                    } catch (error) {
                        console.error('Error evaluating expression:', error);
                        return [];
                    }
                } else if (matchSuffix) {
                    const [_, expr, num] = matchSuffix;
                    try {
                        const evaluated = eval(expr);
                        const start = Number(evaluated);
                        const end = Number(num);
                        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
                    } catch (error) {
                        console.error('Error evaluating expression:', error);
                        return [];
                    }
                }
                // Only convert to number if it's actually a numeric string
                const num = Number(part);
                return !isNaN(num) ? [num] : [];
            })
            .flat();

        // Return the parts directly instead of further processing
        // console.log('parts:', parts);
        return parts;
    }

    // Add new case for handling expressions like {60-(@V1)} and functions like BOND_TO, NEXT_10
    if (expression.includes('{') && expression.includes('@V')) {
        // console.log('----------------------------------------');
        // console.log('Original expression:', expression);
        // console.log('Values:', values);

        // Handle case where expression starts with a number followed by a range in curly braces
        const rangeStartMatch = expression.match(/^(\d+)-{(.+)}/);
        if (rangeStartMatch) {
            const [_, startNum, innerExpr] = rangeStartMatch;
            // console.log('Range start:', startNum);
            // console.log('Inner expression:', innerExpr);

            // Process the inner expression with variable substitution
            let processedInner = innerExpr
                .replace(/@V1/g, String(values.v1 || 0))
                .replace(/@V2/g, String(values.v2 || 0));

            // First evaluate BOND_TO if present
            while (processedInner.includes('BOND_TO')) {
                processedInner = processedInner.replace(/BOND_TO\(([^,]+),([^)]+)\)/g, (_, num1, num2) => {
                    try {
                        const evaluatedNum1 = eval(num1);
                        const evaluatedNum2 = eval(num2);
                        const bondResult = Number(evaluatedNum1) - Number(evaluatedNum2);
                        // console.log(`BOND_TO(${evaluatedNum1}, ${evaluatedNum2}) = ${bondResult}`);
                        return String(bondResult);
                    } catch (error) {
                        console.error('Error in BOND_TO:', error);
                        return '0';
                    }
                });
            }
            // console.log('After BOND_TO evaluation { up:', processedInner);

            try {
                // Evaluate the complete expression after BOND_TO
                const endNum = eval(processedInner);
                // console.log(`Generating range from ${startNum} to ${endNum}`);
                const start = Number(startNum);
                const end = Number(endNum);

                // Generate and return the range array
                return Array.from({ length: end - start + 1 }, (_, i) => start + i);
            } catch (error) {
                console.error('Error evaluating range expression:', error);
                return [Number(startNum)];
            }
        }

        let processedExpr = expression.replace(/@V1/g, String(values.v1 || 0)).replace(/@V2/g, String(values.v2 || 0));
        // console.log('After @V1/@V2 replacement:', processedExpr);

        // Fix: First process BOND_TO in the entire expression before splitting
        while (processedExpr.includes('BOND_TO')) {
            processedExpr = processedExpr.replace(/BOND_TO\(([^,]+),([^)]+)\)/g, (_, num1, num2) => {
                try {
                    const evaluatedNum1 = eval(num1);
                    const evaluatedNum2 = eval(num2);
                    const bondResult = Number(evaluatedNum1) - Number(evaluatedNum2);
                    // console.log(`BOND_TO(${evaluatedNum1}, ${evaluatedNum2}) = ${bondResult}`);
                    return String(bondResult);
                } catch (error) {
                    console.error('Error in BOND_TO:', error);
                    return '0';
                }
            });
        }
        // console.log('After BOND_TO evaluation { down:', processedExpr);

        // Then split and process the parts
        const parts = processedExpr.split(',').map((part) => {
            // console.log('\n--- Processing part:', part);

            // Handle simple ranges first (like "11-19")
            if (part.includes('-') && !part.includes('{')) {
                const [start, end] = part.split('-').map(Number);
                if (!isNaN(start) && !isNaN(end)) {
                    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
                }
            }

            if (part.includes('{')) {
                // Handle expressions like {11}-{19} or {BOND_TO(51,@V1)}-{BOND_TO(59,@V1)}
                const rangeMatch = part.match(/{([^}]+)}-{([^}]+)}/);
                if (rangeMatch) {
                    const [_, startExpr, endExpr] = rangeMatch;
                    // console.log('Range expressions found:', { startExpr, endExpr });

                    // Process both start and end expressions
                    let processedStartExpr = startExpr;
                    let processedEndExpr = endExpr;

                    // Handle PREV_10 first in both expressions
                    while (processedStartExpr.includes('PREV_10') || processedEndExpr.includes('PREV_10')) {
                        if (processedStartExpr.includes('PREV_10')) {
                            processedStartExpr = processedStartExpr.replace(/PREV_10\(([^)]+)\)/g, (_, value) => {
                                const evaluated = eval(value);
                                const prevTen = Math.floor(Number(evaluated) / 10) * 10;
                                // console.log(`PREV_10(${value}) = ${prevTen}`);
                                return String(prevTen);
                            });
                        }
                        if (processedEndExpr.includes('PREV_10')) {
                            processedEndExpr = processedEndExpr.replace(/PREV_10\(([^)]+)\)/g, (_, value) => {
                                const evaluated = eval(value);
                                const prevTen = Math.floor(Number(evaluated) / 10) * 10;
                                // console.log(`PREV_10(${value}) = ${prevTen}`);
                                return String(prevTen);
                            });
                        }
                    }
                    // console.log('After PREV_10:', { processedStartExpr, processedEndExpr });

                    // Then handle NEXT_10 in both expressions
                    while (processedStartExpr.includes('NEXT_10') || processedEndExpr.includes('NEXT_10')) {
                        if (processedStartExpr.includes('NEXT_10')) {
                            processedStartExpr = processedStartExpr.replace(/NEXT_10\(([^)]+)\)/g, (_, value) => {
                                const evaluated = eval(value);
                                const nextTen = Math.ceil(Number(evaluated) / 10) * 10;
                                // console.log(`NEXT_10(${value}) = ${nextTen}`);
                                return String(nextTen);
                            });
                        }
                        if (processedEndExpr.includes('NEXT_10')) {
                            processedEndExpr = processedEndExpr.replace(/NEXT_10\(([^)]+)\)/g, (_, value) => {
                                const evaluated = eval(value);
                                const nextTen = Math.ceil(Number(evaluated) / 10) * 10;
                                // console.log(`NEXT_10(${value}) = ${nextTen}`);
                                return String(nextTen);
                            });
                        }
                    }
                    // console.log('After NEXT_10:', { processedStartExpr, processedEndExpr });

                    // Finally handle BOND_TO in both expressions
                    while (processedStartExpr.includes('BOND_TO') || processedEndExpr.includes('BOND_TO')) {
                        if (processedStartExpr.includes('BOND_TO')) {
                            processedStartExpr = processedStartExpr.replace(
                                /BOND_TO\(([^,]+),([^)]+)\)/g,
                                (_, num1, num2) => {
                                    try {
                                        const evaluatedNum1 = eval(num1);
                                        const evaluatedNum2 = eval(num2);
                                        const bondResult = Number(evaluatedNum1) - Number(evaluatedNum2);
                                        // console.log(`BOND_TO(${evaluatedNum1}, ${evaluatedNum2}) = ${bondResult}`);
                                        return String(bondResult);
                                    } catch (error) {
                                        console.error('Error in BOND_TO:', error);
                                        return '0';
                                    }
                                }
                            );
                        }
                        if (processedEndExpr.includes('BOND_TO')) {
                            processedEndExpr = processedEndExpr.replace(
                                /BOND_TO\(([^,]+),([^)]+)\)/g,
                                (_, num1, num2) => {
                                    try {
                                        const evaluatedNum1 = eval(num1);
                                        const evaluatedNum2 = eval(num2);
                                        const bondResult = Number(evaluatedNum1) - Number(evaluatedNum2);
                                        // console.log(`BOND_TO(${evaluatedNum1}, ${evaluatedNum2}) = ${bondResult}`);
                                        return String(bondResult);
                                    } catch (error) {
                                        console.error('Error in BOND_TO:', error);
                                        return '0';
                                    }
                                }
                            );
                        }
                    }
                    // console.log('After BOND_TO:', { processedStartExpr, processedEndExpr });

                    try {
                        // Replace @V1 with its actual value in both expressions
                        const v1Value = values.v1 || 0;
                        processedStartExpr = processedStartExpr.replace(/@V1/g, String(v1Value));
                        processedEndExpr = processedEndExpr.replace(/@V1/g, String(v1Value));

                        // Evaluate both expressions
                        const startValue = eval(processedStartExpr);
                        const endValue = eval(processedEndExpr);
                        // console.log('After final evaluation:', { startValue, endValue });

                        // Generate range
                        const result = [];
                        for (let i = startValue; i <= endValue; i++) {
                            result.push(i);
                        }
                        // console.log('Generated range result:', result);
                        return result;
                    } catch (error) {
                        console.error('Range evaluation error:', error);
                        return [];
                    }
                }

                // Handle non-range expressions
                const match = part.match(/{(.+)}/);
                if (match) {
                    let expr = match[1];
                    // console.log('Expression in curly braces:', expr);

                    // Process functions in the same order as above
                    while (expr.includes('PREV_10')) {
                        expr = expr.replace(/PREV_10\(([^)]+)\)/g, (_, value) => {
                            const evaluated = eval(value);
                            const prevTen = Math.floor(Number(evaluated) / 10) * 10;
                            // console.log(`PREV_10(${value}) = ${prevTen}`);
                            return String(prevTen);
                        });
                    }

                    while (expr.includes('NEXT_10')) {
                        expr = expr.replace(/NEXT_10\(([^)]+)\)/g, (_, value) => {
                            const evaluated = eval(value);
                            const nextTen = Math.ceil(Number(evaluated) / 10) * 10;
                            // console.log(`NEXT_10(${value}) = ${nextTen}`);
                            return String(nextTen);
                        });
                    }

                    while (expr.includes('BOND_TO')) {
                        expr = expr.replace(/BOND_TO\(([^,]+),([^)]+)\)/g, (_, num1, num2) => {
                            try {
                                const evaluatedNum1 = eval(num1);
                                const evaluatedNum2 = eval(num2);
                                const bondResult = Number(evaluatedNum1) - Number(evaluatedNum2);
                                // console.log(`BOND_TO(${evaluatedNum1}, ${evaluatedNum2}) = ${bondResult}`);
                                return String(bondResult);
                            } catch (error) {
                                console.error('Error in BOND_TO:', error);
                                return '0';
                            }
                        });
                    }

                    try {
                        const evaluated = eval(expr);
                        // console.log('Final evaluation result:', evaluated);
                        return String(evaluated);
                    } catch (error) {
                        console.error('Expression evaluation error:', error);
                        return part;
                    }
                }
            }
            return part;
        });

        // console.log('All processed parts:', parts);
        const result = parts.flatMap((part) => {
            if (Array.isArray(part)) {
                return part;
            }
            const numbers = part.split(',').map(Number);
            return numbers.filter((num) => !isNaN(num));
        });
        // console.log('Final result:', result);
        // console.log('----------------------------------------');
        return result;
    }

    // Handle other cases...
    if (expression.includes('@V1') || expression.includes('@V2')) {
        const processedExpr = expression
            .replace(/@V1/g, String(values.v1 || 0))
            .replace(/@V2/g, String(values.v2 || 0));
        // console.log('After @V1/@V2 replacement:', processedExpr);

        // Handle expressions with curly braces
        if (processedExpr.includes('{')) {
            const matches = processedExpr.match(/{(.+)}/);
            if (matches) {
                let expr = matches[1];
                // console.log('Extracted expression from curly braces:', expr);

                // First evaluate BOND_TO if present
                if (expr.includes('BOND_TO')) {
                    expr = expr.replace(/BOND_TO\((\d+),(\d+)\)/g, (_, num1, num2) => {
                        const bondResult = Number(num1) - Number(num2);
                        // console.log(`BOND_TO calculation: ${num1} - ${num2} = ${bondResult}`);
                        return String(bondResult);
                    });
                    // console.log('After BOND_TO evaluation:', expr);
                }

                // Then evaluate NEXT_10 if present
                if (expr.includes('NEXT_10')) {
                    expr = expr.replace(/NEXT_10\(([^)]+)\)/g, (_, value) => {
                        // Evaluate the inner expression first
                        let innerValue;
                        try {
                            innerValue = eval(value);
                        } catch {
                            innerValue = 0;
                        }
                        const nextTenResult = Math.ceil(Number(innerValue) / 10) * 10;
                        // console.log(`NEXT_10 calculation for ${value} (=${innerValue}) → ${nextTenResult}`);
                        return String(nextTenResult);
                    });
                    // console.log('After NEXT_10 evaluation:', expr);
                }

                // Then evaluate any remaining mathematical expression
                try {
                    const result = eval(expr);
                    // console.log('Final expression evaluation @V1:', result);

                    // If this is part of a range expression
                    if (processedExpr.includes('-')) {
                        // Check if the expression starts with a number followed by hyphen
                        const beforeCurly = processedExpr.split('{')[0];
                        if (/^\d+\-/.test(beforeCurly)) {
                            // Case: "2-{BOND_TO(10,@V1)-1}"
                            const start = Number(beforeCurly.replace('-', ''));
                            const end = result;
                            // console.log('Range bounds (number-to-result):', { start, end });

                            const rangeResult = [];
                            for (let i = start; i <= end; i++) {
                                rangeResult.push(i);
                            }
                            // console.log('Final range result:', rangeResult);
                            return rangeResult;
                        } else {
                            // Case: "{NEXT_10(@V1)-@V1+1}-7"
                            const afterCurly = processedExpr.split('}')[1];
                            if (afterCurly && afterCurly.startsWith('-')) {
                                const endValue = Number(afterCurly.substring(1));
                                // console.log('Range bounds (result-to-number):', { start: result, end: endValue });

                                const rangeResult = [];
                                for (let i = result; i <= endValue; i++) {
                                    rangeResult.push(i);
                                }
                                // console.log('Final range result:', rangeResult);
                                return rangeResult;
                            }
                        }
                    }
                    return result;
                } catch (error) {
                    console.error('Error evaluating expression:', error);
                    return 0;
                }
            }
        }

        // Handle standalone BOND_TO
        if (processedExpr.includes('BOND_TO')) {
            const matches = processedExpr.match(/BOND_TO\((\d+),(\d+)\)/);
            if (matches) {
                return Number(matches[1]) - Number(matches[2]);
            }
        }

        try {
            return eval(processedExpr);
        } catch {
            return 0;
        }
    }

    // Handle comma-separated ranges
    if (expression.includes(',')) {
        return expression
            .split(',')
            .map((part) => {
                if (part.includes('-')) {
                    const [min, max] = part.split('-').map(Number);
                    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
                }
                return Number(part);
            })
            .flat();
    }

    // Handle simple ranges
    if (expression.includes('-')) {
        const [min, max] = expression.split('-').map(Number);
        return Array.from({ length: max - min + 1 }, (_, i) => min + i);
    }

    return Number(expression);
};
