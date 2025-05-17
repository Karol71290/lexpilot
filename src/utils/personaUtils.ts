
// Utility functions to work with persona data and map it to policy preferences

type PersonaRiskProfile = 'high' | 'medium' | 'low';
type PersonaPolicyTone = 'conservative' | 'balanced' | 'progressive';
type PersonaInnovationLevel = 'cautious' | 'moderate' | 'exploratory';
export type PersonaLearningStyle = 'structured' | 'guided' | 'exploratory' | 'case-based' | 'self-directed';
export type PersonaId = 'innovator' | 'strategic' | 'pragmatic' | 'cautious' | 'skeptical' | 'reluctant' | 'evangelist' | 'optimizer' | 'veteran' | 'practitioner' | 'resister';
export type PersonaRole = 'AI Champion' | 'Trainer' | 'Prompt Library QA' | 'SOP Documentation' | 'Legal Reviewer' | 'Risk Flagging' | 'Prompt Testing' | 'Feedback Loop';

export interface PersonaGrowthPath {
  currentLevel: number; // 1-5
  nextPersona?: PersonaId; // What persona they might evolve into
  milestones: string[]; // Things they need to do to evolve
  completedMilestones: number; // How many they've completed
}

export interface PersonaPolicyPreferences {
  riskProfile: PersonaRiskProfile;
  policyTone: PersonaPolicyTone;
  innovationLevel: PersonaInnovationLevel;
  governanceFocus: number; // Scale of 1-10
  disclaimerLevel: number; // Scale of 1-10
  complianceEmphasis: number; // Scale of 1-10
}

export interface PersonaTrainingPreferences {
  learningStyle: PersonaLearningStyle;
  recommendedTracks: string[];
  recommendedModules: string[];
  coreModules: string[];
  completedModules?: string[];
}

export interface PersonaProjectPreferences {
  recommendedRoles: PersonaRole[];
  strengths: string[];
  challenges: string[];
  teamFit: PersonaId[]; // Personas they work well with
}

// Map the user's persona to policy generation preferences
export const getPersonaPolicyPreferences = (personaId: PersonaId): PersonaPolicyPreferences => {
  // Default to balanced approach if persona not found
  const defaultPreferences: PersonaPolicyPreferences = {
    riskProfile: 'medium',
    policyTone: 'balanced',
    innovationLevel: 'moderate',
    governanceFocus: 5,
    disclaimerLevel: 5,
    complianceEmphasis: 5
  };

  const personaPreferences: Record<string, PersonaPolicyPreferences> = {
    // Risk-averse personas
    'cautious': {
      riskProfile: 'low',
      policyTone: 'conservative',
      innovationLevel: 'cautious',
      governanceFocus: 9,
      disclaimerLevel: 8,
      complianceEmphasis: 9
    },
    'skeptical': {
      riskProfile: 'low',
      policyTone: 'conservative',
      innovationLevel: 'cautious',
      governanceFocus: 10,
      disclaimerLevel: 9,
      complianceEmphasis: 10
    },
    'reluctant': {
      riskProfile: 'low',
      policyTone: 'conservative',
      innovationLevel: 'cautious',
      governanceFocus: 8,
      disclaimerLevel: 7,
      complianceEmphasis: 8
    },
    'veteran': {
      riskProfile: 'low',
      policyTone: 'conservative',
      innovationLevel: 'cautious',
      governanceFocus: 8,
      disclaimerLevel: 8,
      complianceEmphasis: 9
    },
    'resister': {
      riskProfile: 'low',
      policyTone: 'conservative',
      innovationLevel: 'cautious',
      governanceFocus: 10,
      disclaimerLevel: 10,
      complianceEmphasis: 10
    },
    
    // Balanced personas
    'strategic': {
      riskProfile: 'medium',
      policyTone: 'balanced',
      innovationLevel: 'moderate',
      governanceFocus: 7,
      disclaimerLevel: 6,
      complianceEmphasis: 7
    },
    'pragmatic': {
      riskProfile: 'medium',
      policyTone: 'balanced',
      innovationLevel: 'moderate',
      governanceFocus: 6,
      disclaimerLevel: 5,
      complianceEmphasis: 6
    },
    'practitioner': {
      riskProfile: 'medium',
      policyTone: 'balanced',
      innovationLevel: 'moderate',
      governanceFocus: 5,
      disclaimerLevel: 5,
      complianceEmphasis: 6
    },
    'optimizer': {
      riskProfile: 'medium',
      policyTone: 'balanced',
      innovationLevel: 'moderate',
      governanceFocus: 7,
      disclaimerLevel: 4,
      complianceEmphasis: 6
    },
    
    // Innovation-oriented personas
    'innovator': {
      riskProfile: 'high',
      policyTone: 'progressive',
      innovationLevel: 'exploratory',
      governanceFocus: 4,
      disclaimerLevel: 4,
      complianceEmphasis: 5
    },
    'evangelist': {
      riskProfile: 'high',
      policyTone: 'progressive',
      innovationLevel: 'exploratory',
      governanceFocus: 3,
      disclaimerLevel: 3,
      complianceEmphasis: 4
    }
  };

  return personaPreferences[personaId] || defaultPreferences;
};

