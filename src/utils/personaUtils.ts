
// Utility functions to work with persona data and map it to policy preferences

type PersonaRiskProfile = 'high' | 'medium' | 'low';
type PersonaPolicyTone = 'conservative' | 'balanced' | 'progressive';
type PersonaInnovationLevel = 'cautious' | 'moderate' | 'exploratory';

export interface PersonaPolicyPreferences {
  riskProfile: PersonaRiskProfile;
  policyTone: PersonaPolicyTone;
  innovationLevel: PersonaInnovationLevel;
  governanceFocus: number; // Scale of 1-10
  disclaimerLevel: number; // Scale of 1-10
  complianceEmphasis: number; // Scale of 1-10
}

// Map the user's persona to policy generation preferences
export const getPersonaPolicyPreferences = (personaId: string): PersonaPolicyPreferences => {
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
    
    // Innovation-oriented personas
    'innovator': {
      riskProfile: 'high',
      policyTone: 'progressive',
      innovationLevel: 'exploratory',
      governanceFocus: 4,
      disclaimerLevel: 4,
      complianceEmphasis: 5
    }
  };

  return personaPreferences[personaId] || defaultPreferences;
};

// Get persona name for display
export const getPersonaName = (personaId: string): string => {
  const personaNames: Record<string, string> = {
    'innovator': 'AI Innovator',
    'strategic': 'Strategic Adopter',
    'pragmatic': 'Pragmatic User',
    'cautious': 'Cautious Evaluator',
    'skeptical': 'Skeptical Observer',
    'reluctant': 'Reluctant Participant'
  };
  
  return personaNames[personaId] || 'Strategic Adopter';
};

// Function to get a description of how the persona influences policy generation
export const getPersonaPolicyImpact = (personaId: string): string => {
  const personaImpacts: Record<string, string> = {
    'innovator': 'Your AI Innovator persona suggests policies that encourage responsible experimentation while maintaining core safeguards.',
    'strategic': 'Your Strategic Adopter persona favors balanced policies with clear implementation guidelines and measured risk tolerance.',
    'pragmatic': 'Your Pragmatic User persona emphasizes practical, actionable policies with focused compliance requirements.',
    'cautious': 'Your Cautious Evaluator persona prioritizes thorough governance with comprehensive safeguards and compliance elements.',
    'skeptical': 'Your Skeptical Observer persona maximizes risk protection with extensive disclaimers and strict compliance measures.',
    'reluctant': 'Your Reluctant Participant persona focuses on clear boundaries with strong limitations and governance requirements.'
  };
  
  return personaImpacts[personaId] || 'Your policy will be balanced between innovation and compliance requirements.';
};
