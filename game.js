"use strict";
const rooms = [
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
const steps = {
    north: [0, -1], east: [1, 0], south: [0, 1], west: [-1, 0],
};
const roomImages = {
    stair: { src: 'assets/stair-hk.png', alt: 'An empty spiral stair under red light, with green walls and Hong Kong harbour visible through a rainy window.' },
    lamp: { src: 'assets/lamp-hk.png', alt: 'An amber Fresnel lens beside rain-streaked windows overlooking Hong Kong harbour, with an open ladder hatch.' },
    kitchen: { src: 'assets/kitchen-hk.png', alt: 'An empty green-tiled kitchen with a copper kettle, iron stove and harbour-facing doorway under green and amber lights.' },
    rocks: { src: 'assets/rocks-hk.png', alt: 'An empty rocky Hong Kong shoreline beside a glowing lighthouse, with green and red harbour reflections across the water.' },
};
// Warm the browser cache so room changes display their scenes promptly.
for (const { src } of Object.values(roomImages)) {
    const preload = new Image();
    preload.src = src;
}
const labels = { north: '↑ North', east: '→ East', south: '↓ South', west: '← West' };
const keys = { ArrowUp: 'north', ArrowRight: 'east', ArrowDown: 'south', ArrowLeft: 'west' };
let x = 1;
let y = 1;
const heading = document.querySelector('#room-name');
const roomImage = document.querySelector('#room-image');
const description = document.querySelector('#description');
const directions = document.querySelector('#directions');
const message = document.querySelector('#message');
function render() {
    const room = rooms[y][x];
    heading.textContent = room.name;
    roomImage.src = roomImages[room.id].src;
    roomImage.alt = roomImages[room.id].alt;
    description.textContent = room.description;
    // Keep buttons stable so keyboard focus survives movement.
    for (const direction of Object.keys(steps)) {
        const button = directions.querySelector(`[data-direction="${direction}"]`);
        button.hidden = Boolean(room.blocked[direction]);
    }
    document.querySelectorAll('[data-room]').forEach(cell => {
        if (cell.dataset.room === room.id)
            cell.setAttribute('aria-current', 'location');
        else
            cell.removeAttribute('aria-current');
    });
}
function move(direction) {
    const blocked = rooms[y][x].blocked[direction];
    if (blocked) {
        message.textContent = blocked;
        return;
    }
    const [dx, dy] = steps[direction];
    x += dx;
    y += dy;
    message.textContent = '';
    render();
    const focused = document.activeElement;
    if (focused instanceof HTMLButtonElement && focused.hidden) {
        directions.querySelector('button:not([hidden])')?.focus();
    }
}
for (const direction of Object.keys(steps)) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.direction = direction;
    button.textContent = labels[direction];
    button.addEventListener('click', () => move(direction));
    directions.append(button);
}
document.addEventListener('keydown', event => {
    const direction = keys[event.key];
    if (!direction || event.altKey || event.ctrlKey || event.metaKey)
        return;
    event.preventDefault();
    move(direction);
});
render();
