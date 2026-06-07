"use client";

import Lottie from "lottie-react";

const animationData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 120,
  w: 280,
  h: 280,
  nm: "Vantage signal",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "outer-ring",
      ks: {
        o: { a: 1, k: [{ t: 0, s: [28], e: [80] }, { t: 60, s: [80], e: [28] }, { t: 120, s: [28] }] },
        r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 120, s: [360] }] },
        p: { a: 0, k: [140, 140, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [180, 180] } },
            { ty: "st", c: { a: 0, k: [0.55, 1, 0.82, 1] }, o: { a: 0, k: 70 }, w: { a: 0, k: 4 }, lc: 2, lj: 2 },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "core",
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [140, 140, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [82, 82, 100], e: [100, 100, 100] }, { t: 60, s: [100, 100, 100], e: [82, 82, 100] }, { t: 120, s: [82, 82, 100] }] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [86, 86] } },
            { ty: "fl", c: { a: 0, k: [0.86, 0.95, 0.92, 1] }, o: { a: 0, k: 92 } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0,
    },
  ],
};

export function SignalLottie() {
  return (
    <Lottie
      animationData={animationData}
      autoplay
      loop
      className="h-40 w-40 opacity-90"
      aria-hidden="true"
    />
  );
}
