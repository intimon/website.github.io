
// Interactive dot-grid banner effect.

window.initBannerDots = function (canvas, banner) {
    if (!canvas || !banner) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spacing = 26;
    const dotRadius = 1.8;
    const influenceRadius = spacing * 10;
    const maxStretch = spacing;

    let width = 0;
    let height = 0;
    let dots = [];

    let pointer = null;
    let currentPointer = null;
    let strength = 10;
    let animationFrame = null;

    function resizeCanvas() {
        const rect = banner.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = rect.width;
        height = rect.height;

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        dots = [];

        for (let y = spacing / 2; y < height; y += spacing) {
            for (let x = spacing / 2; x < width; x += spacing) {
                dots.push({
                    x,
                    y,
                    length: 0,
                    angle: 0
                });
            }
        }

        draw();
    }
    
    
    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Give all lines rounded ends.
        ctx.lineCap = "round";

        for (const dot of dots) {
            // Draw the permanent white dot.
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();

            let targetLength = 0;

            if (pointer && currentPointer) {
                const dx = currentPointer.x - dot.x;
                const dy = currentPointer.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 0 && distance < influenceRadius) {
                    dot.angle = Math.atan2(dy, dx);

                    if (distance <= maxStretch) {
                        targetLength = distance;
                    } else {
                        targetLength = maxStretch *
                            (1 - (distance - maxStretch) /
                            (influenceRadius - maxStretch));
                    }
                }
            }

            // Grow quickly, retract more slowly.
            const growSpeed = 0.25;
            const retractSpeed = 0.008;

            const speed = targetLength > dot.length
                ? growSpeed
                : retractSpeed;

            dot.length += (targetLength - dot.length) * speed;

            // Draw the line using its remembered direction.
            if (dot.length > 0.1) {
                const endX = dot.x + Math.cos(dot.angle) * dot.length;
                const endY = dot.y + Math.sin(dot.angle) * dot.length;

                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 3.5;
                ctx.stroke();
            }
        }
    }

    function animate() {
        animationFrame = null;

        if (pointer) {
            if (!currentPointer) {
                currentPointer = { ...pointer };
            }

            currentPointer.x += (pointer.x - currentPointer.x) * 0.18;
            currentPointer.y += (pointer.y - currentPointer.y) * 0.18;
        }

        draw();

        // Keep animating until all trailing lines have disappeared.
        const hasTrail = dots.some(dot => dot.length > 0.1);

        if (pointer || hasTrail) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            currentPointer = null;
            draw();
        }
    }

    function requestAnimation() {
        if (!animationFrame) {
            animationFrame = requestAnimationFrame(animate);
        }
    }

    
    // Track the cursor across the entire browser window.
    window.addEventListener("pointermove", event => {
        const rect = banner.getBoundingClientRect();

        pointer = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };

        requestAnimation();
    });

    // Retract the lines when the cursor leaves the browser.
    document.addEventListener("pointerout", event => {
        if (!event.relatedTarget) {
            pointer = null;
            requestAnimation();
        }
    });

    // Also retract if the browser window loses focus.
    window.addEventListener("blur", () => {
        pointer = null;
        requestAnimation();
    });


    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(banner);

    resizeCanvas();
};
