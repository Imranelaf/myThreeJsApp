export default function Plane(){
  return(
    <mesh rotation={[-Math.PI * .5, 0,0]}>
      
      <boxGeometry args={[10,10, .1]} />
      <meshBasicMaterial color={0xffff00} />
    </mesh>

    
  )
}