import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Ambient3DHouseCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check pointer capabilities for performance
    const isMobile = typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches;

    // Check software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5, 4, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl || isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // Group for the 3D House
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);

    // Materials: Architectural Gold Hairline Wireframe & Translucent Volumes
    const glassMat = new THREE.MeshBasicMaterial({
      color: 0x0B224F,
      transparent: true,
      opacity: 0.35,
    });

    const goldLineMat = new THREE.LineBasicMaterial({
      color: 0xD4AF37,
      transparent: true,
      opacity: 0.75,
      linewidth: 1.5,
    });

    const whiteLineMat = new THREE.LineBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.6,
    });

    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [glassMat, goldLineMat, whiteLineMat];

    const addWireBox = (
      w: number,
      h: number,
      d: number,
      pos: [number, number, number],
      isGold = true
    ) => {
      const boxGeo = new THREE.BoxGeometry(w, h, d);
      disposables.push(boxGeo);

      // Translucent solid fill
      const mesh = new THREE.Mesh(boxGeo, glassMat);
      mesh.position.set(...pos);
      houseGroup.add(mesh);

      // Luminous architectural line segments
      const edgeGeo = new THREE.EdgesGeometry(boxGeo);
      disposables.push(edgeGeo);
      const line = new THREE.LineSegments(edgeGeo, isGold ? goldLineMat : whiteLineMat);
      line.position.set(...pos);
      houseGroup.add(line);
    };

    // 1. Foundation Slab
    addWireBox(4.4, 0.25, 3.8, [0, -1.2, 0], true);

    // 2. Ground Floor Living Pavilion
    addWireBox(3.4, 1.4, 2.8, [-0.3, -0.4, 0.1], true);

    // 3. Cantilevered Upper Level Master Suite
    addWireBox(3.6, 1.3, 3.2, [0.3, 0.9, 0.4], false);

    // 4. Balcony Cantilever Extension
    addWireBox(2.2, 0.5, 0.8, [0.4, 0.5, 2.3], true);

    // 5. Modern Slanted Solar Canopy Roof
    addWireBox(4.2, 0.12, 3.6, [0.2, 1.7, 0.3], true);

    // Position house in the right background flank (desktop) or upper-center (mobile)
    const updatePosition = () => {
      const isNarrow = window.innerWidth < 768;
      if (isNarrow) {
        houseGroup.position.set(0, 0.5, -2);
        houseGroup.scale.set(0.65, 0.65, 0.65);
      } else {
        houseGroup.position.set(3.4, 0.2, -1.5);
        houseGroup.scale.set(0.9, 0.9, 0.9);
      }
    };
    updatePosition();

    // Scroll and Mouse tracking
    let scrollY = window.scrollY;
    let targetRotY = 0;
    let targetRotX = 0.2;
    let currentRotY = 0;
    let currentRotX = 0.2;

    const handleScroll = () => {
      scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const progress = scrollY / maxScroll;
      targetRotY = progress * Math.PI * 2;
      targetRotX = 0.2 + progress * 0.4;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
      targetRotY += mouseX * 0.05;
      targetRotX += mouseY * 0.05;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updatePosition();
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const clock = new THREE.Clock();

    const loop = () => {
      const delta = Math.min(clock.getDelta(), 0.1);

      // Continuous gentle idle turn
      targetRotY += delta * 0.12;

      // Smooth damping
      currentRotY = THREE.MathUtils.damp(currentRotY, targetRotY, 4, delta);
      currentRotX = THREE.MathUtils.damp(currentRotX, targetRotX, 4, delta);

      houseGroup.rotation.y = currentRotY;
      houseGroup.rotation.x = currentRotX;

      // Subtle levitation bobbing
      const time = clock.getElapsedTime();
      houseGroup.position.y += Math.sin(time * 1.5) * 0.0015;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      if (!isMobile) window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden opacity-75"
      aria-hidden="true"
    />
  );
};
