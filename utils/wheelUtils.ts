export function getSliceAngle(namesLength: number) {
  return 360 / Math.max(namesLength, 1);
}

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

function getNameByPointer(
  names: string[],
  wheelRotation: number,
  pointerAngle: number
) {
  const sliceAngle = getSliceAngle(names.length);

  const angleOnWheel = normalizeAngle(
    pointerAngle - wheelRotation
  );

  const index = Math.floor(angleOnWheel / sliceAngle);

  return names[index];
}

export function createRandomWheelRotation(
  currentRotation: number
) {
  return currentRotation + 3600 + Math.random() * 720;
}

export function createRandomPointerRotation(
  names: string[],
  wheelRotation: number,
  currentPointerRotation: number
) {
  const sliceAngle = getSliceAngle(names.length);

  let nextPointerRotation =
    currentPointerRotation + 720 + Math.random() * 720;

  const firstWinner = getNameByPointer(
    names,
    wheelRotation,
    0
  );

  let secondWinner = getNameByPointer(
    names,
    wheelRotation,
    180 + nextPointerRotation
  );

  if (names.length > 1 && firstWinner === secondWinner) {
    nextPointerRotation += sliceAngle;
  }

  return nextPointerRotation;
}

export function getWinnersFromPointers(
  names: string[],
  wheelRotation: number,
  pointerRotation: number
) {
  const firstWinner = getNameByPointer(
    names,
    wheelRotation,
    0
  );

  const secondWinner = getNameByPointer(
    names,
    wheelRotation,
    180 + pointerRotation
  );

  return [firstWinner, secondWinner];
}