import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(5,10,0);
orbit.update();

const directionalLight=new THREE.DirectionalLight(0xffffff,1);
scene.add(directionalLight);



const plane=new THREE.Mesh(
    new THREE.PlaneGeometry(6,6),
    new THREE.MeshBasicMaterial({
        color:0xffffff,
        wireframe:true,
        visible:false
    })
);
plane.rotateX(-Math.PI/2);
scene.add(plane);
const planeID=plane.id;

const grid=new THREE.GridHelper(6,3);
scene.add(grid);

const chosen=new THREE.Mesh(
    new THREE.PlaneGeometry(2,2),
    new THREE.MeshBasicMaterial({
        color:0xffffff,
        transparent:true,
        side:THREE.DoubleSide
    })
);
chosen.rotateX(-Math.PI/2);
chosen.position.set(0,0,0);
scene.add(chosen);

const mousePos=new THREE.Vector2();
const rayCaster=new THREE.Raycaster();
let intersects;

window.addEventListener('mousemove',function(e){
    mousePos.x=(e.clientX/window.innerWidth)*2-1;
    mousePos.y=-(e.clientY/window.innerHeight)*2+1;
    rayCaster.setFromCamera(mousePos,camera);
    intersects=rayCaster.intersectObjects(scene.children);
    intersects.forEach(function(intersects){
        if(intersects.object.id===planeID)
        {
            
            const chosenPos=new THREE.Vector3().copy(intersects.point).ceil();

            if(chosenPos.x%2===1)
                chosenPos.x--;
            if(chosenPos.z%2===1)
                chosenPos.z--;
            if(chosenPos.x%2===-1)
                chosenPos.x--;
            if(chosenPos.z%2===-1)
                chosenPos.z--;
            chosen.position.set(chosenPos.x,0,chosenPos.z);
            console.log(chosen.position);
            const checkobj=objs.find(function(object){
                return(object.position.x===chosen.position.x)&&(object.position.z===chosen.position.z)
            });
            if(!checkobj)
                chosen.material.color.setHex(0xffffff);
            else
                chosen.material.color.setHex(0xff0000);
        }
    });
});

const sphere=new THREE.Mesh(
    new THREE.SphereGeometry(0.7),
    new THREE.MeshBasicMaterial({color:0x00ffff,wireframe:true,side:THREE.DoubleSide})
);

const spherex=new THREE.Mesh(
    new THREE.SphereGeometry(0.7,6,1),
    new THREE.MeshBasicMaterial({color:0x00ffff,wireframe:true,side:THREE.DoubleSide})
);

const objs=[];
const tt=['0','0','0','0','0','0','0','0','0'];
let n=1;
let player=1;

window.addEventListener('mousedown',addObjects);

    