// Get persona name for display
export const getPersonaName = (personaId: PersonaId): string => {
  const personaNames: Record<PersonaId, string> = {
    'innovator': 'AI Innovator',
    'strategic': 'Strategic Adopter',
    'pragmatic': 'Pragmatic User',
    'cautious': 'Cautious Evaluator',
    'skeptical': 'Skeptical Observer',
    'reluctant': 'Reluctant Participant',
    'evangelist': 'Tech Evangelist',
    'optimizer': 'Process Optimizer',
    'veteran': 'Skeptical Veteran',
    'practitioner': 'Curious Practitioner',
    'resister': 'Silent Resister'
  };
  
  return personaNames[personaId] || 'Strategic Adopter';
};

// Function to get a description of how the persona influences policy generation
export const getPersonaPolicyImpact = (personaId: PersonaId): string => {
  const personaImpacts: Record<PersonaId, string> = {
    'innovator': 'Your AI Innovator persona suggests policies that encourage responsible experimentation while maintaining core safeguards.',
    'strategic': 'Your Strategic Adopter persona favors balanced policies with clear implementation guidelines and measured risk tolerance.',
    'pragmatic': 'Your Pragmatic User persona emphasizes practical, actionable policies with focused compliance requirements.',
    'cautious': 'Your Cautious Evaluator persona prioritizes thorough governance with comprehensive safeguards and compliance elements.',
    'skeptical': 'Your Skeptical Observer persona maximizes risk protection with extensive disclaimers and strict compliance measures.',
    'reluctant': 'Your Reluctant Participant persona focuses on clear boundaries with strong limitations and governance requirements.',
    'evangelist': 'Your Tech Evangelist persona champions progressive policies with minimal restrictions to promote rapid innovation.',
    'optimizer': 'Your Process Optimizer persona prioritizes measurable efficiency gains while maintaining appropriate guardrails.',
    'veteran': 'Your Skeptical Veteran persona ensures thorough risk assessment and strong compliance is embedded in all policies.',
    'practitioner': 'Your Curious Practitioner persona balances practical exploration with thoughtful guidance for safe implementation.',
    'resister': 'Your Silent Resister persona necessitates comprehensive controls and extensive documentation for limited AI use cases.'
  };
  
  return personaImpacts[personaId] || 'Your policy will be balanced between innovation and compliance requirements.';
};

