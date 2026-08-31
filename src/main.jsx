import React,{useEffect,useState} from 'react';
import{createRoot}from'react-dom/client';
import{ArrowRight,Play,Pause,MousePointer2,ShieldCheck,Upload,Menu,X,Box,RotateCcw,Eye}from'lucide-react';
import'./styles.css';

const steps=[['01','Design','Author keyframes with intent and timing.'],['02','Validate','Catch infeasible motion early with real-time checks.'],['03','Retarget','Map motion to any capable robot in one click.'],['04','Deploy','Export clean trajectories for sim and hardware.']];
const features=[['pointer','Direct manipulation','Move keyframes in 3D or on the timeline. See results instantly.'],['shield','Constraint-aware authoring','Real-time joint limits, self-collision, and contact feedback.'],['upload','Clean trajectory export','Export time-parameterized motion ready for your stack.']];
const Icon=({type})=>type==='pointer'?<MousePointer2/>:type==='shield'?<ShieldCheck/>:<Upload/>;

function Mark(){return <span className="mark"><i></i><i></i></span>}
function Robot({ghost=false,shift=0}){return <g className={ghost?'ghost robot':'robot'} transform={`translate(${shift} 0)`}>
 <circle cx="182" cy="77" r="18"/><path d="M174 94 L155 149 L183 177 L206 137 L197 95Z"/>
 <path d="M159 110 L118 135 L87 115"/><path d="M199 109 L235 91 L268 106"/>
 <path d="M181 175 L146 218 L119 266"/><path d="M190 175 L220 217 L258 249"/>
 <circle cx="158" cy="109" r="8"/><circle cx="119" cy="135" r="8"/><circle cx="88" cy="115" r="8"/>
 <circle cx="199" cy="109" r="8"/><circle cx="235" cy="91" r="8"/><circle cx="268" cy="106" r="8"/>
 <circle cx="181" cy="175" r="9"/><circle cx="146" cy="218" r="9"/><circle cx="119" cy="266" r="9"/>
 <circle cx="190" cy="175" r="9"/><circle cx="220" cy="217" r="9"/><circle cx="258" cy="249" r="9"/>
 </g>}
function RobotStage({progress=42}){return <svg className="robot-stage" viewBox="0 0 360 310" aria-label="Humanoid robot motion preview">
 <defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#dce1eb" strokeWidth=".7"/></pattern></defs>
 <rect width="360" height="310" fill="url(#grid)"/><path className="trajectory" d="M55 255 C100 245 108 190 153 226 S215 255 270 190"/>
 <g opacity=".12"><Robot ghost shift={-42}/></g><g opacity=".24"><Robot ghost shift={-20}/></g><Robot shift={progress/6}/>
 <g className="axis" transform="translate(28 270)"><path d="M0 0h24M0 0v-24M0 0l-12 9"/><text x="27">X</text><text y="-28">Z</text></g>
 </svg>}
function Editor(){const[playing,setPlaying]=useState(false);const[p,setP]=useState(42);useEffect(()=>{if(!playing)return;const id=setInterval(()=>setP(v=>v>=100?0:v+1),55);return()=>clearInterval(id)},[playing]);return <div className="editor">
 <div className="editor-top"><span>Stand to reach — v03</span><button onClick={()=>setPlaying(!playing)} aria-label={playing?'Pause':'Play'}>{playing?<Pause/>:<Play/>}</button><span className="mono">00:0{Math.floor(p/20)}.{String(p%20).padStart(2,'0')}</span></div>
 <div className="editor-body"><aside><b>SCENE</b><span className="selected"><Box/> G1 Robot</span><span><Eye/> Ground</span><span><Eye/> Camera</span></aside><RobotStage progress={p}/><div className="inspector"><b>INSPECTOR</b><label>RIGHT HIP <em>-18.6°</em></label><input type="range" value={p} onChange={e=>setP(+e.target.value)}/><label>RIGHT KNEE <em>62.1°</em></label><input type="range" value={70-p/4} readOnly/><label>CONSTRAINTS</label><small>Self-collision <i>✓ OK</i></small><small>Joint limits <i>✓ OK</i></small><small>Ground contact <i>✓ OK</i></small></div></div>
 <div className="timeline"><b>KEYFRAMES</b><input aria-label="Timeline" type="range" value={p} onChange={e=>setP(+e.target.value)}/><span>{p}%</span></div></div>}

