const button = document.querySelector(".btn-primary");
// const btn_connect = document.getElementById("btn")

// btn_connect.addEventListener('click',(e)=>{
//     console.log('Hello connect')
// })
// const canvas = document.getElementById('dataStream');
// const ctx = canvas.getContext('2d');

// let width, height, columns;
// const fontSize = 14;
// const characters = "0123456789ABCDEFHIJKLMNOPQRSTUVXYZ@#$%^&*";
// let drops = [];

// // Initialize Canvas
// function init() {
//     width = canvas.width = window.innerWidth;
//     height = canvas.height = window.innerHeight;
//     columns = Math.floor(width / fontSize);
//     drops = [];
//     for (let i = 0; i < columns; i++) {
//         drops[i] = Math.random() * -100; // Random starting positions
//     }
// }

// function draw() {
//     // This creates the "trail" effect by painting a faint black rectangle every frame
//     ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
//     ctx.fillRect(0, 0, width, height);

//     ctx.font = fontSize + "px monospace";

//     for (let i = 0; i < drops.length; i++) {
//         // Pick a random character
//         const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
//         // Randomly make some characters brighter (Data Packets)
//         const isBright = Math.random() > 0.98;
//         ctx.fillStyle = isBright ? "#fff" : "rgba(0,255,136,0.1)"; // White or Data Green
        
//         if (isBright) {
//             ctx.shadowBlur = 10;
//             ctx.shadowColor = "rgba(0,255,136,0.1)";
//         } else {
//             ctx.shadowBlur = 0;
//         }

//         const x = i * fontSize;
//         const y = drops[i] * fontSize;

//         ctx.fillText(text, x, y);

//         // Reset drop to top randomly after it hits bottom
//         if (y > height && Math.random() > 0.975) {
//             drops[i] = 0;
//         }

//         drops[i]++;
//     }
// }



button.addEventListener("mouseenter", () => {
    gsap.to('#cursor', {
        scale: 4, // Make cursor much larger
         mixBlendMode:'difference',
        
        border:'none',
        backgroundColor: "#00ff88", // White works best for "difference" inversion
        duration: 0.3
    });
});

button.addEventListener("mouseleave", () => {
    gsap.to('#cursor', {
        scale: 1, // Return to normal size
         filter: 'invert(0)',
         mixBlendMode:'none',

        border: '2px solid #00ff88',

        backgroundColor: "transparent", // Return to green
        duration: 0.3
    });
});


document.getElementById('explore_btn').addEventListener("mouseenter", () => {
    gsap.to('#cursor', {
        scale: 4, // Make cursor much larger
         mixBlendMode:'difference',
        
        border:'none',
        backgroundColor: "#00ff88", // White works best for "difference" inversion
        duration: 0.3
    });
});

document.getElementById('explore_btn').addEventListener("mouseleave", () => {
    gsap.to('#cursor', {
        scale: 1, // Return to normal size
         filter: 'invert(0)',
         mixBlendMode:'none',

        border: '2px solid #00ff88',

        backgroundColor: "transparent", // Return to green
        duration: 0.3
    });
});




window.addEventListener('mousemove', (e) => {
            gsap.to('#cursor', {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.6,
                ease: "power2.out"
            });
        });

        // --- INTRO TIMELINE ---
        const tl = gsap.timeline();

        // 1. Jitter the bars immediately
        gsap.to(".bar", {
            height: () => Math.floor(Math.random() * 100 + 20) + "px",
            duration: 0.15,
            repeat: -1,
            yoyo: true,
            stagger: 0.05,
            ease: "none"
        });

        // 2. Change status text periodically
        const statusMsg = document.getElementById('status');
        setTimeout(() => { statusMsg.innerText = "Processing Datasets..."; }, 1000);
        setTimeout(() => { statusMsg.innerText = "Generating UI Elements..."; }, 2200);

        // 3. Percentage Counter and Exit
        tl.to("#count", {
            innerText: 100,
            duration: 3.5,
            snap: { innerText: 1 },
            ease: "power1.inOut"
        })
        .to("#loader", {
            yPercent: -100,
            duration: 1.5,
            ease: "expo.inOut"
        })
        .to("#portfolio", {
            autoAlpha: 1, // Fades in and sets visibility: visible
            y: -30,
            duration: 1.5,
            ease: "power4.out"
        }, "-=1"); // Overlap with loader exit
        
        // Stop the bar animation when loader is gone to save CPU
        tl.add(() => {
            gsap.killTweensOf(".bar");
            document.body.style.overflow = "auto"; // Re-enable scroll
        });



//         window.addEventListener('resize', init);
// init();

// // Use GSAP to drive the animation loop for perfectly smooth frames
// gsap.ticker.add(draw);

// let mouse = { x: 0, y: 0 };
// window.addEventListener('mousemove', (e) => {
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;
// });

// // Update the draw function logic for mouse interaction:
// // Inside the for loop:
// const dx = (i * fontSize) - mouse.x;
// const dy = (drops[i] * fontSize) - mouse.y;
// const distance = Math.sqrt(dx*dx + dy*dy);

// if (distance < 100) {
//     // If mouse is near, "glitch" the character or skip the frame
//     ctx.fillStyle = "#ff0055"; // Red alert color
// }



// connect me

const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const overlay = document.getElementById('modalOverlay');
const modalBox = document.querySelector('.modal-content');

// Create a reusable GSAP timeline for the modal
const modalTl = gsap.timeline({ paused: true });

