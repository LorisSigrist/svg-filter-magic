import { mount, unmount } from "svelte";
import DitherFilter, { type DitherFilterProps } from "./DitherFilter.svelte";

// place files you want to import through the `$lib` alias in this folder.
export function dissolve(
    node: HTMLElement,
    { duration = 300, pattern }: { duration?: number, pattern?: DitherFilterProps["pattern"] } = { duration: 300 }
) {
    const id = `dithering-${crypto.randomUUID()}`;

    const target = document.createElement("div");
    document.body.appendChild(target);
    const filter = mount(DitherFilter, {
        target,
        props: {
            id,
            duration,
            pattern
        }
    });

    function applyFilter() {
        node.style.filter = `url(#${id})`;
    }

    function removeFilter() {
        node.style.filter = '';
    }


    function onOutroEnd() {
        unmount(filter);
        target.remove();
        removeListeners();
    }
    function onIntroEnd() {
        removeFilter();
    }

    function onOutroStart() {
        applyFilter();
    }

    applyFilter();
    node.addEventListener('outroend', onOutroEnd);
    node.addEventListener('outrostart', onOutroStart);
    node.addEventListener('introend', onIntroEnd);

    function removeListeners() {
        node.removeEventListener('outroend', onOutroEnd);
        node.removeEventListener('outrostart', onOutroStart);
        node.removeEventListener('introend', onIntroEnd);
    }

    return {
        duration,
        tick(t: number) {
            if (filter) filter.setProgress(t);
        }
    };
}