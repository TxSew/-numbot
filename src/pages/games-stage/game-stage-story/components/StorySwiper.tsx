import { styled } from '@mui/material';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/effect-coverflow';
// @ts-ignore
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardGameStage from '../../../../assets/icon/icon-tsx/CardGameStage';
import { useMobile, useTablet } from '../../../../hooks/useResponsive';
import { useResponsiveHeight } from '../../../../hooks/useResponsiveHeight';
import { ListStageResponse } from '../../../../types/backend';

type Props = {
    listStages?: ListStageResponse[];
};
export default function StorySwiper(props: Props) {
    const { listStages } = props;
    const navigate = useNavigate();

    const isMobile = useMobile();
    const isTablet = useTablet();
    const isShortHeight = useResponsiveHeight('short');

    const getCardDimensions = () => {
        if (isMobile) {
            return {
                width: '160px',
                height: isShortHeight ? '280px' : '320px',
            };
        }
        if (isTablet) {
            return {
                width: '290px',
                height: isShortHeight ? '400px' : '440px',
            };
        }
        return {
            width: '320px',
            height: isShortHeight ? '500px' : '550px',
        };
    };

    const { width, height } = getCardDimensions();

    const handleCardClick = async (id: number, index: number) => {
        navigate(`${id}/index/${index}/level`);
    };

    const getInitialSlide = () => {
        const currentStageIndex = listStages?.findIndex(stage => stage.userLevel < stage.totalLevel);
        return currentStageIndex !== -1 ? currentStageIndex ?? 0 + 1 : listStages?.length! - 1;
    };

    return (
        <StyledSwiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            initialSlide={getInitialSlide()}
            slidesPerView={'auto'}
            spaceBetween={isMobile ? -50 : -100}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: isMobile ? 50 : 100,
                modifier: isMobile ? 1.5 : 2.5,
                slideShadows: false,
            }}
            navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            }}
            modules={[EffectCoverflow, Navigation]}
            style={{
                padding: isMobile ? '30px 0' : '50px 0',
                maxWidth: '1000px',
                width: '100%',
            }}
        >
            {listStages
                ?.filter((item) => item.name !== 'Challenge')
                ?.map((stage, i) => {
                    const previousStage = i > 0 ? listStages[i - 1] : null;
                    const isLocked = previousStage && previousStage.userLevel < previousStage.totalLevel;

                    return (
                        <SwiperSlide
                            key={i}
                            style={{
                                width,
                                height,
                                transform: 'perspective(1000px)',
                                cursor: isLocked ? 'default' : 'pointer',
                            }}
                            onClick={() => !isLocked && handleCardClick(stage.id, i)}
                        >
                            <CardGameStage stage={stage} isLocked={isLocked} />
                        </SwiperSlide>
                    );
                })}
        </StyledSwiper>
    );
}

const StyledSwiper = styled(Swiper)({
    '& .swiper-slide': {
        transition: 'transform 0.3s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:not(.swiper-slide-active)': {
            filter: 'brightness(0.7)',
            transform: 'scale(0.85) translateX(0)',
        },
        '&.swiper-slide-active': {
            transform: 'scale(1) translateX(0)',
            zIndex: 2,
        },
    },
    '& .swiper-wrapper': {
        alignItems: 'center',
        display: 'flex',
    },
});
