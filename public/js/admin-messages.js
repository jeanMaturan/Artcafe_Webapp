/*
 * Messenger-style thread viewer for admin/messages.html.twig.
 * Ported from JS/script.js with the backend parts removed:
 *   - no fetch() to mark a thread as read
 *   - no sessionStorage to remember the open thread
 * Opening a thread only changes how the page looks.
 */
(function () {
    var app = document.querySelector(".msgr-app");
    if (!app) { return; }

    var items = app.querySelectorAll(".msgr-list-item");
    var panels = app.querySelectorAll(".msgr-panel");
    var placeholder = app.querySelector(".msgr-placeholder");

    function openThread(id) {
        items.forEach(function (i) { i.classList.toggle("active", i.dataset.messageId === String(id)); });
        panels.forEach(function (p) { p.classList.toggle("active", p.dataset.messageId === String(id)); });
        if (placeholder) { placeholder.classList.remove("active"); }
        app.classList.add("chat-open");

        // Visual only: clear the unread dot and lower the badge count.
        var item = app.querySelector('.msgr-list-item[data-message-id="' + id + '"]');
        if (item && item.classList.contains("unread")) {
            item.classList.remove("unread");
            var badge = document.querySelector(".msgr-unread-badge");
            if (badge) {
                var left = Math.max(0, parseInt(badge.dataset.count || "0", 10) - 1);
                badge.dataset.count = left;
                badge.textContent = left + " unread";
                if (left === 0) { badge.style.display = "none"; }
            }
        }
    }

    function closeThread() {
        app.classList.remove("chat-open");
        panels.forEach(function (p) { p.classList.remove("active"); });
        items.forEach(function (i) { i.classList.remove("active"); });
        if (placeholder) { placeholder.classList.add("active"); }
    }

    items.forEach(function (i) { i.addEventListener("click", function () { openThread(i.dataset.messageId); }); });
    app.querySelectorAll(".msgr-back-btn").forEach(function (b) { b.addEventListener("click", closeThread); });
})();
