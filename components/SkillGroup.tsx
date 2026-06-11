// SkillGroup — server component; one .skillgroup per §2 contract

interface SkillGroupProps {
  label: string
  chips: string[]
}

export default function SkillGroup({ label, chips }: SkillGroupProps) {
  return (
    <div className="skillgroup">
      <div className="gl">{label}</div>
      <div className="chips">
        {chips.map((chip, i) => (
          <span key={i} className="chip">{chip}</span>
        ))}
      </div>
    </div>
  )
}
