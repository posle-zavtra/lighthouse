"use client";

/* Plain img elements preserve the prototype's image rendering and crop. */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useReducer, useRef } from 'react';
import { rooms, roomImages, labels, keys, directionOrder, movePlayer, initialState } from './game';

export default function Lighthouse() {
  const [state, dispatch] = useReducer(movePlayer, initialState);
  const directionsRef = useRef<HTMLDivElement>(null);
  const room = rooms[state.y][state.x];

  useEffect(() => {
    for (const { src } of Object.values(roomImages)) {
      const image = new window.Image();
      image.src = src;
    }
    function onKeyDown(event: KeyboardEvent) {
      const direction = keys[event.key];
      if (!direction || event.altKey || event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      dispatch(direction);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const focused = document.activeElement;
    if (focused instanceof HTMLButtonElement && focused.hidden && directionsRef.current?.contains(focused)) {
      directionsRef.current.querySelector<HTMLButtonElement>('button:not([hidden])')?.focus();
    }
  }, [state.x, state.y]);

  return <>
<header>
    <div><p className="wordmark">The Last Light</p><p className="intro">A tiny adventure on the Hong Kong coast.<br />Four places, a restless sea, and a light<br />that stays on after dark.</p></div>
    <p className="edition">HONG KONG / AFTER DARK</p>
    <details><summary>Guide</summary><div className="guide"><p>Follow the light through four rooms. Use your arrow keys or the direction buttons to move.</p><p>The map shows where you are. If your way is blocked, the lighthouse will tell you why.</p><a href="#navigation">View the map</a></div></details>
  </header>
  <main>
    <p className="headline" aria-hidden="true">somewhere<span>between tides</span></p>
    <p className="through" aria-hidden="true">and light.</p>
    <figure className="fragment stair"><div className="fragment-photo"><img src="/assets/stair-hk.png" alt="Red light falling on an empty spiral staircase overlooking Hong Kong harbour." /><span className="blur-middle" aria-hidden="true"></span></div></figure>
    <figure className="fragment kitchen"><div className="fragment-photo"><img src="/assets/kitchen-hk.png" alt="A quiet green-tiled kitchen opening onto the sea." /><span className="blur-middle" aria-hidden="true"></span></div></figure>
    <figure className="fragment lamp"><div className="fragment-photo"><img src="/assets/lamp-hk.png" alt="Amber lighthouse lens against the harbour at night." /><span className="blur-middle" aria-hidden="true"></span></div></figure>
    <section className="scene" aria-live="polite" aria-atomic="true" aria-label="Current room">
      <p className="scene-label">Your place in the night</p>
      <img id="room-image" src={roomImages[room.id].src} width="1536" height="1024" alt={roomImages[room.id].alt} />
      <div className="room-line"><h1 id="room-name">{room.name}</h1><span className="location">HONG KONG</span></div>
      <p id="description">{room.description}</p>
      <h2>You can go</h2><div id="directions" ref={directionsRef}>
        {directionOrder.map(direction => <button key={direction} type="button" hidden={Boolean(room.blocked[direction])} onClick={() => dispatch(direction)}>{labels[direction]}</button>)}
      </div>
      <p id="message" role="status" aria-live="polite">{state.message}</p>
    </section>
    <aside className="navigation" id="navigation" aria-label="Lighthouse navigation">
      <h2>Four places / one lighthouse</h2>
      <div className="map" aria-label="Room map, north at the top">
        <div data-room="stair" aria-current={room.id === "stair" ? "location" : undefined}>Spiral Stair</div><div data-room="lamp" aria-current={room.id === "lamp" ? "location" : undefined}>Lamp Room</div>
        <div data-room="kitchen" aria-current={room.id === "kitchen" ? "location" : undefined}>Keeper&apos;s Kitchen</div><div data-room="rocks" aria-current={room.id === "rocks" ? "location" : undefined}>Rocks</div>
      </div>
      <p className="hint">Use your arrow keys to wander.<br />Or choose a direction beside the scene.</p>
    </aside>
    <noscript>This adventure needs JavaScript enabled to move between rooms.</noscript>
  </main>
  <footer><span>A lighthouse story</span><span>Four rooms. No rush.</span><span>Hong Kong, after dark</span></footer>
  </>;
}
