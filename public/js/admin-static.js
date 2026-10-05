/*
 * VIEW-ONLY MODE.
 * Blocks every form submit so buttons look right but do nothing.
 * DELETE THIS FILE (and its <script> tags) when you wire up real controllers.
 */
document.addEventListener("submit", function (event) {
    event.preventDefault();
    console.info("[admin view-only] form submit blocked");
});
