/**
 * 5C — Full-bleed atmosphere scenes (CSS gradients + SVG bokeh).
 * No photographs; dark overlay is applied by the section on top.
 */

function Bokeh({ circles, hue }: { circles: [number, number, number, number][]; hue: string }) {
  return (
    <svg viewBox="0 0 1440 800" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id={`bokeh-blur-${hue}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <g filter={`url(#bokeh-blur-${hue})`} fill={hue}>
        {circles.map(([cx, cy, r, o], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fillOpacity={o} />
        ))}
      </g>
    </svg>
  );
}

/** Cool, calm self-care atmosphere (3.15) */
export function SceneSelfcare() {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        background:
          "linear-gradient(160deg, #33403F 0%, #26302F 45%, #1B2322 100%)",
      }}
      aria-hidden="true"
    >
      <Bokeh
        hue="#C8D4D4"
        circles={[
          [220, 180, 70, 0.1],
          [480, 520, 110, 0.07],
          [900, 140, 60, 0.09],
          [1180, 420, 130, 0.08],
          [700, 660, 80, 0.06],
          [1340, 680, 60, 0.09],
          [80, 620, 55, 0.08],
        ]}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}

/** Warm dusk social-event atmosphere (3.16) */
export function SceneSocial() {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        background:
          "linear-gradient(150deg, #453126 0%, #34231C 50%, #1E1512 100%)",
      }}
      aria-hidden="true"
    >
      <Bokeh
        hue="#E3A45C"
        circles={[
          [160, 220, 55, 0.16],
          [400, 90, 40, 0.12],
          [640, 340, 90, 0.1],
          [920, 150, 50, 0.15],
          [1150, 480, 110, 0.09],
          [1330, 220, 45, 0.14],
          [280, 600, 75, 0.08],
          [820, 640, 55, 0.1],
        ]}
      />
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
    </div>
  );
}
