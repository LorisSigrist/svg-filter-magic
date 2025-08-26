<script module lang="ts">
  export interface DitherFilterProps {
    duration: number;
    id: string;
    pattern?: "bayer" | "blue-noise";
  }
</script>

<script lang="ts">
  import blue from "./blue.png";
  import bayer from "./bayer_map.png";

  let { duration, id, pattern = "blue-noise" }: DitherFilterProps = $props();
  let svg: SVGSVGElement;

  const maskImage = $derived(
    pattern == "bayer"
      ? {
          href: bayer,
          width: 16,
          height: 16,
        }
      : {
          href: blue,
          width: 470,
          height: 470,
        }
  );

  const numSteps = 128;

  const tableValues = Array(numSteps)
    .fill(0)
    .map((v, i) => {
      return new Array(numSteps - 1)
        .fill(0)
        .map((v, y) => (y >= i ? 1 : 0))
        .join(" ");
    });

  export function setProgress(t: number) {
    svg?.setCurrentTime((duration / 1000) * t);
  }
</script>

<svg
  height="100vh"
  width="100vw"
  class="fixed right-full top-0 opacity-0 -z-50 *:"
  bind:this={svg}
>
  <defs>
    <filter {id} x="0" y="0" width="100%" height="100%">
      <feImage
        result="single-mask"
        {...maskImage}
        fill="white"
        image-rendering="pixelated"
      />
      <feTile
        in="single-mask"
        result="tiled-mask"
        x="0"
        y="0"
        width="100%"
        height="100%"
      />
      <feColorMatrix
        type="matrix"
        in="tiled-mask"
        result="alpha-mask"
        values="1 0 0 0 0
            0 0 0 0 1
            0 0 0 0 1
            2 0 0 0 0"
      />

      <feComponentTransfer in="alpha-mask" result="mask">
        <feFuncA type="table" tableValues={tableValues[0]}>
          <animate
            attributeName="tableValues"
            values={tableValues.join(";")}
            dur="{duration}ms"
            repeatCount="0"
            fill="freeze"
          />
        </feFuncA>
      </feComponentTransfer>

      <feComposite in="SourceGraphic" in2="mask" operator="out" />
    </filter>
  </defs>
</svg>
