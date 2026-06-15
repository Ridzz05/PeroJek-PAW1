import { Suspense, Component, useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useProgress, useGLTF, ContactShadows, OrbitControls, Center, Html } from '@react-three/drei';
import { MathUtils } from 'three';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const desktopTimeline = [
  { t: 0, cameraZ: 4.75, cameraY: 1.02, fov: 31, scale: 1.28, x: 0, y: -0.05, rotation: 0, ambient: 0.5, key: 1.6, fill: 0.8 },
  { t: 0.13, cameraZ: 4.25, cameraY: 0.92, fov: 28, scale: 1.36, x: 0.72, y: 0, rotation: 0.72, ambient: 0.44, key: 1.85, fill: 0.72 },
  { t: 0.28, cameraZ: 5.25, cameraY: 1.08, fov: 36, scale: 1.14, x: -0.2, y: -0.04, rotation: -0.48, ambient: 0.52, key: 1.45, fill: 0.86 },
  { t: 0.43, cameraZ: 4.1, cameraY: 0.88, fov: 27, scale: 1.42, x: -0.72, y: 0.04, rotation: 0.42, ambient: 0.46, key: 1.9, fill: 0.68 },
  { t: 0.58, cameraZ: 4, cameraY: 0.85, fov: 28, scale: 1.4, x: 0.65, y: 0.06, rotation: 3.05, ambient: 0.42, key: 1.75, fill: 0.72 },
  { t: 0.72, cameraZ: 4.9, cameraY: 0.98, fov: 33, scale: 1.15, x: -0.48, y: -0.04, rotation: -0.82, ambient: 0.5, key: 1.5, fill: 0.82 },
  { t: 0.86, cameraZ: 4.35, cameraY: 0.94, fov: 30, scale: 1.24, x: 0.45, y: 0.02, rotation: 0.8, ambient: 0.48, key: 1.65, fill: 0.76 },
  { t: 1, cameraZ: 5.6, cameraY: 1.16, fov: 37, scale: 1.04, x: 0, y: -0.08, rotation: 0.22, ambient: 0.58, key: 1.35, fill: 0.9 },
];

const mobileTimeline = [
  { t: 0, cameraZ: 4.05, cameraY: 0.78, fov: 34, scale: 1.34, x: 0, y: -0.08, rotation: 0, ambient: 0.52, key: 1.55, fill: 0.82 },
  { t: 0.14, cameraZ: 4.25, cameraY: 0.82, fov: 35, scale: 1.24, x: 0, y: -0.04, rotation: 0.82, ambient: 0.5, key: 1.7, fill: 0.76 },
  { t: 0.28, cameraZ: 4, cameraY: 0.78, fov: 32, scale: 1.25, x: 0, y: -0.1, rotation: -0.58, ambient: 0.5, key: 1.55, fill: 0.82 },
  { t: 0.44, cameraZ: 3.7, cameraY: 0.72, fov: 29, scale: 1.4, x: 0, y: -0.02, rotation: 0.35, ambient: 0.46, key: 1.85, fill: 0.68 },
  { t: 0.6, cameraZ: 3.65, cameraY: 0.7, fov: 28, scale: 1.42, x: 0, y: 0, rotation: 3.1, ambient: 0.44, key: 1.8, fill: 0.7 },
  { t: 0.74, cameraZ: 4.2, cameraY: 0.8, fov: 34, scale: 1.2, x: 0, y: -0.08, rotation: -0.9, ambient: 0.5, key: 1.5, fill: 0.82 },
  { t: 0.88, cameraZ: 4.45, cameraY: 0.85, fov: 35, scale: 1.26, x: 0, y: -0.04, rotation: 0.75, ambient: 0.5, key: 1.6, fill: 0.78 },
  { t: 1, cameraZ: 4.8, cameraY: 0.92, fov: 37, scale: 1.12, x: 0, y: -0.12, rotation: 0.12, ambient: 0.58, key: 1.35, fill: 0.9 },
];