// Get recommended training tracks based on persona
export const getPersonaTrainingPreferences = (personaId: PersonaId): PersonaTrainingPreferences => {
  const defaultPreferences: PersonaTrainingPreferences = {
    learningStyle: 'guided',
    recommendedTracks: ['AI Fundamentals'],
    recommendedModules: ['AI Fundamentals for Legal Professionals'],
    coreModules: ['AI Fundamentals for Legal Professionals']
  };

  const trainingPreferences: Record<PersonaId, PersonaTrainingPreferences> = {
    'evangelist': {
      learningStyle: 'exploratory',
      recommendedTracks: ['Advanced Prompting', 'Teaching & Evangelism'],
      recommendedModules: ['Advanced Prompt Architectures', 'Training the Trainers', 'AI Implementation Strategy'],
      coreModules: ['Advanced Prompt Architectures', 'Training the Trainers']
    },
    'optimizer': {
      learningStyle: 'structured',
      recommendedTracks: ['Efficiency Optimization', 'Process Improvement'],
      recommendedModules: ['Measuring AI ROI', 'Workflow Optimization with AI', 'SOP Creation'],
      coreModules: ['Measuring AI ROI', 'Workflow Optimization with AI']
    },
    'veteran': {
      learningStyle: 'case-based',
      recommendedTracks: ['Risk Management', 'Compliance'],
      recommendedModules: ['Case-Backed AI Risk Management', 'Legal Implications of AI', 'Ethical AI Adoption'],
      coreModules: ['Case-Backed AI Risk Management', 'Legal Implications of AI']
    },
    'practitioner': {
      learningStyle: 'guided',
      recommendedTracks: ['Practical Applications', 'Prompting Basics'],
      recommendedModules: ['Prompting Basics', 'AI in Daily Legal Work', 'Document Review with AI'],
      coreModules: ['Prompting Basics', 'AI in Daily Legal Work']
    },
    'resister': {
      learningStyle: 'self-directed',
      recommendedTracks: ['Risk Awareness', 'Essential Knowledge'],
      recommendedModules: ['AI Risks & Limitations', 'Essential AI Knowledge for Legal Teams'],
      coreModules: ['AI Risks & Limitations', 'Essential AI Knowledge for Legal Teams']
    },
    'innovator': {
      learningStyle: 'exploratory',
      recommendedTracks: ['Innovation', 'Advanced Applications'],
      recommendedModules: ['Cutting Edge AI Applications in Law', 'Creating Custom AI Tools'],
      coreModules: ['Cutting Edge AI Applications in Law', 'Creating Custom AI Tools']
    },
    'strategic': {
      learningStyle: 'structured',
      recommendedTracks: ['Strategic Planning', 'Implementation'],
      recommendedModules: ['AI Strategic Planning for Legal Departments', 'Measured Rollout Strategies'],
      coreModules: ['AI Strategic Planning for Legal Departments', 'Measured Rollout Strategies']
    },
    'pragmatic': {
      learningStyle: 'guided',
      recommendedTracks: ['Practical Applications', 'ROI Focus'],
      recommendedModules: ['Time-Saving AI Applications', 'Practical Prompting for Legal Work'],
      coreModules: ['Time-Saving AI Applications', 'Practical Prompting for Legal Work']
    },
    'cautious': {
      learningStyle: 'case-based',
      recommendedTracks: ['Safety & Security', 'Governance'],
      recommendedModules: ['Safety First: Responsible AI Use', 'Governance Frameworks for AI'],
      coreModules: ['Safety First: Responsible AI Use', 'Governance Frameworks for AI']
    },
    'skeptical': {
      learningStyle: 'self-directed',
      recommendedTracks: ['Critical Assessment', 'Risk Management'],
      recommendedModules: ['Critical Assessment of AI Claims', 'Identifying AI Hallucinations'],
      coreModules: ['Critical Assessment of AI Claims', 'Identifying AI Hallucinations']
    },
    'reluctant': {
      learningStyle: 'self-directed',
      recommendedTracks: ['Essentials Only', 'Fundamentals'],
      recommendedModules: ['AI Fundamentals for Legal Professionals', 'Minimal Viable AI Knowledge'],
      coreModules: ['AI Fundamentals for Legal Professionals', 'Minimal Viable AI Knowledge']
    }
  };

  return trainingPreferences[personaId] || defaultPreferences;
};