function App(){const[menu,setMenu]=useState(false);const[active,setActive]=useState(0);return <>
 <header><a className="brand" href="#"><Mark/>Ghost</a><nav className={menu?'open':''}>{['Product','Workflow','Research','Docs'].map(x=><a key={x} href={`#${x.toLowerCase()}`} onClick={()=>setMenu(false)}>{x}</a>)}</nav><a className="top-cta" href="#product">Start designing <ArrowRight/></a><button className="menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
 <main><section className="hero" id="product"><div className="hero-copy"><h1>Motion,<br/>by design.</h1><p>Create expressive, kinematically feasible robot motion—without writing a single trajectory by hand.</p><div className="actions"><a className="primary" href="#workflow">Start designing <ArrowRight/></a><a className="secondary" href="#workflow"><Play/> Watch the workflow</a></div></div><Editor/></section>
 <section className="proof"><h2>Built for motion that has to work in the real world.</h2><div><span><ShieldCheck/>Kinematic validation</span><span><Box/>Model-agnostic workflow</span><span><Upload/>Simulation-ready export</span></div></section>
 <section className="workflow" id="workflow"><h2>From pose to policy.</h2><p className="section-lead">Author keyframes. Catch infeasible motion early. Hand clean references to your dynamics and learning stack.</p><div className="steps">{steps.map((s,i)=><button key={s[0]} className={active===i?'active':''} onClick={()=>setActive(i)}><span><b>{s[0]}</b> {s[1]}</span><div className="mini-robot"><RobotStage progress={i*22+15}/></div><p>{s[2]}</p></button>)}</div><div className="step-status"><b>{steps[active][0]} / 04</b><span>{steps[active][1]}</span><i></i></div></section>
 <section className="control"><div className="curve-editor"><div className="curve-head"><b>KEYFRAMES</b><span>28 keyframes</span></div>{['Root','Spine','Right Arm','Left Arm','Right Leg'].map((x,i)=><div className="track" key={x}><span>{x}</span><svg viewBox="0 0 280 28"><path d={`M0 ${14+i%2*3} C60 ${2+i*3}, 90 ${25-i}, 145 12 S225 ${4+i*2},280 14`}/>{[30,88,145,205,260].map(n=><circle key={n} cx={n} cy={14+(i%2?3:-2)} r="3"/>)}</svg></div>)}</div><div className="feature-copy"><h2>Every frame,<br/>under control.</h2>{features.map(f=><div className="feature" key={f[1]}><Icon type={f[0]}/><div><h3>{f[1]}</h3><p>{f[2]}</p></div></div>)}</div></section>
 <section className="research" id="research"><div><h2>Better references<br/>make better robots.</h2><p>Study how keyframe density and kinematic feasibility affect retargeting, optimization, and tracking.</p><a href="#docs">Explore research <ArrowRight/></a></div><div className="comparison"><article><b>Sparse & infeasible</b><div className="poses"><i></i><i></i><i></i><i></i></div><svg viewBox="0 0 360 100"><path className="orange" d="M0 68 C60 70 45 4 102 48 S175 84 220 24 S292 90 360 40"/></svg></article><span className="vs">VS</span><article><b>Dense & feasible</b><div className="poses dense"><i></i><i></i><i></i><i></i><i></i><i></i></div><svg viewBox="0 0 360 100"><path d="M0 64 C70 60 95 35 150 48 S250 72 360 40"/></svg></article></div></section>
 <section className="final"><h2>Give your robot<br/>a better starting point.</h2><a href="#product">Start designing <ArrowRight/></a></section></main>
 <footer><a className="brand" href="#"><Mark/>Ghost</a><span>Motion design for robots.</span><nav><a href="#product">Product</a><a href="#workflow">Workflow</a><a href="#research">Research</a><a id="docs">Docs</a></nav><small>© 2026 Ghost</small></footer>
 </>}
createRoot(document.getElementById('root')).render(<App/>);
