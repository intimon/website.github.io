
// Interactive dot-grid banner effect.

window.initBannerDots = function (canvas, banner) {
    if (!canvas || !banner) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Grid settings.
    const spacing = 20;
    const dotRadius = 1.8;
    const influenceRadius = spacing * 5;
    const maxStretch = spacing;

    let width = 0;
    let height = 0;
    let dots = [];

    // Cursor settings.
    let pointer = null;
    let currentPointer = null;
    let animationFrame = null;

    // Click ripple settings.
    let waves = [];

    // Gradient settings.
    const gradientRadius = 50;
    const gradientColor = "rgba(0, 25, 75, 0.40)";

    // Dot colours.
    const dotColorFar = { r: 20, g: 65, b: 120 };
    const dotColorNear = { r: 255, g: 255, b: 255 };

    // Line animation settings.
    const growSpeed = 0.25;
    const retractSpeed = 0.1;
    const lineWidth = 3.5;

    // Ripple settings.
    const rippleDuration = 1500;
    const rippleMaxRadius = influenceRadius * 3.3;

    // Main ripple settings.
    const mainRipple = {
        delay: 0,
        radiusMultiplier: 1,
        strength: 1,
        trailWidth: spacing * 7,
        frontWidth: spacing * 1.5
    };

    // Smaller following ripple settings.
    const smallRipple = {
        delay: 220,
        radiusMultiplier: 0.65,
        strength: 0.65,
        trailWidth: spacing * 5,
        frontWidth: spacing
    };

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

        const now = performance.now();

        // Draw the cursor-following dark-blue gradient.
        if (currentPointer && pointer) {
            const gradient = ctx.createRadialGradient(
                currentPointer.x,
                currentPointer.y,
                0,
                currentPointer.x,
                currentPointer.y,
                gradientRadius
            );

            gradient.addColorStop(0, gradientColor);
            gradient.addColorStop(1, "rgba(0, 25, 75, 0)");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }

        // Rounded line ends.
        ctx.lineCap = "round";

        for (const dot of dots) {

            // Calculate the influence of click ripples on this dot.
            let rippleInfluence = 0;

            for (const wave of waves) {
                const elapsed = now - wave.startTime;

                if (elapsed < 0 || elapsed >= wave.duration) continue;

                const progress = elapsed / wave.duration;

                // Expand the wave outwards.
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const waveRadius = wave.maxRadius * easedProgress;

                const dx = dot.x - wave.x;
                const dy = dot.y - wave.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const behindWave = waveRadius - distance;

                // Create a fading trail behind the moving wave.
                let influence;

                if (behindWave >= 0) {
                    influence = Math.max(
                        0,
                        1 - behindWave / wave.trailWidth
                    );
                } else {
                    influence = Math.max(
                        0,
                        1 + behindWave / wave.frontWidth
                    );
                }

                // Fade the ripple based on distance from the click.
                const distanceProgress = Math.min(
                    distance / wave.maxRadius,
                    1
                );

                const decay = Math.pow(
                    1 - distanceProgress,
                    0.6
                );

                // Apply individual ripple strength.
                const fadedInfluence =
                    influence * decay * wave.strength;

                rippleInfluence = Math.max(
                    rippleInfluence,
                    fadedInfluence
                );
            }

            // Calculate magnetic cursor influence for dot colour.
            const magneticInfluence = Math.min(
                dot.length / maxStretch,
                1
            );

            // Combine magnetic and ripple colour influence.
            const rawProgress = Math.max(
                magneticInfluence,
                rippleInfluence
            );

            // Smooth colour transition.
            const colorProgress =
                rawProgress * rawProgress *
                (3 - 2 * rawProgress);

            const r = Math.round(
                dotColorFar.r +
                (dotColorNear.r - dotColorFar.r) * colorProgress
            );

            const g = Math.round(
                dotColorFar.g +
                (dotColorNear.g - dotColorFar.g) * colorProgress
            );

            const b = Math.round(
                dotColorFar.b +
                (dotColorNear.b - dotColorFar.b) * colorProgress
            );

            // Draw the dot.
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 5);
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fill();

            // Calculate magnetic cursor influence.
            let magneticLength = 0;

            if (currentPointer) {
                const dx = currentPointer.x - dot.x;
                const dy = currentPointer.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 0) {
                    // Always point towards the cursor.
                    dot.angle = Math.atan2(dy, dx);

                    // Calculate normal magnetic line length.
                    if (pointer && distance < influenceRadius) {
                        if (distance <= maxStretch) {
                            magneticLength = distance;
                        } else {
                            magneticLength = maxStretch *
                                (1 - (distance - maxStretch) /
                                (influenceRadius - maxStretch));
                        }
                    }
                }
            }

            // Line length is controlled exclusively by the cursor.
            const targetLength = magneticLength;

            // Grow quickly and retract more slowly.
            const speed = targetLength > dot.length
                ? growSpeed
                : retractSpeed;

            dot.length +=
                (targetLength - dot.length) * speed;

            // Draw the magnetic line.
            if (dot.length > 0.1) {
                const endX =
                    dot.x + Math.cos(dot.angle) * dot.length;

                const endY =
                    dot.y + Math.sin(dot.angle) * dot.length;

                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(endX, endY);

                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = lineWidth;
                ctx.stroke();
            }
        }
    }

    function animate() {
        animationFrame = null;

        // Smooth cursor movement.
        if (pointer) {
            if (!currentPointer) {
                currentPointer = { ...pointer };
            }

            currentPointer.x +=
                (pointer.x - currentPointer.x) * 0.18;

            currentPointer.y +=
                (pointer.y - currentPointer.y) * 0.18;
        }

        // Remove completed ripples.
        const now = performance.now();

        waves = waves.filter(wave =>
            now < wave.startTime + wave.duration
        );

        draw();

        // Continue while cursor, lines or ripples are active.
        const hasTrail = dots.some(dot => dot.length > 0.1);
        const hasWaves = waves.length > 0;

        if (pointer || hasTrail || hasWaves) {
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

    // Track cursor across the entire browser.
    window.addEventListener("pointermove", event => {
        const rect = banner.getBoundingClientRect();

        pointer = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };

        requestAnimation();
    });

    // Create a main ripple followed by a smaller ripple.
    window.addEventListener("pointerdown", event => {
        if (event.button !== 0) return;

        const rect = banner.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const startTime = performance.now();

        // Main bright ripple.
        waves.push({
            x,
            y,
            startTime: startTime + mainRipple.delay,
            duration: rippleDuration,
            maxRadius: rippleMaxRadius * mainRipple.radiusMultiplier,
            strength: mainRipple.strength,
            trailWidth: mainRipple.trailWidth,
            frontWidth: mainRipple.frontWidth
        });

        // Smaller ripple following behind.
        waves.push({
            x,
            y,
            startTime: startTime + smallRipple.delay,
            duration: rippleDuration,
            maxRadius: rippleMaxRadius * smallRipple.radiusMultiplier,
            strength: smallRipple.strength,
            trailWidth: smallRipple.trailWidth,
            frontWidth: smallRipple.frontWidth
        });

        requestAnimation();
    });

    // Retract lines when cursor leaves the browser.
    document.addEventListener("pointerout", event => {
        if (!event.relatedTarget) {
            pointer = null;
            requestAnimation();
        }
    });

    // Retract lines when browser loses focus.
    window.addEventListener("blur", () => {
        pointer = null;
        requestAnimation();
    });

    // Resize canvas when banner dimensions change.
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(banner);

    resizeCanvas();
};