// Get recommended project roles based on persona
export const getPersonaProjectPreferences = (personaId: PersonaId): PersonaProjectPreferences => {
  const defaultPreferences: PersonaProjectPreferences = {
    recommendedRoles: ['Prompt Testing', 'Feedback Loop'],
    strengths: ['Adaptable to various tasks'],
    challenges: ['May need direction on specialized tasks'],
    teamFit: ['strategic', 'pragmatic', 'innovator']
  };

  const projectPreferences: Record<PersonaId, PersonaProjectPreferences> = {
    'evangelist': {
      recommendedRoles: ['AI Champion', 'Trainer'],
      strengths: ['Enthusiasm for new tech', 'Great at motivating others', 'Creative solutions'],
      challenges: ['May underestimate implementation challenges', 'Sometimes overlooks risks'],
      teamFit: ['optimizer', 'practitioner', 'strategic']
    },
    'optimizer': {
      recommendedRoles: ['Prompt Library QA', 'SOP Documentation'],
      strengths: ['Process improvement', 'Documentation quality', 'Consistency checks'],
      challenges: ['May focus too much on metrics', 'Sometimes resists creative approaches'],
      teamFit: ['evangelist', 'strategic', 'practitioner']
    },
    'veteran': {
      recommendedRoles: ['Legal Reviewer', 'Risk Flagging'],
      strengths: ['Deep legal expertise', 'Risk identification', 'Compliance awareness'],
      challenges: ['May be overly cautious', 'Sometimes slows implementation'],
      teamFit: ['innovator', 'evangelist', 'strategic']
    },
    'practitioner': {
      recommendedRoles: ['Prompt Testing', 'Feedback Loop'],
      strengths: ['Practical feedback', 'Balanced perspective', 'User experience focus'],
      challenges: ['May need technical support', 'Sometimes lacks strategic vision'],
      teamFit: ['evangelist', 'optimizer', 'veteran']
    },
    'resister': {
      recommendedRoles: ['Legal Reviewer', 'Risk Flagging'],
      strengths: ['Critical analysis', 'Identifying edge cases', 'Questioning assumptions'],
      challenges: ['Resistance to adoption', 'May focus only on problems'],
      teamFit: ['evangelist', 'optimizer', 'strategic']
    },
    'innovator': {
      recommendedRoles: ['AI Champion', 'Prompt Testing'],
      strengths: ['Creative approaches', 'Early adoption', 'Innovative solutions'],
      challenges: ['May get distracted by new technologies', 'Sometimes lacks focus'],
      teamFit: ['strategic', 'veteran', 'pragmatic']
    },
    'strategic': {
      recommendedRoles: ['SOP Documentation', 'AI Champion'],
      strengths: ['Implementation planning', 'Strategic vision', 'Stakeholder communication'],
      challenges: ['May overthink solutions', 'Sometimes too cautious with innovation'],
      teamFit: ['innovator', 'pragmatic', 'optimizer']
    },
    'pragmatic': {
      recommendedRoles: ['Prompt Testing', 'Feedback Loop'],
      strengths: ['Practical solutions', 'Focus on results', 'Efficiency improvements'],
      challenges: ['May miss strategic opportunities', 'Sometimes lacks creative vision'],
      teamFit: ['innovator', 'strategic', 'optimizer']
    },
    'cautious': {
      recommendedRoles: ['Risk Flagging', 'Legal Reviewer'],
      strengths: ['Thorough risk assessment', 'Compliance expertise', 'Detail orientation'],
      challenges: ['May delay implementation', 'Sometimes focuses too much on risks'],
      teamFit: ['innovator', 'evangelist', 'strategic']
    },
    'skeptical': {
      recommendedRoles: ['Legal Reviewer', 'Risk Flagging'],
      strengths: ['Critical assessment', 'Risk identification', 'Challenging assumptions'],
      challenges: ['Resistance to change', 'May block progress', 'Needs extra convincing'],
      teamFit: ['evangelist', 'strategic', 'optimizer']
    },
    'reluctant': {
      recommendedRoles: ['Feedback Loop', 'Legal Reviewer'],
      strengths: ['Deep traditional expertise', 'Ensuring continuity', 'Critical feedback'],
      challenges: ['Significant resistance to adoption', 'Requires extensive support'],
      teamFit: ['pragmatic', 'strategic', 'practitioner']
    }
  };

  return projectPreferences[personaId] || defaultPreferences;
};

