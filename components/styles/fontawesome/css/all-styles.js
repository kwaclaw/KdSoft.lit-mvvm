import { css } from '@kdsoft/lit-mvvm';

export default css`

/*!
 * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */
.fa {
  font-family: var(--fa-style-family, "Font Awesome 6 Free");
  font-weight: var(--fa-style, 900); }
.fa,
.fas,
.fa-solid,
.far,
.fa-regular,
.fal,
.fa-light,
.fat,
.fa-thin,
.fad,
.fa-duotone,
.fab,
.fa-brands {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: var(--fa-display, inline-block);
  font-style: normal;
  font-variant: normal;
  line-height: 1;
  text-rendering: auto; }
.fa-1x {
  font-size: 1em; }
.fa-2x {
  font-size: 2em; }
.fa-3x {
  font-size: 3em; }
.fa-4x {
  font-size: 4em; }
.fa-5x {
  font-size: 5em; }
.fa-6x {
  font-size: 6em; }
.fa-7x {
  font-size: 7em; }
.fa-8x {
  font-size: 8em; }
.fa-9x {
  font-size: 9em; }
.fa-10x {
  font-size: 10em; }
.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em; }
.fa-xs {
  font-size: 0.75em;
  line-height: 0.08333em;
  vertical-align: 0.125em; }
.fa-sm {
  font-size: 0.875em;
  line-height: 0.07143em;
  vertical-align: 0.05357em; }
.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em; }
.fa-xl {
  font-size: 1.5em;
  line-height: 0.04167em;
  vertical-align: -0.125em; }
.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em; }
.fa-fw {
  text-align: center;
  width: 1.25em; }
.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0; }
.fa-ul > li {
    position: relative; }
.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit; }
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em); }
.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em); }
.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em); }
.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out); }
.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1)); }
.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1)); }
.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1)); }
.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out); }
.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear); }
.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear); }
.fa-spin-reverse {
  --fa-animation-direction: reverse; }
.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8)); }
@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s; } }
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1); }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25)); } }
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0); }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0); }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em)); }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0); }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em)); }
  64% {
    transform: scale(1, 1) translateY(0); }
  100% {
    transform: scale(1, 1) translateY(0); } }
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4); } }
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1); }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125)); } }
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg)); } }
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg); }
  4% {
    transform: rotate(15deg); }
  8%, 24% {
    transform: rotate(-18deg); }
  12%, 28% {
    transform: rotate(18deg); }
  16% {
    transform: rotate(-22deg); }
  20% {
    transform: rotate(22deg); }
  32% {
    transform: rotate(-12deg); }
  36% {
    transform: rotate(12deg); }
  40%, 100% {
    transform: rotate(0deg); } }
@keyframes fa-spin {
  0% {
    transform: rotate(0deg); }
  100% {
    transform: rotate(360deg); } }
.fa-rotate-90 {
  transform: rotate(90deg); }
.fa-rotate-180 {
  transform: rotate(180deg); }
.fa-rotate-270 {
  transform: rotate(270deg); }
.fa-flip-horizontal {
  transform: scale(-1, 1); }
.fa-flip-vertical {
  transform: scale(1, -1); }
.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1); }
.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, none)); }
.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em; }
.fa-stack-1x,
.fa-stack-2x {
  left: 0;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: var(--fa-stack-z-index, auto); }
.fa-stack-1x {
  line-height: inherit; }
.fa-stack-2x {
  font-size: 2em; }
.fa-inverse {
  color: var(--fa-inverse, #fff); }
/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen
readers do not read off random characters that represent icons */
.fa-0::before {
  content: "\\30"; }
.fa-1::before {
  content: "\\31"; }
.fa-2::before {
  content: "\\32"; }
.fa-3::before {
  content: "\\33"; }
.fa-4::before {
  content: "\\34"; }
.fa-5::before {
  content: "\\35"; }
.fa-6::before {
  content: "\\36"; }
.fa-7::before {
  content: "\\37"; }
.fa-8::before {
  content: "\\38"; }
.fa-9::before {
  content: "\\39"; }
.fa-a::before {
  content: "\\41"; }
.fa-address-book::before {
  content: "\\f2b9"; }
.fa-contact-book::before {
  content: "\\f2b9"; }
.fa-address-card::before {
  content: "\\f2bb"; }
.fa-contact-card::before {
  content: "\\f2bb"; }
.fa-vcard::before {
  content: "\\f2bb"; }
.fa-align-center::before {
  content: "\\f037"; }
.fa-align-justify::before {
  content: "\\f039"; }
.fa-align-left::before {
  content: "\\f036"; }
.fa-align-right::before {
  content: "\\f038"; }
.fa-anchor::before {
  content: "\\f13d"; }
.fa-anchor-circle-check::before {
  content: "\\e4aa"; }
.fa-anchor-circle-exclamation::before {
  content: "\\e4ab"; }
.fa-anchor-circle-xmark::before {
  content: "\\e4ac"; }
.fa-anchor-lock::before {
  content: "\\e4ad"; }
.fa-angle-down::before {
  content: "\\f107"; }
.fa-angle-left::before {
  content: "\\f104"; }
.fa-angle-right::before {
  content: "\\f105"; }
.fa-angle-up::before {
  content: "\\f106"; }
.fa-angles-down::before {
  content: "\\f103"; }
.fa-angle-double-down::before {
  content: "\\f103"; }
.fa-angles-left::before {
  content: "\\f100"; }
.fa-angle-double-left::before {
  content: "\\f100"; }
.fa-angles-right::before {
  content: "\\f101"; }
.fa-angle-double-right::before {
  content: "\\f101"; }
.fa-angles-up::before {
  content: "\\f102"; }
.fa-angle-double-up::before {
  content: "\\f102"; }
.fa-ankh::before {
  content: "\\f644"; }
.fa-apple-whole::before {
  content: "\\f5d1"; }
.fa-apple-alt::before {
  content: "\\f5d1"; }
.fa-archway::before {
  content: "\\f557"; }
.fa-arrow-down::before {
  content: "\\f063"; }
.fa-arrow-down-1-9::before {
  content: "\\f162"; }
.fa-sort-numeric-asc::before {
  content: "\\f162"; }
.fa-sort-numeric-down::before {
  content: "\\f162"; }
.fa-arrow-down-9-1::before {
  content: "\\f886"; }
.fa-sort-numeric-desc::before {
  content: "\\f886"; }
.fa-sort-numeric-down-alt::before {
  content: "\\f886"; }
.fa-arrow-down-a-z::before {
  content: "\\f15d"; }
.fa-sort-alpha-asc::before {
  content: "\\f15d"; }
.fa-sort-alpha-down::before {
  content: "\\f15d"; }
.fa-arrow-down-long::before {
  content: "\\f175"; }
.fa-long-arrow-down::before {
  content: "\\f175"; }
.fa-arrow-down-short-wide::before {
  content: "\\f884"; }
.fa-sort-amount-desc::before {
  content: "\\f884"; }
.fa-sort-amount-down-alt::before {
  content: "\\f884"; }
.fa-arrow-down-up-across-line::before {
  content: "\\e4af"; }
.fa-arrow-down-up-lock::before {
  content: "\\e4b0"; }
.fa-arrow-down-wide-short::before {
  content: "\\f160"; }
.fa-sort-amount-asc::before {
  content: "\\f160"; }
.fa-sort-amount-down::before {
  content: "\\f160"; }
.fa-arrow-down-z-a::before {
  content: "\\f881"; }
.fa-sort-alpha-desc::before {
  content: "\\f881"; }
.fa-sort-alpha-down-alt::before {
  content: "\\f881"; }
.fa-arrow-left::before {
  content: "\\f060"; }
.fa-arrow-left-long::before {
  content: "\\f177"; }
.fa-long-arrow-left::before {
  content: "\\f177"; }
.fa-arrow-pointer::before {
  content: "\\f245"; }
.fa-mouse-pointer::before {
  content: "\\f245"; }
.fa-arrow-right::before {
  content: "\\f061"; }
.fa-arrow-right-arrow-left::before {
  content: "\\f0ec"; }
.fa-exchange::before {
  content: "\\f0ec"; }
.fa-arrow-right-from-bracket::before {
  content: "\\f08b"; }
.fa-sign-out::before {
  content: "\\f08b"; }
.fa-arrow-right-long::before {
  content: "\\f178"; }
.fa-long-arrow-right::before {
  content: "\\f178"; }
.fa-arrow-right-to-bracket::before {
  content: "\\f090"; }
.fa-sign-in::before {
  content: "\\f090"; }
.fa-arrow-right-to-city::before {
  content: "\\e4b3"; }
.fa-arrow-rotate-left::before {
  content: "\\f0e2"; }
.fa-arrow-left-rotate::before {
  content: "\\f0e2"; }
.fa-arrow-rotate-back::before {
  content: "\\f0e2"; }
.fa-arrow-rotate-backward::before {
  content: "\\f0e2"; }
.fa-undo::before {
  content: "\\f0e2"; }
.fa-arrow-rotate-right::before {
  content: "\\f01e"; }
.fa-arrow-right-rotate::before {
  content: "\\f01e"; }
.fa-arrow-rotate-forward::before {
  content: "\\f01e"; }
.fa-redo::before {
  content: "\\f01e"; }
.fa-arrow-trend-down::before {
  content: "\\e097"; }
.fa-arrow-trend-up::before {
  content: "\\e098"; }
.fa-arrow-turn-down::before {
  content: "\\f149"; }
.fa-level-down::before {
  content: "\\f149"; }
.fa-arrow-turn-up::before {
  content: "\\f148"; }
.fa-level-up::before {
  content: "\\f148"; }
.fa-arrow-up::before {
  content: "\\f062"; }
.fa-arrow-up-1-9::before {
  content: "\\f163"; }
.fa-sort-numeric-up::before {
  content: "\\f163"; }
.fa-arrow-up-9-1::before {
  content: "\\f887"; }
.fa-sort-numeric-up-alt::before {
  content: "\\f887"; }
.fa-arrow-up-a-z::before {
  content: "\\f15e"; }
.fa-sort-alpha-up::before {
  content: "\\f15e"; }
.fa-arrow-up-from-bracket::before {
  content: "\\e09a"; }
.fa-arrow-up-from-ground-water::before {
  content: "\\e4b5"; }
.fa-arrow-up-from-water-pump::before {
  content: "\\e4b6"; }
.fa-arrow-up-long::before {
  content: "\\f176"; }
.fa-long-arrow-up::before {
  content: "\\f176"; }
.fa-arrow-up-right-dots::before {
  content: "\\e4b7"; }
.fa-arrow-up-right-from-square::before {
  content: "\\f08e"; }
.fa-external-link::before {
  content: "\\f08e"; }
.fa-arrow-up-short-wide::before {
  content: "\\f885"; }
.fa-sort-amount-up-alt::before {
  content: "\\f885"; }
.fa-arrow-up-wide-short::before {
  content: "\\f161"; }
.fa-sort-amount-up::before {
  content: "\\f161"; }
.fa-arrow-up-z-a::before {
  content: "\\f882"; }
.fa-sort-alpha-up-alt::before {
  content: "\\f882"; }
.fa-arrows-down-to-line::before {
  content: "\\e4b8"; }
.fa-arrows-down-to-people::before {
  content: "\\e4b9"; }
.fa-arrows-left-right::before {
  content: "\\f07e"; }
.fa-arrows-h::before {
  content: "\\f07e"; }
.fa-arrows-left-right-to-line::before {
  content: "\\e4ba"; }
.fa-arrows-rotate::before {
  content: "\\f021"; }
.fa-refresh::before {
  content: "\\f021"; }
.fa-sync::before {
  content: "\\f021"; }
.fa-arrows-spin::before {
  content: "\\e4bb"; }
.fa-arrows-split-up-and-left::before {
  content: "\\e4bc"; }
.fa-arrows-to-circle::before {
  content: "\\e4bd"; }
.fa-arrows-to-dot::before {
  content: "\\e4be"; }
.fa-arrows-to-eye::before {
  content: "\\e4bf"; }
.fa-arrows-turn-right::before {
  content: "\\e4c0"; }
.fa-arrows-turn-to-dots::before {
  content: "\\e4c1"; }
.fa-arrows-up-down::before {
  content: "\\f07d"; }
.fa-arrows-v::before {
  content: "\\f07d"; }
.fa-arrows-up-down-left-right::before {
  content: "\\f047"; }
.fa-arrows::before {
  content: "\\f047"; }
.fa-arrows-up-to-line::before {
  content: "\\e4c2"; }
.fa-asterisk::before {
  content: "\\2a"; }
.fa-at::before {
  content: "\\40"; }
.fa-atom::before {
  content: "\\f5d2"; }
.fa-audio-description::before {
  content: "\\f29e"; }
.fa-austral-sign::before {
  content: "\\e0a9"; }
.fa-award::before {
  content: "\\f559"; }
.fa-b::before {
  content: "\\42"; }
.fa-baby::before {
  content: "\\f77c"; }
.fa-baby-carriage::before {
  content: "\\f77d"; }
.fa-carriage-baby::before {
  content: "\\f77d"; }
.fa-backward::before {
  content: "\\f04a"; }
.fa-backward-fast::before {
  content: "\\f049"; }
.fa-fast-backward::before {
  content: "\\f049"; }
.fa-backward-step::before {
  content: "\\f048"; }
.fa-step-backward::before {
  content: "\\f048"; }
.fa-bacon::before {
  content: "\\f7e5"; }
.fa-bacteria::before {
  content: "\\e059"; }
.fa-bacterium::before {
  content: "\\e05a"; }
.fa-bag-shopping::before {
  content: "\\f290"; }
.fa-shopping-bag::before {
  content: "\\f290"; }
.fa-bahai::before {
  content: "\\f666"; }
.fa-baht-sign::before {
  content: "\\e0ac"; }
.fa-ban::before {
  content: "\\f05e"; }
.fa-cancel::before {
  content: "\\f05e"; }
.fa-ban-smoking::before {
  content: "\\f54d"; }
.fa-smoking-ban::before {
  content: "\\f54d"; }
.fa-bandage::before {
  content: "\\f462"; }
.fa-band-aid::before {
  content: "\\f462"; }
.fa-barcode::before {
  content: "\\f02a"; }
.fa-bars::before {
  content: "\\f0c9"; }
.fa-navicon::before {
  content: "\\f0c9"; }
.fa-bars-progress::before {
  content: "\\f828"; }
.fa-tasks-alt::before {
  content: "\\f828"; }
.fa-bars-staggered::before {
  content: "\\f550"; }
.fa-reorder::before {
  content: "\\f550"; }
.fa-stream::before {
  content: "\\f550"; }
.fa-baseball::before {
  content: "\\f433"; }
.fa-baseball-ball::before {
  content: "\\f433"; }
.fa-baseball-bat-ball::before {
  content: "\\f432"; }
.fa-basket-shopping::before {
  content: "\\f291"; }
.fa-shopping-basket::before {
  content: "\\f291"; }
.fa-basketball::before {
  content: "\\f434"; }
.fa-basketball-ball::before {
  content: "\\f434"; }
.fa-bath::before {
  content: "\\f2cd"; }
.fa-bathtub::before {
  content: "\\f2cd"; }
.fa-battery-empty::before {
  content: "\\f244"; }
.fa-battery-0::before {
  content: "\\f244"; }
.fa-battery-full::before {
  content: "\\f240"; }
.fa-battery::before {
  content: "\\f240"; }
.fa-battery-5::before {
  content: "\\f240"; }
.fa-battery-half::before {
  content: "\\f242"; }
.fa-battery-3::before {
  content: "\\f242"; }
.fa-battery-quarter::before {
  content: "\\f243"; }
.fa-battery-2::before {
  content: "\\f243"; }
.fa-battery-three-quarters::before {
  content: "\\f241"; }
.fa-battery-4::before {
  content: "\\f241"; }
.fa-bed::before {
  content: "\\f236"; }
.fa-bed-pulse::before {
  content: "\\f487"; }
.fa-procedures::before {
  content: "\\f487"; }
.fa-beer-mug-empty::before {
  content: "\\f0fc"; }
.fa-beer::before {
  content: "\\f0fc"; }
.fa-bell::before {
  content: "\\f0f3"; }
.fa-bell-concierge::before {
  content: "\\f562"; }
.fa-concierge-bell::before {
  content: "\\f562"; }
.fa-bell-slash::before {
  content: "\\f1f6"; }
.fa-bezier-curve::before {
  content: "\\f55b"; }
.fa-bicycle::before {
  content: "\\f206"; }
.fa-binoculars::before {
  content: "\\f1e5"; }
.fa-biohazard::before {
  content: "\\f780"; }
.fa-bitcoin-sign::before {
  content: "\\e0b4"; }
.fa-blender::before {
  content: "\\f517"; }
.fa-blender-phone::before {
  content: "\\f6b6"; }
.fa-blog::before {
  content: "\\f781"; }
.fa-bold::before {
  content: "\\f032"; }
.fa-bolt::before {
  content: "\\f0e7"; }
.fa-zap::before {
  content: "\\f0e7"; }
.fa-bolt-lightning::before {
  content: "\\e0b7"; }
.fa-bomb::before {
  content: "\\f1e2"; }
.fa-bone::before {
  content: "\\f5d7"; }
.fa-bong::before {
  content: "\\f55c"; }
.fa-book::before {
  content: "\\f02d"; }
.fa-book-atlas::before {
  content: "\\f558"; }
.fa-atlas::before {
  content: "\\f558"; }
.fa-book-bible::before {
  content: "\\f647"; }
.fa-bible::before {
  content: "\\f647"; }
.fa-book-bookmark::before {
  content: "\\e0bb"; }
.fa-book-journal-whills::before {
  content: "\\f66a"; }
.fa-journal-whills::before {
  content: "\\f66a"; }
.fa-book-medical::before {
  content: "\\f7e6"; }
.fa-book-open::before {
  content: "\\f518"; }
.fa-book-open-reader::before {
  content: "\\f5da"; }
.fa-book-reader::before {
  content: "\\f5da"; }
.fa-book-quran::before {
  content: "\\f687"; }
.fa-quran::before {
  content: "\\f687"; }
.fa-book-skull::before {
  content: "\\f6b7"; }
.fa-book-dead::before {
  content: "\\f6b7"; }
.fa-bookmark::before {
  content: "\\f02e"; }
.fa-border-all::before {
  content: "\\f84c"; }
.fa-border-none::before {
  content: "\\f850"; }
.fa-border-top-left::before {
  content: "\\f853"; }
.fa-border-style::before {
  content: "\\f853"; }
.fa-bore-hole::before {
  content: "\\e4c3"; }
.fa-bottle-droplet::before {
  content: "\\e4c4"; }
.fa-bottle-water::before {
  content: "\\e4c5"; }
.fa-bowl-food::before {
  content: "\\e4c6"; }
.fa-bowl-rice::before {
  content: "\\e2eb"; }
.fa-bowling-ball::before {
  content: "\\f436"; }
.fa-box::before {
  content: "\\f466"; }
.fa-box-archive::before {
  content: "\\f187"; }
.fa-archive::before {
  content: "\\f187"; }
.fa-box-open::before {
  content: "\\f49e"; }
.fa-box-tissue::before {
  content: "\\e05b"; }
.fa-boxes-packing::before {
  content: "\\e4c7"; }
.fa-boxes-stacked::before {
  content: "\\f468"; }
.fa-boxes::before {
  content: "\\f468"; }
.fa-boxes-alt::before {
  content: "\\f468"; }
.fa-braille::before {
  content: "\\f2a1"; }
.fa-brain::before {
  content: "\\f5dc"; }
.fa-brazilian-real-sign::before {
  content: "\\e46c"; }
.fa-bread-slice::before {
  content: "\\f7ec"; }
.fa-bridge::before {
  content: "\\e4c8"; }
.fa-bridge-circle-check::before {
  content: "\\e4c9"; }
.fa-bridge-circle-exclamation::before {
  content: "\\e4ca"; }
.fa-bridge-circle-xmark::before {
  content: "\\e4cb"; }
.fa-bridge-lock::before {
  content: "\\e4cc"; }
.fa-bridge-water::before {
  content: "\\e4ce"; }
.fa-briefcase::before {
  content: "\\f0b1"; }
.fa-briefcase-medical::before {
  content: "\\f469"; }
.fa-broom::before {
  content: "\\f51a"; }
.fa-broom-ball::before {
  content: "\\f458"; }
.fa-quidditch::before {
  content: "\\f458"; }
.fa-quidditch-broom-ball::before {
  content: "\\f458"; }
.fa-brush::before {
  content: "\\f55d"; }
.fa-bucket::before {
  content: "\\e4cf"; }
.fa-bug::before {
  content: "\\f188"; }
.fa-bug-slash::before {
  content: "\\e490"; }
.fa-bugs::before {
  content: "\\e4d0"; }
.fa-building::before {
  content: "\\f1ad"; }
.fa-building-circle-arrow-right::before {
  content: "\\e4d1"; }
.fa-building-circle-check::before {
  content: "\\e4d2"; }
.fa-building-circle-exclamation::before {
  content: "\\e4d3"; }
.fa-building-circle-xmark::before {
  content: "\\e4d4"; }
.fa-building-columns::before {
  content: "\\f19c"; }
.fa-bank::before {
  content: "\\f19c"; }
.fa-institution::before {
  content: "\\f19c"; }
.fa-museum::before {
  content: "\\f19c"; }
.fa-university::before {
  content: "\\f19c"; }
.fa-building-flag::before {
  content: "\\e4d5"; }
.fa-building-lock::before {
  content: "\\e4d6"; }
.fa-building-ngo::before {
  content: "\\e4d7"; }
.fa-building-shield::before {
  content: "\\e4d8"; }
.fa-building-un::before {
  content: "\\e4d9"; }
.fa-building-user::before {
  content: "\\e4da"; }
.fa-building-wheat::before {
  content: "\\e4db"; }
.fa-bullhorn::before {
  content: "\\f0a1"; }
.fa-bullseye::before {
  content: "\\f140"; }
.fa-burger::before {
  content: "\\f805"; }
.fa-hamburger::before {
  content: "\\f805"; }
.fa-burst::before {
  content: "\\e4dc"; }
.fa-bus::before {
  content: "\\f207"; }
.fa-bus-simple::before {
  content: "\\f55e"; }
.fa-bus-alt::before {
  content: "\\f55e"; }
.fa-business-time::before {
  content: "\\f64a"; }
.fa-briefcase-clock::before {
  content: "\\f64a"; }
.fa-c::before {
  content: "\\43"; }
.fa-cake-candles::before {
  content: "\\f1fd"; }
.fa-birthday-cake::before {
  content: "\\f1fd"; }
.fa-cake::before {
  content: "\\f1fd"; }
.fa-calculator::before {
  content: "\\f1ec"; }
.fa-calendar::before {
  content: "\\f133"; }
.fa-calendar-check::before {
  content: "\\f274"; }
.fa-calendar-day::before {
  content: "\\f783"; }
.fa-calendar-days::before {
  content: "\\f073"; }
.fa-calendar-alt::before {
  content: "\\f073"; }
.fa-calendar-minus::before {
  content: "\\f272"; }
.fa-calendar-plus::before {
  content: "\\f271"; }
.fa-calendar-week::before {
  content: "\\f784"; }
.fa-calendar-xmark::before {
  content: "\\f273"; }
.fa-calendar-times::before {
  content: "\\f273"; }
.fa-camera::before {
  content: "\\f030"; }
.fa-camera-alt::before {
  content: "\\f030"; }
.fa-camera-retro::before {
  content: "\\f083"; }
.fa-camera-rotate::before {
  content: "\\e0d8"; }
.fa-campground::before {
  content: "\\f6bb"; }
.fa-candy-cane::before {
  content: "\\f786"; }
.fa-cannabis::before {
  content: "\\f55f"; }
.fa-capsules::before {
  content: "\\f46b"; }
.fa-car::before {
  content: "\\f1b9"; }
.fa-automobile::before {
  content: "\\f1b9"; }
.fa-car-battery::before {
  content: "\\f5df"; }
.fa-battery-car::before {
  content: "\\f5df"; }
.fa-car-burst::before {
  content: "\\f5e1"; }
.fa-car-crash::before {
  content: "\\f5e1"; }
.fa-car-on::before {
  content: "\\e4dd"; }
.fa-car-rear::before {
  content: "\\f5de"; }
.fa-car-alt::before {
  content: "\\f5de"; }
.fa-car-side::before {
  content: "\\f5e4"; }
.fa-car-tunnel::before {
  content: "\\e4de"; }
.fa-caravan::before {
  content: "\\f8ff"; }
.fa-caret-down::before {
  content: "\\f0d7"; }
.fa-caret-left::before {
  content: "\\f0d9"; }
.fa-caret-right::before {
  content: "\\f0da"; }
.fa-caret-up::before {
  content: "\\f0d8"; }
.fa-carrot::before {
  content: "\\f787"; }
.fa-cart-arrow-down::before {
  content: "\\f218"; }
.fa-cart-flatbed::before {
  content: "\\f474"; }
.fa-dolly-flatbed::before {
  content: "\\f474"; }
.fa-cart-flatbed-suitcase::before {
  content: "\\f59d"; }
.fa-luggage-cart::before {
  content: "\\f59d"; }
.fa-cart-plus::before {
  content: "\\f217"; }
.fa-cart-shopping::before {
  content: "\\f07a"; }
.fa-shopping-cart::before {
  content: "\\f07a"; }
.fa-cash-register::before {
  content: "\\f788"; }
.fa-cat::before {
  content: "\\f6be"; }
.fa-cedi-sign::before {
  content: "\\e0df"; }
.fa-cent-sign::before {
  content: "\\e3f5"; }
.fa-certificate::before {
  content: "\\f0a3"; }
.fa-chair::before {
  content: "\\f6c0"; }
.fa-chalkboard::before {
  content: "\\f51b"; }
.fa-blackboard::before {
  content: "\\f51b"; }
.fa-chalkboard-user::before {
  content: "\\f51c"; }
.fa-chalkboard-teacher::before {
  content: "\\f51c"; }
.fa-champagne-glasses::before {
  content: "\\f79f"; }
.fa-glass-cheers::before {
  content: "\\f79f"; }
.fa-charging-station::before {
  content: "\\f5e7"; }
.fa-chart-area::before {
  content: "\\f1fe"; }
.fa-area-chart::before {
  content: "\\f1fe"; }
.fa-chart-bar::before {
  content: "\\f080"; }
.fa-bar-chart::before {
  content: "\\f080"; }
.fa-chart-column::before {
  content: "\\e0e3"; }
.fa-chart-gantt::before {
  content: "\\e0e4"; }
.fa-chart-line::before {
  content: "\\f201"; }
.fa-line-chart::before {
  content: "\\f201"; }
.fa-chart-pie::before {
  content: "\\f200"; }
.fa-pie-chart::before {
  content: "\\f200"; }
.fa-chart-simple::before {
  content: "\\e473"; }
.fa-check::before {
  content: "\\f00c"; }
.fa-check-double::before {
  content: "\\f560"; }
.fa-check-to-slot::before {
  content: "\\f772"; }
.fa-vote-yea::before {
  content: "\\f772"; }
.fa-cheese::before {
  content: "\\f7ef"; }
.fa-chess::before {
  content: "\\f439"; }
.fa-chess-bishop::before {
  content: "\\f43a"; }
.fa-chess-board::before {
  content: "\\f43c"; }
.fa-chess-king::before {
  content: "\\f43f"; }
.fa-chess-knight::before {
  content: "\\f441"; }
.fa-chess-pawn::before {
  content: "\\f443"; }
.fa-chess-queen::before {
  content: "\\f445"; }
.fa-chess-rook::before {
  content: "\\f447"; }
.fa-chevron-down::before {
  content: "\\f078"; }
.fa-chevron-left::before {
  content: "\\f053"; }
.fa-chevron-right::before {
  content: "\\f054"; }
.fa-chevron-up::before {
  content: "\\f077"; }
.fa-child::before {
  content: "\\f1ae"; }
.fa-child-dress::before {
  content: "\\e59c"; }
.fa-child-reaching::before {
  content: "\\e59d"; }
.fa-child-rifle::before {
  content: "\\e4e0"; }
.fa-children::before {
  content: "\\e4e1"; }
.fa-church::before {
  content: "\\f51d"; }
.fa-circle::before {
  content: "\\f111"; }
.fa-circle-arrow-down::before {
  content: "\\f0ab"; }
.fa-arrow-circle-down::before {
  content: "\\f0ab"; }
.fa-circle-arrow-left::before {
  content: "\\f0a8"; }
.fa-arrow-circle-left::before {
  content: "\\f0a8"; }
.fa-circle-arrow-right::before {
  content: "\\f0a9"; }
.fa-arrow-circle-right::before {
  content: "\\f0a9"; }
.fa-circle-arrow-up::before {
  content: "\\f0aa"; }
.fa-arrow-circle-up::before {
  content: "\\f0aa"; }
.fa-circle-check::before {
  content: "\\f058"; }
.fa-check-circle::before {
  content: "\\f058"; }
.fa-circle-chevron-down::before {
  content: "\\f13a"; }
.fa-chevron-circle-down::before {
  content: "\\f13a"; }
.fa-circle-chevron-left::before {
  content: "\\f137"; }
.fa-chevron-circle-left::before {
  content: "\\f137"; }
.fa-circle-chevron-right::before {
  content: "\\f138"; }
.fa-chevron-circle-right::before {
  content: "\\f138"; }
.fa-circle-chevron-up::before {
  content: "\\f139"; }
.fa-chevron-circle-up::before {
  content: "\\f139"; }
.fa-circle-dollar-to-slot::before {
  content: "\\f4b9"; }
.fa-donate::before {
  content: "\\f4b9"; }
.fa-circle-dot::before {
  content: "\\f192"; }
.fa-dot-circle::before {
  content: "\\f192"; }
.fa-circle-down::before {
  content: "\\f358"; }
.fa-arrow-alt-circle-down::before {
  content: "\\f358"; }
.fa-circle-exclamation::before {
  content: "\\f06a"; }
.fa-exclamation-circle::before {
  content: "\\f06a"; }
.fa-circle-h::before {
  content: "\\f47e"; }
.fa-hospital-symbol::before {
  content: "\\f47e"; }
.fa-circle-half-stroke::before {
  content: "\\f042"; }
.fa-adjust::before {
  content: "\\f042"; }
.fa-circle-info::before {
  content: "\\f05a"; }
.fa-info-circle::before {
  content: "\\f05a"; }
.fa-circle-left::before {
  content: "\\f359"; }
.fa-arrow-alt-circle-left::before {
  content: "\\f359"; }
.fa-circle-minus::before {
  content: "\\f056"; }
.fa-minus-circle::before {
  content: "\\f056"; }
.fa-circle-nodes::before {
  content: "\\e4e2"; }
.fa-circle-notch::before {
  content: "\\f1ce"; }
.fa-circle-pause::before {
  content: "\\f28b"; }
.fa-pause-circle::before {
  content: "\\f28b"; }
.fa-circle-play::before {
  content: "\\f144"; }
.fa-play-circle::before {
  content: "\\f144"; }
.fa-circle-plus::before {
  content: "\\f055"; }
.fa-plus-circle::before {
  content: "\\f055"; }
.fa-circle-question::before {
  content: "\\f059"; }
.fa-question-circle::before {
  content: "\\f059"; }
.fa-circle-radiation::before {
  content: "\\f7ba"; }
.fa-radiation-alt::before {
  content: "\\f7ba"; }
.fa-circle-right::before {
  content: "\\f35a"; }
.fa-arrow-alt-circle-right::before {
  content: "\\f35a"; }
.fa-circle-stop::before {
  content: "\\f28d"; }
.fa-stop-circle::before {
  content: "\\f28d"; }
.fa-circle-up::before {
  content: "\\f35b"; }
.fa-arrow-alt-circle-up::before {
  content: "\\f35b"; }
.fa-circle-user::before {
  content: "\\f2bd"; }
.fa-user-circle::before {
  content: "\\f2bd"; }
.fa-circle-xmark::before {
  content: "\\f057"; }
.fa-times-circle::before {
  content: "\\f057"; }
.fa-xmark-circle::before {
  content: "\\f057"; }
.fa-city::before {
  content: "\\f64f"; }
.fa-clapperboard::before {
  content: "\\e131"; }
.fa-clipboard::before {
  content: "\\f328"; }
.fa-clipboard-check::before {
  content: "\\f46c"; }
.fa-clipboard-list::before {
  content: "\\f46d"; }
.fa-clipboard-question::before {
  content: "\\e4e3"; }
.fa-clipboard-user::before {
  content: "\\f7f3"; }
.fa-clock::before {
  content: "\\f017"; }
.fa-clock-four::before {
  content: "\\f017"; }
.fa-clock-rotate-left::before {
  content: "\\f1da"; }
.fa-history::before {
  content: "\\f1da"; }
.fa-clone::before {
  content: "\\f24d"; }
.fa-closed-captioning::before {
  content: "\\f20a"; }
.fa-cloud::before {
  content: "\\f0c2"; }
.fa-cloud-arrow-down::before {
  content: "\\f0ed"; }
.fa-cloud-download::before {
  content: "\\f0ed"; }
.fa-cloud-download-alt::before {
  content: "\\f0ed"; }
.fa-cloud-arrow-up::before {
  content: "\\f0ee"; }
.fa-cloud-upload::before {
  content: "\\f0ee"; }
.fa-cloud-upload-alt::before {
  content: "\\f0ee"; }
.fa-cloud-bolt::before {
  content: "\\f76c"; }
.fa-thunderstorm::before {
  content: "\\f76c"; }
.fa-cloud-meatball::before {
  content: "\\f73b"; }
.fa-cloud-moon::before {
  content: "\\f6c3"; }
.fa-cloud-moon-rain::before {
  content: "\\f73c"; }
.fa-cloud-rain::before {
  content: "\\f73d"; }
.fa-cloud-showers-heavy::before {
  content: "\\f740"; }
.fa-cloud-showers-water::before {
  content: "\\e4e4"; }
.fa-cloud-sun::before {
  content: "\\f6c4"; }
.fa-cloud-sun-rain::before {
  content: "\\f743"; }
.fa-clover::before {
  content: "\\e139"; }
.fa-code::before {
  content: "\\f121"; }
.fa-code-branch::before {
  content: "\\f126"; }
.fa-code-commit::before {
  content: "\\f386"; }
.fa-code-compare::before {
  content: "\\e13a"; }
.fa-code-fork::before {
  content: "\\e13b"; }
.fa-code-merge::before {
  content: "\\f387"; }
.fa-code-pull-request::before {
  content: "\\e13c"; }
.fa-coins::before {
  content: "\\f51e"; }
.fa-colon-sign::before {
  content: "\\e140"; }
.fa-comment::before {
  content: "\\f075"; }
.fa-comment-dollar::before {
  content: "\\f651"; }
.fa-comment-dots::before {
  content: "\\f4ad"; }
.fa-commenting::before {
  content: "\\f4ad"; }
.fa-comment-medical::before {
  content: "\\f7f5"; }
.fa-comment-slash::before {
  content: "\\f4b3"; }
.fa-comment-sms::before {
  content: "\\f7cd"; }
.fa-sms::before {
  content: "\\f7cd"; }
.fa-comments::before {
  content: "\\f086"; }
.fa-comments-dollar::before {
  content: "\\f653"; }
.fa-compact-disc::before {
  content: "\\f51f"; }
.fa-compass::before {
  content: "\\f14e"; }
.fa-compass-drafting::before {
  content: "\\f568"; }
.fa-drafting-compass::before {
  content: "\\f568"; }
.fa-compress::before {
  content: "\\f066"; }
.fa-computer::before {
  content: "\\e4e5"; }
.fa-computer-mouse::before {
  content: "\\f8cc"; }
.fa-mouse::before {
  content: "\\f8cc"; }
.fa-cookie::before {
  content: "\\f563"; }
.fa-cookie-bite::before {
  content: "\\f564"; }
.fa-copy::before {
  content: "\\f0c5"; }
.fa-copyright::before {
  content: "\\f1f9"; }
.fa-couch::before {
  content: "\\f4b8"; }
.fa-cow::before {
  content: "\\f6c8"; }
.fa-credit-card::before {
  content: "\\f09d"; }
.fa-credit-card-alt::before {
  content: "\\f09d"; }
.fa-crop::before {
  content: "\\f125"; }
.fa-crop-simple::before {
  content: "\\f565"; }
.fa-crop-alt::before {
  content: "\\f565"; }
.fa-cross::before {
  content: "\\f654"; }
.fa-crosshairs::before {
  content: "\\f05b"; }
.fa-crow::before {
  content: "\\f520"; }
.fa-crown::before {
  content: "\\f521"; }
.fa-crutch::before {
  content: "\\f7f7"; }
.fa-cruzeiro-sign::before {
  content: "\\e152"; }
.fa-cube::before {
  content: "\\f1b2"; }
.fa-cubes::before {
  content: "\\f1b3"; }
.fa-cubes-stacked::before {
  content: "\\e4e6"; }
.fa-d::before {
  content: "\\44"; }
.fa-database::before {
  content: "\\f1c0"; }
.fa-delete-left::before {
  content: "\\f55a"; }
.fa-backspace::before {
  content: "\\f55a"; }
.fa-democrat::before {
  content: "\\f747"; }
.fa-desktop::before {
  content: "\\f390"; }
.fa-desktop-alt::before {
  content: "\\f390"; }
.fa-dharmachakra::before {
  content: "\\f655"; }
.fa-diagram-next::before {
  content: "\\e476"; }
.fa-diagram-predecessor::before {
  content: "\\e477"; }
.fa-diagram-project::before {
  content: "\\f542"; }
.fa-project-diagram::before {
  content: "\\f542"; }
.fa-diagram-successor::before {
  content: "\\e47a"; }
.fa-diamond::before {
  content: "\\f219"; }
.fa-diamond-turn-right::before {
  content: "\\f5eb"; }
.fa-directions::before {
  content: "\\f5eb"; }
.fa-dice::before {
  content: "\\f522"; }
.fa-dice-d20::before {
  content: "\\f6cf"; }
.fa-dice-d6::before {
  content: "\\f6d1"; }
.fa-dice-five::before {
  content: "\\f523"; }
.fa-dice-four::before {
  content: "\\f524"; }
.fa-dice-one::before {
  content: "\\f525"; }
.fa-dice-six::before {
  content: "\\f526"; }
.fa-dice-three::before {
  content: "\\f527"; }
.fa-dice-two::before {
  content: "\\f528"; }
.fa-disease::before {
  content: "\\f7fa"; }
.fa-display::before {
  content: "\\e163"; }
.fa-divide::before {
  content: "\\f529"; }
.fa-dna::before {
  content: "\\f471"; }
.fa-dog::before {
  content: "\\f6d3"; }
.fa-dollar-sign::before {
  content: "\\24"; }
.fa-dollar::before {
  content: "\\24"; }
.fa-usd::before {
  content: "\\24"; }
.fa-dolly::before {
  content: "\\f472"; }
.fa-dolly-box::before {
  content: "\\f472"; }
.fa-dong-sign::before {
  content: "\\e169"; }
.fa-door-closed::before {
  content: "\\f52a"; }
.fa-door-open::before {
  content: "\\f52b"; }
.fa-dove::before {
  content: "\\f4ba"; }
.fa-down-left-and-up-right-to-center::before {
  content: "\\f422"; }
.fa-compress-alt::before {
  content: "\\f422"; }
.fa-down-long::before {
  content: "\\f309"; }
.fa-long-arrow-alt-down::before {
  content: "\\f309"; }
.fa-download::before {
  content: "\\f019"; }
.fa-dragon::before {
  content: "\\f6d5"; }
.fa-draw-polygon::before {
  content: "\\f5ee"; }
.fa-droplet::before {
  content: "\\f043"; }
.fa-tint::before {
  content: "\\f043"; }
.fa-droplet-slash::before {
  content: "\\f5c7"; }
.fa-tint-slash::before {
  content: "\\f5c7"; }
.fa-drum::before {
  content: "\\f569"; }
.fa-drum-steelpan::before {
  content: "\\f56a"; }
.fa-drumstick-bite::before {
  content: "\\f6d7"; }
.fa-dumbbell::before {
  content: "\\f44b"; }
.fa-dumpster::before {
  content: "\\f793"; }
.fa-dumpster-fire::before {
  content: "\\f794"; }
.fa-dungeon::before {
  content: "\\f6d9"; }
.fa-e::before {
  content: "\\45"; }
.fa-ear-deaf::before {
  content: "\\f2a4"; }
.fa-deaf::before {
  content: "\\f2a4"; }
.fa-deafness::before {
  content: "\\f2a4"; }
.fa-hard-of-hearing::before {
  content: "\\f2a4"; }
.fa-ear-listen::before {
  content: "\\f2a2"; }
.fa-assistive-listening-systems::before {
  content: "\\f2a2"; }
.fa-earth-africa::before {
  content: "\\f57c"; }
.fa-globe-africa::before {
  content: "\\f57c"; }
.fa-earth-americas::before {
  content: "\\f57d"; }
.fa-earth::before {
  content: "\\f57d"; }
.fa-earth-america::before {
  content: "\\f57d"; }
.fa-globe-americas::before {
  content: "\\f57d"; }
.fa-earth-asia::before {
  content: "\\f57e"; }
.fa-globe-asia::before {
  content: "\\f57e"; }
.fa-earth-europe::before {
  content: "\\f7a2"; }
.fa-globe-europe::before {
  content: "\\f7a2"; }
.fa-earth-oceania::before {
  content: "\\e47b"; }
.fa-globe-oceania::before {
  content: "\\e47b"; }
.fa-egg::before {
  content: "\\f7fb"; }
.fa-eject::before {
  content: "\\f052"; }
.fa-elevator::before {
  content: "\\e16d"; }
.fa-ellipsis::before {
  content: "\\f141"; }
.fa-ellipsis-h::before {
  content: "\\f141"; }
.fa-ellipsis-vertical::before {
  content: "\\f142"; }
.fa-ellipsis-v::before {
  content: "\\f142"; }
.fa-envelope::before {
  content: "\\f0e0"; }
.fa-envelope-circle-check::before {
  content: "\\e4e8"; }
.fa-envelope-open::before {
  content: "\\f2b6"; }
.fa-envelope-open-text::before {
  content: "\\f658"; }
.fa-envelopes-bulk::before {
  content: "\\f674"; }
.fa-mail-bulk::before {
  content: "\\f674"; }
.fa-equals::before {
  content: "\\3d"; }
.fa-eraser::before {
  content: "\\f12d"; }
.fa-ethernet::before {
  content: "\\f796"; }
.fa-euro-sign::before {
  content: "\\f153"; }
.fa-eur::before {
  content: "\\f153"; }
.fa-euro::before {
  content: "\\f153"; }
.fa-exclamation::before {
  content: "\\21"; }
.fa-expand::before {
  content: "\\f065"; }
.fa-explosion::before {
  content: "\\e4e9"; }
.fa-eye::before {
  content: "\\f06e"; }
.fa-eye-dropper::before {
  content: "\\f1fb"; }
.fa-eye-dropper-empty::before {
  content: "\\f1fb"; }
.fa-eyedropper::before {
  content: "\\f1fb"; }
.fa-eye-low-vision::before {
  content: "\\f2a8"; }
.fa-low-vision::before {
  content: "\\f2a8"; }
.fa-eye-slash::before {
  content: "\\f070"; }
.fa-f::before {
  content: "\\46"; }
.fa-face-angry::before {
  content: "\\f556"; }
.fa-angry::before {
  content: "\\f556"; }
.fa-face-dizzy::before {
  content: "\\f567"; }
.fa-dizzy::before {
  content: "\\f567"; }
.fa-face-flushed::before {
  content: "\\f579"; }
.fa-flushed::before {
  content: "\\f579"; }
.fa-face-frown::before {
  content: "\\f119"; }
.fa-frown::before {
  content: "\\f119"; }
.fa-face-frown-open::before {
  content: "\\f57a"; }
.fa-frown-open::before {
  content: "\\f57a"; }
.fa-face-grimace::before {
  content: "\\f57f"; }
.fa-grimace::before {
  content: "\\f57f"; }
.fa-face-grin::before {
  content: "\\f580"; }
.fa-grin::before {
  content: "\\f580"; }
.fa-face-grin-beam::before {
  content: "\\f582"; }
.fa-grin-beam::before {
  content: "\\f582"; }
.fa-face-grin-beam-sweat::before {
  content: "\\f583"; }
.fa-grin-beam-sweat::before {
  content: "\\f583"; }
.fa-face-grin-hearts::before {
  content: "\\f584"; }
.fa-grin-hearts::before {
  content: "\\f584"; }
.fa-face-grin-squint::before {
  content: "\\f585"; }
.fa-grin-squint::before {
  content: "\\f585"; }
.fa-face-grin-squint-tears::before {
  content: "\\f586"; }
.fa-grin-squint-tears::before {
  content: "\\f586"; }
.fa-face-grin-stars::before {
  content: "\\f587"; }
.fa-grin-stars::before {
  content: "\\f587"; }
.fa-face-grin-tears::before {
  content: "\\f588"; }
.fa-grin-tears::before {
  content: "\\f588"; }
.fa-face-grin-tongue::before {
  content: "\\f589"; }
.fa-grin-tongue::before {
  content: "\\f589"; }
.fa-face-grin-tongue-squint::before {
  content: "\\f58a"; }
.fa-grin-tongue-squint::before {
  content: "\\f58a"; }
.fa-face-grin-tongue-wink::before {
  content: "\\f58b"; }
.fa-grin-tongue-wink::before {
  content: "\\f58b"; }
.fa-face-grin-wide::before {
  content: "\\f581"; }
.fa-grin-alt::before {
  content: "\\f581"; }
.fa-face-grin-wink::before {
  content: "\\f58c"; }
.fa-grin-wink::before {
  content: "\\f58c"; }
.fa-face-kiss::before {
  content: "\\f596"; }
.fa-kiss::before {
  content: "\\f596"; }
.fa-face-kiss-beam::before {
  content: "\\f597"; }
.fa-kiss-beam::before {
  content: "\\f597"; }
.fa-face-kiss-wink-heart::before {
  content: "\\f598"; }
.fa-kiss-wink-heart::before {
  content: "\\f598"; }
.fa-face-laugh::before {
  content: "\\f599"; }
.fa-laugh::before {
  content: "\\f599"; }
.fa-face-laugh-beam::before {
  content: "\\f59a"; }
.fa-laugh-beam::before {
  content: "\\f59a"; }
.fa-face-laugh-squint::before {
  content: "\\f59b"; }
.fa-laugh-squint::before {
  content: "\\f59b"; }
.fa-face-laugh-wink::before {
  content: "\\f59c"; }
.fa-laugh-wink::before {
  content: "\\f59c"; }
.fa-face-meh::before {
  content: "\\f11a"; }
.fa-meh::before {
  content: "\\f11a"; }
.fa-face-meh-blank::before {
  content: "\\f5a4"; }
.fa-meh-blank::before {
  content: "\\f5a4"; }
.fa-face-rolling-eyes::before {
  content: "\\f5a5"; }
.fa-meh-rolling-eyes::before {
  content: "\\f5a5"; }
.fa-face-sad-cry::before {
  content: "\\f5b3"; }
.fa-sad-cry::before {
  content: "\\f5b3"; }
.fa-face-sad-tear::before {
  content: "\\f5b4"; }
.fa-sad-tear::before {
  content: "\\f5b4"; }
.fa-face-smile::before {
  content: "\\f118"; }
.fa-smile::before {
  content: "\\f118"; }
.fa-face-smile-beam::before {
  content: "\\f5b8"; }
.fa-smile-beam::before {
  content: "\\f5b8"; }
.fa-face-smile-wink::before {
  content: "\\f4da"; }
.fa-smile-wink::before {
  content: "\\f4da"; }
.fa-face-surprise::before {
  content: "\\f5c2"; }
.fa-surprise::before {
  content: "\\f5c2"; }
.fa-face-tired::before {
  content: "\\f5c8"; }
.fa-tired::before {
  content: "\\f5c8"; }
.fa-fan::before {
  content: "\\f863"; }
.fa-faucet::before {
  content: "\\e005"; }
.fa-faucet-drip::before {
  content: "\\e006"; }
.fa-fax::before {
  content: "\\f1ac"; }
.fa-feather::before {
  content: "\\f52d"; }
.fa-feather-pointed::before {
  content: "\\f56b"; }
.fa-feather-alt::before {
  content: "\\f56b"; }
.fa-ferry::before {
  content: "\\e4ea"; }
.fa-file::before {
  content: "\\f15b"; }
.fa-file-arrow-down::before {
  content: "\\f56d"; }
.fa-file-download::before {
  content: "\\f56d"; }
.fa-file-arrow-up::before {
  content: "\\f574"; }
.fa-file-upload::before {
  content: "\\f574"; }
.fa-file-audio::before {
  content: "\\f1c7"; }
.fa-file-circle-check::before {
  content: "\\e493"; }
.fa-file-circle-exclamation::before {
  content: "\\e4eb"; }
.fa-file-circle-minus::before {
  content: "\\e4ed"; }
.fa-file-circle-plus::before {
  content: "\\e4ee"; }
.fa-file-circle-question::before {
  content: "\\e4ef"; }
.fa-file-circle-xmark::before {
  content: "\\e494"; }
.fa-file-code::before {
  content: "\\f1c9"; }
.fa-file-contract::before {
  content: "\\f56c"; }
.fa-file-csv::before {
  content: "\\f6dd"; }
.fa-file-excel::before {
  content: "\\f1c3"; }
.fa-file-export::before {
  content: "\\f56e"; }
.fa-arrow-right-from-file::before {
  content: "\\f56e"; }
.fa-file-image::before {
  content: "\\f1c5"; }
.fa-file-import::before {
  content: "\\f56f"; }
.fa-arrow-right-to-file::before {
  content: "\\f56f"; }
.fa-file-invoice::before {
  content: "\\f570"; }
.fa-file-invoice-dollar::before {
  content: "\\f571"; }
.fa-file-lines::before {
  content: "\\f15c"; }
.fa-file-alt::before {
  content: "\\f15c"; }
.fa-file-text::before {
  content: "\\f15c"; }
.fa-file-medical::before {
  content: "\\f477"; }
.fa-file-pdf::before {
  content: "\\f1c1"; }
.fa-file-pen::before {
  content: "\\f31c"; }
.fa-file-edit::before {
  content: "\\f31c"; }
.fa-file-powerpoint::before {
  content: "\\f1c4"; }
.fa-file-prescription::before {
  content: "\\f572"; }
.fa-file-shield::before {
  content: "\\e4f0"; }
.fa-file-signature::before {
  content: "\\f573"; }
.fa-file-video::before {
  content: "\\f1c8"; }
.fa-file-waveform::before {
  content: "\\f478"; }
.fa-file-medical-alt::before {
  content: "\\f478"; }
.fa-file-word::before {
  content: "\\f1c2"; }
.fa-file-zipper::before {
  content: "\\f1c6"; }
.fa-file-archive::before {
  content: "\\f1c6"; }
.fa-fill::before {
  content: "\\f575"; }
.fa-fill-drip::before {
  content: "\\f576"; }
.fa-film::before {
  content: "\\f008"; }
.fa-filter::before {
  content: "\\f0b0"; }
.fa-filter-circle-dollar::before {
  content: "\\f662"; }
.fa-funnel-dollar::before {
  content: "\\f662"; }
.fa-filter-circle-xmark::before {
  content: "\\e17b"; }
.fa-fingerprint::before {
  content: "\\f577"; }
.fa-fire::before {
  content: "\\f06d"; }
.fa-fire-burner::before {
  content: "\\e4f1"; }
.fa-fire-extinguisher::before {
  content: "\\f134"; }
.fa-fire-flame-curved::before {
  content: "\\f7e4"; }
.fa-fire-alt::before {
  content: "\\f7e4"; }
.fa-fire-flame-simple::before {
  content: "\\f46a"; }
.fa-burn::before {
  content: "\\f46a"; }
.fa-fish::before {
  content: "\\f578"; }
.fa-fish-fins::before {
  content: "\\e4f2"; }
.fa-flag::before {
  content: "\\f024"; }
.fa-flag-checkered::before {
  content: "\\f11e"; }
.fa-flag-usa::before {
  content: "\\f74d"; }
.fa-flask::before {
  content: "\\f0c3"; }
.fa-flask-vial::before {
  content: "\\e4f3"; }
.fa-floppy-disk::before {
  content: "\\f0c7"; }
.fa-save::before {
  content: "\\f0c7"; }
.fa-florin-sign::before {
  content: "\\e184"; }
.fa-folder::before {
  content: "\\f07b"; }
.fa-folder-blank::before {
  content: "\\f07b"; }
.fa-folder-closed::before {
  content: "\\e185"; }
.fa-folder-minus::before {
  content: "\\f65d"; }
.fa-folder-open::before {
  content: "\\f07c"; }
.fa-folder-plus::before {
  content: "\\f65e"; }
.fa-folder-tree::before {
  content: "\\f802"; }
.fa-font::before {
  content: "\\f031"; }
.fa-football::before {
  content: "\\f44e"; }
.fa-football-ball::before {
  content: "\\f44e"; }
.fa-forward::before {
  content: "\\f04e"; }
.fa-forward-fast::before {
  content: "\\f050"; }
.fa-fast-forward::before {
  content: "\\f050"; }
.fa-forward-step::before {
  content: "\\f051"; }
.fa-step-forward::before {
  content: "\\f051"; }
.fa-franc-sign::before {
  content: "\\e18f"; }
.fa-frog::before {
  content: "\\f52e"; }
.fa-futbol::before {
  content: "\\f1e3"; }
.fa-futbol-ball::before {
  content: "\\f1e3"; }
.fa-soccer-ball::before {
  content: "\\f1e3"; }
.fa-g::before {
  content: "\\47"; }
.fa-gamepad::before {
  content: "\\f11b"; }
.fa-gas-pump::before {
  content: "\\f52f"; }
.fa-gauge::before {
  content: "\\f624"; }
.fa-dashboard::before {
  content: "\\f624"; }
.fa-gauge-med::before {
  content: "\\f624"; }
.fa-tachometer-alt-average::before {
  content: "\\f624"; }
.fa-gauge-high::before {
  content: "\\f625"; }
.fa-tachometer-alt::before {
  content: "\\f625"; }
.fa-tachometer-alt-fast::before {
  content: "\\f625"; }
.fa-gauge-simple::before {
  content: "\\f629"; }
.fa-gauge-simple-med::before {
  content: "\\f629"; }
.fa-tachometer-average::before {
  content: "\\f629"; }
.fa-gauge-simple-high::before {
  content: "\\f62a"; }
.fa-tachometer::before {
  content: "\\f62a"; }
.fa-tachometer-fast::before {
  content: "\\f62a"; }
.fa-gavel::before {
  content: "\\f0e3"; }
.fa-legal::before {
  content: "\\f0e3"; }
.fa-gear::before {
  content: "\\f013"; }
.fa-cog::before {
  content: "\\f013"; }
.fa-gears::before {
  content: "\\f085"; }
.fa-cogs::before {
  content: "\\f085"; }
.fa-gem::before {
  content: "\\f3a5"; }
.fa-genderless::before {
  content: "\\f22d"; }
.fa-ghost::before {
  content: "\\f6e2"; }
.fa-gift::before {
  content: "\\f06b"; }
.fa-gifts::before {
  content: "\\f79c"; }
.fa-glass-water::before {
  content: "\\e4f4"; }
.fa-glass-water-droplet::before {
  content: "\\e4f5"; }
.fa-glasses::before {
  content: "\\f530"; }
.fa-globe::before {
  content: "\\f0ac"; }
.fa-golf-ball-tee::before {
  content: "\\f450"; }
.fa-golf-ball::before {
  content: "\\f450"; }
.fa-gopuram::before {
  content: "\\f664"; }
.fa-graduation-cap::before {
  content: "\\f19d"; }
.fa-mortar-board::before {
  content: "\\f19d"; }
.fa-greater-than::before {
  content: "\\3e"; }
.fa-greater-than-equal::before {
  content: "\\f532"; }
.fa-grip::before {
  content: "\\f58d"; }
.fa-grip-horizontal::before {
  content: "\\f58d"; }
.fa-grip-lines::before {
  content: "\\f7a4"; }
.fa-grip-lines-vertical::before {
  content: "\\f7a5"; }
.fa-grip-vertical::before {
  content: "\\f58e"; }
.fa-group-arrows-rotate::before {
  content: "\\e4f6"; }
.fa-guarani-sign::before {
  content: "\\e19a"; }
.fa-guitar::before {
  content: "\\f7a6"; }
.fa-gun::before {
  content: "\\e19b"; }
.fa-h::before {
  content: "\\48"; }
.fa-hammer::before {
  content: "\\f6e3"; }
.fa-hamsa::before {
  content: "\\f665"; }
.fa-hand::before {
  content: "\\f256"; }
.fa-hand-paper::before {
  content: "\\f256"; }
.fa-hand-back-fist::before {
  content: "\\f255"; }
.fa-hand-rock::before {
  content: "\\f255"; }
.fa-hand-dots::before {
  content: "\\f461"; }
.fa-allergies::before {
  content: "\\f461"; }
.fa-hand-fist::before {
  content: "\\f6de"; }
.fa-fist-raised::before {
  content: "\\f6de"; }
.fa-hand-holding::before {
  content: "\\f4bd"; }
.fa-hand-holding-dollar::before {
  content: "\\f4c0"; }
.fa-hand-holding-usd::before {
  content: "\\f4c0"; }
.fa-hand-holding-droplet::before {
  content: "\\f4c1"; }
.fa-hand-holding-water::before {
  content: "\\f4c1"; }
.fa-hand-holding-hand::before {
  content: "\\e4f7"; }
.fa-hand-holding-heart::before {
  content: "\\f4be"; }
.fa-hand-holding-medical::before {
  content: "\\e05c"; }
.fa-hand-lizard::before {
  content: "\\f258"; }
.fa-hand-middle-finger::before {
  content: "\\f806"; }
.fa-hand-peace::before {
  content: "\\f25b"; }
.fa-hand-point-down::before {
  content: "\\f0a7"; }
.fa-hand-point-left::before {
  content: "\\f0a5"; }
.fa-hand-point-right::before {
  content: "\\f0a4"; }
.fa-hand-point-up::before {
  content: "\\f0a6"; }
.fa-hand-pointer::before {
  content: "\\f25a"; }
.fa-hand-scissors::before {
  content: "\\f257"; }
.fa-hand-sparkles::before {
  content: "\\e05d"; }
.fa-hand-spock::before {
  content: "\\f259"; }
.fa-handcuffs::before {
  content: "\\e4f8"; }
.fa-hands::before {
  content: "\\f2a7"; }
.fa-sign-language::before {
  content: "\\f2a7"; }
.fa-signing::before {
  content: "\\f2a7"; }
.fa-hands-asl-interpreting::before {
  content: "\\f2a3"; }
.fa-american-sign-language-interpreting::before {
  content: "\\f2a3"; }
.fa-asl-interpreting::before {
  content: "\\f2a3"; }
.fa-hands-american-sign-language-interpreting::before {
  content: "\\f2a3"; }
.fa-hands-bound::before {
  content: "\\e4f9"; }
.fa-hands-bubbles::before {
  content: "\\e05e"; }
.fa-hands-wash::before {
  content: "\\e05e"; }
.fa-hands-clapping::before {
  content: "\\e1a8"; }
.fa-hands-holding::before {
  content: "\\f4c2"; }
.fa-hands-holding-child::before {
  content: "\\e4fa"; }
.fa-hands-holding-circle::before {
  content: "\\e4fb"; }
.fa-hands-praying::before {
  content: "\\f684"; }
.fa-praying-hands::before {
  content: "\\f684"; }
.fa-handshake::before {
  content: "\\f2b5"; }
.fa-handshake-angle::before {
  content: "\\f4c4"; }
.fa-hands-helping::before {
  content: "\\f4c4"; }
.fa-handshake-simple::before {
  content: "\\f4c6"; }
.fa-handshake-alt::before {
  content: "\\f4c6"; }
.fa-handshake-simple-slash::before {
  content: "\\e05f"; }
.fa-handshake-alt-slash::before {
  content: "\\e05f"; }
.fa-handshake-slash::before {
  content: "\\e060"; }
.fa-hanukiah::before {
  content: "\\f6e6"; }
.fa-hard-drive::before {
  content: "\\f0a0"; }
.fa-hdd::before {
  content: "\\f0a0"; }
.fa-hashtag::before {
  content: "\\23"; }
.fa-hat-cowboy::before {
  content: "\\f8c0"; }
.fa-hat-cowboy-side::before {
  content: "\\f8c1"; }
.fa-hat-wizard::before {
  content: "\\f6e8"; }
.fa-head-side-cough::before {
  content: "\\e061"; }
.fa-head-side-cough-slash::before {
  content: "\\e062"; }
.fa-head-side-mask::before {
  content: "\\e063"; }
.fa-head-side-virus::before {
  content: "\\e064"; }
.fa-heading::before {
  content: "\\f1dc"; }
.fa-header::before {
  content: "\\f1dc"; }
.fa-headphones::before {
  content: "\\f025"; }
.fa-headphones-simple::before {
  content: "\\f58f"; }
.fa-headphones-alt::before {
  content: "\\f58f"; }
.fa-headset::before {
  content: "\\f590"; }
.fa-heart::before {
  content: "\\f004"; }
.fa-heart-circle-bolt::before {
  content: "\\e4fc"; }
.fa-heart-circle-check::before {
  content: "\\e4fd"; }
.fa-heart-circle-exclamation::before {
  content: "\\e4fe"; }
.fa-heart-circle-minus::before {
  content: "\\e4ff"; }
.fa-heart-circle-plus::before {
  content: "\\e500"; }
.fa-heart-circle-xmark::before {
  content: "\\e501"; }
.fa-heart-crack::before {
  content: "\\f7a9"; }
.fa-heart-broken::before {
  content: "\\f7a9"; }
.fa-heart-pulse::before {
  content: "\\f21e"; }
.fa-heartbeat::before {
  content: "\\f21e"; }
.fa-helicopter::before {
  content: "\\f533"; }
.fa-helicopter-symbol::before {
  content: "\\e502"; }
.fa-helmet-safety::before {
  content: "\\f807"; }
.fa-hard-hat::before {
  content: "\\f807"; }
.fa-hat-hard::before {
  content: "\\f807"; }
.fa-helmet-un::before {
  content: "\\e503"; }
.fa-highlighter::before {
  content: "\\f591"; }
.fa-hill-avalanche::before {
  content: "\\e507"; }
.fa-hill-rockslide::before {
  content: "\\e508"; }
.fa-hippo::before {
  content: "\\f6ed"; }
.fa-hockey-puck::before {
  content: "\\f453"; }
.fa-holly-berry::before {
  content: "\\f7aa"; }
.fa-horse::before {
  content: "\\f6f0"; }
.fa-horse-head::before {
  content: "\\f7ab"; }
.fa-hospital::before {
  content: "\\f0f8"; }
.fa-hospital-alt::before {
  content: "\\f0f8"; }
.fa-hospital-wide::before {
  content: "\\f0f8"; }
.fa-hospital-user::before {
  content: "\\f80d"; }
.fa-hot-tub-person::before {
  content: "\\f593"; }
.fa-hot-tub::before {
  content: "\\f593"; }
.fa-hotdog::before {
  content: "\\f80f"; }
.fa-hotel::before {
  content: "\\f594"; }
.fa-hourglass::before {
  content: "\\f254"; }
.fa-hourglass-2::before {
  content: "\\f254"; }
.fa-hourglass-half::before {
  content: "\\f254"; }
.fa-hourglass-empty::before {
  content: "\\f252"; }
.fa-hourglass-end::before {
  content: "\\f253"; }
.fa-hourglass-3::before {
  content: "\\f253"; }
.fa-hourglass-start::before {
  content: "\\f251"; }
.fa-hourglass-1::before {
  content: "\\f251"; }
.fa-house::before {
  content: "\\f015"; }
.fa-home::before {
  content: "\\f015"; }
.fa-home-alt::before {
  content: "\\f015"; }
.fa-home-lg-alt::before {
  content: "\\f015"; }
.fa-house-chimney::before {
  content: "\\e3af"; }
.fa-home-lg::before {
  content: "\\e3af"; }
.fa-house-chimney-crack::before {
  content: "\\f6f1"; }
.fa-house-damage::before {
  content: "\\f6f1"; }
.fa-house-chimney-medical::before {
  content: "\\f7f2"; }
.fa-clinic-medical::before {
  content: "\\f7f2"; }
.fa-house-chimney-user::before {
  content: "\\e065"; }
.fa-house-chimney-window::before {
  content: "\\e00d"; }
.fa-house-circle-check::before {
  content: "\\e509"; }
.fa-house-circle-exclamation::before {
  content: "\\e50a"; }
.fa-house-circle-xmark::before {
  content: "\\e50b"; }
.fa-house-crack::before {
  content: "\\e3b1"; }
.fa-house-fire::before {
  content: "\\e50c"; }
.fa-house-flag::before {
  content: "\\e50d"; }
.fa-house-flood-water::before {
  content: "\\e50e"; }
.fa-house-flood-water-circle-arrow-right::before {
  content: "\\e50f"; }
.fa-house-laptop::before {
  content: "\\e066"; }
.fa-laptop-house::before {
  content: "\\e066"; }
.fa-house-lock::before {
  content: "\\e510"; }
.fa-house-medical::before {
  content: "\\e3b2"; }
.fa-house-medical-circle-check::before {
  content: "\\e511"; }
.fa-house-medical-circle-exclamation::before {
  content: "\\e512"; }
.fa-house-medical-circle-xmark::before {
  content: "\\e513"; }
.fa-house-medical-flag::before {
  content: "\\e514"; }
.fa-house-signal::before {
  content: "\\e012"; }
.fa-house-tsunami::before {
  content: "\\e515"; }
.fa-house-user::before {
  content: "\\e1b0"; }
.fa-home-user::before {
  content: "\\e1b0"; }
.fa-hryvnia-sign::before {
  content: "\\f6f2"; }
.fa-hryvnia::before {
  content: "\\f6f2"; }
.fa-hurricane::before {
  content: "\\f751"; }
.fa-i::before {
  content: "\\49"; }
.fa-i-cursor::before {
  content: "\\f246"; }
.fa-ice-cream::before {
  content: "\\f810"; }
.fa-icicles::before {
  content: "\\f7ad"; }
.fa-icons::before {
  content: "\\f86d"; }
.fa-heart-music-camera-bolt::before {
  content: "\\f86d"; }
.fa-id-badge::before {
  content: "\\f2c1"; }
.fa-id-card::before {
  content: "\\f2c2"; }
.fa-drivers-license::before {
  content: "\\f2c2"; }
.fa-id-card-clip::before {
  content: "\\f47f"; }
.fa-id-card-alt::before {
  content: "\\f47f"; }
.fa-igloo::before {
  content: "\\f7ae"; }
.fa-image::before {
  content: "\\f03e"; }
.fa-image-portrait::before {
  content: "\\f3e0"; }
.fa-portrait::before {
  content: "\\f3e0"; }
.fa-images::before {
  content: "\\f302"; }
.fa-inbox::before {
  content: "\\f01c"; }
.fa-indent::before {
  content: "\\f03c"; }
.fa-indian-rupee-sign::before {
  content: "\\e1bc"; }
.fa-indian-rupee::before {
  content: "\\e1bc"; }
.fa-inr::before {
  content: "\\e1bc"; }
.fa-industry::before {
  content: "\\f275"; }
.fa-infinity::before {
  content: "\\f534"; }
.fa-info::before {
  content: "\\f129"; }
.fa-italic::before {
  content: "\\f033"; }
.fa-j::before {
  content: "\\4a"; }
.fa-jar::before {
  content: "\\e516"; }
.fa-jar-wheat::before {
  content: "\\e517"; }
.fa-jedi::before {
  content: "\\f669"; }
.fa-jet-fighter::before {
  content: "\\f0fb"; }
.fa-fighter-jet::before {
  content: "\\f0fb"; }
.fa-jet-fighter-up::before {
  content: "\\e518"; }
.fa-joint::before {
  content: "\\f595"; }
.fa-jug-detergent::before {
  content: "\\e519"; }
.fa-k::before {
  content: "\\4b"; }
.fa-kaaba::before {
  content: "\\f66b"; }
.fa-key::before {
  content: "\\f084"; }
.fa-keyboard::before {
  content: "\\f11c"; }
.fa-khanda::before {
  content: "\\f66d"; }
.fa-kip-sign::before {
  content: "\\e1c4"; }
.fa-kit-medical::before {
  content: "\\f479"; }
.fa-first-aid::before {
  content: "\\f479"; }
.fa-kitchen-set::before {
  content: "\\e51a"; }
.fa-kiwi-bird::before {
  content: "\\f535"; }
.fa-l::before {
  content: "\\4c"; }
.fa-land-mine-on::before {
  content: "\\e51b"; }
.fa-landmark::before {
  content: "\\f66f"; }
.fa-landmark-dome::before {
  content: "\\f752"; }
.fa-landmark-alt::before {
  content: "\\f752"; }
.fa-landmark-flag::before {
  content: "\\e51c"; }
.fa-language::before {
  content: "\\f1ab"; }
.fa-laptop::before {
  content: "\\f109"; }
.fa-laptop-code::before {
  content: "\\f5fc"; }
.fa-laptop-file::before {
  content: "\\e51d"; }
.fa-laptop-medical::before {
  content: "\\f812"; }
.fa-lari-sign::before {
  content: "\\e1c8"; }
.fa-layer-group::before {
  content: "\\f5fd"; }
.fa-leaf::before {
  content: "\\f06c"; }
.fa-left-long::before {
  content: "\\f30a"; }
.fa-long-arrow-alt-left::before {
  content: "\\f30a"; }
.fa-left-right::before {
  content: "\\f337"; }
.fa-arrows-alt-h::before {
  content: "\\f337"; }
.fa-lemon::before {
  content: "\\f094"; }
.fa-less-than::before {
  content: "\\3c"; }
.fa-less-than-equal::before {
  content: "\\f537"; }
.fa-life-ring::before {
  content: "\\f1cd"; }
.fa-lightbulb::before {
  content: "\\f0eb"; }
.fa-lines-leaning::before {
  content: "\\e51e"; }
.fa-link::before {
  content: "\\f0c1"; }
.fa-chain::before {
  content: "\\f0c1"; }
.fa-link-slash::before {
  content: "\\f127"; }
.fa-chain-broken::before {
  content: "\\f127"; }
.fa-chain-slash::before {
  content: "\\f127"; }
.fa-unlink::before {
  content: "\\f127"; }
.fa-lira-sign::before {
  content: "\\f195"; }
.fa-list::before {
  content: "\\f03a"; }
.fa-list-squares::before {
  content: "\\f03a"; }
.fa-list-check::before {
  content: "\\f0ae"; }
.fa-tasks::before {
  content: "\\f0ae"; }
.fa-list-ol::before {
  content: "\\f0cb"; }
.fa-list-1-2::before {
  content: "\\f0cb"; }
.fa-list-numeric::before {
  content: "\\f0cb"; }
.fa-list-ul::before {
  content: "\\f0ca"; }
.fa-list-dots::before {
  content: "\\f0ca"; }
.fa-litecoin-sign::before {
  content: "\\e1d3"; }
.fa-location-arrow::before {
  content: "\\f124"; }
.fa-location-crosshairs::before {
  content: "\\f601"; }
.fa-location::before {
  content: "\\f601"; }
.fa-location-dot::before {
  content: "\\f3c5"; }
.fa-map-marker-alt::before {
  content: "\\f3c5"; }
.fa-location-pin::before {
  content: "\\f041"; }
.fa-map-marker::before {
  content: "\\f041"; }
.fa-location-pin-lock::before {
  content: "\\e51f"; }
.fa-lock::before {
  content: "\\f023"; }
.fa-lock-open::before {
  content: "\\f3c1"; }
.fa-locust::before {
  content: "\\e520"; }
.fa-lungs::before {
  content: "\\f604"; }
.fa-lungs-virus::before {
  content: "\\e067"; }
.fa-m::before {
  content: "\\4d"; }
.fa-magnet::before {
  content: "\\f076"; }
.fa-magnifying-glass::before {
  content: "\\f002"; }
.fa-search::before {
  content: "\\f002"; }
.fa-magnifying-glass-arrow-right::before {
  content: "\\e521"; }
.fa-magnifying-glass-chart::before {
  content: "\\e522"; }
.fa-magnifying-glass-dollar::before {
  content: "\\f688"; }
.fa-search-dollar::before {
  content: "\\f688"; }
.fa-magnifying-glass-location::before {
  content: "\\f689"; }
.fa-search-location::before {
  content: "\\f689"; }
.fa-magnifying-glass-minus::before {
  content: "\\f010"; }
.fa-search-minus::before {
  content: "\\f010"; }
.fa-magnifying-glass-plus::before {
  content: "\\f00e"; }
.fa-search-plus::before {
  content: "\\f00e"; }
.fa-manat-sign::before {
  content: "\\e1d5"; }
.fa-map::before {
  content: "\\f279"; }
.fa-map-location::before {
  content: "\\f59f"; }
.fa-map-marked::before {
  content: "\\f59f"; }
.fa-map-location-dot::before {
  content: "\\f5a0"; }
.fa-map-marked-alt::before {
  content: "\\f5a0"; }
.fa-map-pin::before {
  content: "\\f276"; }
.fa-marker::before {
  content: "\\f5a1"; }
.fa-mars::before {
  content: "\\f222"; }
.fa-mars-and-venus::before {
  content: "\\f224"; }
.fa-mars-and-venus-burst::before {
  content: "\\e523"; }
.fa-mars-double::before {
  content: "\\f227"; }
.fa-mars-stroke::before {
  content: "\\f229"; }
.fa-mars-stroke-right::before {
  content: "\\f22b"; }
.fa-mars-stroke-h::before {
  content: "\\f22b"; }
.fa-mars-stroke-up::before {
  content: "\\f22a"; }
.fa-mars-stroke-v::before {
  content: "\\f22a"; }
.fa-martini-glass::before {
  content: "\\f57b"; }
.fa-glass-martini-alt::before {
  content: "\\f57b"; }
.fa-martini-glass-citrus::before {
  content: "\\f561"; }
.fa-cocktail::before {
  content: "\\f561"; }
.fa-martini-glass-empty::before {
  content: "\\f000"; }
.fa-glass-martini::before {
  content: "\\f000"; }
.fa-mask::before {
  content: "\\f6fa"; }
.fa-mask-face::before {
  content: "\\e1d7"; }
.fa-mask-ventilator::before {
  content: "\\e524"; }
.fa-masks-theater::before {
  content: "\\f630"; }
.fa-theater-masks::before {
  content: "\\f630"; }
.fa-mattress-pillow::before {
  content: "\\e525"; }
.fa-maximize::before {
  content: "\\f31e"; }
.fa-expand-arrows-alt::before {
  content: "\\f31e"; }
.fa-medal::before {
  content: "\\f5a2"; }
.fa-memory::before {
  content: "\\f538"; }
.fa-menorah::before {
  content: "\\f676"; }
.fa-mercury::before {
  content: "\\f223"; }
.fa-message::before {
  content: "\\f27a"; }
.fa-comment-alt::before {
  content: "\\f27a"; }
.fa-meteor::before {
  content: "\\f753"; }
.fa-microchip::before {
  content: "\\f2db"; }
.fa-microphone::before {
  content: "\\f130"; }
.fa-microphone-lines::before {
  content: "\\f3c9"; }
.fa-microphone-alt::before {
  content: "\\f3c9"; }
.fa-microphone-lines-slash::before {
  content: "\\f539"; }
.fa-microphone-alt-slash::before {
  content: "\\f539"; }
.fa-microphone-slash::before {
  content: "\\f131"; }
.fa-microscope::before {
  content: "\\f610"; }
.fa-mill-sign::before {
  content: "\\e1ed"; }
.fa-minimize::before {
  content: "\\f78c"; }
.fa-compress-arrows-alt::before {
  content: "\\f78c"; }
.fa-minus::before {
  content: "\\f068"; }
.fa-subtract::before {
  content: "\\f068"; }
.fa-mitten::before {
  content: "\\f7b5"; }
.fa-mobile::before {
  content: "\\f3ce"; }
.fa-mobile-android::before {
  content: "\\f3ce"; }
.fa-mobile-phone::before {
  content: "\\f3ce"; }
.fa-mobile-button::before {
  content: "\\f10b"; }
.fa-mobile-retro::before {
  content: "\\e527"; }
.fa-mobile-screen::before {
  content: "\\f3cf"; }
.fa-mobile-android-alt::before {
  content: "\\f3cf"; }
.fa-mobile-screen-button::before {
  content: "\\f3cd"; }
.fa-mobile-alt::before {
  content: "\\f3cd"; }
.fa-money-bill::before {
  content: "\\f0d6"; }
.fa-money-bill-1::before {
  content: "\\f3d1"; }
.fa-money-bill-alt::before {
  content: "\\f3d1"; }
.fa-money-bill-1-wave::before {
  content: "\\f53b"; }
.fa-money-bill-wave-alt::before {
  content: "\\f53b"; }
.fa-money-bill-transfer::before {
  content: "\\e528"; }
.fa-money-bill-trend-up::before {
  content: "\\e529"; }
.fa-money-bill-wave::before {
  content: "\\f53a"; }
.fa-money-bill-wheat::before {
  content: "\\e52a"; }
.fa-money-bills::before {
  content: "\\e1f3"; }
.fa-money-check::before {
  content: "\\f53c"; }
.fa-money-check-dollar::before {
  content: "\\f53d"; }
.fa-money-check-alt::before {
  content: "\\f53d"; }
.fa-monument::before {
  content: "\\f5a6"; }
.fa-moon::before {
  content: "\\f186"; }
.fa-mortar-pestle::before {
  content: "\\f5a7"; }
.fa-mosque::before {
  content: "\\f678"; }
.fa-mosquito::before {
  content: "\\e52b"; }
.fa-mosquito-net::before {
  content: "\\e52c"; }
.fa-motorcycle::before {
  content: "\\f21c"; }
.fa-mound::before {
  content: "\\e52d"; }
.fa-mountain::before {
  content: "\\f6fc"; }
.fa-mountain-city::before {
  content: "\\e52e"; }
.fa-mountain-sun::before {
  content: "\\e52f"; }
.fa-mug-hot::before {
  content: "\\f7b6"; }
.fa-mug-saucer::before {
  content: "\\f0f4"; }
.fa-coffee::before {
  content: "\\f0f4"; }
.fa-music::before {
  content: "\\f001"; }
.fa-n::before {
  content: "\\4e"; }
.fa-naira-sign::before {
  content: "\\e1f6"; }
.fa-network-wired::before {
  content: "\\f6ff"; }
.fa-neuter::before {
  content: "\\f22c"; }
.fa-newspaper::before {
  content: "\\f1ea"; }
.fa-not-equal::before {
  content: "\\f53e"; }
.fa-note-sticky::before {
  content: "\\f249"; }
.fa-sticky-note::before {
  content: "\\f249"; }
.fa-notes-medical::before {
  content: "\\f481"; }
.fa-o::before {
  content: "\\4f"; }
.fa-object-group::before {
  content: "\\f247"; }
.fa-object-ungroup::before {
  content: "\\f248"; }
.fa-oil-can::before {
  content: "\\f613"; }
.fa-oil-well::before {
  content: "\\e532"; }
.fa-om::before {
  content: "\\f679"; }
.fa-otter::before {
  content: "\\f700"; }
.fa-outdent::before {
  content: "\\f03b"; }
.fa-dedent::before {
  content: "\\f03b"; }
.fa-p::before {
  content: "\\50"; }
.fa-pager::before {
  content: "\\f815"; }
.fa-paint-roller::before {
  content: "\\f5aa"; }
.fa-paintbrush::before {
  content: "\\f1fc"; }
.fa-paint-brush::before {
  content: "\\f1fc"; }
.fa-palette::before {
  content: "\\f53f"; }
.fa-pallet::before {
  content: "\\f482"; }
.fa-panorama::before {
  content: "\\e209"; }
.fa-paper-plane::before {
  content: "\\f1d8"; }
.fa-paperclip::before {
  content: "\\f0c6"; }
.fa-parachute-box::before {
  content: "\\f4cd"; }
.fa-paragraph::before {
  content: "\\f1dd"; }
.fa-passport::before {
  content: "\\f5ab"; }
.fa-paste::before {
  content: "\\f0ea"; }
.fa-file-clipboard::before {
  content: "\\f0ea"; }
.fa-pause::before {
  content: "\\f04c"; }
.fa-paw::before {
  content: "\\f1b0"; }
.fa-peace::before {
  content: "\\f67c"; }
.fa-pen::before {
  content: "\\f304"; }
.fa-pen-clip::before {
  content: "\\f305"; }
.fa-pen-alt::before {
  content: "\\f305"; }
.fa-pen-fancy::before {
  content: "\\f5ac"; }
.fa-pen-nib::before {
  content: "\\f5ad"; }
.fa-pen-ruler::before {
  content: "\\f5ae"; }
.fa-pencil-ruler::before {
  content: "\\f5ae"; }
.fa-pen-to-square::before {
  content: "\\f044"; }
.fa-edit::before {
  content: "\\f044"; }
.fa-pencil::before {
  content: "\\f303"; }
.fa-pencil-alt::before {
  content: "\\f303"; }
.fa-people-arrows-left-right::before {
  content: "\\e068"; }
.fa-people-arrows::before {
  content: "\\e068"; }
.fa-people-carry-box::before {
  content: "\\f4ce"; }
.fa-people-carry::before {
  content: "\\f4ce"; }
.fa-people-group::before {
  content: "\\e533"; }
.fa-people-line::before {
  content: "\\e534"; }
.fa-people-pulling::before {
  content: "\\e535"; }
.fa-people-robbery::before {
  content: "\\e536"; }
.fa-people-roof::before {
  content: "\\e537"; }
.fa-pepper-hot::before {
  content: "\\f816"; }
.fa-percent::before {
  content: "\\25"; }
.fa-percentage::before {
  content: "\\25"; }
.fa-person::before {
  content: "\\f183"; }
.fa-male::before {
  content: "\\f183"; }
.fa-person-arrow-down-to-line::before {
  content: "\\e538"; }
.fa-person-arrow-up-from-line::before {
  content: "\\e539"; }
.fa-person-biking::before {
  content: "\\f84a"; }
.fa-biking::before {
  content: "\\f84a"; }
.fa-person-booth::before {
  content: "\\f756"; }
.fa-person-breastfeeding::before {
  content: "\\e53a"; }
.fa-person-burst::before {
  content: "\\e53b"; }
.fa-person-cane::before {
  content: "\\e53c"; }
.fa-person-chalkboard::before {
  content: "\\e53d"; }
.fa-person-circle-check::before {
  content: "\\e53e"; }
.fa-person-circle-exclamation::before {
  content: "\\e53f"; }
.fa-person-circle-minus::before {
  content: "\\e540"; }
.fa-person-circle-plus::before {
  content: "\\e541"; }
.fa-person-circle-question::before {
  content: "\\e542"; }
.fa-person-circle-xmark::before {
  content: "\\e543"; }
.fa-person-digging::before {
  content: "\\f85e"; }
.fa-digging::before {
  content: "\\f85e"; }
.fa-person-dots-from-line::before {
  content: "\\f470"; }
.fa-diagnoses::before {
  content: "\\f470"; }
.fa-person-dress::before {
  content: "\\f182"; }
.fa-female::before {
  content: "\\f182"; }
.fa-person-dress-burst::before {
  content: "\\e544"; }
.fa-person-drowning::before {
  content: "\\e545"; }
.fa-person-falling::before {
  content: "\\e546"; }
.fa-person-falling-burst::before {
  content: "\\e547"; }
.fa-person-half-dress::before {
  content: "\\e548"; }
.fa-person-harassing::before {
  content: "\\e549"; }
.fa-person-hiking::before {
  content: "\\f6ec"; }
.fa-hiking::before {
  content: "\\f6ec"; }
.fa-person-military-pointing::before {
  content: "\\e54a"; }
.fa-person-military-rifle::before {
  content: "\\e54b"; }
.fa-person-military-to-person::before {
  content: "\\e54c"; }
.fa-person-praying::before {
  content: "\\f683"; }
.fa-pray::before {
  content: "\\f683"; }
.fa-person-pregnant::before {
  content: "\\e31e"; }
.fa-person-rays::before {
  content: "\\e54d"; }
.fa-person-rifle::before {
  content: "\\e54e"; }
.fa-person-running::before {
  content: "\\f70c"; }
.fa-running::before {
  content: "\\f70c"; }
.fa-person-shelter::before {
  content: "\\e54f"; }
.fa-person-skating::before {
  content: "\\f7c5"; }
.fa-skating::before {
  content: "\\f7c5"; }
.fa-person-skiing::before {
  content: "\\f7c9"; }
.fa-skiing::before {
  content: "\\f7c9"; }
.fa-person-skiing-nordic::before {
  content: "\\f7ca"; }
.fa-skiing-nordic::before {
  content: "\\f7ca"; }
.fa-person-snowboarding::before {
  content: "\\f7ce"; }
.fa-snowboarding::before {
  content: "\\f7ce"; }
.fa-person-swimming::before {
  content: "\\f5c4"; }
.fa-swimmer::before {
  content: "\\f5c4"; }
.fa-person-through-window::before {
  content: "\\e433"; }
.fa-person-walking::before {
  content: "\\f554"; }
.fa-walking::before {
  content: "\\f554"; }
.fa-person-walking-arrow-loop-left::before {
  content: "\\e551"; }
.fa-person-walking-arrow-right::before {
  content: "\\e552"; }
.fa-person-walking-dashed-line-arrow-right::before {
  content: "\\e553"; }
.fa-person-walking-luggage::before {
  content: "\\e554"; }
.fa-person-walking-with-cane::before {
  content: "\\f29d"; }
.fa-blind::before {
  content: "\\f29d"; }
.fa-peseta-sign::before {
  content: "\\e221"; }
.fa-peso-sign::before {
  content: "\\e222"; }
.fa-phone::before {
  content: "\\f095"; }
.fa-phone-flip::before {
  content: "\\f879"; }
.fa-phone-alt::before {
  content: "\\f879"; }
.fa-phone-slash::before {
  content: "\\f3dd"; }
.fa-phone-volume::before {
  content: "\\f2a0"; }
.fa-volume-control-phone::before {
  content: "\\f2a0"; }
.fa-photo-film::before {
  content: "\\f87c"; }
.fa-photo-video::before {
  content: "\\f87c"; }
.fa-piggy-bank::before {
  content: "\\f4d3"; }
.fa-pills::before {
  content: "\\f484"; }
.fa-pizza-slice::before {
  content: "\\f818"; }
.fa-place-of-worship::before {
  content: "\\f67f"; }
.fa-plane::before {
  content: "\\f072"; }
.fa-plane-arrival::before {
  content: "\\f5af"; }
.fa-plane-circle-check::before {
  content: "\\e555"; }
.fa-plane-circle-exclamation::before {
  content: "\\e556"; }
.fa-plane-circle-xmark::before {
  content: "\\e557"; }
.fa-plane-departure::before {
  content: "\\f5b0"; }
.fa-plane-lock::before {
  content: "\\e558"; }
.fa-plane-slash::before {
  content: "\\e069"; }
.fa-plane-up::before {
  content: "\\e22d"; }
.fa-plant-wilt::before {
  content: "\\e43b"; }
.fa-plate-wheat::before {
  content: "\\e55a"; }
.fa-play::before {
  content: "\\f04b"; }
.fa-plug::before {
  content: "\\f1e6"; }
.fa-plug-circle-bolt::before {
  content: "\\e55b"; }
.fa-plug-circle-check::before {
  content: "\\e55c"; }
.fa-plug-circle-exclamation::before {
  content: "\\e55d"; }
.fa-plug-circle-minus::before {
  content: "\\e55e"; }
.fa-plug-circle-plus::before {
  content: "\\e55f"; }
.fa-plug-circle-xmark::before {
  content: "\\e560"; }
.fa-plus::before {
  content: "\\2b"; }
.fa-add::before {
  content: "\\2b"; }
.fa-plus-minus::before {
  content: "\\e43c"; }
.fa-podcast::before {
  content: "\\f2ce"; }
.fa-poo::before {
  content: "\\f2fe"; }
.fa-poo-storm::before {
  content: "\\f75a"; }
.fa-poo-bolt::before {
  content: "\\f75a"; }
.fa-poop::before {
  content: "\\f619"; }
.fa-power-off::before {
  content: "\\f011"; }
.fa-prescription::before {
  content: "\\f5b1"; }
.fa-prescription-bottle::before {
  content: "\\f485"; }
.fa-prescription-bottle-medical::before {
  content: "\\f486"; }
.fa-prescription-bottle-alt::before {
  content: "\\f486"; }
.fa-print::before {
  content: "\\f02f"; }
.fa-pump-medical::before {
  content: "\\e06a"; }
.fa-pump-soap::before {
  content: "\\e06b"; }
.fa-puzzle-piece::before {
  content: "\\f12e"; }
.fa-q::before {
  content: "\\51"; }
.fa-qrcode::before {
  content: "\\f029"; }
.fa-question::before {
  content: "\\3f"; }
.fa-quote-left::before {
  content: "\\f10d"; }
.fa-quote-left-alt::before {
  content: "\\f10d"; }
.fa-quote-right::before {
  content: "\\f10e"; }
.fa-quote-right-alt::before {
  content: "\\f10e"; }
.fa-r::before {
  content: "\\52"; }
.fa-radiation::before {
  content: "\\f7b9"; }
.fa-radio::before {
  content: "\\f8d7"; }
.fa-rainbow::before {
  content: "\\f75b"; }
.fa-ranking-star::before {
  content: "\\e561"; }
.fa-receipt::before {
  content: "\\f543"; }
.fa-record-vinyl::before {
  content: "\\f8d9"; }
.fa-rectangle-ad::before {
  content: "\\f641"; }
.fa-ad::before {
  content: "\\f641"; }
.fa-rectangle-list::before {
  content: "\\f022"; }
.fa-list-alt::before {
  content: "\\f022"; }
.fa-rectangle-xmark::before {
  content: "\\f410"; }
.fa-rectangle-times::before {
  content: "\\f410"; }
.fa-times-rectangle::before {
  content: "\\f410"; }
.fa-window-close::before {
  content: "\\f410"; }
.fa-recycle::before {
  content: "\\f1b8"; }
.fa-registered::before {
  content: "\\f25d"; }
.fa-repeat::before {
  content: "\\f363"; }
.fa-reply::before {
  content: "\\f3e5"; }
.fa-mail-reply::before {
  content: "\\f3e5"; }
.fa-reply-all::before {
  content: "\\f122"; }
.fa-mail-reply-all::before {
  content: "\\f122"; }
.fa-republican::before {
  content: "\\f75e"; }
.fa-restroom::before {
  content: "\\f7bd"; }
.fa-retweet::before {
  content: "\\f079"; }
.fa-ribbon::before {
  content: "\\f4d6"; }
.fa-right-from-bracket::before {
  content: "\\f2f5"; }
.fa-sign-out-alt::before {
  content: "\\f2f5"; }
.fa-right-left::before {
  content: "\\f362"; }
.fa-exchange-alt::before {
  content: "\\f362"; }
.fa-right-long::before {
  content: "\\f30b"; }
.fa-long-arrow-alt-right::before {
  content: "\\f30b"; }
.fa-right-to-bracket::before {
  content: "\\f2f6"; }
.fa-sign-in-alt::before {
  content: "\\f2f6"; }
.fa-ring::before {
  content: "\\f70b"; }
.fa-road::before {
  content: "\\f018"; }
.fa-road-barrier::before {
  content: "\\e562"; }
.fa-road-bridge::before {
  content: "\\e563"; }
.fa-road-circle-check::before {
  content: "\\e564"; }
.fa-road-circle-exclamation::before {
  content: "\\e565"; }
.fa-road-circle-xmark::before {
  content: "\\e566"; }
.fa-road-lock::before {
  content: "\\e567"; }
.fa-road-spikes::before {
  content: "\\e568"; }
.fa-robot::before {
  content: "\\f544"; }
.fa-rocket::before {
  content: "\\f135"; }
.fa-rotate::before {
  content: "\\f2f1"; }
.fa-sync-alt::before {
  content: "\\f2f1"; }
.fa-rotate-left::before {
  content: "\\f2ea"; }
.fa-rotate-back::before {
  content: "\\f2ea"; }
.fa-rotate-backward::before {
  content: "\\f2ea"; }
.fa-undo-alt::before {
  content: "\\f2ea"; }
.fa-rotate-right::before {
  content: "\\f2f9"; }
.fa-redo-alt::before {
  content: "\\f2f9"; }
.fa-rotate-forward::before {
  content: "\\f2f9"; }
.fa-route::before {
  content: "\\f4d7"; }
.fa-rss::before {
  content: "\\f09e"; }
.fa-feed::before {
  content: "\\f09e"; }
.fa-ruble-sign::before {
  content: "\\f158"; }
.fa-rouble::before {
  content: "\\f158"; }
.fa-rub::before {
  content: "\\f158"; }
.fa-ruble::before {
  content: "\\f158"; }
.fa-rug::before {
  content: "\\e569"; }
.fa-ruler::before {
  content: "\\f545"; }
.fa-ruler-combined::before {
  content: "\\f546"; }
.fa-ruler-horizontal::before {
  content: "\\f547"; }
.fa-ruler-vertical::before {
  content: "\\f548"; }
.fa-rupee-sign::before {
  content: "\\f156"; }
.fa-rupee::before {
  content: "\\f156"; }
.fa-rupiah-sign::before {
  content: "\\e23d"; }
.fa-s::before {
  content: "\\53"; }
.fa-sack-dollar::before {
  content: "\\f81d"; }
.fa-sack-xmark::before {
  content: "\\e56a"; }
.fa-sailboat::before {
  content: "\\e445"; }
.fa-satellite::before {
  content: "\\f7bf"; }
.fa-satellite-dish::before {
  content: "\\f7c0"; }
.fa-scale-balanced::before {
  content: "\\f24e"; }
.fa-balance-scale::before {
  content: "\\f24e"; }
.fa-scale-unbalanced::before {
  content: "\\f515"; }
.fa-balance-scale-left::before {
  content: "\\f515"; }
.fa-scale-unbalanced-flip::before {
  content: "\\f516"; }
.fa-balance-scale-right::before {
  content: "\\f516"; }
.fa-school::before {
  content: "\\f549"; }
.fa-school-circle-check::before {
  content: "\\e56b"; }
.fa-school-circle-exclamation::before {
  content: "\\e56c"; }
.fa-school-circle-xmark::before {
  content: "\\e56d"; }
.fa-school-flag::before {
  content: "\\e56e"; }
.fa-school-lock::before {
  content: "\\e56f"; }
.fa-scissors::before {
  content: "\\f0c4"; }
.fa-cut::before {
  content: "\\f0c4"; }
.fa-screwdriver::before {
  content: "\\f54a"; }
.fa-screwdriver-wrench::before {
  content: "\\f7d9"; }
.fa-tools::before {
  content: "\\f7d9"; }
.fa-scroll::before {
  content: "\\f70e"; }
.fa-scroll-torah::before {
  content: "\\f6a0"; }
.fa-torah::before {
  content: "\\f6a0"; }
.fa-sd-card::before {
  content: "\\f7c2"; }
.fa-section::before {
  content: "\\e447"; }
.fa-seedling::before {
  content: "\\f4d8"; }
.fa-sprout::before {
  content: "\\f4d8"; }
.fa-server::before {
  content: "\\f233"; }
.fa-shapes::before {
  content: "\\f61f"; }
.fa-triangle-circle-square::before {
  content: "\\f61f"; }
.fa-share::before {
  content: "\\f064"; }
.fa-arrow-turn-right::before {
  content: "\\f064"; }
.fa-mail-forward::before {
  content: "\\f064"; }
.fa-share-from-square::before {
  content: "\\f14d"; }
.fa-share-square::before {
  content: "\\f14d"; }
.fa-share-nodes::before {
  content: "\\f1e0"; }
.fa-share-alt::before {
  content: "\\f1e0"; }
.fa-sheet-plastic::before {
  content: "\\e571"; }
.fa-shekel-sign::before {
  content: "\\f20b"; }
.fa-ils::before {
  content: "\\f20b"; }
.fa-shekel::before {
  content: "\\f20b"; }
.fa-sheqel::before {
  content: "\\f20b"; }
.fa-sheqel-sign::before {
  content: "\\f20b"; }
.fa-shield::before {
  content: "\\f132"; }
.fa-shield-blank::before {
  content: "\\f132"; }
.fa-shield-cat::before {
  content: "\\e572"; }
.fa-shield-dog::before {
  content: "\\e573"; }
.fa-shield-halved::before {
  content: "\\f3ed"; }
.fa-shield-alt::before {
  content: "\\f3ed"; }
.fa-shield-heart::before {
  content: "\\e574"; }
.fa-shield-virus::before {
  content: "\\e06c"; }
.fa-ship::before {
  content: "\\f21a"; }
.fa-shirt::before {
  content: "\\f553"; }
.fa-t-shirt::before {
  content: "\\f553"; }
.fa-tshirt::before {
  content: "\\f553"; }
.fa-shoe-prints::before {
  content: "\\f54b"; }
.fa-shop::before {
  content: "\\f54f"; }
.fa-store-alt::before {
  content: "\\f54f"; }
.fa-shop-lock::before {
  content: "\\e4a5"; }
.fa-shop-slash::before {
  content: "\\e070"; }
.fa-store-alt-slash::before {
  content: "\\e070"; }
.fa-shower::before {
  content: "\\f2cc"; }
.fa-shrimp::before {
  content: "\\e448"; }
.fa-shuffle::before {
  content: "\\f074"; }
.fa-random::before {
  content: "\\f074"; }
.fa-shuttle-space::before {
  content: "\\f197"; }
.fa-space-shuttle::before {
  content: "\\f197"; }
.fa-sign-hanging::before {
  content: "\\f4d9"; }
.fa-sign::before {
  content: "\\f4d9"; }
.fa-signal::before {
  content: "\\f012"; }
.fa-signal-5::before {
  content: "\\f012"; }
.fa-signal-perfect::before {
  content: "\\f012"; }
.fa-signature::before {
  content: "\\f5b7"; }
.fa-signs-post::before {
  content: "\\f277"; }
.fa-map-signs::before {
  content: "\\f277"; }
.fa-sim-card::before {
  content: "\\f7c4"; }
.fa-sink::before {
  content: "\\e06d"; }
.fa-sitemap::before {
  content: "\\f0e8"; }
.fa-skull::before {
  content: "\\f54c"; }
.fa-skull-crossbones::before {
  content: "\\f714"; }
.fa-slash::before {
  content: "\\f715"; }
.fa-sleigh::before {
  content: "\\f7cc"; }
.fa-sliders::before {
  content: "\\f1de"; }
.fa-sliders-h::before {
  content: "\\f1de"; }
.fa-smog::before {
  content: "\\f75f"; }
.fa-smoking::before {
  content: "\\f48d"; }
.fa-snowflake::before {
  content: "\\f2dc"; }
.fa-snowman::before {
  content: "\\f7d0"; }
.fa-snowplow::before {
  content: "\\f7d2"; }
.fa-soap::before {
  content: "\\e06e"; }
.fa-socks::before {
  content: "\\f696"; }
.fa-solar-panel::before {
  content: "\\f5ba"; }
.fa-sort::before {
  content: "\\f0dc"; }
.fa-unsorted::before {
  content: "\\f0dc"; }
.fa-sort-down::before {
  content: "\\f0dd"; }
.fa-sort-desc::before {
  content: "\\f0dd"; }
.fa-sort-up::before {
  content: "\\f0de"; }
.fa-sort-asc::before {
  content: "\\f0de"; }
.fa-spa::before {
  content: "\\f5bb"; }
.fa-spaghetti-monster-flying::before {
  content: "\\f67b"; }
.fa-pastafarianism::before {
  content: "\\f67b"; }
.fa-spell-check::before {
  content: "\\f891"; }
.fa-spider::before {
  content: "\\f717"; }
.fa-spinner::before {
  content: "\\f110"; }
.fa-splotch::before {
  content: "\\f5bc"; }
.fa-spoon::before {
  content: "\\f2e5"; }
.fa-utensil-spoon::before {
  content: "\\f2e5"; }
.fa-spray-can::before {
  content: "\\f5bd"; }
.fa-spray-can-sparkles::before {
  content: "\\f5d0"; }
.fa-air-freshener::before {
  content: "\\f5d0"; }
.fa-square::before {
  content: "\\f0c8"; }
.fa-square-arrow-up-right::before {
  content: "\\f14c"; }
.fa-external-link-square::before {
  content: "\\f14c"; }
.fa-square-caret-down::before {
  content: "\\f150"; }
.fa-caret-square-down::before {
  content: "\\f150"; }
.fa-square-caret-left::before {
  content: "\\f191"; }
.fa-caret-square-left::before {
  content: "\\f191"; }
.fa-square-caret-right::before {
  content: "\\f152"; }
.fa-caret-square-right::before {
  content: "\\f152"; }
.fa-square-caret-up::before {
  content: "\\f151"; }
.fa-caret-square-up::before {
  content: "\\f151"; }
.fa-square-check::before {
  content: "\\f14a"; }
.fa-check-square::before {
  content: "\\f14a"; }
.fa-square-envelope::before {
  content: "\\f199"; }
.fa-envelope-square::before {
  content: "\\f199"; }
.fa-square-full::before {
  content: "\\f45c"; }
.fa-square-h::before {
  content: "\\f0fd"; }
.fa-h-square::before {
  content: "\\f0fd"; }
.fa-square-minus::before {
  content: "\\f146"; }
.fa-minus-square::before {
  content: "\\f146"; }
.fa-square-nfi::before {
  content: "\\e576"; }
.fa-square-parking::before {
  content: "\\f540"; }
.fa-parking::before {
  content: "\\f540"; }
.fa-square-pen::before {
  content: "\\f14b"; }
.fa-pen-square::before {
  content: "\\f14b"; }
.fa-pencil-square::before {
  content: "\\f14b"; }
.fa-square-person-confined::before {
  content: "\\e577"; }
.fa-square-phone::before {
  content: "\\f098"; }
.fa-phone-square::before {
  content: "\\f098"; }
.fa-square-phone-flip::before {
  content: "\\f87b"; }
.fa-phone-square-alt::before {
  content: "\\f87b"; }
.fa-square-plus::before {
  content: "\\f0fe"; }
.fa-plus-square::before {
  content: "\\f0fe"; }
.fa-square-poll-horizontal::before {
  content: "\\f682"; }
.fa-poll-h::before {
  content: "\\f682"; }
.fa-square-poll-vertical::before {
  content: "\\f681"; }
.fa-poll::before {
  content: "\\f681"; }
.fa-square-root-variable::before {
  content: "\\f698"; }
.fa-square-root-alt::before {
  content: "\\f698"; }
.fa-square-rss::before {
  content: "\\f143"; }
.fa-rss-square::before {
  content: "\\f143"; }
.fa-square-share-nodes::before {
  content: "\\f1e1"; }
.fa-share-alt-square::before {
  content: "\\f1e1"; }
.fa-square-up-right::before {
  content: "\\f360"; }
.fa-external-link-square-alt::before {
  content: "\\f360"; }
.fa-square-virus::before {
  content: "\\e578"; }
.fa-square-xmark::before {
  content: "\\f2d3"; }
.fa-times-square::before {
  content: "\\f2d3"; }
.fa-xmark-square::before {
  content: "\\f2d3"; }
.fa-staff-aesculapius::before {
  content: "\\e579"; }
.fa-rod-asclepius::before {
  content: "\\e579"; }
.fa-rod-snake::before {
  content: "\\e579"; }
.fa-staff-snake::before {
  content: "\\e579"; }
.fa-stairs::before {
  content: "\\e289"; }
.fa-stamp::before {
  content: "\\f5bf"; }
.fa-star::before {
  content: "\\f005"; }
.fa-star-and-crescent::before {
  content: "\\f699"; }
.fa-star-half::before {
  content: "\\f089"; }
.fa-star-half-stroke::before {
  content: "\\f5c0"; }
.fa-star-half-alt::before {
  content: "\\f5c0"; }
.fa-star-of-david::before {
  content: "\\f69a"; }
.fa-star-of-life::before {
  content: "\\f621"; }
.fa-sterling-sign::before {
  content: "\\f154"; }
.fa-gbp::before {
  content: "\\f154"; }
.fa-pound-sign::before {
  content: "\\f154"; }
.fa-stethoscope::before {
  content: "\\f0f1"; }
.fa-stop::before {
  content: "\\f04d"; }
.fa-stopwatch::before {
  content: "\\f2f2"; }
.fa-stopwatch-20::before {
  content: "\\e06f"; }
.fa-store::before {
  content: "\\f54e"; }
.fa-store-slash::before {
  content: "\\e071"; }
.fa-street-view::before {
  content: "\\f21d"; }
.fa-strikethrough::before {
  content: "\\f0cc"; }
.fa-stroopwafel::before {
  content: "\\f551"; }
.fa-subscript::before {
  content: "\\f12c"; }
.fa-suitcase::before {
  content: "\\f0f2"; }
.fa-suitcase-medical::before {
  content: "\\f0fa"; }
.fa-medkit::before {
  content: "\\f0fa"; }
.fa-suitcase-rolling::before {
  content: "\\f5c1"; }
.fa-sun::before {
  content: "\\f185"; }
.fa-sun-plant-wilt::before {
  content: "\\e57a"; }
.fa-superscript::before {
  content: "\\f12b"; }
.fa-swatchbook::before {
  content: "\\f5c3"; }
.fa-synagogue::before {
  content: "\\f69b"; }
.fa-syringe::before {
  content: "\\f48e"; }
.fa-t::before {
  content: "\\54"; }
.fa-table::before {
  content: "\\f0ce"; }
.fa-table-cells::before {
  content: "\\f00a"; }
.fa-th::before {
  content: "\\f00a"; }
.fa-table-cells-large::before {
  content: "\\f009"; }
.fa-th-large::before {
  content: "\\f009"; }
.fa-table-columns::before {
  content: "\\f0db"; }
.fa-columns::before {
  content: "\\f0db"; }
.fa-table-list::before {
  content: "\\f00b"; }
.fa-th-list::before {
  content: "\\f00b"; }
.fa-table-tennis-paddle-ball::before {
  content: "\\f45d"; }
.fa-ping-pong-paddle-ball::before {
  content: "\\f45d"; }
.fa-table-tennis::before {
  content: "\\f45d"; }
.fa-tablet::before {
  content: "\\f3fb"; }
.fa-tablet-android::before {
  content: "\\f3fb"; }
.fa-tablet-button::before {
  content: "\\f10a"; }
.fa-tablet-screen-button::before {
  content: "\\f3fa"; }
.fa-tablet-alt::before {
  content: "\\f3fa"; }
.fa-tablets::before {
  content: "\\f490"; }
.fa-tachograph-digital::before {
  content: "\\f566"; }
.fa-digital-tachograph::before {
  content: "\\f566"; }
.fa-tag::before {
  content: "\\f02b"; }
.fa-tags::before {
  content: "\\f02c"; }
.fa-tape::before {
  content: "\\f4db"; }
.fa-tarp::before {
  content: "\\e57b"; }
.fa-tarp-droplet::before {
  content: "\\e57c"; }
.fa-taxi::before {
  content: "\\f1ba"; }
.fa-cab::before {
  content: "\\f1ba"; }
.fa-teeth::before {
  content: "\\f62e"; }
.fa-teeth-open::before {
  content: "\\f62f"; }
.fa-temperature-arrow-down::before {
  content: "\\e03f"; }
.fa-temperature-down::before {
  content: "\\e03f"; }
.fa-temperature-arrow-up::before {
  content: "\\e040"; }
.fa-temperature-up::before {
  content: "\\e040"; }
.fa-temperature-empty::before {
  content: "\\f2cb"; }
.fa-temperature-0::before {
  content: "\\f2cb"; }
.fa-thermometer-0::before {
  content: "\\f2cb"; }
.fa-thermometer-empty::before {
  content: "\\f2cb"; }
.fa-temperature-full::before {
  content: "\\f2c7"; }
.fa-temperature-4::before {
  content: "\\f2c7"; }
.fa-thermometer-4::before {
  content: "\\f2c7"; }
.fa-thermometer-full::before {
  content: "\\f2c7"; }
.fa-temperature-half::before {
  content: "\\f2c9"; }
.fa-temperature-2::before {
  content: "\\f2c9"; }
.fa-thermometer-2::before {
  content: "\\f2c9"; }
.fa-thermometer-half::before {
  content: "\\f2c9"; }
.fa-temperature-high::before {
  content: "\\f769"; }
.fa-temperature-low::before {
  content: "\\f76b"; }
.fa-temperature-quarter::before {
  content: "\\f2ca"; }
.fa-temperature-1::before {
  content: "\\f2ca"; }
.fa-thermometer-1::before {
  content: "\\f2ca"; }
.fa-thermometer-quarter::before {
  content: "\\f2ca"; }
.fa-temperature-three-quarters::before {
  content: "\\f2c8"; }
.fa-temperature-3::before {
  content: "\\f2c8"; }
.fa-thermometer-3::before {
  content: "\\f2c8"; }
.fa-thermometer-three-quarters::before {
  content: "\\f2c8"; }
.fa-tenge-sign::before {
  content: "\\f7d7"; }
.fa-tenge::before {
  content: "\\f7d7"; }
.fa-tent::before {
  content: "\\e57d"; }
.fa-tent-arrow-down-to-line::before {
  content: "\\e57e"; }
.fa-tent-arrow-left-right::before {
  content: "\\e57f"; }
.fa-tent-arrow-turn-left::before {
  content: "\\e580"; }
.fa-tent-arrows-down::before {
  content: "\\e581"; }
.fa-tents::before {
  content: "\\e582"; }
.fa-terminal::before {
  content: "\\f120"; }
.fa-text-height::before {
  content: "\\f034"; }
.fa-text-slash::before {
  content: "\\f87d"; }
.fa-remove-format::before {
  content: "\\f87d"; }
.fa-text-width::before {
  content: "\\f035"; }
.fa-thermometer::before {
  content: "\\f491"; }
.fa-thumbs-down::before {
  content: "\\f165"; }
.fa-thumbs-up::before {
  content: "\\f164"; }
.fa-thumbtack::before {
  content: "\\f08d"; }
.fa-thumb-tack::before {
  content: "\\f08d"; }
.fa-ticket::before {
  content: "\\f145"; }
.fa-ticket-simple::before {
  content: "\\f3ff"; }
.fa-ticket-alt::before {
  content: "\\f3ff"; }
.fa-timeline::before {
  content: "\\e29c"; }
.fa-toggle-off::before {
  content: "\\f204"; }
.fa-toggle-on::before {
  content: "\\f205"; }
.fa-toilet::before {
  content: "\\f7d8"; }
.fa-toilet-paper::before {
  content: "\\f71e"; }
.fa-toilet-paper-slash::before {
  content: "\\e072"; }
.fa-toilet-portable::before {
  content: "\\e583"; }
.fa-toilets-portable::before {
  content: "\\e584"; }
.fa-toolbox::before {
  content: "\\f552"; }
.fa-tooth::before {
  content: "\\f5c9"; }
.fa-torii-gate::before {
  content: "\\f6a1"; }
.fa-tornado::before {
  content: "\\f76f"; }
.fa-tower-broadcast::before {
  content: "\\f519"; }
.fa-broadcast-tower::before {
  content: "\\f519"; }
.fa-tower-cell::before {
  content: "\\e585"; }
.fa-tower-observation::before {
  content: "\\e586"; }
.fa-tractor::before {
  content: "\\f722"; }
.fa-trademark::before {
  content: "\\f25c"; }
.fa-traffic-light::before {
  content: "\\f637"; }
.fa-trailer::before {
  content: "\\e041"; }
.fa-train::before {
  content: "\\f238"; }
.fa-train-subway::before {
  content: "\\f239"; }
.fa-subway::before {
  content: "\\f239"; }
.fa-train-tram::before {
  content: "\\f7da"; }
.fa-tram::before {
  content: "\\f7da"; }
.fa-transgender::before {
  content: "\\f225"; }
.fa-transgender-alt::before {
  content: "\\f225"; }
.fa-trash::before {
  content: "\\f1f8"; }
.fa-trash-arrow-up::before {
  content: "\\f829"; }
.fa-trash-restore::before {
  content: "\\f829"; }
.fa-trash-can::before {
  content: "\\f2ed"; }
.fa-trash-alt::before {
  content: "\\f2ed"; }
.fa-trash-can-arrow-up::before {
  content: "\\f82a"; }
.fa-trash-restore-alt::before {
  content: "\\f82a"; }
.fa-tree::before {
  content: "\\f1bb"; }
.fa-tree-city::before {
  content: "\\e587"; }
.fa-triangle-exclamation::before {
  content: "\\f071"; }
.fa-exclamation-triangle::before {
  content: "\\f071"; }
.fa-warning::before {
  content: "\\f071"; }
.fa-trophy::before {
  content: "\\f091"; }
.fa-trowel::before {
  content: "\\e589"; }
.fa-trowel-bricks::before {
  content: "\\e58a"; }
.fa-truck::before {
  content: "\\f0d1"; }
.fa-truck-arrow-right::before {
  content: "\\e58b"; }
.fa-truck-droplet::before {
  content: "\\e58c"; }
.fa-truck-fast::before {
  content: "\\f48b"; }
.fa-shipping-fast::before {
  content: "\\f48b"; }
.fa-truck-field::before {
  content: "\\e58d"; }
.fa-truck-field-un::before {
  content: "\\e58e"; }
.fa-truck-front::before {
  content: "\\e2b7"; }
.fa-truck-medical::before {
  content: "\\f0f9"; }
.fa-ambulance::before {
  content: "\\f0f9"; }
.fa-truck-monster::before {
  content: "\\f63b"; }
.fa-truck-moving::before {
  content: "\\f4df"; }
.fa-truck-pickup::before {
  content: "\\f63c"; }
.fa-truck-plane::before {
  content: "\\e58f"; }
.fa-truck-ramp-box::before {
  content: "\\f4de"; }
.fa-truck-loading::before {
  content: "\\f4de"; }
.fa-tty::before {
  content: "\\f1e4"; }
.fa-teletype::before {
  content: "\\f1e4"; }
.fa-turkish-lira-sign::before {
  content: "\\e2bb"; }
.fa-try::before {
  content: "\\e2bb"; }
.fa-turkish-lira::before {
  content: "\\e2bb"; }
.fa-turn-down::before {
  content: "\\f3be"; }
.fa-level-down-alt::before {
  content: "\\f3be"; }
.fa-turn-up::before {
  content: "\\f3bf"; }
.fa-level-up-alt::before {
  content: "\\f3bf"; }
.fa-tv::before {
  content: "\\f26c"; }
.fa-television::before {
  content: "\\f26c"; }
.fa-tv-alt::before {
  content: "\\f26c"; }
.fa-u::before {
  content: "\\55"; }
.fa-umbrella::before {
  content: "\\f0e9"; }
.fa-umbrella-beach::before {
  content: "\\f5ca"; }
.fa-underline::before {
  content: "\\f0cd"; }
.fa-universal-access::before {
  content: "\\f29a"; }
.fa-unlock::before {
  content: "\\f09c"; }
.fa-unlock-keyhole::before {
  content: "\\f13e"; }
.fa-unlock-alt::before {
  content: "\\f13e"; }
.fa-up-down::before {
  content: "\\f338"; }
.fa-arrows-alt-v::before {
  content: "\\f338"; }
.fa-up-down-left-right::before {
  content: "\\f0b2"; }
.fa-arrows-alt::before {
  content: "\\f0b2"; }
.fa-up-long::before {
  content: "\\f30c"; }
.fa-long-arrow-alt-up::before {
  content: "\\f30c"; }
.fa-up-right-and-down-left-from-center::before {
  content: "\\f424"; }
.fa-expand-alt::before {
  content: "\\f424"; }
.fa-up-right-from-square::before {
  content: "\\f35d"; }
.fa-external-link-alt::before {
  content: "\\f35d"; }
.fa-upload::before {
  content: "\\f093"; }
.fa-user::before {
  content: "\\f007"; }
.fa-user-astronaut::before {
  content: "\\f4fb"; }
.fa-user-check::before {
  content: "\\f4fc"; }
.fa-user-clock::before {
  content: "\\f4fd"; }
.fa-user-doctor::before {
  content: "\\f0f0"; }
.fa-user-md::before {
  content: "\\f0f0"; }
.fa-user-gear::before {
  content: "\\f4fe"; }
.fa-user-cog::before {
  content: "\\f4fe"; }
.fa-user-graduate::before {
  content: "\\f501"; }
.fa-user-group::before {
  content: "\\f500"; }
.fa-user-friends::before {
  content: "\\f500"; }
.fa-user-injured::before {
  content: "\\f728"; }
.fa-user-large::before {
  content: "\\f406"; }
.fa-user-alt::before {
  content: "\\f406"; }
.fa-user-large-slash::before {
  content: "\\f4fa"; }
.fa-user-alt-slash::before {
  content: "\\f4fa"; }
.fa-user-lock::before {
  content: "\\f502"; }
.fa-user-minus::before {
  content: "\\f503"; }
.fa-user-ninja::before {
  content: "\\f504"; }
.fa-user-nurse::before {
  content: "\\f82f"; }
.fa-user-pen::before {
  content: "\\f4ff"; }
.fa-user-edit::before {
  content: "\\f4ff"; }
.fa-user-plus::before {
  content: "\\f234"; }
.fa-user-secret::before {
  content: "\\f21b"; }
.fa-user-shield::before {
  content: "\\f505"; }
.fa-user-slash::before {
  content: "\\f506"; }
.fa-user-tag::before {
  content: "\\f507"; }
.fa-user-tie::before {
  content: "\\f508"; }
.fa-user-xmark::before {
  content: "\\f235"; }
.fa-user-times::before {
  content: "\\f235"; }
.fa-users::before {
  content: "\\f0c0"; }
.fa-users-between-lines::before {
  content: "\\e591"; }
.fa-users-gear::before {
  content: "\\f509"; }
.fa-users-cog::before {
  content: "\\f509"; }
.fa-users-line::before {
  content: "\\e592"; }
.fa-users-rays::before {
  content: "\\e593"; }
.fa-users-rectangle::before {
  content: "\\e594"; }
.fa-users-slash::before {
  content: "\\e073"; }
.fa-users-viewfinder::before {
  content: "\\e595"; }
.fa-utensils::before {
  content: "\\f2e7"; }
.fa-cutlery::before {
  content: "\\f2e7"; }
.fa-v::before {
  content: "\\56"; }
.fa-van-shuttle::before {
  content: "\\f5b6"; }
.fa-shuttle-van::before {
  content: "\\f5b6"; }
.fa-vault::before {
  content: "\\e2c5"; }
.fa-vector-square::before {
  content: "\\f5cb"; }
.fa-venus::before {
  content: "\\f221"; }
.fa-venus-double::before {
  content: "\\f226"; }
.fa-venus-mars::before {
  content: "\\f228"; }
.fa-vest::before {
  content: "\\e085"; }
.fa-vest-patches::before {
  content: "\\e086"; }
.fa-vial::before {
  content: "\\f492"; }
.fa-vial-circle-check::before {
  content: "\\e596"; }
.fa-vial-virus::before {
  content: "\\e597"; }
.fa-vials::before {
  content: "\\f493"; }
.fa-video::before {
  content: "\\f03d"; }
.fa-video-camera::before {
  content: "\\f03d"; }
.fa-video-slash::before {
  content: "\\f4e2"; }
.fa-vihara::before {
  content: "\\f6a7"; }
.fa-virus::before {
  content: "\\e074"; }
.fa-virus-covid::before {
  content: "\\e4a8"; }
.fa-virus-covid-slash::before {
  content: "\\e4a9"; }
.fa-virus-slash::before {
  content: "\\e075"; }
.fa-viruses::before {
  content: "\\e076"; }
.fa-voicemail::before {
  content: "\\f897"; }
.fa-volcano::before {
  content: "\\f770"; }
.fa-volleyball::before {
  content: "\\f45f"; }
.fa-volleyball-ball::before {
  content: "\\f45f"; }
.fa-volume-high::before {
  content: "\\f028"; }
.fa-volume-up::before {
  content: "\\f028"; }
.fa-volume-low::before {
  content: "\\f027"; }
.fa-volume-down::before {
  content: "\\f027"; }
.fa-volume-off::before {
  content: "\\f026"; }
.fa-volume-xmark::before {
  content: "\\f6a9"; }
.fa-volume-mute::before {
  content: "\\f6a9"; }
.fa-volume-times::before {
  content: "\\f6a9"; }
.fa-vr-cardboard::before {
  content: "\\f729"; }
.fa-w::before {
  content: "\\57"; }
.fa-walkie-talkie::before {
  content: "\\f8ef"; }
.fa-wallet::before {
  content: "\\f555"; }
.fa-wand-magic::before {
  content: "\\f0d0"; }
.fa-magic::before {
  content: "\\f0d0"; }
.fa-wand-magic-sparkles::before {
  content: "\\e2ca"; }
.fa-magic-wand-sparkles::before {
  content: "\\e2ca"; }
.fa-wand-sparkles::before {
  content: "\\f72b"; }
.fa-warehouse::before {
  content: "\\f494"; }
.fa-water::before {
  content: "\\f773"; }
.fa-water-ladder::before {
  content: "\\f5c5"; }
.fa-ladder-water::before {
  content: "\\f5c5"; }
.fa-swimming-pool::before {
  content: "\\f5c5"; }
.fa-wave-square::before {
  content: "\\f83e"; }
.fa-weight-hanging::before {
  content: "\\f5cd"; }
.fa-weight-scale::before {
  content: "\\f496"; }
.fa-weight::before {
  content: "\\f496"; }
.fa-wheat-awn::before {
  content: "\\e2cd"; }
.fa-wheat-alt::before {
  content: "\\e2cd"; }
.fa-wheat-awn-circle-exclamation::before {
  content: "\\e598"; }
.fa-wheelchair::before {
  content: "\\f193"; }
.fa-wheelchair-move::before {
  content: "\\e2ce"; }
.fa-wheelchair-alt::before {
  content: "\\e2ce"; }
.fa-whiskey-glass::before {
  content: "\\f7a0"; }
.fa-glass-whiskey::before {
  content: "\\f7a0"; }
.fa-wifi::before {
  content: "\\f1eb"; }
.fa-wifi-3::before {
  content: "\\f1eb"; }
.fa-wifi-strong::before {
  content: "\\f1eb"; }
.fa-wind::before {
  content: "\\f72e"; }
.fa-window-maximize::before {
  content: "\\f2d0"; }
.fa-window-minimize::before {
  content: "\\f2d1"; }
.fa-window-restore::before {
  content: "\\f2d2"; }
.fa-wine-bottle::before {
  content: "\\f72f"; }
.fa-wine-glass::before {
  content: "\\f4e3"; }
.fa-wine-glass-empty::before {
  content: "\\f5ce"; }
.fa-wine-glass-alt::before {
  content: "\\f5ce"; }
.fa-won-sign::before {
  content: "\\f159"; }
.fa-krw::before {
  content: "\\f159"; }
.fa-won::before {
  content: "\\f159"; }
.fa-worm::before {
  content: "\\e599"; }
.fa-wrench::before {
  content: "\\f0ad"; }
.fa-x::before {
  content: "\\58"; }
.fa-x-ray::before {
  content: "\\f497"; }
.fa-xmark::before {
  content: "\\f00d"; }
.fa-close::before {
  content: "\\f00d"; }
.fa-multiply::before {
  content: "\\f00d"; }
.fa-remove::before {
  content: "\\f00d"; }
.fa-times::before {
  content: "\\f00d"; }
.fa-xmarks-lines::before {
  content: "\\e59a"; }
.fa-y::before {
  content: "\\59"; }
.fa-yen-sign::before {
  content: "\\f157"; }
.fa-cny::before {
  content: "\\f157"; }
.fa-jpy::before {
  content: "\\f157"; }
.fa-rmb::before {
  content: "\\f157"; }
.fa-yen::before {
  content: "\\f157"; }
.fa-yin-yang::before {
  content: "\\f6ad"; }
.fa-z::before {
  content: "\\5a"; }
.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0; }
.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0; }
:root, :host {
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands"; }
@font-face {
  font-family: 'Font Awesome 6 Brands';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2") format("woff2"), url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf") format("truetype"); }
.fab,
.fa-brands {
  font-family: 'Font Awesome 6 Brands';
  font-weight: 400; }
.fa-42-group:before {
  content: "\\e080"; }
.fa-innosoft:before {
  content: "\\e080"; }
.fa-500px:before {
  content: "\\f26e"; }
.fa-accessible-icon:before {
  content: "\\f368"; }
.fa-accusoft:before {
  content: "\\f369"; }
.fa-adn:before {
  content: "\\f170"; }
.fa-adversal:before {
  content: "\\f36a"; }
.fa-affiliatetheme:before {
  content: "\\f36b"; }
.fa-airbnb:before {
  content: "\\f834"; }
.fa-algolia:before {
  content: "\\f36c"; }
.fa-alipay:before {
  content: "\\f642"; }
.fa-amazon:before {
  content: "\\f270"; }
.fa-amazon-pay:before {
  content: "\\f42c"; }
.fa-amilia:before {
  content: "\\f36d"; }
.fa-android:before {
  content: "\\f17b"; }
.fa-angellist:before {
  content: "\\f209"; }
.fa-angrycreative:before {
  content: "\\f36e"; }
.fa-angular:before {
  content: "\\f420"; }
.fa-app-store:before {
  content: "\\f36f"; }
.fa-app-store-ios:before {
  content: "\\f370"; }
.fa-apper:before {
  content: "\\f371"; }
.fa-apple:before {
  content: "\\f179"; }
.fa-apple-pay:before {
  content: "\\f415"; }
.fa-artstation:before {
  content: "\\f77a"; }
.fa-asymmetrik:before {
  content: "\\f372"; }
.fa-atlassian:before {
  content: "\\f77b"; }
.fa-audible:before {
  content: "\\f373"; }
.fa-autoprefixer:before {
  content: "\\f41c"; }
.fa-avianex:before {
  content: "\\f374"; }
.fa-aviato:before {
  content: "\\f421"; }
.fa-aws:before {
  content: "\\f375"; }
.fa-bandcamp:before {
  content: "\\f2d5"; }
.fa-battle-net:before {
  content: "\\f835"; }
.fa-behance:before {
  content: "\\f1b4"; }
.fa-behance-square:before {
  content: "\\f1b5"; }
.fa-bilibili:before {
  content: "\\e3d9"; }
.fa-bimobject:before {
  content: "\\f378"; }
.fa-bitbucket:before {
  content: "\\f171"; }
.fa-bitcoin:before {
  content: "\\f379"; }
.fa-bity:before {
  content: "\\f37a"; }
.fa-black-tie:before {
  content: "\\f27e"; }
.fa-blackberry:before {
  content: "\\f37b"; }
.fa-blogger:before {
  content: "\\f37c"; }
.fa-blogger-b:before {
  content: "\\f37d"; }
.fa-bluetooth:before {
  content: "\\f293"; }
.fa-bluetooth-b:before {
  content: "\\f294"; }
.fa-bootstrap:before {
  content: "\\f836"; }
.fa-bots:before {
  content: "\\e340"; }
.fa-btc:before {
  content: "\\f15a"; }
.fa-buffer:before {
  content: "\\f837"; }
.fa-buromobelexperte:before {
  content: "\\f37f"; }
.fa-buy-n-large:before {
  content: "\\f8a6"; }
.fa-buysellads:before {
  content: "\\f20d"; }
.fa-canadian-maple-leaf:before {
  content: "\\f785"; }
.fa-cc-amazon-pay:before {
  content: "\\f42d"; }
.fa-cc-amex:before {
  content: "\\f1f3"; }
.fa-cc-apple-pay:before {
  content: "\\f416"; }
.fa-cc-diners-club:before {
  content: "\\f24c"; }
.fa-cc-discover:before {
  content: "\\f1f2"; }
.fa-cc-jcb:before {
  content: "\\f24b"; }
.fa-cc-mastercard:before {
  content: "\\f1f1"; }
.fa-cc-paypal:before {
  content: "\\f1f4"; }
.fa-cc-stripe:before {
  content: "\\f1f5"; }
.fa-cc-visa:before {
  content: "\\f1f0"; }
.fa-centercode:before {
  content: "\\f380"; }
.fa-centos:before {
  content: "\\f789"; }
.fa-chrome:before {
  content: "\\f268"; }
.fa-chromecast:before {
  content: "\\f838"; }
.fa-cloudflare:before {
  content: "\\e07d"; }
.fa-cloudscale:before {
  content: "\\f383"; }
.fa-cloudsmith:before {
  content: "\\f384"; }
.fa-cloudversify:before {
  content: "\\f385"; }
.fa-cmplid:before {
  content: "\\e360"; }
.fa-codepen:before {
  content: "\\f1cb"; }
.fa-codiepie:before {
  content: "\\f284"; }
.fa-confluence:before {
  content: "\\f78d"; }
.fa-connectdevelop:before {
  content: "\\f20e"; }
.fa-contao:before {
  content: "\\f26d"; }
.fa-cotton-bureau:before {
  content: "\\f89e"; }
.fa-cpanel:before {
  content: "\\f388"; }
.fa-creative-commons:before {
  content: "\\f25e"; }
.fa-creative-commons-by:before {
  content: "\\f4e7"; }
.fa-creative-commons-nc:before {
  content: "\\f4e8"; }
.fa-creative-commons-nc-eu:before {
  content: "\\f4e9"; }
.fa-creative-commons-nc-jp:before {
  content: "\\f4ea"; }
.fa-creative-commons-nd:before {
  content: "\\f4eb"; }
.fa-creative-commons-pd:before {
  content: "\\f4ec"; }
.fa-creative-commons-pd-alt:before {
  content: "\\f4ed"; }
.fa-creative-commons-remix:before {
  content: "\\f4ee"; }
.fa-creative-commons-sa:before {
  content: "\\f4ef"; }
.fa-creative-commons-sampling:before {
  content: "\\f4f0"; }
.fa-creative-commons-sampling-plus:before {
  content: "\\f4f1"; }
.fa-creative-commons-share:before {
  content: "\\f4f2"; }
.fa-creative-commons-zero:before {
  content: "\\f4f3"; }
.fa-critical-role:before {
  content: "\\f6c9"; }
.fa-css3:before {
  content: "\\f13c"; }
.fa-css3-alt:before {
  content: "\\f38b"; }
.fa-cuttlefish:before {
  content: "\\f38c"; }
.fa-d-and-d:before {
  content: "\\f38d"; }
.fa-d-and-d-beyond:before {
  content: "\\f6ca"; }
.fa-dailymotion:before {
  content: "\\e052"; }
.fa-dashcube:before {
  content: "\\f210"; }
.fa-deezer:before {
  content: "\\e077"; }
.fa-delicious:before {
  content: "\\f1a5"; }
.fa-deploydog:before {
  content: "\\f38e"; }
.fa-deskpro:before {
  content: "\\f38f"; }
.fa-dev:before {
  content: "\\f6cc"; }
.fa-deviantart:before {
  content: "\\f1bd"; }
.fa-dhl:before {
  content: "\\f790"; }
.fa-diaspora:before {
  content: "\\f791"; }
.fa-digg:before {
  content: "\\f1a6"; }
.fa-digital-ocean:before {
  content: "\\f391"; }
.fa-discord:before {
  content: "\\f392"; }
.fa-discourse:before {
  content: "\\f393"; }
.fa-dochub:before {
  content: "\\f394"; }
.fa-docker:before {
  content: "\\f395"; }
.fa-draft2digital:before {
  content: "\\f396"; }
.fa-dribbble:before {
  content: "\\f17d"; }
.fa-dribbble-square:before {
  content: "\\f397"; }
.fa-dropbox:before {
  content: "\\f16b"; }
.fa-drupal:before {
  content: "\\f1a9"; }
.fa-dyalog:before {
  content: "\\f399"; }
.fa-earlybirds:before {
  content: "\\f39a"; }
.fa-ebay:before {
  content: "\\f4f4"; }
.fa-edge:before {
  content: "\\f282"; }
.fa-edge-legacy:before {
  content: "\\e078"; }
.fa-elementor:before {
  content: "\\f430"; }
.fa-ello:before {
  content: "\\f5f1"; }
.fa-ember:before {
  content: "\\f423"; }
.fa-empire:before {
  content: "\\f1d1"; }
.fa-envira:before {
  content: "\\f299"; }
.fa-erlang:before {
  content: "\\f39d"; }
.fa-ethereum:before {
  content: "\\f42e"; }
.fa-etsy:before {
  content: "\\f2d7"; }
.fa-evernote:before {
  content: "\\f839"; }
.fa-expeditedssl:before {
  content: "\\f23e"; }
.fa-facebook:before {
  content: "\\f09a"; }
.fa-facebook-f:before {
  content: "\\f39e"; }
.fa-facebook-messenger:before {
  content: "\\f39f"; }
.fa-facebook-square:before {
  content: "\\f082"; }
.fa-fantasy-flight-games:before {
  content: "\\f6dc"; }
.fa-fedex:before {
  content: "\\f797"; }
.fa-fedora:before {
  content: "\\f798"; }
.fa-figma:before {
  content: "\\f799"; }
.fa-firefox:before {
  content: "\\f269"; }
.fa-firefox-browser:before {
  content: "\\e007"; }
.fa-first-order:before {
  content: "\\f2b0"; }
.fa-first-order-alt:before {
  content: "\\f50a"; }
.fa-firstdraft:before {
  content: "\\f3a1"; }
.fa-flickr:before {
  content: "\\f16e"; }
.fa-flipboard:before {
  content: "\\f44d"; }
.fa-fly:before {
  content: "\\f417"; }
.fa-font-awesome:before {
  content: "\\f2b4"; }
.fa-font-awesome-flag:before {
  content: "\\f2b4"; }
.fa-font-awesome-logo-full:before {
  content: "\\f2b4"; }
.fa-fonticons:before {
  content: "\\f280"; }
.fa-fonticons-fi:before {
  content: "\\f3a2"; }
.fa-fort-awesome:before {
  content: "\\f286"; }
.fa-fort-awesome-alt:before {
  content: "\\f3a3"; }
.fa-forumbee:before {
  content: "\\f211"; }
.fa-foursquare:before {
  content: "\\f180"; }
.fa-free-code-camp:before {
  content: "\\f2c5"; }
.fa-freebsd:before {
  content: "\\f3a4"; }
.fa-fulcrum:before {
  content: "\\f50b"; }
.fa-galactic-republic:before {
  content: "\\f50c"; }
.fa-galactic-senate:before {
  content: "\\f50d"; }
.fa-get-pocket:before {
  content: "\\f265"; }
.fa-gg:before {
  content: "\\f260"; }
.fa-gg-circle:before {
  content: "\\f261"; }
.fa-git:before {
  content: "\\f1d3"; }
.fa-git-alt:before {
  content: "\\f841"; }
.fa-git-square:before {
  content: "\\f1d2"; }
.fa-github:before {
  content: "\\f09b"; }
.fa-github-alt:before {
  content: "\\f113"; }
.fa-github-square:before {
  content: "\\f092"; }
.fa-gitkraken:before {
  content: "\\f3a6"; }
.fa-gitlab:before {
  content: "\\f296"; }
.fa-gitter:before {
  content: "\\f426"; }
.fa-glide:before {
  content: "\\f2a5"; }
.fa-glide-g:before {
  content: "\\f2a6"; }
.fa-gofore:before {
  content: "\\f3a7"; }
.fa-golang:before {
  content: "\\e40f"; }
.fa-goodreads:before {
  content: "\\f3a8"; }
.fa-goodreads-g:before {
  content: "\\f3a9"; }
.fa-google:before {
  content: "\\f1a0"; }
.fa-google-drive:before {
  content: "\\f3aa"; }
.fa-google-pay:before {
  content: "\\e079"; }
.fa-google-play:before {
  content: "\\f3ab"; }
.fa-google-plus:before {
  content: "\\f2b3"; }
.fa-google-plus-g:before {
  content: "\\f0d5"; }
.fa-google-plus-square:before {
  content: "\\f0d4"; }
.fa-google-wallet:before {
  content: "\\f1ee"; }
.fa-gratipay:before {
  content: "\\f184"; }
.fa-grav:before {
  content: "\\f2d6"; }
.fa-gripfire:before {
  content: "\\f3ac"; }
.fa-grunt:before {
  content: "\\f3ad"; }
.fa-guilded:before {
  content: "\\e07e"; }
.fa-gulp:before {
  content: "\\f3ae"; }
.fa-hacker-news:before {
  content: "\\f1d4"; }
.fa-hacker-news-square:before {
  content: "\\f3af"; }
.fa-hackerrank:before {
  content: "\\f5f7"; }
.fa-hashnode:before {
  content: "\\e499"; }
.fa-hips:before {
  content: "\\f452"; }
.fa-hire-a-helper:before {
  content: "\\f3b0"; }
.fa-hive:before {
  content: "\\e07f"; }
.fa-hooli:before {
  content: "\\f427"; }
.fa-hornbill:before {
  content: "\\f592"; }
.fa-hotjar:before {
  content: "\\f3b1"; }
.fa-houzz:before {
  content: "\\f27c"; }
.fa-html5:before {
  content: "\\f13b"; }
.fa-hubspot:before {
  content: "\\f3b2"; }
.fa-ideal:before {
  content: "\\e013"; }
.fa-imdb:before {
  content: "\\f2d8"; }
.fa-instagram:before {
  content: "\\f16d"; }
.fa-instagram-square:before {
  content: "\\e055"; }
.fa-instalod:before {
  content: "\\e081"; }
.fa-intercom:before {
  content: "\\f7af"; }
.fa-internet-explorer:before {
  content: "\\f26b"; }
.fa-invision:before {
  content: "\\f7b0"; }
.fa-ioxhost:before {
  content: "\\f208"; }
.fa-itch-io:before {
  content: "\\f83a"; }
.fa-itunes:before {
  content: "\\f3b4"; }
.fa-itunes-note:before {
  content: "\\f3b5"; }
.fa-java:before {
  content: "\\f4e4"; }
.fa-jedi-order:before {
  content: "\\f50e"; }
.fa-jenkins:before {
  content: "\\f3b6"; }
.fa-jira:before {
  content: "\\f7b1"; }
.fa-joget:before {
  content: "\\f3b7"; }
.fa-joomla:before {
  content: "\\f1aa"; }
.fa-js:before {
  content: "\\f3b8"; }
.fa-js-square:before {
  content: "\\f3b9"; }
.fa-jsfiddle:before {
  content: "\\f1cc"; }
.fa-kaggle:before {
  content: "\\f5fa"; }
.fa-keybase:before {
  content: "\\f4f5"; }
.fa-keycdn:before {
  content: "\\f3ba"; }
.fa-kickstarter:before {
  content: "\\f3bb"; }
.fa-kickstarter-k:before {
  content: "\\f3bc"; }
.fa-korvue:before {
  content: "\\f42f"; }
.fa-laravel:before {
  content: "\\f3bd"; }
.fa-lastfm:before {
  content: "\\f202"; }
.fa-lastfm-square:before {
  content: "\\f203"; }
.fa-leanpub:before {
  content: "\\f212"; }
.fa-less:before {
  content: "\\f41d"; }
.fa-line:before {
  content: "\\f3c0"; }
.fa-linkedin:before {
  content: "\\f08c"; }
.fa-linkedin-in:before {
  content: "\\f0e1"; }
.fa-linode:before {
  content: "\\f2b8"; }
.fa-linux:before {
  content: "\\f17c"; }
.fa-lyft:before {
  content: "\\f3c3"; }
.fa-magento:before {
  content: "\\f3c4"; }
.fa-mailchimp:before {
  content: "\\f59e"; }
.fa-mandalorian:before {
  content: "\\f50f"; }
.fa-markdown:before {
  content: "\\f60f"; }
.fa-mastodon:before {
  content: "\\f4f6"; }
.fa-maxcdn:before {
  content: "\\f136"; }
.fa-mdb:before {
  content: "\\f8ca"; }
.fa-medapps:before {
  content: "\\f3c6"; }
.fa-medium:before {
  content: "\\f23a"; }
.fa-medium-m:before {
  content: "\\f23a"; }
.fa-medrt:before {
  content: "\\f3c8"; }
.fa-meetup:before {
  content: "\\f2e0"; }
.fa-megaport:before {
  content: "\\f5a3"; }
.fa-mendeley:before {
  content: "\\f7b3"; }
.fa-microblog:before {
  content: "\\e01a"; }
.fa-microsoft:before {
  content: "\\f3ca"; }
.fa-mix:before {
  content: "\\f3cb"; }
.fa-mixcloud:before {
  content: "\\f289"; }
.fa-mixer:before {
  content: "\\e056"; }
.fa-mizuni:before {
  content: "\\f3cc"; }
.fa-modx:before {
  content: "\\f285"; }
.fa-monero:before {
  content: "\\f3d0"; }
.fa-napster:before {
  content: "\\f3d2"; }
.fa-neos:before {
  content: "\\f612"; }
.fa-nfc-directional:before {
  content: "\\e530"; }
.fa-nfc-symbol:before {
  content: "\\e531"; }
.fa-nimblr:before {
  content: "\\f5a8"; }
.fa-node:before {
  content: "\\f419"; }
.fa-node-js:before {
  content: "\\f3d3"; }
.fa-npm:before {
  content: "\\f3d4"; }
.fa-ns8:before {
  content: "\\f3d5"; }
.fa-nutritionix:before {
  content: "\\f3d6"; }
.fa-octopus-deploy:before {
  content: "\\e082"; }
.fa-odnoklassniki:before {
  content: "\\f263"; }
.fa-odnoklassniki-square:before {
  content: "\\f264"; }
.fa-old-republic:before {
  content: "\\f510"; }
.fa-opencart:before {
  content: "\\f23d"; }
.fa-openid:before {
  content: "\\f19b"; }
.fa-opera:before {
  content: "\\f26a"; }
.fa-optin-monster:before {
  content: "\\f23c"; }
.fa-orcid:before {
  content: "\\f8d2"; }
.fa-osi:before {
  content: "\\f41a"; }
.fa-padlet:before {
  content: "\\e4a0"; }
.fa-page4:before {
  content: "\\f3d7"; }
.fa-pagelines:before {
  content: "\\f18c"; }
.fa-palfed:before {
  content: "\\f3d8"; }
.fa-patreon:before {
  content: "\\f3d9"; }
.fa-paypal:before {
  content: "\\f1ed"; }
.fa-perbyte:before {
  content: "\\e083"; }
.fa-periscope:before {
  content: "\\f3da"; }
.fa-phabricator:before {
  content: "\\f3db"; }
.fa-phoenix-framework:before {
  content: "\\f3dc"; }
.fa-phoenix-squadron:before {
  content: "\\f511"; }
.fa-php:before {
  content: "\\f457"; }
.fa-pied-piper:before {
  content: "\\f2ae"; }
.fa-pied-piper-alt:before {
  content: "\\f1a8"; }
.fa-pied-piper-hat:before {
  content: "\\f4e5"; }
.fa-pied-piper-pp:before {
  content: "\\f1a7"; }
.fa-pied-piper-square:before {
  content: "\\e01e"; }
.fa-pinterest:before {
  content: "\\f0d2"; }
.fa-pinterest-p:before {
  content: "\\f231"; }
.fa-pinterest-square:before {
  content: "\\f0d3"; }
.fa-pix:before {
  content: "\\e43a"; }
.fa-playstation:before {
  content: "\\f3df"; }
.fa-product-hunt:before {
  content: "\\f288"; }
.fa-pushed:before {
  content: "\\f3e1"; }
.fa-python:before {
  content: "\\f3e2"; }
.fa-qq:before {
  content: "\\f1d6"; }
.fa-quinscape:before {
  content: "\\f459"; }
.fa-quora:before {
  content: "\\f2c4"; }
.fa-r-project:before {
  content: "\\f4f7"; }
.fa-raspberry-pi:before {
  content: "\\f7bb"; }
.fa-ravelry:before {
  content: "\\f2d9"; }
.fa-react:before {
  content: "\\f41b"; }
.fa-reacteurope:before {
  content: "\\f75d"; }
.fa-readme:before {
  content: "\\f4d5"; }
.fa-rebel:before {
  content: "\\f1d0"; }
.fa-red-river:before {
  content: "\\f3e3"; }
.fa-reddit:before {
  content: "\\f1a1"; }
.fa-reddit-alien:before {
  content: "\\f281"; }
.fa-reddit-square:before {
  content: "\\f1a2"; }
.fa-redhat:before {
  content: "\\f7bc"; }
.fa-renren:before {
  content: "\\f18b"; }
.fa-replyd:before {
  content: "\\f3e6"; }
.fa-researchgate:before {
  content: "\\f4f8"; }
.fa-resolving:before {
  content: "\\f3e7"; }
.fa-rev:before {
  content: "\\f5b2"; }
.fa-rocketchat:before {
  content: "\\f3e8"; }
.fa-rockrms:before {
  content: "\\f3e9"; }
.fa-rust:before {
  content: "\\e07a"; }
.fa-safari:before {
  content: "\\f267"; }
.fa-salesforce:before {
  content: "\\f83b"; }
.fa-sass:before {
  content: "\\f41e"; }
.fa-schlix:before {
  content: "\\f3ea"; }
.fa-screenpal:before {
  content: "\\e570"; }
.fa-scribd:before {
  content: "\\f28a"; }
.fa-searchengin:before {
  content: "\\f3eb"; }
.fa-sellcast:before {
  content: "\\f2da"; }
.fa-sellsy:before {
  content: "\\f213"; }
.fa-servicestack:before {
  content: "\\f3ec"; }
.fa-shirtsinbulk:before {
  content: "\\f214"; }
.fa-shopify:before {
  content: "\\e057"; }
.fa-shopware:before {
  content: "\\f5b5"; }
.fa-simplybuilt:before {
  content: "\\f215"; }
.fa-sistrix:before {
  content: "\\f3ee"; }
.fa-sith:before {
  content: "\\f512"; }
.fa-sitrox:before {
  content: "\\e44a"; }
.fa-sketch:before {
  content: "\\f7c6"; }
.fa-skyatlas:before {
  content: "\\f216"; }
.fa-skype:before {
  content: "\\f17e"; }
.fa-slack:before {
  content: "\\f198"; }
.fa-slack-hash:before {
  content: "\\f198"; }
.fa-slideshare:before {
  content: "\\f1e7"; }
.fa-snapchat:before {
  content: "\\f2ab"; }
.fa-snapchat-ghost:before {
  content: "\\f2ab"; }
.fa-snapchat-square:before {
  content: "\\f2ad"; }
.fa-soundcloud:before {
  content: "\\f1be"; }
.fa-sourcetree:before {
  content: "\\f7d3"; }
.fa-speakap:before {
  content: "\\f3f3"; }
.fa-speaker-deck:before {
  content: "\\f83c"; }
.fa-spotify:before {
  content: "\\f1bc"; }
.fa-square-font-awesome:before {
  content: "\\f425"; }
.fa-square-font-awesome-stroke:before {
  content: "\\f35c"; }
.fa-font-awesome-alt:before {
  content: "\\f35c"; }
.fa-squarespace:before {
  content: "\\f5be"; }
.fa-stack-exchange:before {
  content: "\\f18d"; }
.fa-stack-overflow:before {
  content: "\\f16c"; }
.fa-stackpath:before {
  content: "\\f842"; }
.fa-staylinked:before {
  content: "\\f3f5"; }
.fa-steam:before {
  content: "\\f1b6"; }
.fa-steam-square:before {
  content: "\\f1b7"; }
.fa-steam-symbol:before {
  content: "\\f3f6"; }
.fa-sticker-mule:before {
  content: "\\f3f7"; }
.fa-strava:before {
  content: "\\f428"; }
.fa-stripe:before {
  content: "\\f429"; }
.fa-stripe-s:before {
  content: "\\f42a"; }
.fa-studiovinari:before {
  content: "\\f3f8"; }
.fa-stumbleupon:before {
  content: "\\f1a4"; }
.fa-stumbleupon-circle:before {
  content: "\\f1a3"; }
.fa-superpowers:before {
  content: "\\f2dd"; }
.fa-supple:before {
  content: "\\f3f9"; }
.fa-suse:before {
  content: "\\f7d6"; }
.fa-swift:before {
  content: "\\f8e1"; }
.fa-symfony:before {
  content: "\\f83d"; }
.fa-teamspeak:before {
  content: "\\f4f9"; }
.fa-telegram:before {
  content: "\\f2c6"; }
.fa-telegram-plane:before {
  content: "\\f2c6"; }
.fa-tencent-weibo:before {
  content: "\\f1d5"; }
.fa-the-red-yeti:before {
  content: "\\f69d"; }
.fa-themeco:before {
  content: "\\f5c6"; }
.fa-themeisle:before {
  content: "\\f2b2"; }
.fa-think-peaks:before {
  content: "\\f731"; }
.fa-tiktok:before {
  content: "\\e07b"; }
.fa-trade-federation:before {
  content: "\\f513"; }
.fa-trello:before {
  content: "\\f181"; }
.fa-tumblr:before {
  content: "\\f173"; }
.fa-tumblr-square:before {
  content: "\\f174"; }
.fa-twitch:before {
  content: "\\f1e8"; }
.fa-twitter:before {
  content: "\\f099"; }
.fa-twitter-square:before {
  content: "\\f081"; }
.fa-typo3:before {
  content: "\\f42b"; }
.fa-uber:before {
  content: "\\f402"; }
.fa-ubuntu:before {
  content: "\\f7df"; }
.fa-uikit:before {
  content: "\\f403"; }
.fa-umbraco:before {
  content: "\\f8e8"; }
.fa-uncharted:before {
  content: "\\e084"; }
.fa-uniregistry:before {
  content: "\\f404"; }
.fa-unity:before {
  content: "\\e049"; }
.fa-unsplash:before {
  content: "\\e07c"; }
.fa-untappd:before {
  content: "\\f405"; }
.fa-ups:before {
  content: "\\f7e0"; }
.fa-usb:before {
  content: "\\f287"; }
.fa-usps:before {
  content: "\\f7e1"; }
.fa-ussunnah:before {
  content: "\\f407"; }
.fa-vaadin:before {
  content: "\\f408"; }
.fa-viacoin:before {
  content: "\\f237"; }
.fa-viadeo:before {
  content: "\\f2a9"; }
.fa-viadeo-square:before {
  content: "\\f2aa"; }
.fa-viber:before {
  content: "\\f409"; }
.fa-vimeo:before {
  content: "\\f40a"; }
.fa-vimeo-square:before {
  content: "\\f194"; }
.fa-vimeo-v:before {
  content: "\\f27d"; }
.fa-vine:before {
  content: "\\f1ca"; }
.fa-vk:before {
  content: "\\f189"; }
.fa-vnv:before {
  content: "\\f40b"; }
.fa-vuejs:before {
  content: "\\f41f"; }
.fa-watchman-monitoring:before {
  content: "\\e087"; }
.fa-waze:before {
  content: "\\f83f"; }
.fa-weebly:before {
  content: "\\f5cc"; }
.fa-weibo:before {
  content: "\\f18a"; }
.fa-weixin:before {
  content: "\\f1d7"; }
.fa-whatsapp:before {
  content: "\\f232"; }
.fa-whatsapp-square:before {
  content: "\\f40c"; }
.fa-whmcs:before {
  content: "\\f40d"; }
.fa-wikipedia-w:before {
  content: "\\f266"; }
.fa-windows:before {
  content: "\\f17a"; }
.fa-wirsindhandwerk:before {
  content: "\\e2d0"; }
.fa-wsh:before {
  content: "\\e2d0"; }
.fa-wix:before {
  content: "\\f5cf"; }
.fa-wizards-of-the-coast:before {
  content: "\\f730"; }
.fa-wodu:before {
  content: "\\e088"; }
.fa-wolf-pack-battalion:before {
  content: "\\f514"; }
.fa-wordpress:before {
  content: "\\f19a"; }
.fa-wordpress-simple:before {
  content: "\\f411"; }
.fa-wpbeginner:before {
  content: "\\f297"; }
.fa-wpexplorer:before {
  content: "\\f2de"; }
.fa-wpforms:before {
  content: "\\f298"; }
.fa-wpressr:before {
  content: "\\f3e4"; }
.fa-xbox:before {
  content: "\\f412"; }
.fa-xing:before {
  content: "\\f168"; }
.fa-xing-square:before {
  content: "\\f169"; }
.fa-y-combinator:before {
  content: "\\f23b"; }
.fa-yahoo:before {
  content: "\\f19e"; }
.fa-yammer:before {
  content: "\\f840"; }
.fa-yandex:before {
  content: "\\f413"; }
.fa-yandex-international:before {
  content: "\\f414"; }
.fa-yarn:before {
  content: "\\f7e3"; }
.fa-yelp:before {
  content: "\\f1e9"; }
.fa-yoast:before {
  content: "\\f2b1"; }
.fa-youtube:before {
  content: "\\f167"; }
.fa-youtube-square:before {
  content: "\\f431"; }
.fa-zhihu:before {
  content: "\\f63f"; }
:root, :host {
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free"; }
@font-face {
  font-family: 'Font Awesome 6 Free';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2") format("woff2"), url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf") format("truetype"); }
.far,
.fa-regular {
  font-family: 'Font Awesome 6 Free';
  font-weight: 400; }
:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free"; }
@font-face {
  font-family: 'Font Awesome 6 Free';
  font-style: normal;
  font-weight: 900;
  font-display: block;
  src: url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2") format("woff2"), url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf") format("truetype"); }
.fas,
.fa-solid {
  font-family: 'Font Awesome 6 Free';
  font-weight: 900; }
@font-face {
  font-family: "Font Awesome 5 Brands";
  font-display: block;
  font-weight: 400;
  src: url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2") format("woff2"), url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf") format("truetype"); }
@font-face {
  font-family: "Font Awesome 5 Free";
  font-display: block;
  font-weight: 900;
  src: url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2") format("woff2"), url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf") format("truetype"); }
@font-face {
  font-family: "Font Awesome 5 Free";
  font-display: block;
  font-weight: 400;
  src: url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2") format("woff2"), url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf") format("truetype"); }
@font-face {
  font-family: "FontAwesome";
  font-display: block;
  src: url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2") format("woff2"), url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf") format("truetype"); }
@font-face {
  font-family: "FontAwesome";
  font-display: block;
  src: url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2") format("woff2"), url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf") format("truetype"); }
@font-face {
  font-family: "FontAwesome";
  font-display: block;
  src: url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2") format("woff2"), url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf") format("truetype");
  unicode-range: U+F003,U+F006,U+F014,U+F016-F017,U+F01A-F01B,U+F01D,U+F022,U+F03E,U+F044,U+F046,U+F05C-F05D,U+F06E,U+F070,U+F087-F088,U+F08A,U+F094,U+F096-F097,U+F09D,U+F0A0,U+F0A2,U+F0A4-F0A7,U+F0C5,U+F0C7,U+F0E5-F0E6,U+F0EB,U+F0F6-F0F8,U+F10C,U+F114-F115,U+F118-F11A,U+F11C-F11D,U+F133,U+F147,U+F14E,U+F150-F152,U+F185-F186,U+F18E,U+F190-F192,U+F196,U+F1C1-F1C9,U+F1D9,U+F1DB,U+F1E3,U+F1EA,U+F1F7,U+F1F9,U+F20A,U+F247-F248,U+F24A,U+F24D,U+F255-F25B,U+F25D,U+F271-F274,U+F278,U+F27B,U+F28C,U+F28E,U+F29C,U+F2B5,U+F2B7,U+F2BA,U+F2BC,U+F2BE,U+F2C0-F2C1,U+F2C3,U+F2D0,U+F2D2,U+F2D4,U+F2DC; }
@font-face {
  font-family: "FontAwesome";
  font-display: block;
  src: url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-v4compatibility.woff2") format("woff2"), url("../../../styles/assets/@fortawesome/fontawesome-free/webfonts/fa-v4compatibility.ttf") format("truetype");
  unicode-range: U+F041,U+F047,U+F065-F066,U+F07D-F07E,U+F080,U+F08B,U+F08E,U+F090,U+F09A,U+F0AC,U+F0AE,U+F0B2,U+F0D0,U+F0D6,U+F0E4,U+F0EC,U+F10A-F10B,U+F123,U+F13E,U+F148-F149,U+F14C,U+F156,U+F15E,U+F160-F161,U+F163,U+F175-F178,U+F195,U+F1F8,U+F219,U+F250,U+F252,U+F27A; }

`;
