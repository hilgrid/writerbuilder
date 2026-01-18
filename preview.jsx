import React, { useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';

// ============ TYPES ============
// Types are defined inline for the preview

// ============ CONSTANTS ============
const DIMENSIONS = [
  {
    id: 'originality',
    name: 'Originality',
    color: 'coral',
    hexColor: '#ee8a82',
    description: 'Use when you need to decide between generating novel, creative ideas or sticking to proven, reliable standards.',
    isBidirectional: true,
    branches: [
      {
        id: 'novel',
        name: 'Novel',
        description: 'Output feels generic, derivative, or too safe.',
        groups: [
          { id: 'creative', name: 'Creative', description: 'You need to break through formulaic or predictable content.', adjectives: [
            { word: 'Imaginative', usage: 'For creating detailed mental pictures of things that don\'t exist yet.' },
            { word: 'Inventive', usage: 'For generating new solutions or mechanisms that haven\'t been tried before.' },
            { word: 'Original', usage: 'For producing unique outputs that aren\'t derivative or recycled.' },
            { word: 'Generative', usage: 'For producing high volume and wide variety rather than refining single ideas.' }
          ]},
          { id: 'unexpected', name: 'Unexpected', description: 'Output is predictable and doesn\'t challenge assumptions.', adjectives: [
            { word: 'Surprising', usage: 'For subverting expectations with unanticipated directions.' },
            { word: 'Counterintuitive', usage: 'For challenging conventional wisdom.' },
            { word: 'Non-obvious', usage: 'For revealing connections that aren\'t immediately apparent.' },
            { word: 'Twist', usage: 'For dramatically reversing direction or revealing hidden meaning.' }
          ]},
          { id: 'innovative', name: 'Innovative', description: 'Ideas feel outdated or behind current thinking.', adjectives: [
            { word: 'Cutting-edge', usage: 'For incorporating the absolute latest developments.' },
            { word: 'Pioneering', usage: 'For being first to explore new territory.' },
            { word: 'Breakthrough', usage: 'For solving previously impossible problems.' },
            { word: 'Novel', usage: 'For introducing approaches that haven\'t been applied in this context.' }
          ]},
          { id: 'fresh', name: 'Fresh', description: 'Output feels stale or recycled.', adjectives: [
            { word: 'New', usage: 'For introducing recent updates or current information.' },
            { word: 'Different', usage: 'For distinguishing from existing alternatives.' },
            { word: 'Unconventional', usage: 'For departing from standard methods.' },
            { word: 'Distinctive', usage: 'For creating a recognizable, signature style.' }
          ]}
        ]
      },
      {
        id: 'proven',
        name: 'Proven',
        description: 'Output is too experimental or lacks credibility.',
        groups: [
          { id: 'conventional', name: 'Conventional', description: 'Output strays too far from what your audience expects.', adjectives: [
            { word: 'Standard', usage: 'For meeting established baseline requirements.' },
            { word: 'Traditional', usage: 'For drawing on heritage and long-standing practices.' },
            { word: 'Mainstream', usage: 'For aligning with what audiences recognize.' },
            { word: 'Established', usage: 'For referencing recognized authorities.' }
          ]},
          { id: 'reliable', name: 'Reliable', description: 'Output suggests approaches that might fail.', adjectives: [
            { word: 'Dependable', usage: 'For ensuring consistent performance.' },
            { word: 'Trustworthy', usage: 'For building confidence through credibility.' },
            { word: 'Battle-tested', usage: 'For using approaches validated under stress.' },
            { word: 'Stable', usage: 'For creating foundations that won\'t break.' }
          ]},
          { id: 'standard', name: 'Standard', description: 'You need output to align with industry norms.', adjectives: [
            { word: 'Industry-norm', usage: 'For matching what competitors are doing.' },
            { word: 'Best-practice', usage: 'For following optimized methods.' },
            { word: 'Typical', usage: 'For representing the average approach.' },
            { word: 'Expected', usage: 'For delivering what audiences anticipate.' }
          ]},
          { id: 'tested', name: 'Tested', description: 'Output lacks supporting evidence or validation.', adjectives: [
            { word: 'Validated', usage: 'For using ideas confirmed by feedback.' },
            { word: 'Verified', usage: 'For ensuring facts are checked.' },
            { word: 'Time-tested', usage: 'For drawing on enduring wisdom.' },
            { word: 'Safe-bet', usage: 'For choosing the low-risk option.' }
          ]}
        ]
      }
    ]
  },
  {
    id: 'grounding',
    name: 'Grounding',
    color: 'sky',
    hexColor: '#7c9eb2',
    description: 'Use when you need to adjust the altitude of thinking—zooming in to concrete details or zooming out to abstract concepts.',
    isBidirectional: true,
    branches: [
      {
        id: 'concrete',
        name: 'Concrete',
        description: 'Output is too theoretical or abstract.',
        groups: [
          { id: 'specific', name: 'Specific', description: 'Output is vague or ambiguous.', adjectives: [
            { word: 'Precise', usage: 'For specifying exact measurements.' },
            { word: 'Exact', usage: 'For requiring literal matches.' },
            { word: 'Particular', usage: 'For selecting one specific option.' },
            { word: 'Explicit', usage: 'For stating things clearly.' }
          ]},
          { id: 'tactical', name: 'Tactical', description: 'Output lacks clear next steps.', adjectives: [
            { word: 'Actionable', usage: 'For advice that can be acted upon.' },
            { word: 'Executable', usage: 'For instructions ready to run.' },
            { word: 'Step-by-step', usage: 'For sequential instructions.' },
            { word: 'Hands-on', usage: 'For enabling direct practice.' }
          ]},
          { id: 'practical', name: 'Practical', description: 'Output won\'t work in the real world.', adjectives: [
            { word: 'Applied', usage: 'For translating theory into implementation.' },
            { word: 'Useful', usage: 'For prioritizing utility.' },
            { word: 'Implementable', usage: 'For ensuring feasibility.' },
            { word: 'Realistic', usage: 'For grounding expectations.' }
          ]},
          { id: 'detailed', name: 'Detailed', description: 'Output skims the surface without enough depth.', adjectives: [
            { word: 'Granular', usage: 'For examining smallest parts.' },
            { word: 'Thorough', usage: 'For complete coverage.' },
            { word: 'In-depth', usage: 'For exploring complexity.' },
            { word: 'Comprehensive', usage: 'For addressing every angle.' }
          ]}
        ]
      },
      {
        id: 'abstract',
        name: 'Abstract',
        description: 'Output is too granular or tactical.',
        groups: [
          { id: 'conceptual', name: 'Conceptual', description: 'Output gets lost in details without establishing frameworks.', adjectives: [
            { word: 'Theoretical', usage: 'For exploring based on logic and models.' },
            { word: 'Philosophical', usage: 'For questioning assumptions.' },
            { word: 'Principle-based', usage: 'For reasoning from first principles.' },
            { word: 'Ideal', usage: 'For describing the perfect state.' }
          ]},
          { id: 'strategic', name: 'Strategic', description: 'Output focuses on execution without considering long-term direction.', adjectives: [
            { word: 'Long-term', usage: 'For thinking years ahead.' },
            { word: 'Vision-level', usage: 'For painting an inspiring destination.' },
            { word: 'Directional', usage: 'For setting a course without specifying route.' },
            { word: 'Overarching', usage: 'For identifying connecting themes.' }
          ]},
          { id: 'high-level', name: 'High-level', description: 'Output buries the main point in details.', adjectives: [
            { word: 'Summary', usage: 'For condensing to key takeaways.' },
            { word: 'Overview', usage: 'For providing quick sense of structure.' },
            { word: 'Broad-strokes', usage: 'For painting general picture.' },
            { word: 'Zoomed-out', usage: 'For showing context.' }
          ]},
          { id: 'big-picture', name: 'Big-picture', description: 'Output misses how parts connect to the whole.', adjectives: [
            { word: 'Holistic', usage: 'For treating as interconnected whole.' },
            { word: 'Systems-level', usage: 'For analyzing interdependencies.' },
            { word: 'Macro', usage: 'For examining large-scale patterns.' },
            { word: 'Forest-not-trees', usage: 'For maintaining perspective.' }
          ]}
        ]
      }
    ]
  },
  {
    id: 'risk',
    name: 'Risk',
    color: 'rose',
    hexColor: '#c97b7b',
    description: 'Use when you need to determine the feasibility and boldness of the output.',
    isBidirectional: true,
    branches: [
      {
        id: 'bold',
        name: 'Bold',
        description: 'Output plays it too safe or lacks ambition.',
        groups: [
          { id: 'aggressive', name: 'Aggressive', description: 'Output is too soft or avoids confrontation.', adjectives: [
            { word: 'Forceful', usage: 'For pushing through resistance.' },
            { word: 'Assertive', usage: 'For stating needs directly.' },
            { word: 'Direct', usage: 'For cutting through politeness.' },
            { word: 'Uncompromising', usage: 'For maintaining firm standards.' }
          ]},
          { id: 'ambitious', name: 'Ambitious', description: 'Goals feel achievable but uninspiring.', adjectives: [
            { word: 'Aspirational', usage: 'For setting inspiring goals.' },
            { word: 'Stretch', usage: 'For targeting goals just barely in reach.' },
            { word: 'Moonshot', usage: 'For pursuing 10x improvements.' },
            { word: 'Transformative', usage: 'For aiming to completely alter state.' }
          ]},
          { id: 'experimental', name: 'Experimental', description: 'Output only suggests things you\'ve already tried.', adjectives: [
            { word: 'Exploratory', usage: 'For venturing into unknown territory.' },
            { word: 'Trial', usage: 'For testing ideas on limited basis.' },
            { word: 'Unproven', usage: 'For pursuing ideas without data.' },
            { word: 'Edge-case', usage: 'For addressing unusual scenarios.' }
          ]},
          { id: 'boundary', name: 'Boundary-pushing', description: 'Output accepts existing constraints too readily.', adjectives: [
            { word: 'Challenging', usage: 'For questioning assumptions.' },
            { word: 'Disruptive', usage: 'For breaking established models.' },
            { word: 'Radical', usage: 'For departing dramatically from norms.' },
            { word: 'Provocative', usage: 'For deliberately provoking reaction.' }
          ]}
        ]
      },
      {
        id: 'safe',
        name: 'Safe',
        description: 'Output suggests things that are too risky or unproven.',
        groups: [
          { id: 'conservative', name: 'Conservative', description: 'Output doesn\'t account for downside risks.', adjectives: [
            { word: 'Careful', usage: 'For proceeding with attention.' },
            { word: 'Prudent', usage: 'For exercising wisdom.' },
            { word: 'Measured', usage: 'For taking slow, controlled action.' },
            { word: 'Restrained', usage: 'For holding back as protection.' }
          ]},
          { id: 'cautious', name: 'Cautious', description: 'Output ignores potential failure modes.', adjectives: [
            { word: 'Risk-aware', usage: 'For accounting for downsides.' },
            { word: 'Hedged', usage: 'For maintaining backup plans.' },
            { word: 'Guarded', usage: 'For protecting from exposure.' },
            { word: 'Deliberate', usage: 'For thinking carefully before acting.' }
          ]},
          { id: 'validated', name: 'Validated', description: 'Output makes claims without supporting evidence.', adjectives: [
            { word: 'Evidence-based', usage: 'For relying on documented facts.' },
            { word: 'Data-backed', usage: 'For supporting with numbers.' },
            { word: 'Proven-out', usage: 'For scaling demonstrated success.' },
            { word: 'De-risked', usage: 'For removing variables that cause failure.' }
          ]},
          { id: 'proven-safe', name: 'Proven', description: 'You can\'t afford for the approach to fail.', adjectives: [
            { word: 'Low-risk', usage: 'For prioritizing safety.' },
            { word: 'Incremental', usage: 'For small, manageable steps.' },
            { word: 'Evolutionary', usage: 'For adapting slowly.' },
            { word: 'Sure-thing', usage: 'For guaranteed outcomes.' }
          ]}
        ]
      }
    ]
  },
  {
    id: 'scope',
    name: 'Scope',
    color: 'amber',
    hexColor: '#d4a574',
    description: 'Use when you need to define the boundaries of the output.',
    isBidirectional: true,
    branches: [
      {
        id: 'focused',
        name: 'Focused',
        description: 'Output tries to cover too much ground.',
        groups: [
          { id: 'narrow', name: 'Narrow', description: 'Output includes irrelevant information.', adjectives: [
            { word: 'Targeted', usage: 'For aiming at one specific segment.' },
            { word: 'Limited', usage: 'For setting strict boundaries.' },
            { word: 'Constrained', usage: 'For working within specific limits.' },
            { word: 'Bounded', usage: 'For clearly defining edges.' }
          ]},
          { id: 'constrained', name: 'Constrained', description: 'Output lacks clear boundaries or deliverables.', adjectives: [
            { word: 'Defined', usage: 'For explicitly stating what\'s included.' },
            { word: 'Scoped', usage: 'For agreeing on specific deliverables.' },
            { word: 'Contained', usage: 'For preventing expansion.' },
            { word: 'Finite', usage: 'For establishing clear endpoints.' }
          ]},
          { id: 'tight', name: 'Tight', description: 'Output is bloated or verbose.', adjectives: [
            { word: 'Concise', usage: 'For maximum meaning in minimum words.' },
            { word: 'Compact', usage: 'For minimizing footprint.' },
            { word: 'Economical', usage: 'For using least resources necessary.' },
            { word: 'Lean', usage: 'For eliminating all waste.' }
          ]},
          { id: 'singular', name: 'Singular', description: 'Output lacks a clear central priority.', adjectives: [
            { word: 'One-thing', usage: 'For identifying single most important priority.' },
            { word: 'Focused-bet', usage: 'For committing all resources to one approach.' },
            { word: 'Core', usage: 'For isolating the central element.' },
            { word: 'Essential-only', usage: 'For stripping away the unnecessary.' }
          ]}
        ]
      },
      {
        id: 'expansive',
        name: 'Expansive',
        description: 'Output is too narrow and misses important context.',
        groups: [
          { id: 'broad', name: 'Broad', description: 'Output focuses on one area without surveying the landscape.', adjectives: [
            { word: 'Wide-ranging', usage: 'For touching many topics lightly.' },
            { word: 'Multi-faceted', usage: 'For examining from multiple angles.' },
            { word: 'Diverse', usage: 'For including different viewpoints.' },
            { word: 'Sweeping', usage: 'For generalizations covering wide territory.' }
          ]},
          { id: 'comprehensive', name: 'Comprehensive', description: 'Output leaves out important information.', adjectives: [
            { word: 'Complete', usage: 'For including all necessary components.' },
            { word: 'Exhaustive', usage: 'For exploring every possibility.' },
            { word: 'All-encompassing', usage: 'For creating frameworks that account for everything.' },
            { word: 'Thorough', usage: 'For checking every detail.' }
          ]},
          { id: 'wide', name: 'Wide-ranging', description: 'You need to explore more options before deciding.', adjectives: [
            { word: 'Extensive', usage: 'For covering large amount of material.' },
            { word: 'Far-reaching', usage: 'For considering distant impacts.' },
            { word: 'Broad-spectrum', usage: 'For addressing many different types.' },
            { word: 'Multiple', usage: 'For generating many different options.' }
          ]},
          { id: 'extensive', name: 'Extensive', description: 'Output provides a shallow overview without depth.', adjectives: [
            { word: 'In-depth', usage: 'For going deep into one area.' },
            { word: 'Full', usage: 'For including complete package.' },
            { word: 'Detailed', usage: 'For increasing resolution throughout.' },
            { word: 'Kitchen-sink', usage: 'For including everything possible.' }
          ]}
        ]
      }
    ]
  },
  {
    id: 'style',
    name: 'Style',
    color: 'violet',
    hexColor: '#9b8aa8',
    description: 'Use when you need to decide between making the output clear and easy to understand versus compelling and engaging.',
    isBidirectional: true,
    branches: [
      {
        id: 'clear',
        name: 'Clear',
        description: 'Output is confusing, overly complex, or hard to follow.',
        groups: [
          { id: 'simple', name: 'Simple', description: 'Output assumes too much knowledge.', adjectives: [
            { word: 'Straightforward', usage: 'For following a linear path.' },
            { word: 'Uncomplicated', usage: 'For removing complex parts.' },
            { word: 'Easy', usage: 'For minimizing cognitive load.' },
            { word: 'Basic', usage: 'For explaining fundamentals.' }
          ]},
          { id: 'accessible', name: 'Accessible', description: 'Output excludes non-experts.', adjectives: [
            { word: 'Readable', usage: 'For using good formatting.' },
            { word: 'Understandable', usage: 'For making sense to non-specialists.' },
            { word: 'User-friendly', usage: 'For creating easy interaction.' },
            { word: 'Approachable', usage: 'For using warm, welcoming tone.' }
          ]},
          { id: 'direct', name: 'Direct', description: 'Output buries the point or wastes time.', adjectives: [
            { word: 'Blunt', usage: 'For delivering hard truths.' },
            { word: 'Explicit', usage: 'For stating implications openly.' },
            { word: 'To-the-point', usage: 'For reaching conclusion immediately.' },
            { word: 'No-fluff', usage: 'For removing filler words.' }
          ]},
          { id: 'minimal', name: 'Minimal', description: 'Output uses jargon or unnecessary decoration.', adjectives: [
            { word: 'Clean', usage: 'For achieving minimalism.' },
            { word: 'Stripped-down', usage: 'For reducing to bare essentials.' },
            { word: 'No-jargon', usage: 'For using common words.' },
            { word: 'Minimal', usage: 'For using absolute least amount.' }
          ]}
        ]
      },
      {
        id: 'compelling',
        name: 'Compelling',
        description: 'Output is dry, boring, or fails to motivate.',
        groups: [
          { id: 'persuasive', name: 'Persuasive', description: 'You need to change minds or drive action.', adjectives: [
            { word: 'Compelling', usage: 'For creating irresistible urge to act.' },
            { word: 'Convincing', usage: 'For overcoming skepticism.' },
            { word: 'Influential', usage: 'For shaping opinions.' },
            { word: 'Magnetic', usage: 'For attracting attention effortlessly.' }
          ]},
          { id: 'engaging', name: 'Engaging', description: 'Audience might tune out or lose interest.', adjectives: [
            { word: 'Captivating', usage: 'For holding interest completely.' },
            { word: 'Hooky', usage: 'For grabbing attention immediately.' },
            { word: 'Gripping', usage: 'For creating tension.' },
            { word: 'Immersive', usage: 'For pulling into absorbing experience.' }
          ]},
          { id: 'evocative', name: 'Evocative', description: 'Output feels flat or purely factual without feeling.', adjectives: [
            { word: 'Resonant', usage: 'For striking a meaningful chord.' },
            { word: 'Moving', usage: 'For eliciting emotional response.' },
            { word: 'Atmospheric', usage: 'For setting distinct mood.' },
            { word: 'Visceral', usage: 'For appealing to gut feelings.' }
          ]},
          { id: 'punchy', name: 'Punchy', description: 'Writing feels sluggish or low-energy.', adjectives: [
            { word: 'Dynamic', usage: 'For varying rhythm and pace.' },
            { word: 'Vibrant', usage: 'For using colorful language.' },
            { word: 'Energetic', usage: 'For conveying enthusiasm.' },
            { word: 'Snappy', usage: 'For short, sharp phrasing.' }
          ]}
        ]
      }
    ]
  },
  {
    id: 'certainty',
    name: 'Certainty',
    color: 'emerald',
    hexColor: '#7a9e8e',
    description: 'Use when you need to set the tone and confidence level.',
    isBidirectional: true,
    branches: [
      {
        id: 'definitive',
        name: 'Definitive',
        description: 'Output sounds too uncertain or wishy-washy.',
        groups: [
          { id: 'confident', name: 'Confident', description: 'Output lacks authority or conviction.', adjectives: [
            { word: 'Assured', usage: 'For projecting quiet confidence.' },
            { word: 'Self-assured', usage: 'For demonstrating internal belief.' },
            { word: 'Certain', usage: 'For expressing zero doubt.' },
            { word: 'Conviction', usage: 'For showing deep belief in position.' }
          ]},
          { id: 'decisive', name: 'Decisive', description: 'Output presents too many options without choosing.', adjectives: [
            { word: 'Firm', usage: 'For standing ground.' },
            { word: 'Resolved', usage: 'For demonstrating decision is made.' },
            { word: 'Committed', usage: 'For promising definite action.' },
            { word: 'Clear-choice', usage: 'For identifying the winner.' }
          ]},
          { id: 'strong', name: 'Strong', description: 'Output feels weak or hedged.', adjectives: [
            { word: 'Forceful', usage: 'For adding energy and weight.' },
            { word: 'Emphatic', usage: 'For stressing importance.' },
            { word: 'Unequivocal', usage: 'For leaving no room for argument.' },
            { word: 'Powerful', usage: 'For creating emotional impact.' }
          ]},
          { id: 'committed', name: 'Committed', description: 'Output sounds noncommittal or keeps options open.', adjectives: [
            { word: 'All-in', usage: 'For dedicating total resources.' },
            { word: 'Dedicated', usage: 'For showing persistent effort.' },
            { word: 'Resolute', usage: 'For demonstrating determination.' },
            { word: 'Unwavering', usage: 'For maintaining steady course.' }
          ]}
        ]
      },
      {
        id: 'exploratory',
        name: 'Exploratory',
        description: 'Output sounds too certain about uncertain things.',
        groups: [
          { id: 'tentative', name: 'Tentative', description: 'Output makes claims you\'re not ready to commit to.', adjectives: [
            { word: 'Provisional', usage: 'For temporary placeholders.' },
            { word: 'Preliminary', usage: 'For marking as early draft.' },
            { word: 'Initial', usage: 'For presenting starting point.' },
            { word: 'Soft', usage: 'For gentle suggestions.' }
          ]},
          { id: 'questioning', name: 'Questioning', description: 'Output gives answers instead of probing deeper.', adjectives: [
            { word: 'Curious', usage: 'For expressing genuine interest.' },
            { word: 'Inquiry-based', usage: 'For learning through asking.' },
            { word: 'Probing', usage: 'For digging deeper.' },
            { word: 'Wondering', usage: 'For engaging in open speculation.' }
          ]},
          { id: 'nuanced', name: 'Nuanced', description: 'Output oversimplifies a complex topic.', adjectives: [
            { word: 'Balanced', usage: 'For giving equal weight to perspectives.' },
            { word: 'Considered', usage: 'For showing thought process.' },
            { word: 'Multi-dimensional', usage: 'For examining multiple variables.' },
            { word: 'Textured', usage: 'For adding rich detail.' }
          ]},
          { id: 'open-ended', name: 'Open-ended', description: 'Output closes down possibilities too quickly.', adjectives: [
            { word: 'Unresolved', usage: 'For highlighting questions left to solve.' },
            { word: 'Flexible', usage: 'For allowing future changes.' },
            { word: 'Exploratory', usage: 'For mapping territory without destination.' },
            { word: 'Multiple-paths', usage: 'For offering several valid options.' }
          ]}
        ]
      }
    ]
  }
];

// ============ STEERING WHEEL COMPONENT ============
const SteeringWheel = ({ onHover, onClick, width = 600, height = 600 }) => {
  const radius = Math.min(width, height) / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  const innerRadius = radius * 0.15;
  const ring1Radius = radius * 0.35;
  const ring2Radius = radius * 0.55;
  const ring3Radius = radius * 0.95;

  const arcGenerator = d3.arc()
    .innerRadius((d) => d.innerRadius)
    .outerRadius((d) => d.outerRadius)
    .startAngle((d) => d.startAngle)
    .endAngle((d) => d.endAngle)
    .padAngle(0.01)
    .padRadius(radius);

  const getTextTransform = (startAngle, endAngle, r) => {
    const angle = (startAngle + endAngle) / 2;
    const x = Math.sin(angle) * r;
    const y = -Math.cos(angle) * r;
    let rotate = (angle * 180) / Math.PI;
    if (rotate > 90 && rotate < 270) rotate += 180;
    return `translate(${x}, ${y}) rotate(${rotate})`;
  };

  const getRadialTextTransform = (startAngle, endAngle, r) => {
    const angle = (startAngle + endAngle) / 2;
    const x = Math.sin(angle) * r;
    const y = -Math.cos(angle) * r;
    let degrees = (angle * 180) / Math.PI;
    let rotate = degrees - 90;
    if (degrees > 180) rotate += 180;
    return `translate(${x}, ${y}) rotate(${rotate})`;
  };

  const renderWheel = useMemo(() => {
    const paths = [];
    const labels = [];
    const anglePerDim = (2 * Math.PI) / 6;

    DIMENSIONS.forEach((dim, i) => {
      const dimStartAngle = i * anglePerDim;
      const dimEndAngle = (i + 1) * anglePerDim;

      const ring1Arc = {
        innerRadius, outerRadius: ring1Radius,
        startAngle: dimStartAngle, endAngle: dimEndAngle
      };

      const dimSubItems = dim.branches.map(b => ({ name: b.name, description: b.description }));
      const dimHover = {
        title: dim.name, subtitle: 'Dimension', description: dim.description,
        subItems: dimSubItems, color: dim.color, type: 'dimension'
      };

      paths.push(
        <path key={`dim-${dim.id}`} d={arcGenerator(ring1Arc) || ''} fill={dim.hexColor}
          className="transition-opacity duration-300 hover:opacity-80 cursor-pointer"
          onMouseEnter={() => onHover(dimHover)} onMouseLeave={() => onHover(null)}
          onClick={(e) => { e.stopPropagation(); onClick(dimHover); }}
          opacity={0.9}
        />
      );

      labels.push(
        <text key={`label-dim-${dim.id}`}
          transform={getTextTransform(dimStartAngle, dimEndAngle, (innerRadius + ring1Radius) / 2)}
          textAnchor="middle" dy="0.35em" className="fill-stone-800 font-bold text-sm pointer-events-none uppercase"
          style={{ textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}
        >{dim.name}</text>
      );

      dim.branches.forEach((branch, bIndex) => {
        let branchStartAngle, branchEndAngle;
        if (dim.isBidirectional) {
          const anglePerBranch = anglePerDim / 2;
          branchStartAngle = dimStartAngle + (bIndex * anglePerBranch);
          branchEndAngle = branchStartAngle + anglePerBranch;
        } else {
          branchStartAngle = dimStartAngle;
          branchEndAngle = dimEndAngle;
        }

        const ring2Arc = {
          innerRadius: ring1Radius, outerRadius: ring2Radius,
          startAngle: branchStartAngle, endAngle: branchEndAngle
        };

        const branchSubItems = branch.groups.map(g => ({ name: g.name, description: g.description || '' }));
        const branchHover = {
          title: branch.name, subtitle: dim.name, description: branch.description,
          subItems: branchSubItems, color: dim.color, type: 'branch'
        };

        paths.push(
          <path key={`branch-${branch.id}`} d={arcGenerator(ring2Arc) || ''} fill={dim.hexColor}
            opacity={0.7}
            className="transition-all duration-300 hover:opacity-100 cursor-pointer stroke-stone-300 stroke-1"
            onMouseEnter={() => onHover(branchHover)} onMouseLeave={() => onHover(null)}
            onClick={(e) => { e.stopPropagation(); onClick(branchHover); }}
          />
        );

        labels.push(
          <text key={`label-branch-${branch.id}`}
            transform={getTextTransform(branchStartAngle, branchEndAngle, (ring1Radius + ring2Radius) / 2)}
            textAnchor="middle" dy="0.35em" className="fill-stone-800 font-semibold text-xs pointer-events-none"
            style={{ textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}
          >{branch.name}</text>
        );

        const groupCount = branch.groups.length;
        const anglePerGroup = (branchEndAngle - branchStartAngle) / groupCount;

        branch.groups.forEach((group, gIndex) => {
          const groupStartAngle = branchStartAngle + (gIndex * anglePerGroup);
          const groupEndAngle = groupStartAngle + anglePerGroup;

          const ring3Arc = {
            innerRadius: ring2Radius, outerRadius: ring3Radius,
            startAngle: groupStartAngle, endAngle: groupEndAngle
          };

          const groupHover = {
            title: group.name, subtitle: 'Make your output more...',
            description: group.description || `Use these descriptors for ${branch.name.toLowerCase()} ${dim.name.toLowerCase()}.`,
            details: group.adjectives, color: dim.color, type: 'group'
          };

          paths.push(
            <path key={`group-${group.id}`} d={arcGenerator(ring3Arc) || ''} fill={dim.hexColor}
              opacity={0.5}
              className="transition-all duration-300 hover:opacity-100 cursor-pointer stroke-stone-200 stroke-[0.5]"
              onMouseEnter={() => onHover(groupHover)} onMouseLeave={() => onHover(null)}
              onClick={(e) => { e.stopPropagation(); onClick(groupHover); }}
            />
          );

          labels.push(
            <text key={`label-group-${group.id}`}
              transform={getRadialTextTransform(groupStartAngle, groupEndAngle, (ring2Radius + ring3Radius) / 2)}
              textAnchor="middle" dy="0.35em" className="fill-stone-800 font-medium pointer-events-none"
              style={{ textShadow: '0 1px 2px rgba(255,255,255,0.3)', fontSize: width < 600 ? '10px' : '12px' }}
            >{group.name}</text>
          );
        });
      });
    });

    return { paths, labels };
  }, [onHover, onClick, arcGenerator, innerRadius, ring1Radius, ring2Radius, ring3Radius, width]);

  return (
    <div className="relative flex items-center justify-center p-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="max-w-full max-h-screen">
        <g transform={`translate(${centerX}, ${centerY})`}>
          {renderWheel.paths}
          {renderWheel.labels}
          <circle r={innerRadius * 0.9} fill="#fce8c3" className="stroke-stone-400 stroke-2" />
        </g>
      </svg>
    </div>
  );
};

// ============ INFO PANEL COMPONENT ============
const InfoPanel = ({ context, isLocked, onBack }) => {
  const [copiedWord, setCopiedWord] = useState(null);

  if (!context) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-stone-100/80 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-stone-300">
        <div className="relative mb-8 group">
          <div className="bg-stone-200/80 p-5 rounded-2xl border border-stone-300 relative">
            <svg className="w-8 h-8 text-stone-500 group-hover:text-stone-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight mb-6">AI Steering Wheel</h2>
        <div className="max-w-md space-y-4">
          <p className="text-stone-600 text-lg leading-relaxed">
            Click any section to copy a prompt like "Make this more concise", then paste it into your AI chat to refine the output.
          </p>
          <p className="text-stone-500 text-sm">
            Start from the center (broad dimensions) and work outward to find the precise adjective you need.
          </p>
        </div>
        {onBack && (
          <button onClick={onBack} className="mt-8 px-6 py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors text-sm font-medium">
            ← Back to Home
          </button>
        )}
      </div>
    );
  }

  const getColorClass = (base) => {
    switch(base) {
      case 'coral': return 'text-[#ee8a82] bg-[#ee8a82]/10 border-[#ee8a82]/30';
      case 'sky': return 'text-[#7c9eb2] bg-[#7c9eb2]/10 border-[#7c9eb2]/30';
      case 'rose': return 'text-[#c97b7b] bg-[#c97b7b]/10 border-[#c97b7b]/30';
      case 'amber': return 'text-[#d4a574] bg-[#d4a574]/10 border-[#d4a574]/30';
      case 'violet': return 'text-[#9b8aa8] bg-[#9b8aa8]/10 border-[#9b8aa8]/30';
      case 'emerald': return 'text-[#7a9e8e] bg-[#7a9e8e]/10 border-[#7a9e8e]/30';
      default: return 'text-stone-600 bg-stone-100 border-stone-300';
    }
  };

  const colorStyles = getColorClass(context.color);

  const handleCopy = async (word, e) => {
    if (e) e.stopPropagation();
    const text = `Make this more ${word.toLowerCase()}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedWord(word);
      setTimeout(() => setCopiedWord(null), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedWord(word);
        setTimeout(() => setCopiedWord(null), 2000);
      } catch (err2) { console.error('Copy failed', err2); }
      document.body.removeChild(textArea);
    }
  };

  const isTitleActionable = context.type === 'group';
  const isTitleCopied = copiedWord === context.title;

  return (
    <div className="h-full flex flex-col p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-stone-300 bg-stone-100/90 backdrop-blur-sm overflow-y-auto relative">
      {onBack && (
        <button onClick={onBack} className="absolute top-4 left-4 px-3 py-1.5 bg-stone-200 text-stone-600 rounded-lg hover:bg-stone-300 transition-colors text-sm font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      )}

      {isLocked && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-stone-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-500 border border-stone-300">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span>Locked</span>
        </div>
      )}

      <div className="mb-8 relative z-10 mt-8 lg:mt-0">
        <div className="flex items-center gap-3 mb-4">
          <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded text-xs font-bold tracking-wide border ${colorStyles}`}>
            {context.subtitle}
          </span>
        </div>

        <div className={`group flex items-center gap-4 ${isTitleActionable ? 'cursor-pointer' : ''}`}
          onClick={(e) => isTitleActionable && handleCopy(context.title, e)}
          title={isTitleActionable ? "Click to copy prompt" : undefined}
        >
          <h2 className={`text-4xl md:text-5xl font-bold text-stone-800 tracking-tight transition-colors duration-300 ${isTitleActionable ? 'group-hover:text-stone-600' : ''}`}>
            {context.title}
          </h2>

          {isTitleActionable && (
            <button onClick={(e) => handleCopy(context.title, e)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                isTitleCopied ? 'bg-[#7a9e8e] text-white' : 'bg-stone-200 text-stone-600 border border-stone-300 hover:bg-stone-300 hover:text-stone-800'
              }`}>
              {isTitleCopied ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              )}
              <span>{isTitleCopied ? 'Copied' : 'Prompt'}</span>
            </button>
          )}
        </div>

        <div className={`h-1 w-24 rounded-full mt-4 opacity-60`} style={{ backgroundColor: context.color === 'coral' ? '#ee8a82' : context.color === 'sky' ? '#7c9eb2' : context.color === 'rose' ? '#c97b7b' : context.color === 'amber' ? '#d4a574' : context.color === 'violet' ? '#9b8aa8' : '#7a9e8e' }} />
      </div>

      <div className="space-y-6 relative z-10">
        <div className="bg-white/60 p-6 rounded-xl border border-stone-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: context.color === 'coral' ? '#ee8a82' : context.color === 'sky' ? '#7c9eb2' : context.color === 'rose' ? '#c97b7b' : context.color === 'amber' ? '#d4a574' : context.color === 'violet' ? '#9b8aa8' : '#7a9e8e' }} />
          <div className="flex items-start gap-4 relative z-10">
            <div className={`mt-1 p-1.5 rounded-lg ${colorStyles.split(' ').find(c => c.startsWith('bg')) || 'bg-stone-100'}`}>
              <svg className={`w-5 h-5 ${colorStyles.split(' ').find(c => c.startsWith('text')) || 'text-stone-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-stone-500 font-bold text-xs mb-2 uppercase tracking-widest">Use when the problem is...</h4>
              <p className="text-stone-700 text-lg leading-relaxed">{context.description}</p>
            </div>
          </div>
        </div>

        {context.subItems && context.subItems.length > 0 && (
          <div>
            <h3 className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 pl-1">
              {context.type === 'dimension' ? 'Strategic Pathways' : 'Available Styles'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {context.subItems.map((item, idx) => (
                <div key={idx} className="bg-white/40 p-5 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-white/60 transition-all duration-300 group">
                  <span className={`block font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform duration-300 ${colorStyles.split(' ').find(c => c.startsWith('text')) || 'text-stone-700'}`}>{item.name}</span>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {context.details && context.details.length > 0 && (
          <div>
            <div className="mb-5 mt-6 pt-6 border-t border-stone-200">
              <p className="text-stone-500 text-sm">
                Get more specific than "{context.title.toLowerCase()}" to make your output more...
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {context.details.map((detail, idx) => {
                const isCopied = copiedWord === detail.word;
                return (
                  <div key={idx} onClick={(e) => handleCopy(detail.word, e)}
                    className={`group relative p-5 rounded-xl border flex items-center justify-between gap-4 transition-all duration-300 cursor-pointer ${
                      isCopied ? 'bg-[#7a9e8e]/10 border-[#7a9e8e]/30' : 'bg-white/40 border-stone-200 hover:bg-white/80 hover:border-stone-300 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-bold text-xl ${isCopied ? 'text-[#7a9e8e]' : 'text-stone-700 group-hover:text-stone-900'}`}>{detail.word}</span>
                      </div>
                      <p className={`text-base italic pl-0 transition-colors leading-relaxed ${isCopied ? 'text-[#7a9e8e]/80' : 'text-stone-500 group-hover:text-stone-600'}`}>
                        "{detail.usage}"
                      </p>
                    </div>

                    <button onClick={(e) => handleCopy(detail.word, e)}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        isCopied ? 'bg-[#7a9e8e] text-white' : 'bg-stone-200 text-stone-500 border border-stone-300 group-hover:bg-stone-300 group-hover:text-stone-700'
                      }`}>
                      {isCopied ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      )}
                      <span>{isCopied ? 'Copied' : 'Prompt'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============ STEERING WHEEL PAGE ============
const SteeringWheelPage = ({ onBack }) => {
  const [hoverContext, setHoverContext] = useState(null);
  const [selectedContext, setSelectedContext] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      const size = isMobile ? Math.min(window.innerWidth - 20, 600) : Math.min(window.innerWidth * 0.65, 900);
      setDimensions({ width: size, height: size });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWheelClick = (context) => {
    if (selectedContext?.title === context.title && selectedContext?.type === context.type) {
      setSelectedContext(null);
    } else {
      setSelectedContext(context);
    }
  };

  const handleBackgroundClick = () => {
    setSelectedContext(null);
  };

  const activeContext = hoverContext || selectedContext;
  const isLocked = !hoverContext && !!selectedContext;

  return (
    <div className="min-h-screen w-full text-stone-800 overflow-hidden relative font-sans" style={{ backgroundColor: '#faf6f1', display: 'flex', flexDirection: 'row' }}>
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <main className="relative z-10 flex items-center justify-center p-4 overflow-hidden" style={{ flex: 1 }} onClick={handleBackgroundClick}>
        <div className="relative transition-transform duration-500 ease-out">
          <SteeringWheel onHover={setHoverContext} onClick={handleWheelClick} width={dimensions.width} height={dimensions.height} />
        </div>

        <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none px-4 pt-8">
          <p className="text-stone-700 text-xs md:text-sm tracking-wide font-light">
            made by adjective aficionado hilary gridley.{' '}
            <a href="https://hils.substack.com" target="_blank" rel="noopener noreferrer"
              className="pointer-events-auto text-stone-800 hover:text-stone-900 underline decoration-stone-500/50 hover:decoration-stone-700 underline-offset-4 transition-all">
              subscribe to my newsletter for free tools.
            </a>
          </p>
        </div>
      </main>

      <aside className="relative z-20 shadow-2xl" style={{ width: '400px', height: '100vh' }}>
        <InfoPanel context={activeContext} isLocked={isLocked} onBack={onBack} />
      </aside>
    </div>
  );
};

// ============ HERO COMPONENT ============
const Hero = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden p-4" style={{ backgroundColor: '#ee8a82' }}>
      <div className="w-full max-w-xl px-8 py-12 md:px-16 md:py-20 relative z-20 transform transition-all duration-300 ease-out hover:rotate-2 hover:scale-[1.03] hover:-translate-y-2 cursor-pointer" style={{ backgroundColor: '#fce8c3', border: '2px solid #332d21', boxShadow: '8px 8px 0px 0px rgba(51, 45, 33, 0.1)' }}>
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-800 font-sans">
            Hilary Gridley
          </h1>
          <h2 className="text-xl md:text-3xl font-medium tracking-widest text-stone-600 uppercase inline-block">
            WRITERBUILDER
          </h2>

          <div className="pt-12 md:pt-20 flex flex-row justify-between items-center w-full text-lg md:text-2xl font-bold tracking-widest text-stone-700 uppercase">
            <span>Have words</span>
            <span>Will Build</span>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
      </div>

      <div className="flex flex-col space-y-2 mt-8 z-20">
        <a href="https://hils.substack.com" target="_blank" rel="noopener noreferrer" className="text-stone-800 text-sm hover:text-stone-600 transition-colors">
          Writerbuilder newsletter
        </a>
        <a href="https://maven.com/hilary-gridley/ai-powered-people-management" target="_blank" rel="noopener noreferrer" className="text-stone-800 text-sm hover:text-stone-600 transition-colors">
          Supermanagers course
        </a>
        <button onClick={() => onNavigate('steering-wheel')} className="text-stone-800 text-sm hover:text-stone-600 transition-colors text-left cursor-pointer">
          AI steering wheel
        </button>
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-5" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }}></div>
    </section>
  );
};

// ============ MAIN APP ============
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen selection:bg-rose-200 selection:text-rose-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
      {currentPage === 'home' && (
        <main>
          <div id="home">
            <Hero onNavigate={setCurrentPage} />
          </div>
        </main>
      )}

      {currentPage === 'steering-wheel' && (
        <SteeringWheelPage onBack={() => setCurrentPage('home')} />
      )}
    </div>
  );
}
