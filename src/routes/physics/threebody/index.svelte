<script>
import { onMount } from "svelte";
import { loop } from "svelte/internal";

    

    function nextInt(max){
        return Math.floor(Math.random()*max - max / 2) 
    }

    function nextPos(max){
        return Math.floor(Math.random() * (max-1))+1
    }


    class Planet {
        constructor(context,x,y,vx,vy,r,m){
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.ax = 0;
            this.ay = 0;
            this.r = r;
            this.m = m;
            this.context = context;
            this.v = {x: 1, y: 1}
        }

        draw(){
            this.context.fillStyle = 'red';
            this.context.beginPath()
            this.context.arc(this.x, this.y, this.r, 0, 2* Math.PI, false);
            this.context.fill()
            this.context.fillStyle = 'black';
            this.context.beginPath()
            this.context.moveTo(this.x,this.y)
            this.context.lineTo(this.x + this.ax, this.y + this.ay)
            this.context.stroke();
        }
    }

    let canvas;
    let planets = [];
    let G = 10000;

    planets.push(new Planet(null, 100), 100, 0, 10, 10, 10);


    onMount(()=>{
        let context = canvas.getContext('2d')
        for(let p of planets){
            p.context = context;
        }

        function gravity(planets){
            for(let i = 0; i < planets.length; i++){
                let one = planets[i];
                for(let j = i+1; j < planets.length; j++){
                    let two = planets[j];
                    let v = {x: one.x-two.x, y: one.y-two.y}
                    let dist = Math.sqrt(v.x*v.x + v.y*v.y)
                    v = {x: -1* v.x / dist, y: -1* v.y / dist}
                    one.v = v;
                    two.v = {x: -1*v.x, y: -1*v.y};
                    one.ax = v.x * G *  two.m / (dist*dist)
                    one.ay = v.y * G * two.m / (dist*dist)  
                    two.ax = -1* v.x * G * one.m  / (dist*dist)
                    two.ay = -1* v.y * G * one.m  / (dist*dist) 
                }
            }
        }

        function detectEdgeCollision(particles){
            let obj;
            for(let i = 0; i < particles.length; i++){
                obj = particles[i];
                if (obj.x < obj.r){
                    obj.vx = Math.abs(obj.vx);
                    obj.x = obj.r;
                }else if (obj.x > canvas.width - obj.r){
                    obj.vx = -Math.abs(obj.vx);
                    obj.x = canvas.width - obj.r;
                }  
                // Check for bottom and top
                if (obj.y < obj.r){
                    obj.vy = Math.abs(obj.vy);
                    obj.y = obj.r;
                } else if (obj.y > canvas.height - obj.r){
                    obj.vy = -Math.abs(obj.vy);
                    obj.y = canvas.height - obj.r;
            }
        }
    }

        function draw(){
            context.clearRect(0,0,canvas.width,canvas.height);
            for(const p of planets){
                p.draw();
            }
        }

        function update(timePassed) {
            for(const p of planets){
                p.update(timePassed);
            }
            gravity(planets)
            // detectEdgeCollision(planets)

        }



        let oldTime = 0;
        function loop(time) {
            let timePassed = (time - oldTime) / 1000;
            oldTime = time;
            //timePassed = Math.min(timePassed, .1)
            update(timePassed);
            draw();
            window.requestAnimationFrame(loop);
        }

        loop(0);

    })
</script>


<canvas bind:this={canvas} width=500 height=500></canvas>