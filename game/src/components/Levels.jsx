import { useFrame } from "@react-three/fiber"
import { use, useEffect, useRef } from "react"
import { DoubleSide } from "three"


export function Start(){
    return(
        <mesh rotation={[-Math.PI/2, 0,0]}>
            <meshBasicMaterial color={'lightgreen'} side={DoubleSide}/>
            <planeGeometry args={[4,4]}/>
        </mesh>
    )
}


export function Level1(){

            const box1 = useRef()

            useFrame((state) => {
                box1.current.position.y = Math.sin(state.clock.elapsedTime) * 1.5
               
                
            })



    return(
        <>
        <mesh rotation={[-Math.PI/2, 0,0]} position={[4,0,0]} >
            <meshBasicMaterial color={'green'} />
            <planeGeometry args={[4,4]}/>
            <mesh position={[0,0,0.5]} ref={box1}>
            <meshBasicMaterial color={'tomato'}/>
            <boxGeometry />
            </mesh>

        </mesh>
        
        
        </>
    )
}


export function Level2(){
    return(
        <mesh rotation={[-Math.PI/2, 0,0]} position={[8,0,0]}>
            <meshBasicMaterial color={'green'} />
            <planeGeometry args={[4,4]}/>
        </mesh>
    )
}