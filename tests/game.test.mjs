import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, movePlayer, rooms } from '../app/game.ts';

const roomId = state => rooms[state.y][state.x].id;

test('the Lamp Room stays locked until the player visits the Keeper’s Kitchen', () => {
  const locked = movePlayer(initialState, 'north');
  assert.equal(roomId(locked), 'rocks');
  assert.equal(locked.message, 'The lamp room door is locked.');

  const kitchen = movePlayer(locked, 'west');
  assert.equal(roomId(kitchen), 'kitchen');
  const rocks = movePlayer(kitchen, 'east');
  assert.equal(roomId(rocks), 'rocks');
  const unlocked = movePlayer(rocks, 'north');
  assert.equal(roomId(unlocked), 'lamp');
  assert.equal(unlocked.message, '');
});

test('the stair entrance also requires a kitchen visit', () => {
  const stair = { ...initialState, x: 0, y: 0 };
  const locked = movePlayer(stair, 'east');
  assert.equal(roomId(locked), 'stair');
  assert.equal(locked.message, 'The lamp room door is locked.');
});

test('unlocking survives blocked moves and does not change the initial state', () => {
  const start = Object.freeze({ ...initialState });
  let state = movePlayer(start, 'west');
  state = movePlayer(state, 'south');
  assert.equal(roomId(state), 'kitchen');
  state = movePlayer(state, 'east');
  state = movePlayer(state, 'north');
  assert.equal(roomId(state), 'lamp');
  assert.equal(roomId(movePlayer(start, 'north')), 'rocks');
  assert.equal(start.hasVisitedKitchen, false);
  assert.equal(start.message, '');
});
