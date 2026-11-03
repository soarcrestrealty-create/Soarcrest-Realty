import * as THREE from 'three';

export interface HouseTheme {
  primaryWall: number;
  secondaryWall: number;
  glass: number;
  accentGold: number;
  roof: number;
  wireframe: number;
  emissive: number;
}

export const THEMES: Record<string, HouseTheme> = {
  daylight: {
    primaryWall: 0xFAF8F4,     // Warm off-white limestone
    secondaryWall: 0x1E293B,   // Charcoal/navy architectural cladding
    glass: 0x7DD3FC,          // Subtle sky-tinted reflective glass
    accentGold: 0xD4AF37,     // Brushed gold trim & louvers
    roof: 0x0F172A,           // Modern dark slate canopy
    wireframe: 0xB8925A,      // Muted gold edge definition
    emissive: 0x000000,
  },
  blueprint: {
    primaryWall: 0x0B224F,     // Blueprint deep navy
    secondaryWall: 0x07152F,   // Blueprint shadow
    glass: 0x38BDF8,          // Bright cyan blueprint line
    accentGold: 0xFACC15,     // High-voltage yellow/gold
    roof: 0x1E3A8A,           // Royal navy
    wireframe: 0x60A5FA,      // Blueprint luminous line
    emissive: 0x1E40AF,
  },
  night: {
    primaryWall: 0x0D1B2A,     // Midnight graphite
    secondaryWall: 0x07111E,   // Deep abyss navy
    glass: 0xFDE047,          // Warm illuminated interior glow
    accentGold: 0xFFDF73,     // Glowing gold accents
    roof: 0x050C16,           // Black obsidian
    wireframe: 0xEAB308,      // Gold specular outline
    emissive: 0x3A2600,
  },
};

export interface ProceduralHouseResult {
  group: THREE.Group;
  foundationGroup: THREE.Group;
  groundFloorGroup: THREE.Group;
  upperFloorGroup: THREE.Group;
  roofGroup: THREE.Group;
  edgesGroup: THREE.Group;
  hotspotObjects: { id: string; name: string; position: THREE.Vector3; description: string; mesh: THREE.Mesh }[];
  updateExplode: (factor: number) => void;
  updateTheme: (themeName: keyof typeof THEMES) => void;
  dispose: () => void;
}

