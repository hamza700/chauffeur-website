import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export function useCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const setActiveIndexHandler = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      setActiveIndex(index);
    },
    [emblaApi]
  );

  return {
    carouselProps: {
      ref: emblaRef,
      onSelect,
    },
    activeIndex,
    setActiveIndex: setActiveIndexHandler,
  };
}
