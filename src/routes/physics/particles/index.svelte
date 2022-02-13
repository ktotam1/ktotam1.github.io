<script>
import { onMount } from "svelte";
let g = {x: 0, y: 0}
let restitution = 1
let click = 20000

function mouseClickHandler(e){
    for(let i = 0; i<particles.length; i++){
        let p = particles[i];
        let v = {x:   p.x - e.clientX, y:  p.y - e.clientY};
        let dist = Math.sqrt(v.x*v.x+v.y*v.y)
        p.vx += v.x / (dist * dist) * click;
        p.vy += v.y / (dist * dist) * 2*click;

    }
}


function mouseMoveHandler(e){
    for(let i = 0; i<particles.length; i++){
        let p = particles[i];
        let v = {x:   p.x - e.clientX, y:  p.y - e.clientY};
        let dist = Math.sqrt(v.x*v.x+v.y*v.y)
        p.vx -= v.x / (dist*dist) * 10000;
        p.vy -= v.y / (dist*dist) * 20000;

    }
}

class Particle {
    constructor(context, x, y, vx, vy, r){
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.isColliding = false;
        this.radius = r;
        this.mass = r; //all objects have the same density
        this.nan = false;
    }

    draw(){
        this.context.fillStyle = this.nan ?  'red' : '#000000';
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.radius, 0, 2* Math.PI, false);
        this.context.fill()
    }

    update(timePassed){
        this.vy += g.y * timePassed;
        this.vx += g.x * timePassed;
        this.x += this.vx * timePassed;
        this.y +=  this.vy * timePassed;

    }
}



function nextInt(max){
    return Math.floor(Math.random()*max - max / 2) 
}

function nextPos(max){
    return Math.floor(Math.random() * (max-1))+1
}


function isColliding(one, two){
    let squareDistance = (one.x-two.x)*(one.x-two.x) + (one.y-two.y)*(one.y-two.y);
    return squareDistance <= (one.radius+two.radius)*(one.radius+two.radius)
}

let canvas;

let particles = []

for(let i = 0; i < 1000; i++){
    particles.push(new Particle(null, nextPos(450), nextPos(450), nextInt(100), nextInt(500), nextPos(6)));
}
onMount(()=>{
    const context = canvas.getContext('2d')
   
    for(let i = 0; i < particles.length; i++){
        particles[i].context = context;
    }

    function detectCollisions(particles){
        let one;
        let two;

        for(const p of particles){
            p.isColliding = false;
        }

        for(let i = 0; i < particles.length; i++){
            one = particles[i];
            for(let j = i + 1; j < particles.length; j++){
                two = particles[j]
                if(isColliding(one,two)){
                    one.isColliding = true;
                    two.isColliding = true;

                    let vCollision = {x: two.x - one.x, y: two.y-one.y};
                    let distance = Math.sqrt((two.x-one.x)*(two.x-one.x)+(two.y-one.y)*(two.y-one.y));
                    let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                    let vRelativeVelocity = {x: one.vx - two.vx, y: one.vy - two.vy};
                    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
                    if(speed < 0) {break;}
                    let impulse = 2 * speed / (one.mass + two.mass);
                    one.vx -= (impulse * two.mass * vCollisionNorm.x) * restitution;
                    one.vy -= (impulse * two.mass * vCollisionNorm.y) * restitution;
                    two.vx += (impulse * one.mass * vCollisionNorm.x) * restitution;
                    two.vy += (impulse * one.mass * vCollisionNorm.y) * restitution;
                }
            }
        }
    }
    function detectEdgeCollision(particles){
        let obj;
        for(let i = 0; i < particles.length; i++){
            obj = particles[i];
            if (obj.x < obj.radius){
                obj.vx = Math.abs(obj.vx) * restitution;
                obj.x = obj.radius;
            }else if (obj.x > canvas.width - obj.radius){
                obj.vx = -Math.abs(obj.vx) * restitution;
                obj.x = canvas.width - obj.radius;
            }  
            // Check for bottom and top
            if (obj.y < obj.radius){
                obj.vy = Math.abs(obj.vy) * restitution;
                obj.y = obj.radius;
            } else if (obj.y > canvas.height - obj.radius){
                obj.vy = -Math.abs(obj.vy) * restitution;
                obj.y = canvas.height - obj.radius;
            }
        }
    }


    let oldTimeStamp = 0;

    function update(time){
        for(let i = 0; i < particles.length; i++){
            let p = particles[i];
            p.update(time);
        }
        detectCollisions(particles);
        detectEdgeCollision(particles);

    }

    function draw(){
        context.clearRect(0,0,canvas.width, canvas.height)
        for(const p of particles){
            p.draw();
        }        
    }

    function loop(time){
        let timePassed = (time - oldTimeStamp) / 1000   
        oldTimeStamp = time;
        timePassed = Math.min(timePassed, .1)
        update(timePassed);
        draw();
        window.requestAnimationFrame(loop);

    }

    loop(0);
})



</script>
<!-- <svelte:window on:mousedown={mouseClickHandler} /> -->
<canvas on:mousedown={mouseClickHandler}  bind:this={canvas} width={500} height={500}>
</canvas> 
<div>
    <h1>restitution: {restitution}</h1>
    <input type="range" bind:value={restitution} min=.1 max=1 step=.1 />
</div>
<div>
    <h1>y-gravity: {g.y}</h1>
    <input type="range" bind:value={g.y} min=-1000 max=1000 step=100 />
</div>
<div>
    <h1>x-gravity: {g.x}</h1>
    <input type="range" bind:value={g.x} min=-1000 max=1000 step=100 />
</div>
<div>
    <h1>click-strength: {click}</h1>
    <input type="range" bind:value={click} min=-50000 max=50000 step=1000 />
</div>