import { Suspense, Component, useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useProgress, useGLTF, ContactShadows, OrbitControls, Center, Html } from '@react-three/drei';
import { MathUtils } from 'three';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const cameraStages = [
  { z: 6.1, y: 1.15, fov: 37 },
  { z: 5.25, y: 1.05, fov: 34 },
  { z: 6.55, y: 1.2, fov: 40 },
  { z: 5.05, y: 1.0, fov: 33 },
  { z: 6.35, y: 1.18, fov: 39 },
  { z: 5.45, y: 1.08, fov: 35 },
  { z: 6.7, y: 1.22, fov: 41 },
  { z: 5.35, y: 1.06, fov: 34 },
];

const mobileCameraStages = [
  { z: 5.25, y: 0.92, fov: 39 },
  { z: 4.65, y: 0.86, fov: 35 },
  { z: 5.8, y: 0.98, fov: 43 },
  { z: 4.5, y: 0.84, fov: 34 },
  { z: 5.65, y: 0.96, fov: 42 },
  { z: 4.8, y: 0.88, fov: 36 },
  { z: 5.95, y: 1.0, fov: 44 },
  { z: 4.7, y: 0.86, fov: 35 },
];

const modelStages = [
  { scale: 1, y: 0, x: 0, rotation: 0 },
  { scale: 1.08, y: 0.04, x: -0.04, rotation: 0.14 },
  { scale: 0.94, y: -0.02, x: 0.06, rotation: -0.1 },
  { scale: 1.12, y: 0.06, x: 0, rotation: 0.22 },
  { scale: 0.96, y: -0.02, x: -0.05, rotation: -0.16 },
  { scale: 1.06, y: 0.03, x: 0.05, rotation: 0.12 },
  { scale: 0.92, y: -0.03, x: 0, rotation: -0.2 },
  { scale: 1.1, y: 0.05, x: -0.03, rotation: 0.18 },
];

const mobileModelStages = [
  { scale: 1.1, y: -0.08, x: 0, rotation: 0 },
  { scale: 1.2, y: -0.04, x: -0.02, rotation: 0.14 },
  { scale: 1.02, y: -0.12, x: 0.03, rotation: -0.1 },
  { scale: 1.24, y: -0.03, x: 0, rotation: 0.22 },
  { scale: 1.04, y: -0.12, x: -0.03, rotation: -0.16 },
  { scale: 1.16, y: -0.06, x: 0.03, rotation: 0.12 },
  { scale: 1, y: -0.14, x: 0, rotation: -0.2 },
  { scale: 1.18, y: -0.05, x: -0.02, rotation: 0.18 },
];

function CameraRig({ activeSectionIndex }) {
  const { camera, viewport } = useThree();
  const stages = viewport.width < 7.5 ? mobileCameraStages : cameraStages;
  const stage = stages[activeSectionIndex % stages.length];

  useFrame(() => {
    camera.position.z = MathUtils.lerp(camera.position.z, stage.z, 0.055);
    camera.position.y = MathUtils.lerp(camera.position.y, stage.y, 0.055);
    camera.fov = MathUtils.lerp(camera.fov, stage.fov, 0.055);
    camera.updateProjectionMatrix();
  });

  return null;
}

function Model({ url, activeSectionIndex }) {
  const { scene } = useGLTF(url);
  const { viewport } = useThree();
  const groupRef = useRef();
  const isMobile = viewport.width < 7.5;
  const stages = isMobile ? mobileModelStages : modelStages;
  const stage = stages[activeSectionIndex % stages.length];
  
  // Clone the scene to prevent issues when remounting/re-rendering in React 18/19
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Adjust model scale and position based on viewport width (responsive layout)
  // Center the car in the viewport (X = 0) and float it slightly lower
  const position = isMobile ? [0, -0.48, 0] : [0, -0.42, 0];
  const scale = isMobile ? Math.min(116, viewport.width * 18) : 150;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const targetScale = scale * stage.scale;
    
    // Smooth floating up and down using a slow sine wave
    groupRef.current.scale.setScalar(MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.055));
    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, position[0] + stage.x, 0.055);
    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, position[1] + stage.y + Math.sin(t * 1.0) * 0.08, 0.055);
    
    // Continuous rotation + mouse pointer parallax tracking
    const targetRotY = t * 0.15 + state.pointer.x * 0.3 + stage.rotation;
    const targetRotX = state.pointer.y * 0.1;
    
    // Smooth interpolation (lerping) for fluid movement
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
      {/* Contact shadows placed inside the scaled group to stay perfectly aligned with the car wheels. 
          Scale is configured to match the raw 0.05 world units length of the model. */}
      <ContactShadows position={[0, -0.0093, 0]} opacity={0.4} blur={1.5} scale={0.07} far={0.02} />
    </group>
  );
}

function Loader() {
  const { progress, errors } = useProgress();
  const hasError = errors && errors.length > 0;
  return (
    // Wrap HTML elements in Drei's <Html> so they render correctly inside the canvas context
    <Html center>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, minWidth: '120px' }}>
        <CircularProgress sx={{ color: 'rgba(255,255,255,0.6)' }} variant="determinate" value={progress} />
        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600 }}>
          {hasError ? `Error: ${errors.join(', ')}` : `${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Html>
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 600 }}>
            3D Error: {this.state.error?.message || 'Failed to render 3D model'}
          </Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default function CarModelViewer({ activeSectionIndex = 0, sx }) {
  return (
    <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', ...sx }}>
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 1.15, 6.1], fov: 37 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
          onCreated={(state) => state.gl.setClearColor(0x000000, 0)}
        >
          {/* Robust, rich offline-friendly lighting setup to make the metallic paint pop without external presets */}
          <ambientLight intensity={0.5} />
          <hemisphereLight intensity={0.4} color="#ffffff" groundColor="#111111" />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <directionalLight position={[-5, 5, -5]} intensity={0.8} />
          <pointLight position={[0, 4, 2]} intensity={1.2} />

          <Suspense fallback={<Loader />}>
            <Model url="/models/bmw-m3.glb" activeSectionIndex={activeSectionIndex} />
          </Suspense>

          <CameraRig activeSectionIndex={activeSectionIndex} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={1.2}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2.4}
          />
        </Canvas>
      </ErrorBoundary>
    </Box>
  );
}
