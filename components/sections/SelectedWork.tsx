// SelectedWork section — verbatim from A2 Portfolio.html lines 210–286
import Job from '@/components/Job'

export default function SelectedWork() {
  return (
    <section id="work" className="block">
      <div className="sec-head">
        <span className="num">02</span>
        <h2>Selected Work</h2>
        <span className="line"></span>
      </div>
      <div className="work">

        <Job
          tag="Current"
          company="Blinkit"
          meta={['Eternal · Gurgaon', 'Dec 2022 — Present']}
          title="Software Development Engineer 2"
          titleline="Cart, payments, rendering, design system & SDUI"
          bullets={[
            <>Owned the cart surface: <b>lifted conversion 4%</b> (<b>10% for new users</b>) and drove <b>2% recovery</b> through Save for Later.</>,
            <>Established the <b>Jetpack Compose foundation</b> and standardized <b>20+ reusable design-system components</b> adopted across product teams — Compose now powers 20% of screens, with new surfaces defaulting to it.</>,
            <>Sped up app launch, <b>cutting cold-start 12%</b> and <b>first-screen render 20%</b> by initializing critical components earlier.</>,
            <><b>Cut initial load &amp; bind time 3×</b> on a heavy scrollable screen with a virtualized grid that binds in chunks — later reused across Wishlist and other long lists.</>,
            <>Instrumented <b>per-screen scroll metrics</b> now used by other teams, feeding Grafana dashboards and release gates.</>,
            <>Authored incident post-mortems, gated launches with LaunchDarkly, and led sprint planning, code reviews and release delivery for the Android team.</>,
          ]}
        />

        <Job
          company="Blinkit"
          meta={['Eternal · Gurgaon', 'Aug 2021 — Dec 2022']}
          title="Software Development Engineer 1"
          titleline="Payments & checkout"
          bullets={[
            <>Re-architected payments to standardize checkout handoff, payment-state handling and gateway integration.</>,
            <>Built a checkout flow that <b>surfaces applicable payment instruments early</b>, cutting offer/payment mismatches <b>20%</b>.</>,
            <>Integrated Juspay offers, the Simpl SDK (<b>6% of direct transactions</b> via OTP-free checkout) and UPI Collect.</>,
            <>Built a reusable <b>cart messaging framework</b> for interactive offers, discounts and warnings — extended to discovery screens, <b>contributing 7% of offer impressions</b>.</>,
          ]}
        />

        <Job
          company="TCS"
          meta={['System Engineer', '2019 — Aug 2021']}
          title="System Engineer"
          titleline="Tata Consultancy Services"
          bullets={[
            <><b>Cut page-load time by 2s</b> on a freelancer hiring platform by restructuring API calls and caching responses.</>,
            <>Built survey-validation middleware and rebuilt the scoring engine, <b>reducing result computation by 400ms</b>.</>,
            <><b>Cut React form-development time 60%</b> with a reusable validation &amp; submission hook.</>,
          ]}
        />

        <Job
          company="Earlier"
          meta={['Freelance & internships']}
          title="Side projects & early roles"
          titleline="Provin · VOZ · e-commerce automation"
          bullets={[
            <>Built <b>Provin</b>, a React Native service-request tracker that cut manual tracking <b>90%</b>.</>,
            <>Shipped discussion-thread support for <b>VOZ</b>; built Python invoice automation at an e-commerce startup.</>,
          ]}
        />

      </div>
    </section>
  )
}
