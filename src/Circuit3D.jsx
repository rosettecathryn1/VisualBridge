
import { useRef, useState } from "react";
import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

const PART_INFO = {
  battery: {
    title: "Battery",
    description:
      "The battery provides a potential difference that transfers energy to charges in the circuit.",
    question: "What is the main role of a battery?",
    options: [
      "To supply electrical energy to the circuit",
      "To open and close the circuit",
      "To produce sound",
    ],
    correct: 0,
    explanation:
      "Correct! The battery provides energy that drives charge around a complete circuit.",
  },
  switch: {
    title: "Switch",
    description:
      "A switch controls whether the conducting path is complete or broken.",
    question: "What happens when a switch is open?",
    options: [
      "The current increases",
      "The circuit path is broken",
      "The battery disappears",
    ],
    correct: 1,
    explanation:
      "Correct! An open switch breaks the conducting path, so current stops in this simple circuit.",
  },
  bulb: {
    title: "Light bulb",
    description:
      "The bulb transfers electrical energy into light and heat when current passes through it.",
    question: "When does the bulb light in this circuit?",
    options: [
      "When the switch is open",
      "When there is no battery",
      "When the circuit is complete",
    ],
    correct: 2,
    explanation:
      "Correct! A complete circuit allows current to flow through the bulb.",
  },
};

function Wire({ start, end, color = "#22d3ee" }) {
  const midpoint = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];

  const direction = [
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2],
  ];

  const length = Math.sqrt(
    direction[0] ** 2 +
      direction[1] ** 2 +
      direction[2] ** 2
  );

  // Cylinder geometry points along its Y axis.
  const rotation = Math.atan2(direction[0], direction[1]);

  return (
    <mesh position={midpoint} rotation={[0, 0, rotation]}>
      <cylinderGeometry args={[0.035, 0.035, length, 12]} />
      <meshStandardMaterial
        color={color}
        metalness={0.35}
        roughness={0.35}
      />
    </mesh>
  );
}

function Battery({ onSelect }) {
  return (
    <group
      position={[-2, 0, 0]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("battery");
      }}
    >
      <mesh>
        <boxGeometry args={[0.65, 1.1, 0.5]} />
        <meshStandardMaterial color="#334155" metalness={0.35} />
      </mesh>

      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.12, 20]} />
        <meshStandardMaterial color="#ef4444" metalness={0.6} />
      </mesh>

      <mesh position={[0, -0.58, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.12, 20]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} />
      </mesh>

      <Html position={[0, -0.05, 0.35]} center distanceFactor={8}>
        <span style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
          +
        </span>
      </Html>
    </group>
  );
}

function Bulb({ isOn, onSelect }) {
  return (
    <group
      position={[2, 0, 0]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("bulb");
      }}
    >
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.18, 0.23, 0.35, 20]} />
        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.36, 24, 24]} />
        <meshStandardMaterial
          color={isOn ? "#fde047" : "#64748b"}
          emissive={isOn ? "#facc15" : "#000000"}
          emissiveIntensity={isOn ? 2 : 0}
          roughness={0.2}
        />
      </mesh>

      {isOn && (
        <pointLight
          position={[0, 0.3, 0.4]}
          color="#fde047"
          intensity={2}
          distance={3}
        />
      )}
    </group>
  );
}

