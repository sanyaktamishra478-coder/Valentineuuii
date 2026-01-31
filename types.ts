
export enum Step {
  INITIAL = 'INITIAL',
  PROPOSAL = 'PROPOSAL',
  SUCCESS = 'SUCCESS'
}

export interface ValentineState {
  step: Step;
  yesScale: number;
  noScale: number;
  noCount: number;
  aiMessage: string;
  isLoading: boolean;
}
