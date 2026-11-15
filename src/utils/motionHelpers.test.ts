import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTiltAngles, clampUnit } from './motionHelpers';

test('clampUnit bounds values between 0 and 1', () => {
  assert.equal(clampUnit(-0.4), 0);
  assert.equal(clampUnit(1.8), 1);
  assert.equal(clampUnit(0.25), 0.25);
  assert.equal(clampUnit(Number.NaN), 0.5);
});

test('calculateTiltAngles returns zero tilt at center', () => {
  assert.deepEqual(calculateTiltAngles(0.5, 0.5, 6), { rotateX: 0, rotateY: 0 });
});

test('calculateTiltAngles tilts symmetrically at corners within maxTiltDeg', () => {
  assert.deepEqual(calculateTiltAngles(0, 0, 8), { rotateX: 8, rotateY: -8 });
  assert.deepEqual(calculateTiltAngles(1, 1, 8), { rotateX: -8, rotateY: 8 });
  assert.deepEqual(calculateTiltAngles(1, 0, 5), { rotateX: 5, rotateY: 5 });
});