function addObjects(){
    const checkobj=objs.find(function(object){
        return(object.position.x===chosen.position.x)&&(object.position.z===chosen.position.z)
    });
    if(!checkobj){
        intersects.forEach(function(intersects){
            if(intersects.object.id===planeID)  
            {
                if(player%2===1)
                {
                    const copySphere=spherex.clone();
                    copySphere.position.set(chosen.position.x,0.4,chosen.position.z);
                    console.log(copySphere.position);
                    if(copySphere.position.x==-2&&copySphere.position.z==2)
                        tt[0]='X';
                    else if(copySphere.position.x==-2&&copySphere.position.z==0)
                        tt[1]='X';
                    else if(copySphere.position.x==-2&&copySphere.position.z==-2)
                        tt[2]='X';
                    else if(copySphere.position.x==0&&copySphere.position.z==2)
                        tt[3]='X';
                    else if(copySphere.position.x==0&&copySphere.position.z==0)
                        tt[4]='X';
                    else if(copySphere.position.x==0&&copySphere.position.z==-2)
                        tt[5]='X';
                    else if(copySphere.position.x==2&&copySphere.position.z==2)
                        tt[6]='X';
                    else if(copySphere.position.x==2&&copySphere.position.z==0)
                        tt[7]='X';
                    else if(copySphere.position.x==2&&copySphere.position.z==-2)
                        tt[8]='X';
                    scene.add(copySphere);
                    player++;
                    n++;
                    objs.push(copySphere);
                    chosen.material.color.setHex(0xff0000);}
                else if (player%2===0){
                    const copySphere=sphere.clone();
                    copySphere.position.set(chosen.position.x,0.4,chosen.position.z);
                    console.log(copySphere.position);
                    if(copySphere.position.x==-2&&copySphere.position.z==2)
                        tt[0]='O';
                    else if(copySphere.position.x==-2&&copySphere.position.z==0)
                        tt[1]='O';
                    else if(copySphere.position.x==-2&&copySphere.position.z==-2)
                        tt[2]='O';
                    else if(copySphere.position.x==0&&copySphere.position.z==2)
                        tt[3]='O';
                    else if(copySphere.position.x==0&&copySphere.position.z==0)
                        tt[4]='O';
                    else if(copySphere.position.x==0&&copySphere.position.z==-2)
                        tt[5]='O';
                    else if(copySphere.position.x==2&&copySphere.position.z==2)
                        tt[6]='O';
                    else if(copySphere.position.x==2&&copySphere.position.z==0)
                        tt[7]='O';
                    else if(copySphere.position.x==2&&copySphere.position.z==-2)
                        tt[8]='O';
                    scene.add(copySphere);
                    player++;
                    n++;
                    objs.push(copySphere);
                    chosen.material.color.setHex(0xff0000);}
                
            }
            
        });
    }
    if(tt[0]=='X'&&tt[1]=='X'&&tt[2]=='X'){
        displayWinner(1)
    }
    else if(tt[0]=='X'&&tt[3]=='X'&&tt[6]=='X'){
        displayWinner(1)
    }
    else if(tt[0]=='X'&&tt[4]=='X'&&tt[8]=='X'){
        displayWinner(1)
    }
    else if(tt[1]=='X'&&tt[4]=='X'&&tt[7]=='X'){
        displayWinner(1)
    }
    else if(tt[2]=='X'&&tt[5]=='X'&&tt[8]=='X'){
        displayWinner(1)
    }
    else if(tt[2]=='X'&&tt[4]=='X'&&tt[6]=='X'){
        displayWinner(1)
    }
    else if(tt[3]=='X'&&tt[4]=='X'&&tt[5]=='X'){
        displayWinner(1)
    }
    else if(tt[6]=='X'&&tt[7]=='X'&&tt[8]=='X'){
        displayWinner(1)
    }
    
    else if(tt[0]=='O'&&tt[1]=='O'&&tt[2]=='O'){
        displayWinner(2)
    }
    else if(tt[0]=='O'&&tt[3]=='O'&&tt[6]=='O'){
        displayWinner(2)
    }
    else if(tt[0]=='O'&&tt[4]=='O'&&tt[8]=='O'){
        displayWinner(2)
    }
    else if(tt[1]=='O'&&tt[4]=='O'&&tt[7]=='O'){
        displayWinner(2)
    }
    else if(tt[2]=='O'&&tt[5]=='O'&&tt[8]=='O'){
        displayWinner(2)
    }
    else if(tt[2]=='O'&&tt[4]=='O'&&tt[6]=='O'){
        displayWinner(2)
    }
    else if(tt[3]=='O'&&tt[4]=='O'&&tt[5]=='O'){
        displayWinner(2)
    }
    else if(tt[6]=='O'&&tt[7]=='O'&&tt[8]=='O'){
        displayWinner(2)
    }
    else if(n==10){
        const para = document.getElementById("text");
        const node = document.createTextNode("Draw");
        para.appendChild(node);
        window.removeEventListener('mousedown',addObjects);
    }
}

function displayWinner(win){
    const para = document.getElementById("text");
    const node = document.createTextNode("Player "+win+" wins");
    para.appendChild(node);
    window.removeEventListener('mousedown',addObjects);
}

function animate(time) {
    directionalLight.position.copy(camera.position);
    chosen.material.opacity=1+Math.sin(time/120);
    objs.forEach(function(object){
        //object.rotation.x=time/1000;
         object.rotation.y=time/1000;
        // object.rotation.z=time/1000;
        object.position.y=1+0.5*Math.abs(Math.sin(time/1000));
    });
    renderer.render(scene, camera);
}



renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});