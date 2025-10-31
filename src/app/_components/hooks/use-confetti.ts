import confetti from "canvas-confetti";

export function useConfetti() {
  const getElementOrigin = (element: HTMLElement | null) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      return { x, y };
    }
    return { x: 0.5, y: 0.6 };
  };

  const triggerFromElement = (element: HTMLElement | null) => {
    void confetti({
      particleCount: 50,
      spread: 70,
      startVelocity: 20,
      origin: getElementOrigin(element),
    });
  };

  const triggerFirstVisitConfetti = () => {
    const count = 3000;
    const topCenter = { x: 0.5, y: 0 };
    const numberOfEmitters = 24;

    for (let i = 0; i < numberOfEmitters; i++) {
      const emitterX = i / (numberOfEmitters - 1);
      const emitterY = 1;

      const dx = topCenter.x - emitterX;
      const dy = topCenter.y - emitterY;
      const angleToTop = Math.atan2(-dy, dx) * (180 / Math.PI);

      void confetti({
        particleCount: Math.floor(count / numberOfEmitters),
        angle: angleToTop,
        spread: 30,
        startVelocity: 70,
        origin: { x: emitterX, y: emitterY },
        decay: 0.92,
        scalar: 1,
      });
    }
  };

  return {
    triggerFromElement,
    triggerFirstVisitConfetti,
  };
}