function Switch({ isOn, onToggle, onSelect }) {
  return (
    <group
      position={[0, -0.85, 0]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("switch");
        onToggle();
      }}
    >
      <mesh>
        <boxGeometry args={[1.15, 0.14, 0.42]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      {/* Two terminals */}
      <mesh position={[-0.36, 0.12, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>

      <mesh position={[0.36, 0.12, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>

      {/* Lever rotates between the closed and open positions */}
      <group
        position={[-0.36, 0.13, 0]}
        rotation={[0, 0, isOn ? 0 : Math.PI / 4]}
      >
        <mesh position={[0.36, 0.015, 0]}>
          <boxGeometry args={[0.72, 0.07, 0.08]} />
          <meshStandardMaterial color="#f97316" metalness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function CurrentFlow({ isOn }) {
  const markers = useRef([]);

  // A route around the battery, bulb, wires and switch.
  // The route is an illustrative animation, not a measurement of real electrons.
  const route = [
    [-1.65, 1.35, 0.08],
    [-0.8, 1.35, 0.08],
    [0, 1.35, 0.08],
    [0.8, 1.35, 0.08],
    [1.7, 1.35, 0.08],
    [2, 0.85, 0.08],
    [2, 0.1, 0.08],
    [2, -0.85, 0.08],
    [1.4, -0.85, 0.08],
    [0.7, -0.85, 0.08],
    [0, -0.85, 0.08],
    [-0.7, -0.85, 0.08],
    [-1.4, -0.85, 0.08],
    [-2, -0.85, 0.08],
    [-2, -0.1, 0.08],
    [-2, 0.7, 0.08],
  ];

  useFrame((_, delta) => {
    if (!isOn) return;

    markers.current.forEach((marker) => {
      if (!marker) return;

      marker.userData.distance =
        (marker.userData.distance ?? 0) + delta * 1.1;

      const distance = marker.userData.distance % route.length;
      const index = Math.floor(distance);
      const fraction = distance - index;

      const start = route[index];
      const end = route[(index + 1) % route.length];

      marker.position.set(
        start[0] + (end[0] - start[0]) * fraction,
        start[1] + (end[1] - start[1]) * fraction,
        start[2] + (end[2] - start[2]) * fraction
      );
    });
  });

  return (
    <>
      {Array.from({ length: 16 }, (_, index) => (
        <mesh
          key={index}
          ref={(mesh) => {
            markers.current[index] = mesh;
            if (mesh && mesh.userData.distance === undefined) {
              mesh.userData.distance = index;
            }
          }}
          visible={isOn}
        >
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
      ))}
    </>
  );
}

function CircuitLabels({ isOn }) {
  const labels = [
    { text: "BATTERY", position: [-2, 0.95, 0] },
    { text: "BULB", position: [2, 0.85, 0] },
    { text: "SWITCH", position: [0, -0.35, 0] },
  ];

  return (
    <>
      {labels.map((label) => (
        <Html key={label.text} position={label.position} center distanceFactor={8}>
          <div
            style={{
              background: "#111827",
              color: "#67e8f9",
              padding: "5px 8px",
              borderRadius: "6px",
              border: "1px solid #334155",
              fontSize: "11px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {label.text}
          </div>
        </Html>
      ))}

      <Html position={[0, 2, 0]} center>
        <div
          style={{
            color: isOn ? "#fde047" : "#cbd5e1",
            fontSize: "12px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {isOn ? "CIRCUIT CLOSED" : "CIRCUIT OPEN"}
        </div>
      </Html>
    </>
  );
}

function CircuitScene({ isOn, onToggle, onSelect }) {
  return (
    <>
      <color attach="background" args={["#0b1220"]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 5, 5]} intensity={2} />

      <gridHelper
        args={[10, 20, "#334155", "#1e293b"]}
        position={[0, -1.2, 0]}
      />

      <Battery onSelect={onSelect} />
      <Bulb isOn={isOn} onSelect={onSelect} />
      <Switch isOn={isOn} onToggle={onToggle} onSelect={onSelect} />

      {/* Top wire */}
      <Wire start={[-2, 0.58, 0]} end={[-2, 1.35, 0]} />
      <Wire start={[-2, 1.35, 0]} end={[2, 1.35, 0]} />
      <Wire start={[2, 1.35, 0]} end={[2, 0.58, 0]} />

      {/* Bottom return path with a visible switch gap */}
      <Wire start={[-2, -0.58, 0]} end={[-2, -0.85, 0]} />
      <Wire start={[-2, -0.85, 0]} end={[-0.6, -0.85, 0]} />
      <Wire
        start={[0.6, -0.85, 0]}
        end={[2, -0.85, 0]}
      />
      <Wire start={[2, -0.85, 0]} end={[2, -0.15, 0]} />

      {/* When closed, the lever visually bridges the gap */}
      <CurrentFlow isOn={isOn} />
      <CircuitLabels isOn={isOn} />

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={10}
      />
    </>
  );
}

export default function Circuit3D() {
  const [isOn, setIsOn] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function selectPart(part) {
    setSelectedPart(part);
    setSelectedAnswer(null);
  }

  const info = selectedPart ? PART_INFO[selectedPart] : null;

  return (
    <div
      style={{
        width: "100%",
        color: "#e2e8f0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "12px",
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 6px" }}>3D Circuit Laboratory</h2>
          <p style={{ margin: 0, color: "#94a3b8" }}>
            Click a component to learn about it. Drag to rotate and scroll to zoom.
          </p>
        </div>

        <button
          onClick={() => setIsOn((previous) => !previous)}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "10px",
            background: isOn ? "#ef4444" : "#06b6d4",
            color: "#07111f",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {isOn ? "Open Switch" : "Close Switch"}
        </button>
      </div>

      <div
        style={{
          height: "430px",
          overflow: "hidden",
          border: "1px solid #334155",
          borderRadius: "16px",
        }}
      >
        <Canvas camera={{ position: [0, 2.5, 7], fov: 50 }}>
          <CircuitScene
            isOn={isOn}
            onToggle={() => setIsOn((previous) => !previous)}
            onSelect={selectPart}
          />
        </Canvas>
      </div>

      <p style={{ color: isOn ? "#fde047" : "#94a3b8" }}>
        {isOn
          ? "The switch is closed. The bulb lights up."
          : "The switch is open. The bulb is off."}
      </p>

      {info && (
        <div
          style={{
            marginTop: "18px",
            padding: "20px",
            borderRadius: "14px",
            background: "#172033",
            border: "1px solid #334155",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#67e8f9" }}>
              {info.title}
            </h3>

            <button
              onClick={() => {
                setSelectedPart(null);
                setSelectedAnswer(null);
              }}
              style={{
                padding: "7px 11px",
                border: "1px solid #475569",
                borderRadius: "8px",
                background: "transparent",
                color: "#e2e8f0",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>

          <p style={{ lineHeight: 1.7 }}>{info.description}</p>
          <hr style={{ borderColor: "#334155" }} />
          <h4>{info.question}</h4>

          <div style={{ display: "grid", gap: "10px" }}>
            {info.options.map((option, index) => {
              const answered = selectedAnswer !== null;
              const isCorrect = index === info.correct;
              const isChosen = selectedAnswer === index;

              return (
                <button
                  key={option}
                  disabled={answered}
                  onClick={() => setSelectedAnswer(index)}
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    borderRadius: "9px",
                    border: "1px solid",
                    borderColor:
                      answered && isCorrect
                        ? "#22c55e"
                        : isChosen
                          ? "#f87171"
                          : "#475569",
                    background:
                      answered && isCorrect
                        ? "#14532d"
                        : isChosen
                          ? "#7f1d1d"
                          : "#0f172a",
                    color: "#e2e8f0",
                    cursor: answered ? "default" : "pointer",
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div
              style={{
                marginTop: "14px",
                padding: "12px",
                borderRadius: "8px",
                background:
                  selectedAnswer === info.correct
                    ? "#14532d"
                    : "#713f12",
                lineHeight: 1.6,
              }}
            >
              <strong>
                {selectedAnswer === info.correct
                  ? "Correct! 🎉"
                  : "Not quite. Try again next time!"}
              </strong>

              <p style={{ marginBottom: 0 }}>
                {selectedAnswer === info.correct
                  ? info.explanation
                  : "Review the explanation above and remember what this component does."}
              </p>

              <button
                onClick={() => setSelectedAnswer(null)}
                style={{
                  marginTop: "12px",
                  padding: "9px 12px",
                  border: "1px solid #94a3b8",
                  borderRadius: "8px",
                  background: "transparent",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                Try question again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