export function createProceduralHouse(themeName: keyof typeof THEMES = 'daylight'): ProceduralHouseResult {
  const rootGroup = new THREE.Group();
  const theme = THEMES[themeName] || THEMES.daylight;

  // Track all disposables
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  // Helper to register allocations
  const regGeo = <T extends THREE.BufferGeometry>(g: T): T => {
    geometries.push(g);
    return g;
  };
  const regMat = <T extends THREE.Material>(m: T): T => {
    materials.push(m);
    return m;
  };

  // Materials map
  const wallMat = regMat(new THREE.MeshStandardMaterial({
    color: theme.primaryWall,
    roughness: 0.35,
    metalness: 0.1,
  }));

  const darkCladMat = regMat(new THREE.MeshStandardMaterial({
    color: theme.secondaryWall,
    roughness: 0.45,
    metalness: 0.25,
  }));

  const goldMat = regMat(new THREE.MeshStandardMaterial({
    color: theme.accentGold,
    metalness: 0.85,
    roughness: 0.2,
  }));

  const glassMat = regMat(new THREE.MeshPhysicalMaterial({
    color: theme.glass,
    transparent: true,
    opacity: 0.65,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.7,
    ior: 1.5,
    thickness: 0.3,
  }));

  const roofMat = regMat(new THREE.MeshStandardMaterial({
    color: theme.roof,
    roughness: 0.5,
    metalness: 0.3,
  }));

  const wireMat = regMat(new THREE.LineBasicMaterial({
    color: theme.wireframe,
    transparent: true,
    opacity: 0.8,
    linewidth: 1.5,
  }));

  // Sub-groups for exploded view separation
  const foundationGroup = new THREE.Group();
  const groundFloorGroup = new THREE.Group();
  const upperFloorGroup = new THREE.Group();
  const roofGroup = new THREE.Group();
  const edgesGroup = new THREE.Group();

  rootGroup.add(foundationGroup);
  rootGroup.add(groundFloorGroup);
  rootGroup.add(upperFloorGroup);
  rootGroup.add(roofGroup);
  rootGroup.add(edgesGroup);

  // Helper to add mesh and its wireframe edges
  const addPart = (
    parent: THREE.Group,
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    pos: [number, number, number],
    rot?: [number, number, number]
  ): THREE.Mesh => {
    regGeo(geo);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    if (rot) mesh.rotation.set(...rot);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);

    // Architectural edge hairlines
    const edgesGeo = regGeo(new THREE.EdgesGeometry(geo, 24));
    const edgeLine = new THREE.LineSegments(edgesGeo, wireMat);
    edgeLine.position.copy(mesh.position);
    if (rot) edgeLine.rotation.set(...rot);
    edgesGroup.add(edgeLine);

    return mesh;
  };

  // ==========================================
  // LEVEL 0: FOUNDATION & PILING PODIUM
  // ==========================================
  // Main concrete platform
  addPart(foundationGroup, new THREE.BoxGeometry(7.6, 0.4, 6.4), wallMat, [0, 0.2, 0]);

  // Secondary entrance terrace stepped slab
  addPart(foundationGroup, new THREE.BoxGeometry(3.6, 0.2, 2.2), darkCladMat, [1.5, 0.3, 2.8]);

  // Gold chamfer border strip around foundation
  addPart(foundationGroup, new THREE.BoxGeometry(7.7, 0.08, 6.5), goldMat, [0, 0.38, 0]);

  // Foundation Piling Inspection Cylinders (visible when exploded)
  const pileCoords: [number, number][] = [
    [-3.2, -2.6], [3.2, -2.6], [-3.2, 2.6], [3.2, 2.6], [0, 0]
  ];
  pileCoords.forEach(([px, pz]) => {
    addPart(foundationGroup, new THREE.CylinderGeometry(0.2, 0.2, 1.2, 16), darkCladMat, [px, -0.6, pz]);
  });

  // ==========================================
  // LEVEL 1: GROUND FLOOR LIVING & ENTRANCE
  // ==========================================
  const groundBaseY = 0.4;

  // Main living block
  addPart(groundFloorGroup, new THREE.BoxGeometry(4.8, 2.4, 4.4), wallMat, [-0.8, groundBaseY + 1.2, 0]);

  // Entrance architectural foyer (dark contrasting finish)
  addPart(groundFloorGroup, new THREE.BoxGeometry(2.4, 2.4, 3.2), darkCladMat, [2.2, groundBaseY + 1.2, 0.4]);

  // Floor-to-ceiling recessed glass living window
  addPart(groundFloorGroup, new THREE.BoxGeometry(3.6, 1.8, 0.1), glassMat, [-0.8, groundBaseY + 1.1, 2.22]);

  // Glass door entrance
  addPart(groundFloorGroup, new THREE.BoxGeometry(1.2, 2.0, 0.1), glassMat, [1.8, groundBaseY + 1.0, 2.02]);

  // Entrance canopy with gold bracket
  addPart(groundFloorGroup, new THREE.BoxGeometry(1.8, 0.12, 1.6), roofMat, [1.8, groundBaseY + 2.2, 2.6]);
  addPart(groundFloorGroup, new THREE.CylinderGeometry(0.04, 0.04, 2.2, 8), goldMat, [2.5, groundBaseY + 1.1, 3.2]);

  // Vertical timber/gold facade louvers (shading screen)
  for (let i = 0; i < 7; i++) {
    addPart(groundFloorGroup, new THREE.BoxGeometry(0.06, 2.0, 0.2), goldMat, [-2.6 + i * 0.22, groundBaseY + 1.1, 2.25]);
  }

  // ==========================================
  // LEVEL 2: UPPER FLOOR SUITES & CANTILEVER
  // ==========================================
  const upperBaseY = groundBaseY + 2.4;

  // Cantilevered master bedroom volume projecting out over the front terrace
  addPart(upperFloorGroup, new THREE.BoxGeometry(4.4, 2.2, 4.8), wallMat, [0.4, upperBaseY + 1.1, 0.6]);

  // Secondary wing (recessed dark clad volume)
  addPart(upperFloorGroup, new THREE.BoxGeometry(3.0, 2.2, 3.8), darkCladMat, [-2.0, upperBaseY + 1.1, -0.4]);

  // Upper balcony glass railing
  addPart(upperFloorGroup, new THREE.BoxGeometry(4.0, 0.8, 0.08), glassMat, [0.4, upperBaseY + 0.5, 3.02]);
  // Gold top rail for balcony
  addPart(upperFloorGroup, new THREE.BoxGeometry(4.1, 0.06, 0.1), goldMat, [0.4, upperBaseY + 0.92, 3.02]);

  // Upper panoramic ribbon windows
  addPart(upperFloorGroup, new THREE.BoxGeometry(3.2, 1.4, 0.1), glassMat, [0.4, upperBaseY + 1.3, 2.98]);

  // Side sunset terrace window
  addPart(upperFloorGroup, new THREE.BoxGeometry(0.1, 1.4, 2.6), glassMat, [2.62, upperBaseY + 1.3, 0.6]);

  // Architectural gold louver accent on upper facade
  for (let j = 0; j < 5; j++) {
    addPart(upperFloorGroup, new THREE.BoxGeometry(0.05, 1.6, 0.25), goldMat, [-1.2 + j * 0.25, upperBaseY + 1.3, 3.05]);
  }

  // ==========================================
  // LEVEL 3: ROOF SOLAR CANOPY & ROOFTOP
  // ==========================================
  const roofBaseY = upperBaseY + 2.2;

  // Modern ultra-slim floating roof slab with sharp angled overhang
  addPart(roofGroup, new THREE.BoxGeometry(7.8, 0.25, 6.2), roofMat, [0, roofBaseY + 0.12, 0.2]);

  // Gold fascia edge along roofline
  addPart(roofGroup, new THREE.BoxGeometry(7.85, 0.08, 6.25), goldMat, [0, roofBaseY + 0.22, 0.2]);

  // Rooftop solar photovoltaic panel array
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      addPart(
        roofGroup,
        new THREE.BoxGeometry(1.3, 0.05, 1.8),
        darkCladMat,
        [-2.4 + c * 1.5, roofBaseY + 0.32, -1.2 + r * 2.0],
        [-0.08, 0, 0]
      );
    }
  }

  // Roof garden pergola slats
  for (let k = 0; k < 6; k++) {
    addPart(roofGroup, new THREE.BoxGeometry(0.08, 0.12, 2.4), goldMat, [1.4 + k * 0.35, roofBaseY + 0.45, 0.5]);
  }

  // ==========================================
  // INTERACTIVE INSPECTION HOTSPOT PINS
  // ==========================================
  const hotspotDefs = [
    {
      id: 'foundation',
      name: '01 Foundation Piling & Soil Load',
      description: 'AGIS coordinate confirmation & reinforced concrete sub-grade piling verified.',
      pos: new THREE.Vector3(-2.8, 0.5, 2.5),
    },
    {
      id: 'plumbing',
      name: '02 Plumbing & Hydrostatic Pressure',
      description: 'PPR water supply pressure testing and independent drainage gradient certified.',
      pos: new THREE.Vector3(-0.8, groundBaseY + 1.4, 2.3),
    },
    {
      id: 'electrical',
      name: '03 Electrical Load & Surge Protection',
      description: 'Copper conduit gauge, earthing resistance, and dedicated surge arrestors tested.',
      pos: new THREE.Vector3(2.4, groundBaseY + 1.4, 1.8),
    },
    {
      id: 'structural',
      name: '04 Cantilever Slab & Balcony Integrity',
      description: 'Upper deck deflection calculation and structural slab load certified by engineer.',
      pos: new THREE.Vector3(0.4, upperBaseY + 0.9, 3.1),
    },
    {
      id: 'solar_roof',
      name: '05 Solar Canopy & Roof Waterproofing',
      description: 'Double-membrane elastomeric waterproofing and solar PV generation array vetted.',
      pos: new THREE.Vector3(0, roofBaseY + 0.5, -0.2),
    },
  ];

  const hotspotObjects = hotspotDefs.map((def) => {
    const pinGeo = regGeo(new THREE.SphereGeometry(0.18, 16, 16));
    const pinMat = regMat(new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      emissive: 0xD4AF37,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1,
    }));
    const pinMesh = new THREE.Mesh(pinGeo, pinMat);
    pinMesh.position.copy(def.pos);
    pinMesh.userData = { id: def.id, name: def.name, description: def.description };
    rootGroup.add(pinMesh);

    return {
      id: def.id,
      name: def.name,
      position: def.pos,
      description: def.description,
      mesh: pinMesh,
    };
  });

  // Center the whole house so pivot is grounded naturally
  rootGroup.position.set(0, -1.8, 0);

  // Update exploded view by factor [0..1]
  const updateExplode = (factor: number) => {
    const clamped = Math.max(0, Math.min(1, factor));
    foundationGroup.position.y = -clamped * 0.8;
    groundFloorGroup.position.y = 0;
    upperFloorGroup.position.y = clamped * 1.4;
    roofGroup.position.y = clamped * 3.0;
  };

  // Switch themes
  const updateTheme = (newThemeKey: keyof typeof THEMES) => {
    const t = THEMES[newThemeKey] || THEMES.daylight;
    wallMat.color.setHex(t.primaryWall);
    darkCladMat.color.setHex(t.secondaryWall);
    glassMat.color.setHex(t.glass);
    goldMat.color.setHex(t.accentGold);
    roofMat.color.setHex(t.roof);
    wireMat.color.setHex(t.wireframe);
  };

  // Disposer
  const dispose = () => {
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
  };

  return {
    group: rootGroup,
    foundationGroup,
    groundFloorGroup,
    upperFloorGroup,
    roofGroup,
    edgesGroup,
    hotspotObjects,
    updateExplode,
    updateTheme,
    dispose,
  };
}
