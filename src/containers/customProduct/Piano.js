import React, { useRef, useState } from "react";
import { useGLTF, Text } from "@react-three/drei";

export default function Piano({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/Blender/exemple1.glb");

  const [text, setText] = useState(false);

  return (
    <group ref={group} {...props} dispose={null} position={[0 ,-0.5 ,0]} rotation={[0,-0.3,0]}>
      <primitive object={nodes.bone} />
      <skinnedMesh
        material-color={props.customColors.Hinges}
        geometry={nodes.Hinges.geometry}
        material={materials.Hinges}
        skeleton={nodes.Hinges.skeleton}
      >
      </skinnedMesh>
      <skinnedMesh
        material-color={props.customColors.Keys}
        geometry={nodes.Keys.geometry}
        material={materials.key}
        skeleton={nodes.Keys.skeleton}
      />
      <skinnedMesh
        material-color={props.customColors.Piano}
        geometry={nodes.Piano.geometry}
        material={materials.Piano}
        skeleton={nodes.Piano.skeleton}
      ></skinnedMesh>
      {props.show && (
        <mesh
          geometry={nodes.Text.geometry}
          material={materials["default"]}
          position={[-0.19, 0.97, -0.03]}
          rotation={[1.34, 0, 0]}
          scale={0.07}
        />
      )}
    </group>
  );
}

useGLTF.preload("/exemple1.glb");
