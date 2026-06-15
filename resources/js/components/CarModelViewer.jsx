import { Suspense, Component, useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useProgress, useGLTF, ContactShadows, OrbitControls, Center, Html } from '@react-three/drei';
import { MathUtils } from 'three';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const cameraStages = [
  { z: 4.8, y: 1.05, fov: 32 },  // Hero: Very close & large
  { z: 4.5, y: 0.95, fov: 30 },  // Features: Zoomed in side profile
  { z: 5.2, y: 1.10, fov: 35 },  // How it works: Tilt/further
  { z: 4.3, y: 0.90, fov: 28 },  // Fleet: Detail shot
  { z: 4.0, y: 0.85, fov: 28 },  // CTA: Sports back angle
  { z: 4.9, y: 1.00, fov: 33 },  // Testimonials: Rotate
  { z: 4.4, y: 0.95, fov: 30 },  // FAQ: Angled close
  { z: 5.4, y: 1.15, fov: 36 },  // Footer: Pull back
];

const mobileCameraStages = [
  { z: 4.1, y: 0.80, fov: 34 },  // Hero
  { z: 4.3, y: 0.82, fov: 35 },  // Features
  { z: 4.0, y: 0.78, fov: 32 },  // How it works
  { z: 3.7, y: 0.72, fov: 29 },  // Fleet
  { z: 3.6, y: 0.70, fov: 28 },  // CTA
  { z: 4.2, y: 0.80, fov: 34 },  // Testimonials
  { z: 4.4, y: 0.85, fov: 35 },  // FAQ
  { z: 4.7, y: 0.90, fov: 37 },  // Footer
];

const modelStages = [
  { scale: 1.25, y: -0.05, x: 0, rotation: 0 },         // Hero: Large, front
  { scale: 1.20, y: 0.02, x: 0.8, rotation: 0.6 },      // Features: Slide right, show side profile
  { scale: 1.15, y: -0.02, x: 0, rotation: -0.4 },     // How it works: Angled left
  { scale: 1.30, y: 0.05, x: -0.7, rotation: 0.5 },     // Fleet: Slide left, close up
  { scale: 1.35, y: 0.08, x: 0.6, rotation: 3.1 },      // CTA: Slide right, show sports rear exhaust
  { scale: 1.10, y: -0.04, x: -0.4, rotation: -0.8 },   // Testimonials: Slightly left
  { scale: 1.22, y: 0.03, x: 0.5, rotation: 0.8 },      // FAQ: Angled right
  { scale: 1.05, y: -0.06, x: 0, rotation: 0.2 },       // Footer: Centered pullback
];

const mobileModelStages = [
  { scale: 1.35, y: -0.06, x: 0, rotation: 0 },         // Hero: Centered large
  { scale: 1.25, y: -0.02, x: 0, rotation: 0.85 },      // Features: Side profile
  { scale: 1.22, y: -0.08, x: 0, rotation: -0.6 },      // How it works
  { scale: 1.40, y: -0.01, x: 0, rotation: 0.35 },      // Fleet: Zoom front
  { scale: 1.42, y: 0.02, x: 0, rotation: 3.14 },       // CTA: Rear exhaust profile
  { scale: 1.20, y: -0.07, x: 0, rotation: -0.9 },      // Testimonials
  { scale: 1.28, y: -0.04, x: 0, rotation: 0.75 },      // FAQ
  { scale: 1.15, y: -0.10, x: 0, rotation: 0.1 },       // Footer
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
  const position = isMobile ? [0, -0.40, 0] : [0, -0.42, 0];
  const scale = isMobile ? Math.min(145, viewport.width * 24) : 185;

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