const sampleTimeline = (timeline, progress) => {
  const clampedProgress = MathUtils.clamp(progress, 0, 1);
  const nextIndex = timeline.findIndex((point) => point.t >= clampedProgress);

  if (nextIndex <= 0) return timeline[0];
  if (nextIndex === -1) return timeline[timeline.length - 1];

  const previous = timeline[nextIndex - 1];
  const next = timeline[nextIndex];
  const localProgress = (clampedProgress - previous.t) / Math.max(0.001, next.t - previous.t);
  const easedProgress = MathUtils.smoothstep(localProgress, 0, 1);

  return Object.keys(previous).reduce((sample, key) => {
    sample[key] = key === 't'
      ? clampedProgress
      : MathUtils.lerp(previous[key], next[key], easedProgress);
    return sample;
  }, {});
};

function CameraRig({ scrollProgress, isMobile, reducedMotion }) {
  const { camera } = useThree();
  const timeline = isMobile ? mobileTimeline : desktopTimeline;
  const stage = sampleTimeline(timeline, reducedMotion ? 0 : scrollProgress);

  useFrame(() => {
    camera.position.y = MathUtils.lerp(camera.position.y, stage.cameraY, 0.055);
    camera.position.z = MathUtils.lerp(camera.position.z, stage.cameraZ, 0.055);
    camera.fov = MathUtils.lerp(camera.fov, stage.fov, 0.055);
    camera.updateProjectionMatrix();
  });

  return null;
}

function LightingRig({ scrollProgress, isMobile, reducedMotion }) {
  const ambientRef = useRef();
  const keyRef = useRef();
  const fillRef = useRef();
  const timeline = isMobile ? mobileTimeline : desktopTimeline;
  const stage = sampleTimeline(timeline, reducedMotion ? 0 : scrollProgress);

  useFrame(() => {
    if (ambientRef.current) {
      ambientRef.current.intensity = MathUtils.lerp(ambientRef.current.intensity, stage.ambient, 0.055);
    }
    if (keyRef.current) {
      keyRef.current.intensity = MathUtils.lerp(keyRef.current.intensity, stage.key, 0.055);
    }
    if (fillRef.current) {
      fillRef.current.intensity = MathUtils.lerp(fillRef.current.intensity, stage.fill, 0.055);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={stage.ambient} />
      <hemisphereLight intensity={0.42} color="#ffffff" groundColor="#111111" />
      <directionalLight ref={keyRef} position={[5, 10, 5]} intensity={stage.key} />
      <directionalLight ref={fillRef} position={[-5, 5, -5]} intensity={stage.fill} />
      <pointLight position={[0, 4, 2]} intensity={1.15} />
    </>
  );
}

function Model({ url, scrollProgress, isMobile, reducedMotion }) {
  const { scene } = useGLTF(url);
  const { viewport } = useThree();
  const groupRef = useRef();
  const timeline = isMobile ? mobileTimeline : desktopTimeline;
  const stage = sampleTimeline(timeline, reducedMotion ? 0 : scrollProgress);
  
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
    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, position[1] + stage.y + (reducedMotion ? 0 : Math.sin(t * 1.0) * 0.08), 0.055);
    
    // Continuous rotation + mouse pointer parallax tracking
    const targetRotY = stage.rotation + (reducedMotion ? 0 : t * 0.08 + state.pointer.x * 0.18);
    const targetRotX = reducedMotion ? 0 : state.pointer.y * 0.08;
    
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

export default function CarModelViewer({ scrollProgress = 0, isMobile = false, reducedMotion = false, sx }) {
  return (
    <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', ...sx }}>
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 1.15, 6.1], fov: 37 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
          onCreated={(state) => state.gl.setClearColor(0x000000, 0)}
        >
          <LightingRig scrollProgress={scrollProgress} isMobile={isMobile} reducedMotion={reducedMotion} />

          <Suspense fallback={<Loader />}>
            <Model
              url="/models/bmw-m3.glb"
              scrollProgress={scrollProgress}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
            />
          </Suspense>

          <CameraRig scrollProgress={scrollProgress} isMobile={isMobile} reducedMotion={reducedMotion} />

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
