import { ref } from "vue";

const layer1Style = ref({ transform: "translate(0px, 0px) scale(1.05)" });
const layer2Style = ref({ transform: "translate(0px, 0px) scale(1.05)" });

export const useParallax = () => {
  
  const handleMouseMove = (event: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const xOffset = (event.clientX - innerWidth / 2) / 60;
    const yOffset = (event.clientY - innerHeight / 2) / 60;

    layer1Style.value = {
      transform: `translate(${xOffset / 1.4}px, ${
        yOffset / 1.4
      }px) scale(1.05)`,
    };
    layer2Style.value = {
      transform: `translate(${-xOffset / 4}px, ${-yOffset / 4}px) scale(1.05)`,
    };
  };

  return {
    handleMouseMove,
    layer1Style,
    layer2Style,
  };
};
