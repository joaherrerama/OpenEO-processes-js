import mode from './mode.module.js';

const testSample = [
  155, 240, 107, 180, 88, 213, 158, 93, 253, 77, 77, 77, 47, 119, 59, 18, 19,
  233, 40, 224, 141, 37, 105, 167, 99, 46, 64, 12, 92, 224, 250, 173, 206, 157,
  238, 5, 108, 226, 91, 17, 165, 28, 70, 168, 123, 160, 68, 156, 139, 161, 80,
  132, 130, 200, 121, 14, 38, 153, 1, 222, 33, 73, 224, 179, 118, 9, 158, 181,
  202, 243, 169, 236, 108, 218, 139, 0, 129, 94, 246, 253, 250, 38, 119, 185,
  15, 60, 17, 69, 204, 172, 255, 183, 169, 141, 151, 232, 61, 245, 175, 229
];

const testSampleUniqueMode = [
  77, 240, 107, 180, 88, 213, 158, 93, 253, 77, 77, 77, 47, 119
];
const typedSample = Float32Array.from(testSample);

test('Mode values in an typearray (Image Format)', () => {
  expect(mode(typedSample)).toEqual([77, 224]);
});

test('Mode value in an typearray (Image Format)', () => {
  expect(mode(testSampleUniqueMode)).toEqual(77);
});