// Get persona growth path information
export const getPersonaGrowthPath = (personaId: PersonaId): PersonaGrowthPath => {
  const defaultPath: PersonaGrowthPath = {
    currentLevel: 3,
    nextPersona: undefined,
    milestones: [
      'Complete AI Foundations track',
      'Use prompt builder 5 times',
      'Complete one legal workflow'
    ],
    completedMilestones: 1
  };

  const growthPaths: Record<PersonaId, PersonaGrowthPath> = {
    'resister': {
      currentLevel: 1,
      nextPersona: 'reluctant',
      milestones: [
        'Complete AI Foundations module',
        'Use prompt builder 3 times',
        'Review one AI-generated document'
      ],
      completedMilestones: 0
    },
    'reluctant': {
      currentLevel: 2,
      nextPersona: 'cautious',
      milestones: [
        'Complete Essentials Only track',
        'Use prompt builder 5 times',
        'Participate in one AI workflow'
      ],
      completedMilestones: 1
    },
    'cautious': {
      currentLevel: 2,
      nextPersona: 'pragmatic',
      milestones: [
        'Complete Safety & Security track',
        'Use AI for document review 3 times',
        'Create one custom prompt'
      ],
      completedMilestones: 2
    },
    'skeptical': {
      currentLevel: 2,
      nextPersona: 'veteran',
      milestones: [
        'Complete Critical Assessment track',
        'Participate in risk assessment project',
        'Test AI use case with success metrics'
      ],
      completedMilestones: 1
    },
    'pragmatic': {
      currentLevel: 3,
      nextPersona: 'optimizer',
      milestones: [
        'Complete ROI Focus track',
        'Document time savings from AI use',
        'Create department AI use guide'
      ],
      completedMilestones: 2
    },
    'practitioner': {
      currentLevel: 3,
      nextPersona: 'strategic',
      milestones: [
        'Complete Practical Applications track',
        'Create 5 custom prompts',
        'Train one colleague on AI use'
      ],
      completedMilestones: 1
    },
    'veteran': {
      currentLevel: 3,
      nextPersona: 'strategic',
      milestones: [
        'Complete Risk Management track',
        'Develop AI governance policy',
        'Successfully implement AI in risk workflow'
      ],
      completedMilestones: 2
    },
    'strategic': {
      currentLevel: 4,
      nextPersona: 'innovator',
      milestones: [
        'Complete Strategic Planning track',
        'Lead department-wide AI rollout',
        'Measure and report on AI ROI'
      ],
      completedMilestones: 2
    },
    'optimizer': {
      currentLevel: 4,
      nextPersona: 'innovator',
      milestones: [
        'Complete Efficiency Optimization track',
        'Document 3 workflow improvements',
        'Create AI SOP library'
      ],
      completedMilestones: 3
    },
    'evangelist': {
      currentLevel: 5,
      nextPersona: undefined,
      milestones: [
        'Complete Teaching & Evangelism track',
        'Lead firm-wide AI training program',
        'Present at legal tech conference'
      ],
      completedMilestones: 2
    },
    'innovator': {
      currentLevel: 5,
      nextPersona: undefined,
      milestones: [
        'Complete Innovation track',
        'Create custom AI solution',
        'Lead organization-wide AI transformation'
      ],
      completedMilestones: 3
    }
  };

  return growthPaths[personaId] || defaultPath;
};

// Check if user should be prompted to update their persona
export const shouldPromptPersonaUpdate = (personaId: PersonaId, trainingCompleted: number, promptBuilderUses: number): boolean => {
  // Logic to determine if user has progressed enough to warrant a persona update
  if (personaId === 'resister' && trainingCompleted >= 3 && promptBuilderUses >= 5) {
    return true;
  }
  
  if (personaId === 'reluctant' && trainingCompleted >= 2 && promptBuilderUses >= 4) {
    return true;
  }
  
  if (personaId === 'cautious' && trainingCompleted >= 3 && promptBuilderUses >= 6) {
    return true;
  }
  
  if (personaId === 'practitioner' && trainingCompleted >= 4 && promptBuilderUses >= 8) {
    return true;
  }
  
  return false;
};
