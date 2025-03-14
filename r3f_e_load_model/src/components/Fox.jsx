import { useAnimations, useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import React, { useEffect, useLayoutEffect } from 'react';

const Fox = () => {
    const model = useGLTF("./Fox/glTF/Fox.gltf")
    const animations = useAnimations(model.animations, model.scene)
    console.log(animations)
    const {animationName} = useControls("animate", {
        animationName: {
            options: animations.names
        }
    })
    // useEffect(()=>{
    //     const walk = animations.actions.Walk
    //     const run = animations.actions.Run
        
    //     walk.play()
        
    //     setTimeout(()=>{
    //         run.play()
    //         run.crossFadeFrom(walk, 0.5)
    //     }, 2000)

    // },[animations]) 
    
    useEffect(()=>{
        const action = animations.actions[animationName]
        action.reset().fadeIn(0.5).play()
        return ()=>{
            // action.fadeOut
            action.fadeOut(0.5)
        }
    },[animationName])
    
    return (
       <primitive object={model.scene} scale={0.03} position-y={-1} />
    );
};

export default Fox;