modalTl.to(overlay, { 
    autoAlpha: 1, 
    duration: 0.4 
})
.from(modalBox, { 
    y: 50, 
    scale: 0.9, 
    skewX: 5, // Adds a slight digital glitch feel
    duration: 0.5, 
    ease: "power4.out" 
}, "-=0.2");

// Trigger Open
openBtn.addEventListener('click', () => {
    modalTl.play();
});

// Trigger Close
closeBtn.addEventListener('click', () => {
    modalTl.reverse();
});

// Close on clicking outside the box
overlay.addEventListener('click', (e) => {
    if(e.target === overlay) modalTl.reverse();
});


const svg = document.getElementById('data-ribbon');
const fluxDisplay = document.getElementById('flux-val');
const numLines = 15; // Number of "strands" in the ribbon
const paths = [];

// 1. Create multiple paths for the 3D ribbon effect
for (let i = 0; i < numLines; i++) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "ribbon-path");
    svg.appendChild(path);
    paths.push(path);
}

let time = 0;

function animate() {
    time += 0.02;
    
    // Update data stats for realism
    fluxDisplay.innerText = (Math.sin(time) * 10).toFixed(3);

    paths.forEach((path, i) => {
        const offset = i * 15; // Offset each line slightly to create 3D depth
        let d = `M 0 ${500 + offset}`; // Start at left-center

        // Generate a complex wave using multiple Sine functions
        for (let x = 0; x <= 1000; x += 20) {
            const y = 500 + 
                Math.sin(x * 0.005 + time + (i * 0.1)) * 150 + 
                Math.cos(x * 0.01 - time * 0.5) * 50;
            
            d += ` L ${x} ${y + offset}`;
        }

        path.setAttribute("d", d);
        
        // Dynamically change opacity based on wave position (pseudo-lighting)
        const opacity = 0.1 + (Math.sin(time + i) * 0.3 + 0.3);
        path.style.opacity = opacity;
    });

    requestAnimationFrame(animate);
}

animate();


window.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth) - 0.5;
    const yPos = (e.clientY / window.innerHeight) - 0.5;

    // Tilt the entire container in 3D
    gsap.to("#data-ribbon", {
        rotationY: xPos * 20,
        rotationX: -yPos * 20,
        x: xPos * 50,
        y: yPos * 50,
        duration: 1,
        ease: "power2.out",
        transformPerspective: 1000
    });
    
    // Change the "glow" intensity based on mouse speed
    gsap.to(".ribbon-path", {
        strokeWidth: 2 + Math.abs(xPos * 5),
        duration: 0.2
    });
});


const marqueeContent = document.querySelector('.marquee-content');

// Create the infinite horizontal scroll
const marquee = gsap.to(marqueeContent, {
    xPercent: -50, // Move half its width (since we duplicated items)
    ease: "none",
    duration: 20, // Adjust for speed
    repeat: -1
});

// Interactive: Slow down or pause on hover
marqueeContent.addEventListener("mouseenter", () => {
    gsap.to(marquee, { timeScale: 0.2, duration: 0.5 }); // Slows to 20% speed
});

marqueeContent.addEventListener("mouseleave", () => {
    gsap.to(marquee, { timeScale: 1, duration: 0.5 }); // Returns to normal
});





// gsap.registerPlugin(ScrollTrigger);

// const rows = document.querySelectorAll(".collab-row");

// rows.forEach((row) => {
//     const title = row.querySelector("h3");
//     const content = row.querySelector(".row-content");

//     const tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: row,
//             start: "top 85%",
//             toggleActions: "play none none reverse"
//         }
//     });

//     tl.from(title, {
//         x: -20,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.out"
//     })
//     .from(content, {
//         y: 20,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.out"
//     }, "-=0.6");
    
//     // Hover effect using GSAP for buttery smooth scaling
//     row.addEventListener("mouseenter", () => {
//         gsap.to(row, { x: 10, backgroundColor: "rgba(0, 255, 136, 0.02)", duration: 0.3 });
//     });
//     row.addEventListener("mouseleave", () => {
//         gsap.to(row, { x: 0, backgroundColor: "transparent", duration: 0.3 });
//     });
// });




gsap.registerPlugin(ScrollTrigger);

const rows = document.querySelectorAll(".collab-row");

rows.forEach((row) => {
    const title = row.querySelector("h3");
    const content = row.querySelector(".row-content");

    // General Reveal Animation (Works on all devices)
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: row,
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });

    tl.from(title, {
        x: -15,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    })
    .from(content, {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4");
    
    // Desktop-Only Hover Effects
    // We check if the screen is wider than 768px before applying hover
    row.addEventListener("mouseenter", () => {
        if (window.innerWidth >= 768) {
            gsap.to(row, { x: 10, backgroundColor: "rgba(0, 255, 136, 0.03)", duration: 0.3 });
        }
    });

    row.addEventListener("mouseleave", () => {
        if (window.innerWidth >= 768) {
            gsap.to(row, { x: 0, backgroundColor: "transparent", duration: 0.3 });
        }
    });
});


function updateTime() {
    const now = new Date();
    
    // Create a formatter specifically for IST (Asia/Kolkata)
    const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Set to true if you want AM/PM format
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const timeString = formatter.format(now);
    
    document.getElementById('ist-time').innerText = timeString;
}

// Update every second
setInterval(updateTime, 1000);
updateTime(); // Run immediately on load



