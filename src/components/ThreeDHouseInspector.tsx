import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createProceduralHouse, THEMES } from '../utils/proceduralHouse';
import { 
  RotateCw, 
  Layers, 
  Sun, 
  Moon, 
  Compass, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';

interface ThreeDHouseInspectorProps {
  onOpenBooking?: (label: string) => void;
  inline?: boolean;
}

export const ThreeDHouseInspector: React.FC<ThreeDHouseInspectorProps> = ({
  onOpenBooking,
  inline = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const houseRef = useRef<ReturnType<typeof createProceduralHouse> | null>(null);

  // UI state
  const [themeMode, setThemeMode] = useState<keyof typeof THEMES>('daylight');
  const [explodeLevel, setExplodeLevel] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>('plumbing');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);

  // Animation & interaction references
  const animFrameRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const rotTargetRef = useRef({ x: 0.35, y: -0.6 });
  const rotCurrentRef = useRef({ x: 0.35, y: -0.6 });
  const zoomTargetRef = useRef<number>(11);
  const zoomCurrentRef = useRef<number>(11);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL guard as required by Three.js skills
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07152F);
    scene.fog = new THREE.FogExp2(0x07152F, 0.028);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 11);

    // 2. WebGLRenderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xFDF8EE, 0x07152F, 0.9);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xFFF7ED, 2.2);
    keyLight.position.set(9, 14, 9);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 30;
      keyLight.shadow.camera.left = -8;
      keyLight.shadow.camera.right = 8;
      keyLight.shadow.camera.top = 8;
      keyLight.shadow.camera.bottom = -8;
      keyLight.shadow.bias = -0.0004;
    }
    scene.add(keyLight);

    const goldRimLight = new THREE.DirectionalLight(0xD4AF37, 1.8);
    goldRimLight.position.set(-8, 8, -8);
    scene.add(goldRimLight);

    // 5. Ground Contact Shadow & Grid
    const groundGeo = new THREE.PlaneGeometry(32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x07152F,
      roughness: 0.8,
      metalness: 0.2,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -1.82;
    groundMesh.receiveShadow = !isSoftwareGl;
    scene.add(groundMesh);

    // Grid helper with gold/navy tones
    const grid = new THREE.GridHelper(24, 24, 0xD4AF37, 0x1E3A8A);
    grid.position.y = -1.81;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.25;
    scene.add(grid);

    // 6. Procedural House Subject
    const house = createProceduralHouse(themeMode);
    scene.add(house.group);
    houseRef.current = house;

    // 7. Interactive Controls via pointer events
    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      rotTargetRef.current.y += deltaX * 0.006;
      rotTargetRef.current.x = Math.max(0.05, Math.min(0.95, rotTargetRef.current.x + deltaY * 0.005));
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomTargetRef.current = Math.max(6, Math.min(18, zoomTargetRef.current + e.deltaY * 0.01));
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    canvasDom.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Render Loop with Smooth Exponential Damping
    const clock = new THREE.Clock();

    const renderLoop = () => {
      const delta = Math.min(clock.getDelta(), 0.1);

      // Auto rotation when idle
      if (isRotating && !isDraggingRef.current) {
        rotTargetRef.current.y += delta * 0.25;
      }

      // Smooth camera interpolation
      rotCurrentRef.current.x = THREE.MathUtils.damp(rotCurrentRef.current.x, rotTargetRef.current.x, 9, delta);
      rotCurrentRef.current.y = THREE.MathUtils.damp(rotCurrentRef.current.y, rotTargetRef.current.y, 9, delta);
      zoomCurrentRef.current = THREE.MathUtils.damp(zoomCurrentRef.current, zoomTargetRef.current, 9, delta);

      const distance = zoomCurrentRef.current;
      const phi = rotCurrentRef.current.x;
      const theta = rotCurrentRef.current.y;

      camera.position.x = distance * Math.cos(phi) * Math.sin(theta);
      camera.position.y = distance * Math.sin(phi) + 0.5;
      camera.position.z = distance * Math.cos(phi) * Math.cos(theta);
      camera.lookAt(0, 0.4, 0);

      // Pulse hotspot beacons subtly
      const elapsed = clock.getElapsedTime();
      house.hotspotObjects.forEach((hs, idx) => {
        const s = 1 + Math.sin(elapsed * 3.5 + idx * 1.2) * 0.15;
        hs.mesh.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      canvasDom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      canvasDom.removeEventListener('wheel', handleWheel);

      house.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      renderer.dispose();
      if (container.contains(canvasDom)) {
        container.removeChild(canvasDom);
      }
    };
  }, [isRotating]);

  // Update theme dynamically
  const handleThemeChange = (newTheme: keyof typeof THEMES) => {
    setThemeMode(newTheme);
    if (houseRef.current) {
      houseRef.current.updateTheme(newTheme);
    }
  };

  // Update exploded view slider
  const handleExplodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setExplodeLevel(val);
    if (houseRef.current) {
      houseRef.current.updateExplode(val);
    }
  };

  const hotspots = [
    {
      id: 'foundation',
      title: '01 Foundation & Soil Load',
      subtitle: 'AGIS Coordinate & Substructure Piling',
      desc: 'Sub-grade reinforced concrete pile caps inspected. Verified against FCT soil hydrology charts before building permit sign-off.',
    },
    {
      id: 'plumbing',
      title: '02 Plumbing & Water Pressure',
      subtitle: 'Hydrostatic Pressure & Fall Gradients',
      desc: 'PPR supply lines held at 10-bar test pressure for 4 hours. Dedicated soakaway and central drainage slope certified.',
    },
    {
      id: 'electrical',
      title: '03 Electrical Load & Surge Protection',
      subtitle: 'Copper Conduits & Lightning Arrestors',
      desc: 'Main distribution board checked for dedicated surge suppression and earthing resistance below 5 ohms.',
    },
    {
      id: 'structural',
      title: '04 Cantilever Slab & Balconies',
      subtitle: 'Upper Level Deflection Verification',
      desc: 'Reinforced concrete cantilever beams inspected for load-bearing safety margins and waterproofing membrane seal.',
    },
    {
      id: 'solar_roof',
      title: '05 Solar Canopy & Roof Integrity',
      subtitle: 'Double Waterproofing & PV Generation',
      desc: 'Tested slope drainage, UV-resistant sealants, and rooftop solar array cabling routed through fire-rated conduits.',
    },
  ];

  const currentHotspotInfo = hotspots.find((h) => h.id === activeHotspot) || hotspots[0];

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border border-[#B8925A]/40 bg-[#07152F] shadow-2xl transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-4 z-50 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.9)]'
          : 'w-full h-[580px] sm:h-[640px]'
      }`}
    >
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Header Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#07152F]/90 backdrop-blur-md border border-[#B8925A]/40 text-xs shadow-lg">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-mono uppercase tracking-widest text-[#FAF8F4] font-semibold text-[11px]">
            Interactive 3D Architectural Vetting Inspector
          </span>
          <span className="hidden sm:inline text-[#B8925A]">·</span>
          <span className="hidden sm:inline text-xs text-[#FAF8F4]/75">Rotate 360° · Explode Layers</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-xl border text-xs font-mono transition-colors shadow-md ${
              isRotating
                ? 'bg-[#B8925A]/30 border-[#B8925A] text-[#D4AF37]'
                : 'bg-[#07152F]/80 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
            aria-label="Toggle auto rotation"
          >
            <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-[#07152F]/80 border border-slate-700 text-slate-300 hover:text-white hover:border-[#B8925A] transition-colors shadow-md"
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Active Hotspot Inspector Card (Top-Left under badge) */}
      <div className="absolute top-16 left-4 max-w-sm pointer-events-auto z-10 hidden sm:block">
        <div className="p-4 rounded-2xl bg-[#07152F]/92 backdrop-blur-md border border-[#B8925A]/40 shadow-xl space-y-2 text-left">
          <div className="flex items-center justify-between text-xs font-mono text-[#D4AF37]">
            <span className="font-semibold">{currentHotspotInfo.title}</span>
            <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-[#B8925A]/20 border border-[#B8925A]/30">
              Pass / Certified
            </span>
          </div>
          <p className="text-xs text-[#FAF8F4]/90 font-medium">
            {currentHotspotInfo.subtitle}
          </p>
          <p className="text-[11px] text-[#FAF8F4]/70 leading-relaxed">
            {currentHotspotInfo.desc}
          </p>
        </div>
      </div>

      {/* Sleek Bottom Control Dock (Consolidated per Three.js UX directives) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[94%] sm:max-w-2xl pointer-events-auto z-10 space-y-2">
        {/* Toggle Collapse Bar */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowControls(!showControls)}
            className="px-3 py-1 rounded-full bg-[#07152F]/90 backdrop-blur-md border border-[#B8925A]/35 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] hover:bg-[#0B1F44] transition-all shadow-md flex items-center gap-1.5"
          >
            <span>{showControls ? '▾ Hide Inspector Controls' : '▴ Show 3D Inspector Controls'}</span>
          </button>
        </div>

        {showControls && (
          <div className="p-3 sm:p-4 rounded-2xl bg-[#07152F]/95 backdrop-blur-lg border border-[#B8925A]/40 shadow-2xl space-y-3">
            {/* Row 1: Themes & Exploded View Slider */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              {/* Theme Finishes */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-[11px] font-mono text-[#FAF8F4]/70 uppercase tracking-wider mr-1">
                  Style:
                </span>
                <button
                  onClick={() => handleThemeChange('daylight')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all ${
                    themeMode === 'daylight'
                      ? 'bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] font-bold shadow'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Daylight</span>
                </button>

                <button
                  onClick={() => handleThemeChange('blueprint')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all ${
                    themeMode === 'blueprint'
                      ? 'bg-sky-500 text-white font-bold shadow'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Blueprint</span>
                </button>

                <button
                  onClick={() => handleThemeChange('night')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all ${
                    themeMode === 'night'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Night</span>
                </button>
              </div>

              {/* Exploded View Slider */}
              <div className="flex items-center gap-2 w-full sm:w-56">
                <Layers className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-[11px] font-mono text-[#FAF8F4]/70 shrink-0">
                  Explode:
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodeLevel}
                  onChange={handleExplodeChange}
                  className="w-full accent-[#D4AF37] cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                  aria-label="Explode architectural levels slider"
                />
                <span className="text-[10px] font-mono text-[#D4AF37] w-8 text-right">
                  {Math.round(explodeLevel * 100)}%
                </span>
              </div>
            </div>

            {/* Row 2: Hotspot Pins Selector */}
            <div className="pt-2 border-t border-[#B8925A]/20 flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
              <span className="text-[10px] font-mono text-[#FAF8F4]/60 uppercase tracking-wider shrink-0 mr-1">
                Audits:
              </span>
              {hotspots.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => setActiveHotspot(hs.id)}
                  className={`px-2.5 py-1 rounded-lg shrink-0 whitespace-nowrap transition-colors ${
                    activeHotspot === hs.id
                      ? 'bg-[#B8925A]/30 text-[#D4AF37] border border-[#B8925A] font-semibold'
                      : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {hs.title.split(' ')[0]} {hs.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Helpful Hint on first interaction */}
      <div className="absolute bottom-20 left-4 text-[10px] font-mono text-[#FAF8F4]/50 pointer-events-none hidden md:block">
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
};
