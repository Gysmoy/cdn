class gClipboard {
    static copy = (element, callback = () => { }, fallback = () => { }) => {
        let g_copy = element.getAttribute('g-copy');
        let span = document.createElement('span');
        span.id = 'g-3d3fb146';
        span.innerText = g_copy;
        document.body.appendChild(span);
        let tocopy = document.getElementById('g-3d3fb146');
        let selection = document.createRange();
        selection.selectNodeContents(tocopy);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(selection);
        let res = document.execCommand('copy');
        document.body.removeChild(span);
        window.getSelection().removeRange(selection);
        if (res) {
            callback();
        } else {
            fallback();
        }
    }
    static paste = (selector, callback = () => { }) => {
        document.querySelector(selector).addEventListener('paste', function (event) {
            let files = event.clipboardData.files;
            if (files.length) {
                event.preventDefault();
                let file = files[0];
                callback(file);
            } else {
                callback(null);
            }
        })
    }
}