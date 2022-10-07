class gNotify {
    static container = () => {
        let e = document.createElement('div');
        e.id = 'gNotify_container';
        e.style.position = 'fixed';
        e.style.display = 'grid';
        e.style.gap = '10px';
        e.style.padding = 0;
        e.style.bottom = '20px';
        e.style.left = '20px';
        e.style.spacing = '5px';
        e.style.height = 'max-content';
        e.style.zIndex = 999999;
        return e;
    }
    static template(title, icon, body, timeout, clicked) {
        let a = document.createElement('a');
        a.style.fontFamily = 'Poppins,sans-serif';
        a.style.width = '320px';
        a.style.margin = 0;
        a.style.padding = 0;
        a.style.backgroundColor = 'rgba(0, 166, 90, 1)';
        a.style.backdropFilter = 'blur(40px)';
        a.style.borderRadius = '7.5px';
        a.style.display = 'block';
        a.style.userSelect = 'none';
        a.style.color = '#ffffff';
        a.style.cursor = 'pointer';
        a.style.transition = '0.25s';

        let table = document.createElement('table');
        table.style.borderSpacing = '0';

        let tbody = document.createElement('tbody');

        let tr1 = document.createElement('tr');

        let td00 = document.createElement('td');
        td00.rowSpan = 2;
        td00.style.padding = '10px 10px 10px 15px';
        td00.style.verticalAlign = 'middle';

        let img = document.createElement('img');
        img.src = icon;
        img.width = 30;
        img.height = 30;
        img.style.margin = 0;

        td00.innerHTML = img.outerHTML;

        tr1.append(td00);

        let td01 = document.createElement('td');
        td01.style.padding = '10px 15px 5px 0px';

        var span = document.createElement('span');
        span.style.display = 'block';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '14px';
        span.style.letterSpacing = 'normal !important';
        span.style.width = '240px';
        span.style.whiteSpace = 'nowrap';
        span.style.textOverflow = 'ellipsis';
        span.style.overflow = 'hidden';
        span.innerText = title;

        td01.innerHTML = span.outerHTML;
        tr1.append(td01);

        tbody.append(tr1);

        let tr2 = document.createElement('tr');

        let td11 = document.createElement('td');

        td11.style.padding = '0px 15px 10px 0px';

        var span = document.createElement('span');
        span.style.display = 'block';
        span.style.fontSize = '14px';
        span.style.letterSpacing = 'normal !important';
        span.style.color = 'rgba(255, 255, 255, 0.75)';
        span.style.textOverflow = 'none';
        span.style.wordWrap = 'break-word';
        span.innerText = body;

        td11.innerHTML = span.outerHTML;

        tr2.innerHTML = td11.outerHTML;
        tbody.append(tr2);

        table.innerHTML = tbody.outerHTML;
        a.innerHTML = table.outerHTML;

        a.addEventListener('click', function () {
            clicked();
            a.style.opacity = 0;
            setTimeout(() => {
                a.remove();
            }, 250);
        });
        setTimeout(() => {
            a.style.opacity = 0;
            setTimeout(() => {
                a.remove();
            }, 250);
        }, timeout);

        return a;
    }

    static add({
        title = 'Notificación de gNotify',
        icon = 'https://sode.me/assets/logos/sode.svg',
        body = 'Propiedad de SoDe World',
        timeout = 8000,
        clicked = () => { console.log('Has hecho clic sobre la notificación de SoDe') }
    } = {}) {
        if (!document.getElementById('gNotify_container')) {
            document.body.appendChild(this.container());
        }
        let div = document.getElementById('gNotify_container');
        div.prepend(this.template(title, icon, body, timeout, clicked));
    }
}