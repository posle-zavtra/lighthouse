export type Direction = 'north' | 'east' | 'south' | 'west';
export type RoomId = 'stair' | 'lamp' | 'kitchen' | 'rocks';
export interface Room {
  id: RoomId;
  name: string;
  description: string;
  blocked: Partial<Record<Direction, string>>;
}

export const rooms: Room[][] = [
  [
    { id: 'stair', name: 'Spiral Stair',
      description: 'An iron staircase coils past sea-green walls, with red light catching its damp rail and Hong Kong harbour glittering through the window. A brass door opens east into the lamp room, and the stairs descend south towards the kitchen.',
      blocked: { north: 'The tower wall blocks your way north.', west: 'A sealed window overlooks a sheer drop to the west.' } },
    { id: 'lamp', name: 'Lamp Room',
      description: 'A great glass lens glows amber against rain-streaked windows, with Hong Kong harbour lights scattered across the dark water. The stair door stands to the west, and a sheltered ladder descends south to the rocks.',
      blocked: { north: 'Thick glass separates you from the sea to the north.', east: 'The lantern glass blocks your way east.' } },
  ],
  [
    { id: 'kitchen', name: "Keeper's Kitchen",
      description: 'A copper kettle rests beside a cold stove beneath a green fluorescent light, while harbour reflections shimmer through the open door. The spiral stair rises to the north, while the eastern door opens onto wet rocks.',
      blocked: { south: 'A solid stone wall blocks your way south.', west: 'The stove and chimney fill the western wall.' } },
    { id: 'rocks', name: 'Rocks',
      description: 'Black rocks glisten beneath the lighthouse, with the lights of Hong Kong reflected in the sea beyond. To the north a ladder leads to the lamp, while a kitchen door glows to the west.',
      blocked: { south: 'Crashing waves make the southern rocks impassable.', east: 'The open sea lies to the east; there is no footing.' } },
  ],
];
export const steps: Record<Direction, readonly [number, number]> = {
  north: [0, -1], east: [1, 0], south: [0, 1], west: [-1, 0],
};
export const roomImages: Record<RoomId, { src: string; alt: string }> = {
  stair: { src: '/assets/stair-hk.png', alt: 'An empty spiral stair under red light, with green walls and Hong Kong harbour visible through a rainy window.' },
  lamp: { src: '/assets/lamp-hk.png', alt: 'An amber Fresnel lens beside rain-streaked windows overlooking Hong Kong harbour, with an open ladder hatch.' },
  kitchen: { src: '/assets/kitchen-hk.png', alt: 'An empty green-tiled kitchen with a copper kettle, iron stove and harbour-facing doorway under green and amber lights.' },
  rocks: { src: '/assets/rocks-hk.png', alt: 'An empty rocky Hong Kong shoreline beside a glowing lighthouse, with green and red harbour reflections across the water.' },
};

export const directionOrder: Direction[] = ['north', 'east', 'south', 'west'];
export const labels: Record<Direction, string> = { north: '↑ North', east: '→ East', south: '↓ South', west: '← West' };
export const keys: Record<string, Direction | undefined> = { ArrowUp: 'north', ArrowRight: 'east', ArrowDown: 'south', ArrowLeft: 'west' };
export interface GameState { x: number; y: number; message: string; hasVisitedKitchen: boolean; }
export const initialState: GameState = { x: 1, y: 1, message: '', hasVisitedKitchen: false };
export function movePlayer(state: GameState, direction: Direction): GameState {
  const blocked = rooms[state.y][state.x].blocked[direction];
  if (blocked) return { ...state, message: blocked };
  const [dx, dy] = steps[direction];
  const x = state.x + dx;
  const y = state.y + dy;
  const destination = rooms[y][x];
  return {
    x, y, message: '',
    hasVisitedKitchen: state.hasVisitedKitchen || destination.id === 'kitchen',
  };
}
