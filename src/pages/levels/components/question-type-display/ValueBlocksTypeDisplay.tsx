import { Box, Typography } from '@mui/material';
import { appColors } from '../../../../themes';
import { EquationConfig } from '../../types/equation';

export interface ValueBlocksTypeDisplayProps {
    equation: EquationConfig;
    answer?: string;
    isIncorrect?: boolean;
    isResponsive?: boolean;
    answerPosition?: 'left' | 'right';
}

export default function ValueBlocksTypeDisplay(props: ValueBlocksTypeDisplayProps) {
    const { equation, answer, isIncorrect, isResponsive } = props;

    const renderEquation = () => {
        if (!equation.show_sum) {
            return [<span key="answer">{answer}</span>];
        }

        if (equation.numbers.length === 1 && equation.numbers[0].isAnswer) {
            return [<span key="answer">{answer}</span>];
        }

        const parts: JSX.Element[] = [];
        equation.numbers.forEach((num, index) => {
            if (num.isAnswer) {
                parts.push(<span key={`num-${index}`}>{answer}</span>);
            } else {
                parts.push(<span key={`num-${index}`}>{num.value}</span>);
            }

            if (index < equation.numbers.length - 1) {
                parts.push(<span key={`op-${index}`}> {equation.operators[index]} </span>);
            }
        });

        if (equation.numbers.some((n) => n.isAnswer)) {
            parts.push(
                <span key="equals"> = </span>,
                <span key="result">{equation.displaySum ?? equation.result}</span>
            );
        } else {
            parts.push(<span key="equals"> = </span>, <span key="answer">{answer}</span>);
        }

        return parts;
    };

    return (
        <Box
            sx={{
                backgroundColor: appColors.white,
                border: `3px solid ${isIncorrect ? appColors.danger : appColors.textPrimary}`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isIncorrect ? appColors.danger : appColors.textPrimary,
                gap: 1,
                transition: 'all 0.2s ease',
                borderRadius: {
                    xs: 2,
                    sm: 3
                },
                padding: {
                    xs: '2px 6px',
                    sm: '4px 16px',
                },
                minWidth: {
                    xs: isResponsive ? '10rem' : '19rem',
                    sm: isResponsive ? '15rem' : '19rem',
                },
            }}
        >
            <Typography
                fontSize={24}
                fontWeight={700}
                color={isIncorrect ? appColors.danger : appColors.textPrimary}
                sx={{ transition: 'all 0.2s ease' }}
            >
                {renderEquation()}
            </Typography>
        </Box>
    );
}
