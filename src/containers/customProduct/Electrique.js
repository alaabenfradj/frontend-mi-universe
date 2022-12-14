/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Electrique({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Blender/electrique.glb')
  return (
    <group ref={group} {...props} dispose={null} position={[0 ,1 ,0]}>
      <mesh geometry={nodes.Plano002.geometry} material={nodes.Plano002.material} position={[-3.17, 0, 1.88]} />
      <mesh material-color={props.customColors.circulos} geometry={nodes.Círculo018.geometry} material={nodes.Círculo018.material} position={[3.75, 0.14, 2.12]} rotation={[0, 0, -0.27]} scale={0.07} />
      <mesh geometry={nodes.Círculo008.geometry} material={nodes.Círculo008.material} position={[3.77, -0.54, 1.93]} scale={[0.07, 0.07, 0.05]} />
      <mesh material-color={props.customColors.face} geometry={nodes.Plano.geometry} material={materials['Plano']} position={[-3.17, 0, 1.88]} />
      <mesh geometry={nodes.Plano008.geometry} material={nodes.Plano008.material} position={[-1.53, 0.09, 1.92]} rotation={[-Math.PI, 0, -3.08]} scale={0.37} />
      <mesh geometry={nodes.Cilindro001.geometry} material={nodes.Cilindro001.material} position={[-3.09, 0.75, 2.27]} scale={0.07} />
      <mesh geometry={nodes.Círculo007.geometry} material={nodes.Círculo007.material} position={[-3.09, 0.8, 1.92]} scale={0.06} />
      <mesh geometry={nodes.Círculo006.geometry} material={nodes.Círculo006.material} position={[-3.1, 1.74, 1.92]} />
      <mesh geometry={nodes.Cubo012.geometry} material={nodes.Cubo012.material} position={[2.64, 0.47, 1.9]} rotation={[0, 0, -0.08]} scale={[0.01, 0.03, 0.03]} />
      <mesh geometry={nodes.Cubo011.geometry} material={nodes.Cubo011.material} position={[-5.7, 0.18, 2.01]} rotation={[0, 0.06, 0]} />
      <mesh geometry={nodes.Cubo010.geometry} material={nodes.Cubo010.material} position={[-5.67, 0.18, 2.59]} rotation={[0, 0.06, 0]} />
      <mesh geometry={nodes.Cubo009.geometry} material={nodes.Cubo009.material} position={[-3.18, 3.65, 2.94]} rotation={[0, 0.06, -Math.PI / 2]} />
      <mesh material-color={props.customColors.circulos} geometry={nodes.Cubo008.geometry} material={nodes.Cubo008.material} position={[-5.44, 0.11, 2.46]} />
      <mesh geometry={nodes.Cubo007.geometry} material={nodes.Cubo007.material} position={[-2.75, 1.84, 1.72]} rotation={[0, 0.06, 0]} scale={0.03} />
      <mesh material-color={props.customColors.chords} geometry={nodes.Círculo.geometry} material={nodes.Círculo.material} position={[-2.75, 0.84, 1.93]} rotation={[0, 0.06, 0]} scale={0.07} />
      <mesh geometry={nodes.Plano003.geometry} material={nodes.Plano003.material} position={[-1.53, 0.09, 1.92]} rotation={[-Math.PI, 0, -3.08]} scale={0.37} />
      <mesh geometry={nodes.Cubo001.geometry} material={nodes.Cubo001.material} position={[1.58, -0.09, 1.38]} rotation={[-Math.PI, 0, -3.08]} />
      <mesh geometry={nodes.Cubo.geometry} material={nodes.Cubo.material} position={[-5.44, 0.11, 2.46]} />
      <mesh material-color={props.customColors.upper} geometry={nodes.Plano001.geometry} material={materials['Plano001']} position={[-0.28, 0, 1.85]} />
      <mesh geometry={nodes.Círculo021.geometry} material={nodes.Círculo021.material} position={[-1.1, 0.68, 1.28]} rotation={[0, 0, -0.15]} scale={0.15} />
      <mesh geometry={nodes.Cilindro003.geometry} material={nodes.Cilindro003.material} position={[-4.34, 2.41, 1.93]} rotation={[Math.PI / 2, 0, -1.53]} scale={0.06} />
      <mesh geometry={nodes.Cilindro002.geometry} material={nodes.Cilindro002.material} position={[-0.55, 2.41, 1.42]} rotation={[Math.PI / 2, 0, 1.41]} scale={0.06} />
      <mesh geometry={nodes.Círculo001.geometry} material={nodes.Círculo001.material} position={[-1.1, 0.68, 1.28]} rotation={[0, 0, -0.15]} scale={0.15} />
      <mesh geometry={nodes.Cilindro.geometry} material={materials.Trastes} position={[0.29, 0.61, 1.91]} rotation={[Math.PI / 2, 0, 0]} scale={0.02} />
      <mesh material-color={props.customColors.circulos} geometry={nodes.Círculo003.geometry} material={materials['Círculo003']} position={[-3.59, 0.68, 2.58]} rotation={[-0.04, 0, 0.1]} scale={0.11} />
    </group>
  )
}

useGLTF.preload('/electrique.glb')
