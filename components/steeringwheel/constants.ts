import { Dimension } from './types';

// Warm color palette matching the homepage (coral, cream, earth tones)
export const DIMENSIONS: Dimension[] = [
  {
    id: 'originality',
    name: 'Originality',
    color: 'coral',
    hexColor: '#ee8a82', // Coral from homepage
    description: 'Use when you need to decide between generating novel, creative ideas or sticking to proven, reliable standards.',
    isBidirectional: true,
    branches: [
      {
        id: 'novel',
        name: 'Novel',
        description: 'Output feels generic, derivative, or too safe.',
        groups: [
          {
            id: 'creative',
            name: 'Creative',
            description: 'You need to break through formulaic or predictable content.',
            adjectives: [
              { word: 'Imaginative', usage: 'For creating detailed mental pictures of things that don\'t exist yet.' },
              { word: 'Inventive', usage: 'For generating new solutions or mechanisms that haven\'t been tried before.' },
              { word: 'Original', usage: 'For producing unique outputs that aren\'t derivative or recycled.' },
              { word: 'Generative', usage: 'For producing high volume and wide variety rather than refining single ideas.' }
            ]
          },
          {
            id: 'unexpected',
            name: 'Unexpected',
            description: 'Output is predictable and doesn\'t challenge assumptions.',
            adjectives: [
              { word: 'Surprising', usage: 'For subverting expectations with unanticipated directions.' },
              { word: 'Counterintuitive', usage: 'For challenging conventional wisdom with insights that seem wrong at first.' },
              { word: 'Non-obvious', usage: 'For revealing connections or implications that aren\'t immediately apparent.' },
              { word: 'Twist', usage: 'For dramatically reversing direction or revealing hidden meaning.' }
            ]
          },
          {
            id: 'innovative',
            name: 'Innovative',
            description: 'Ideas feel outdated or behind current thinking.',
            adjectives: [
              { word: 'Cutting-edge', usage: 'For incorporating the absolute latest developments or methodologies.' },
              { word: 'Pioneering', usage: 'For being first to explore new territory or establish new approaches.' },
              { word: 'Breakthrough', usage: 'For solving problems that were previously considered impossible.' },
              { word: 'Novel', usage: 'For introducing approaches that haven\'t been applied in this context before.' }
            ]
          },
          {
            id: 'fresh',
            name: 'Fresh',
            description: 'Output feels stale or recycled.',
            adjectives: [
              { word: 'New', usage: 'For introducing recent updates or current information.' },
              { word: 'Different', usage: 'For distinguishing clearly from existing alternatives or previous versions.' },
              { word: 'Unconventional', usage: 'For departing from standard methods in favor of unique alternatives.' },
              { word: 'Distinctive', usage: 'For creating a recognizable, signature style that stands out.' }
            ]
          },
        ]
      },
      {
        id: 'proven',
        name: 'Proven',
        description: 'Output is too experimental or lacks credibility.',
        groups: [
          {
            id: 'conventional',
            name: 'Conventional',
            description: 'Output strays too far from what your audience expects.',
            adjectives: [
              { word: 'Standard', usage: 'For meeting established baseline requirements and norms.' },
              { word: 'Traditional', usage: 'For drawing on heritage, history, or long-standing practices.' },
              { word: 'Mainstream', usage: 'For aligning with what the general audience recognizes and accepts.' },
              { word: 'Established', usage: 'For referencing recognized authorities and accepted institutions.' }
            ]
          },
          {
            id: 'reliable',
            name: 'Reliable',
            description: 'Output suggests approaches that might fail.',
            adjectives: [
              { word: 'Dependable', usage: 'For ensuring consistent performance every time.' },
              { word: 'Trustworthy', usage: 'For building confidence through demonstrated credibility.' },
              { word: 'Battle-tested', usage: 'For using approaches validated under high-stress real-world conditions.' },
              { word: 'Stable', usage: 'For creating foundations that won\'t fluctuate or break under pressure.' }
            ]
          },
          {
            id: 'standard',
            name: 'Standard',
            description: 'You need output to align with industry norms.',
            adjectives: [
              { word: 'Industry-norm', usage: 'For matching what competitors or peers are doing.' },
              { word: 'Best-practice', usage: 'For following optimized, widely-agreed-upon methods.' },
              { word: 'Typical', usage: 'For representing the average or median approach.' },
              { word: 'Expected', usage: 'For delivering exactly what the audience anticipates with no surprises.' }
            ]
          },
          {
            id: 'tested',
            name: 'Tested',
            description: 'Output lacks supporting evidence or validation.',
            adjectives: [
              { word: 'Validated', usage: 'For using ideas confirmed by external feedback or market acceptance.' },
              { word: 'Verified', usage: 'For ensuring facts have been checked against reliable sources.' },
              { word: 'Time-tested', usage: 'For drawing on wisdom that has endured over generations.' },
              { word: 'Safe-bet', usage: 'For choosing the low-risk option with highest probability of success.' }
            ]
          },
        ]
      }
    ]
  },
  {
    id: 'grounding',
    name: 'Grounding',
    color: 'sky',
    hexColor: '#7c9eb2', // Muted blue-gray
    description: 'Use when you need to adjust the altitude of thinking—zooming in to concrete details or zooming out to abstract concepts.',
    isBidirectional: true,
    branches: [
      {
        id: 'concrete',
        name: 'Concrete',
        description: 'Output is too theoretical or abstract.',
        groups: [
          {
            id: 'specific',
            name: 'Specific',
            description: 'Output is vague or ambiguous.',
            adjectives: [
              { word: 'Precise', usage: 'For specifying exact measurements, data, or strict constraints.' },
              { word: 'Exact', usage: 'For requiring literal matches with no deviation.' },
              { word: 'Particular', usage: 'For selecting one specific option from multiple possibilities.' },
              { word: 'Explicit', usage: 'For stating things clearly so nothing is left to interpretation.' }
            ]
          },
          {
            id: 'tactical',
            name: 'Tactical',
            description: 'Output lacks clear next steps.',
            adjectives: [
              { word: 'Actionable', usage: 'For providing advice that can be immediately acted upon.' },
              { word: 'Executable', usage: 'For delivering instructions or code ready to run without modification.' },
              { word: 'Step-by-step', usage: 'For breaking down processes into sequential, ordered instructions.' },
              { word: 'Hands-on', usage: 'For enabling direct practice and interaction rather than passive consumption.' }
            ]
          },
          {
            id: 'practical',
            name: 'Practical',
            description: 'Output won\'t work in the real world.',
            adjectives: [
              { word: 'Applied', usage: 'For translating theory into real-world implementation.' },
              { word: 'Useful', usage: 'For prioritizing utility and functional value over elegance.' },
              { word: 'Implementable', usage: 'For ensuring plans are feasible within current constraints and resources.' },
              { word: 'Realistic', usage: 'For grounding expectations in what is actually achievable.' }
            ]
          },
          {
            id: 'detailed',
            name: 'Detailed',
            description: 'Output skims the surface without enough depth.',
            adjectives: [
              { word: 'Granular', usage: 'For examining the smallest constituent parts and sub-components.' },
              { word: 'Thorough', usage: 'For ensuring complete coverage with nothing overlooked.' },
              { word: 'In-depth', usage: 'For exploring complexity and nuance rather than surface-level understanding.' },
              { word: 'Comprehensive', usage: 'For addressing every angle and dimension of the subject.' }
            ]
          },
        ]
      },
      {
        id: 'abstract',
        name: 'Abstract',
        description: 'Output is too granular or tactical.',
        groups: [
          {
            id: 'conceptual',
            name: 'Conceptual',
            description: 'Output gets lost in details without establishing frameworks.',
            adjectives: [
              { word: 'Theoretical', usage: 'For exploring what could work based on logic and models rather than evidence.' },
              { word: 'Philosophical', usage: 'For questioning fundamental assumptions and examining underlying meaning.' },
              { word: 'Principle-based', usage: 'For reasoning from first principles or core values rather than precedent.' },
              { word: 'Ideal', usage: 'For describing the perfect state without accounting for constraints.' }
            ]
          },
          {
            id: 'strategic',
            name: 'Strategic',
            description: 'Output focuses on execution without considering long-term direction.',
            adjectives: [
              { word: 'Long-term', usage: 'For thinking years into the future rather than immediate concerns.' },
              { word: 'Vision-level', usage: 'For painting an inspiring destination without defining every step.' },
              { word: 'Directional', usage: 'For setting a course and orientation without specifying the route.' },
              { word: 'Overarching', usage: 'For identifying themes that connect multiple disparate efforts.' }
            ]
          },
          {
            id: 'high-level',
            name: 'High-level',
            description: 'Output buries the main point in details.',
            adjectives: [
              { word: 'Summary', usage: 'For condensing content down to only the key takeaways.' },
              { word: 'Overview', usage: 'For providing a quick sense of the overall shape and structure.' },
              { word: 'Broad-strokes', usage: 'For painting the general picture without fine details.' },
              { word: 'Zoomed-out', usage: 'For showing context and relationship to surrounding topics.' }
            ]
          },
          {
            id: 'big-picture',
            name: 'Big-picture',
            description: 'Output misses how parts connect to the whole.',
            adjectives: [
              { word: 'Holistic', usage: 'For treating the subject as an interconnected whole rather than isolated parts.' },
              { word: 'Systems-level', usage: 'For analyzing inputs, outputs, feedback loops, and interdependencies.' },
              { word: 'Macro', usage: 'For examining large-scale patterns and trends rather than individual cases.' },
              { word: 'Forest-not-trees', usage: 'For maintaining perspective on the whole without getting lost in details.' }
            ]
          },
        ]
      }
    ]
  },
  {
    id: 'risk',
    name: 'Risk',
    color: 'rose',
    hexColor: '#c97b7b', // Dusty rose
    description: 'Use when you need to determine the feasibility and boldness of the output, choosing between aggressive moonshots and safe, validated bets.',
    isBidirectional: true,
    branches: [
      {
        id: 'bold',
        name: 'Bold',
        description: 'Output plays it too safe or lacks ambition.',
        groups: [
          {
            id: 'aggressive',
            name: 'Aggressive',
            description: 'Output is too soft or avoids confrontation.',
            adjectives: [
              { word: 'Forceful', usage: 'For pushing through resistance and objections with energy.' },
              { word: 'Assertive', usage: 'For stating wants and needs directly without apology or hedging.' },
              { word: 'Direct', usage: 'For cutting through politeness and social niceties to save time.' },
              { word: 'Uncompromising', usage: 'For maintaining firm standards or demands without negotiation.' }
            ]
          },
          {
            id: 'ambitious',
            name: 'Ambitious',
            description: 'Goals feel achievable but uninspiring.',
            adjectives: [
              { word: 'Aspirational', usage: 'For setting goals that inspire hope even if not immediately achievable.' },
              { word: 'Stretch', usage: 'For targeting goals just barely within reach that require full effort.' },
              { word: 'Moonshot', usage: 'For pursuing 10x improvements that require fundamental reinvention.' },
              { word: 'Transformative', usage: 'For aiming to completely alter the current state rather than improve it.' }
            ]
          },
          {
            id: 'experimental',
            name: 'Experimental',
            description: 'Output only suggests things you\'ve already tried.',
            adjectives: [
              { word: 'Exploratory', usage: 'For venturing into unknown territory to discover what exists.' },
              { word: 'Trial', usage: 'For testing ideas on a limited basis to see if they work.' },
              { word: 'Unproven', usage: 'For pursuing ideas that have no supporting data yet.' },
              { word: 'Edge-case', usage: 'For addressing unusual scenarios outside the typical range.' }
            ]
          },
          {
            id: 'boundary',
            name: 'Boundary-pushing',
            description: 'Output accepts existing constraints too readily.',
            adjectives: [
              { word: 'Challenging', usage: 'For questioning fundamental assumptions rather than accepting them.' },
              { word: 'Disruptive', usage: 'For breaking established models and creating new categories.' },
              { word: 'Radical', usage: 'For departing dramatically from accepted norms and practices.' },
              { word: 'Provocative', usage: 'For deliberately provoking reaction and stimulating debate.' }
            ]
          },
        ]
      },
      {
        id: 'safe',
        name: 'Safe',
        description: 'Output suggests things that are too risky or unproven.',
        groups: [
          {
            id: 'conservative',
            name: 'Conservative',
            description: 'Output doesn\'t account for downside risks.',
            adjectives: [
              { word: 'Careful', usage: 'For proceeding with attention and caution to avoid mistakes.' },
              { word: 'Prudent', usage: 'For exercising wisdom and foresight in decision-making.' },
              { word: 'Measured', usage: 'For taking slow, controlled action rather than rushing forward.' },
              { word: 'Restrained', usage: 'For holding back full effort or resources as protection.' }
            ]
          },
          {
            id: 'cautious',
            name: 'Cautious',
            description: 'Output ignores potential failure modes.',
            adjectives: [
              { word: 'Risk-aware', usage: 'For acknowledging and accounting for potential downsides.' },
              { word: 'Hedged', usage: 'For maintaining backup plans and alternative paths.' },
              { word: 'Guarded', usage: 'For protecting information, assets, or positions from exposure.' },
              { word: 'Deliberate', usage: 'For thinking carefully before acting rather than moving quickly.' }
            ]
          },
          {
            id: 'validated',
            name: 'Validated',
            description: 'Output makes claims without supporting evidence.',
            adjectives: [
              { word: 'Evidence-based', usage: 'For relying only on documented facts and verifiable data.' },
              { word: 'Data-backed', usage: 'For supporting claims with specific numbers and measurements.' },
              { word: 'Proven-out', usage: 'For scaling approaches that have already demonstrated success.' },
              { word: 'De-risked', usage: 'For systematically removing variables that could cause failure.' }
            ]
          },
          {
            id: 'proven-safe',
            name: 'Proven',
            description: 'You can\'t afford for the approach to fail.',
            adjectives: [
              { word: 'Low-risk', usage: 'For prioritizing safety and certainty over potential gains.' },
              { word: 'Incremental', usage: 'For advancing through small, manageable steps rather than leaps.' },
              { word: 'Evolutionary', usage: 'For adapting slowly over time rather than revolutionary change.' },
              { word: 'Sure-thing', usage: 'For choosing options with guaranteed or near-certain outcomes.' }
            ]
          },
        ]
      }
    ]
  },
  {
    id: 'scope',
    name: 'Scope',
    color: 'amber',
    hexColor: '#d4a574', // Warm tan/caramel
    description: 'Use when you need to define the boundaries of the output, deciding between a focused, narrow approach and an expansive, comprehensive one.',
    isBidirectional: true,
    branches: [
      {
        id: 'focused',
        name: 'Focused',
        description: 'Output tries to cover too much ground.',
        groups: [
          {
            id: 'narrow',
            name: 'Narrow',
            description: 'Output includes irrelevant information.',
            adjectives: [
              { word: 'Targeted', usage: 'For aiming at one specific segment rather than everyone.' },
              { word: 'Limited', usage: 'For setting strict boundaries on what\'s included.' },
              { word: 'Constrained', usage: 'For working within specific limits of budget, time, or resources.' },
              { word: 'Bounded', usage: 'For clearly defining the edges and limits of the problem space.' }
            ]
          },
          {
            id: 'constrained',
            name: 'Constrained',
            description: 'Output lacks clear boundaries or deliverables.',
            adjectives: [
              { word: 'Defined', usage: 'For explicitly stating what is included and excluded.' },
              { word: 'Scoped', usage: 'For agreeing on specific, bounded deliverables.' },
              { word: 'Contained', usage: 'For preventing expansion beyond original boundaries.' },
              { word: 'Finite', usage: 'For establishing clear endpoints and limits.' }
            ]
          },
          {
            id: 'tight',
            name: 'Tight',
            description: 'Output is bloated or verbose.',
            adjectives: [
              { word: 'Concise', usage: 'For expressing maximum meaning in minimum words.' },
              { word: 'Compact', usage: 'For minimizing footprint and maximizing density.' },
              { word: 'Economical', usage: 'For using the least resources necessary to achieve the goal.' },
              { word: 'Lean', usage: 'For eliminating all waste and unnecessary elements.' }
            ]
          },
          {
            id: 'singular',
            name: 'Singular',
            description: 'Output lacks a clear central priority.',
            adjectives: [
              { word: 'One-thing', usage: 'For identifying and focusing on the single most important priority.' },
              { word: 'Focused-bet', usage: 'For committing all resources to one specific approach.' },
              { word: 'Core', usage: 'For isolating the central, indispensable element.' },
              { word: 'Essential-only', usage: 'For stripping away everything that isn\'t absolutely necessary.' }
            ]
          },
        ]
      },
      {
        id: 'expansive',
        name: 'Expansive',
        description: 'Output is too narrow and misses important context.',
        groups: [
          {
            id: 'broad',
            name: 'Broad',
            description: 'Output focuses on one area without surveying the landscape.',
            adjectives: [
              { word: 'Wide-ranging', usage: 'For touching on many topics lightly rather than diving deep into one.' },
              { word: 'Multi-faceted', usage: 'For examining a subject from multiple angles and perspectives.' },
              { word: 'Diverse', usage: 'For including different viewpoints, demographics, or approaches.' },
              { word: 'Sweeping', usage: 'For making generalizations that cover a wide territory.' }
            ]
          },
          {
            id: 'comprehensive',
            name: 'Comprehensive',
            description: 'Output leaves out important information.',
            adjectives: [
              { word: 'Complete', usage: 'For including all necessary components with nothing missing.' },
              { word: 'Exhaustive', usage: 'For exploring every possibility until all options are covered.' },
              { word: 'All-encompassing', usage: 'For creating frameworks that account for everything.' },
              { word: 'Thorough', usage: 'For checking every detail and leaving no stone unturned.' }
            ]
          },
          {
            id: 'wide',
            name: 'Wide-ranging',
            description: 'You need to explore more options before deciding.',
            adjectives: [
              { word: 'Extensive', usage: 'For covering a large amount of material or territory.' },
              { word: 'Far-reaching', usage: 'For considering impacts and implications at a distance.' },
              { word: 'Broad-spectrum', usage: 'For addressing many different types or categories at once.' },
              { word: 'Multiple', usage: 'For generating many different options rather than converging on one.' }
            ]
          },
          {
            id: 'extensive',
            name: 'Extensive',
            description: 'Output provides a shallow overview without depth.',
            adjectives: [
              { word: 'In-depth', usage: 'For going deep into one vertical area rather than staying surface-level.' },
              { word: 'Full', usage: 'For including the complete package with all components.' },
              { word: 'Detailed', usage: 'For increasing resolution and precision throughout.' },
              { word: 'Kitchen-sink', usage: 'For including everything possible just in case it\'s needed.' }
            ]
          },
        ]
      }
    ]
  },
  {
    id: 'style',
    name: 'Style',
    color: 'violet',
    hexColor: '#9b8aa8', // Muted lavender
    description: 'Use when you need to decide between making the output clear and easy to understand versus compelling and engaging.',
    isBidirectional: true,
    branches: [
      {
        id: 'clear',
        name: 'Clear',
        description: 'Output is confusing, overly complex, or hard to follow.',
        groups: [
          {
            id: 'simple',
            name: 'Simple',
            description: 'Output assumes too much knowledge.',
            adjectives: [
              { word: 'Straightforward', usage: 'For following a linear path with no tricks or complexity.' },
              { word: 'Uncomplicated', usage: 'For removing complex parts and dependencies.' },
              { word: 'Easy', usage: 'For minimizing cognitive load and mental effort required.' },
              { word: 'Basic', usage: 'For explaining foundational fundamentals without advanced concepts.' }
            ]
          },
          {
            id: 'accessible',
            name: 'Accessible',
            description: 'Output excludes non-experts.',
            adjectives: [
              { word: 'Readable', usage: 'For using good formatting, grammar, and structure for easy scanning.' },
              { word: 'Understandable', usage: 'For making sense to people without specialized knowledge.' },
              { word: 'User-friendly', usage: 'For creating easy interaction and low-friction experience.' },
              { word: 'Approachable', usage: 'For using warm, welcoming tone that doesn\'t intimidate.' }
            ]
          },
          {
            id: 'direct',
            name: 'Direct',
            description: 'Output buries the point or wastes time.',
            adjectives: [
              { word: 'Blunt', usage: 'For delivering hard truths without softening or cushioning.' },
              { word: 'Explicit', usage: 'For stating implications openly rather than leaving them unsaid.' },
              { word: 'To-the-point', usage: 'For reaching the conclusion immediately without building up.' },
              { word: 'No-fluff', usage: 'For removing unnecessary adjectives, qualifiers, and filler words.' }
            ]
          },
          {
            id: 'minimal',
            name: 'Minimal',
            description: 'Output uses jargon or unnecessary decoration.',
            adjectives: [
              { word: 'Clean', usage: 'For achieving aesthetic and functional minimalism.' },
              { word: 'Stripped-down', usage: 'For reducing to bare essentials with no decoration.' },
              { word: 'No-jargon', usage: 'For using common words instead of technical or industry terms.' },
              { word: 'Minimal', usage: 'For using the absolute least amount necessary.' }
            ]
          },
        ]
      },
      {
        id: 'compelling',
        name: 'Compelling',
        description: 'Output is dry, boring, or fails to motivate.',
        groups: [
          {
            id: 'persuasive',
            name: 'Persuasive',
            description: 'You need to change minds or drive action.',
            adjectives: [
              { word: 'Compelling', usage: 'For creating an irresistible urge to agree or act.' },
              { word: 'Convincing', usage: 'For overcoming skepticism with logical or emotional proof.' },
              { word: 'Influential', usage: 'For shaping opinions and changing minds subtly or overtly.' },
              { word: 'Magnetic', usage: 'For attracting attention and holding it effortlessly.' }
            ]
          },
          {
            id: 'engaging',
            name: 'Engaging',
            description: 'Audience might tune out or lose interest.',
            adjectives: [
              { word: 'Captivating', usage: 'For holding interest so completely that distractions fade away.' },
              { word: 'Hooky', usage: 'For grabbing attention immediately in the first few seconds.' },
              { word: 'Gripping', usage: 'For creating tension or excitement that demands to be finished.' },
              { word: 'Immersive', usage: 'For pulling the audience into a complete, absorbing experience.' }
            ]
          },
          {
            id: 'evocative',
            name: 'Evocative',
            description: 'Output feels flat or purely factual without feeling.',
            adjectives: [
              { word: 'Resonant', usage: 'For striking a chord that feels personally meaningful or true.' },
              { word: 'Moving', usage: 'For eliciting a strong emotional response or connection.' },
              { word: 'Atmospheric', usage: 'For setting a distinct mood or feeling through tone.' },
              { word: 'Visceral', usage: 'For appealing to gut feelings and physical instincts.' }
            ]
          },
          {
            id: 'punchy',
            name: 'Punchy',
            description: 'Writing feels sluggish or low-energy.',
            adjectives: [
              { word: 'Dynamic', usage: 'For varying rhythm and pace to keep energy high.' },
              { word: 'Vibrant', usage: 'For using colorful, lively language that pops.' },
              { word: 'Energetic', usage: 'For conveying enthusiasm and momentum.' },
              { word: 'Snappy', usage: 'For using short, sharp phrasing that lands with impact.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'certainty',
    name: 'Certainty',
    color: 'emerald',
    hexColor: '#7a9e8e', // Sage green
    description: 'Use when you need to set the tone and confidence level, choosing between definitive, strong assertions and exploratory, open-ended inquiry.',
    isBidirectional: true,
    branches: [
      {
        id: 'definitive',
        name: 'Definitive',
        description: 'Output sounds too uncertain or wishy-washy.',
        groups: [
          {
            id: 'confident',
            name: 'Confident',
            description: 'Output lacks authority or conviction.',
            adjectives: [
              { word: 'Assured', usage: 'For projecting quiet confidence that comes from competence.' },
              { word: 'Self-assured', usage: 'For demonstrating internal belief and conviction.' },
              { word: 'Certain', usage: 'For expressing zero doubt about the conclusion.' },
              { word: 'Conviction', usage: 'For showing deep moral or logical belief in the position.' }
            ]
          },
          {
            id: 'decisive',
            name: 'Decisive',
            description: 'Output presents too many options without choosing.',
            adjectives: [
              { word: 'Firm', usage: 'For standing ground and maintaining a position.' },
              { word: 'Resolved', usage: 'For demonstrating that the decision has been made.' },
              { word: 'Committed', usage: 'For promising definite future action.' },
              { word: 'Clear-choice', usage: 'For identifying the winner or best option unambiguously.' }
            ]
          },
          {
            id: 'strong',
            name: 'Strong',
            description: 'Output feels weak or hedged.',
            adjectives: [
              { word: 'Forceful', usage: 'For adding energy, weight, and power to the message.' },
              { word: 'Emphatic', usage: 'For stressing importance and demanding attention.' },
              { word: 'Unequivocal', usage: 'For leaving no room for argument or alternative interpretation.' },
              { word: 'Powerful', usage: 'For creating emotional impact that moves people.' }
            ]
          },
          {
            id: 'committed',
            name: 'Committed',
            description: 'Output sounds noncommittal or keeps options open.',
            adjectives: [
              { word: 'All-in', usage: 'For dedicating total resources without reservation.' },
              { word: 'Dedicated', usage: 'For showing persistent effort over time.' },
              { word: 'Resolute', usage: 'For demonstrating determination to see it through.' },
              { word: 'Unwavering', usage: 'For maintaining steady course under pressure or doubt.' }
            ]
          },
        ]
      },
      {
        id: 'exploratory',
        name: 'Exploratory',
        description: 'Output sounds too certain about uncertain things.',
        groups: [
          {
            id: 'tentative',
            name: 'Tentative',
            description: 'Output makes claims you\'re not ready to commit to.',
            adjectives: [
              { word: 'Provisional', usage: 'For offering temporary placeholders that may change.' },
              { word: 'Preliminary', usage: 'For marking this as an early draft subject to revision.' },
              { word: 'Initial', usage: 'For presenting a starting point, not a final position.' },
              { word: 'Soft', usage: 'For making gentle suggestions rather than firm directives.' }
            ]
          },
          {
            id: 'questioning',
            name: 'Questioning',
            description: 'Output gives answers instead of probing deeper.',
            adjectives: [
              { word: 'Curious', usage: 'For expressing genuine interest in knowing more.' },
              { word: 'Inquiry-based', usage: 'For learning through asking rather than asserting.' },
              { word: 'Probing', usage: 'For digging deeper beneath surface-level answers.' },
              { word: 'Wondering', usage: 'For engaging in open speculation without conclusions.' }
            ]
          },
          {
            id: 'nuanced',
            name: 'Nuanced',
            description: 'Output oversimplifies a complex topic.',
            adjectives: [
              { word: 'Balanced', usage: 'For giving equal weight to competing perspectives.' },
              { word: 'Considered', usage: 'For showing the thought process and deliberation behind the position.' },
              { word: 'Multi-dimensional', usage: 'For examining multiple interacting variables simultaneously.' },
              { word: 'Textured', usage: 'For adding rich detail and complexity to flat statements.' }
            ]
          },
          {
            id: 'open-ended',
            name: 'Open-ended',
            description: 'Output closes down possibilities too quickly.',
            adjectives: [
              { word: 'Unresolved', usage: 'For highlighting questions and problems left to solve.' },
              { word: 'Flexible', usage: 'For allowing future changes and pivots.' },
              { word: 'Exploratory', usage: 'For mapping territory without claiming to know the destination.' },
              { word: 'Multiple-paths', usage: 'For offering several valid options rather than one answer.' }
            ]
          },
        ]
      }
    ]
  }
];
