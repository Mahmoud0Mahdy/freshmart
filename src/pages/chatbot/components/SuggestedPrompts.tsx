import { Sparkles } from 'lucide-react';

const PROMPTS = [
  'I have chicken, rice, and vegetables',
  'Quick lunch ideas under 20 minutes',
  'Healthy breakfast recipes',
  'Vegetarian dinner options',
];

interface Props {
  onSelect: (prompt: string) => void;
  disabled: boolean;
}

export function SuggestedPrompts({ onSelect, disabled }: Props) {
  return (
    <>
      <div className="cb-prompts-title">
        <Sparkles size={16} className="text-green-600" />
        <span>Try one of these prompts</span>
      </div>

      <div className="cb-prompts-grid">
        {PROMPTS.map((prompt, index) => (
          <button
            key={index}
            disabled={disabled}
            onClick={() => onSelect(prompt)}
            className="cb-prompt-btn"
          >
            <div className="cb-prompt-icon">
              <Sparkles size={14} />
            </div>
            <span className="cb-prompt-text" title={prompt}>
              {prompt}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}